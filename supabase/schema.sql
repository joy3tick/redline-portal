-- ============================================================
-- Redline Portal — Supabase Database Schema
-- Run this in the Supabase SQL Editor for your project.
-- ============================================================

-- ─── PROFILES ───────────────────────────────────────────────
-- Extends auth.users with name and role.
create table if not exists public.profiles (
  id   uuid references auth.users(id) on delete cascade primary key,
  name text,
  role text not null default 'rep' check (role in ('rep', 'admin')),
  tier text check (tier is null or tier in ('trial', 'bronze', 'silver', 'gold', 'platinum', 'diamond')),
  created_at timestamptz default now()
);

-- For existing deployments
alter table public.profiles add column if not exists tier text;
alter table public.profiles drop constraint if exists profiles_tier_check;
alter table public.profiles add constraint profiles_tier_check
  check (tier is null or tier in ('trial', 'bronze', 'silver', 'gold', 'platinum', 'diamond'));

alter table public.profiles enable row level security;

-- Security-definer function so policies can check admin status
-- without triggering RLS recursion.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

drop policy if exists "Own profile read" on public.profiles;
create policy "Own profile read"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Authenticated users read all profiles" on public.profiles;
create policy "Authenticated users read all profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- Helpers used by the "Own profile update" with-check below.
-- Both are SECURITY DEFINER + STABLE so they see the snapshot taken at
-- statement start (the pre-update row), letting us lock role / tier.
create or replace function public.my_role()
returns text language sql security definer stable as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.my_tier()
returns text language sql security definer stable as $$
  select tier from public.profiles where id = auth.uid();
$$;

-- Re-create with a WITH CHECK clause that pins role + tier so a rep
-- can't promote themselves to admin or hand themselves a sales tier
-- via a direct supabase.from("profiles").update(...) call.
drop policy if exists "Own profile update" on public.profiles;
create policy "Own profile update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = public.my_role()
    and tier is not distinct from public.my_tier()
  );

drop policy if exists "Admins update any profile" on public.profiles;
create policy "Admins update any profile"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

-- Auto-create a profile row whenever a new user signs up.
-- IMPORTANT: role is hardcoded to 'rep'. Never trust signup metadata for
-- privilege assignment — anyone with the public anon key can hit the
-- /auth/v1/signup endpoint with arbitrary metadata. Admin promotion is
-- explicit and goes through the admin panel (RLS-gated).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'rep'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ─── MODULE PROGRESS ────────────────────────────────────────
-- Tracks which content items each rep has opened/completed.
create table if not exists public.module_progress (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  module_id   text not null,
  completed_at timestamptz default now(),
  unique (user_id, module_id)
);

alter table public.module_progress enable row level security;

drop policy if exists "Own progress all" on public.module_progress;
create policy "Own progress all"
  on public.module_progress for all
  using (auth.uid() = user_id);

drop policy if exists "Admins read all progress" on public.module_progress;
create policy "Admins read all progress"
  on public.module_progress for select
  using (public.is_admin());


-- ─── QUIZ SCORES ────────────────────────────────────────────
-- Stores every quiz attempt; the app surfaces the best score.
create table if not exists public.quiz_scores (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  quiz_id      text not null,
  score        integer not null,
  total        integer not null,
  attempted_at timestamptz default now()
);

alter table public.quiz_scores enable row level security;

drop policy if exists "Own scores all" on public.quiz_scores;
create policy "Own scores all"
  on public.quiz_scores for all
  using (auth.uid() = user_id);

drop policy if exists "Admins read all scores" on public.quiz_scores;
create policy "Admins read all scores"
  on public.quiz_scores for select
  using (public.is_admin());


-- ─── FIRST ADMIN ────────────────────────────────────────────
-- After creating your own account, run this once to make yourself admin:
--
--   update public.profiles set role = 'admin' where id = '<your-user-uuid>';
--
-- Find your UUID in Supabase Dashboard → Authentication → Users.


-- ─── MONTHLY BONUSES ────────────────────────────────────────
create table if not exists public.monthly_bonuses (
  id          uuid default gen_random_uuid() primary key,
  label       text,
  threshold   integer,
  amount      numeric not null,
  period      text not null default 'month' check (period in ('week', 'month')),
  description text,
  created_at  timestamptz default now()
);

-- For existing deployments
alter table public.monthly_bonuses add column if not exists period text not null default 'month';
alter table public.monthly_bonuses drop constraint if exists monthly_bonuses_period_check;
alter table public.monthly_bonuses add constraint monthly_bonuses_period_check
  check (period in ('week', 'month'));
alter table public.monthly_bonuses alter column label drop not null;

alter table public.monthly_bonuses enable row level security;

drop policy if exists "Authenticated users read bonuses" on public.monthly_bonuses;
create policy "Authenticated users read bonuses"
  on public.monthly_bonuses for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins manage bonuses" on public.monthly_bonuses;
create policy "Admins manage bonuses"
  on public.monthly_bonuses for all
  using (public.is_admin());


-- ─── SALES ──────────────────────────────────────────────────
create table if not exists public.sales (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  amount     numeric,
  retainer   numeric,
  note       text,
  sale_date  date not null default current_date,
  created_at timestamptz default now()
);

alter table public.sales enable row level security;

drop policy if exists "Authenticated users read all sales" on public.sales;
create policy "Authenticated users read all sales"
  on public.sales for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users manage own sales" on public.sales;
create policy "Users manage own sales"
  on public.sales for all
  using (auth.uid() = user_id);


-- ─── OFFICE SCHEDULE ────────────────────────────────────────
create table if not exists public.schedule (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  date       date not null,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.schedule enable row level security;

drop policy if exists "Authenticated users read schedule" on public.schedule;
create policy "Authenticated users read schedule"
  on public.schedule for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users manage own schedule" on public.schedule;
create policy "Users manage own schedule"
  on public.schedule for all
  using (auth.uid() = user_id);


-- ─── ANNOUNCEMENTS ──────────────────────────────────────────
create table if not exists public.announcements (
  id         uuid default gen_random_uuid() primary key,
  posted_by  uuid references auth.users(id) on delete set null,
  title      text,
  body       text not null,
  pinned     boolean not null default false,
  created_at timestamptz default now()
);

alter table public.announcements enable row level security;

drop policy if exists "Authenticated users read announcements" on public.announcements;
create policy "Authenticated users read announcements"
  on public.announcements for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins manage announcements" on public.announcements;
create policy "Admins manage announcements"
  on public.announcements for all
  using (public.is_admin());


-- ─── TEAM CHAT MESSAGES ─────────────────────────────────────
create table if not exists public.messages (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  body       text not null,
  created_at timestamptz default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

alter table public.messages enable row level security;

drop policy if exists "Authenticated users read messages" on public.messages;
create policy "Authenticated users read messages"
  on public.messages for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users insert own messages" on public.messages;
create policy "Users insert own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users delete own messages" on public.messages;
create policy "Users delete own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

drop policy if exists "Admins delete any message" on public.messages;
create policy "Admins delete any message"
  on public.messages for delete
  using (public.is_admin());

-- ─── CHAT ATTACHMENTS (images / files / docs) ───────────────
-- Per-message attachment metadata; the binary lives in the
-- `chat-attachments` storage bucket below.
alter table public.messages
  add column if not exists attachment_url  text,
  add column if not exists attachment_name text,
  add column if not exists attachment_type text,
  add column if not exists attachment_size bigint;

-- A message can now be attachment-only (no caption text required).
alter table public.messages alter column body drop not null;

-- Storage bucket for chat attachments. Public so message URLs are
-- viewable indefinitely by any logged-in rep — the chat itself is RLS-gated.
insert into storage.buckets (id, name, public)
values ('chat-attachments', 'chat-attachments', true)
on conflict (id) do nothing;

drop policy if exists "Auth read chat attachments" on storage.objects;
create policy "Auth read chat attachments"
  on storage.objects for select
  using (bucket_id = 'chat-attachments' and auth.role() = 'authenticated');

drop policy if exists "Auth insert chat attachments" on storage.objects;
create policy "Auth insert chat attachments"
  on storage.objects for insert
  with check (bucket_id = 'chat-attachments' and auth.role() = 'authenticated');

drop policy if exists "Own delete chat attachments" on storage.objects;
create policy "Own delete chat attachments"
  on storage.objects for delete
  using (bucket_id = 'chat-attachments' and owner = auth.uid());

drop policy if exists "Admin delete chat attachments" on storage.objects;
create policy "Admin delete chat attachments"
  on storage.objects for delete
  using (bucket_id = 'chat-attachments' and public.is_admin());

-- Realtime: ensure all live-updating tables are in the supabase_realtime
-- publication so INSERT/UPDATE/DELETE events broadcast to subscribed clients.
do $$
declare t text;
begin
  foreach t in array array['messages','announcements','sales','schedule'] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;


-- ─── INBOUND LEADS ──────────────────────────────────────────
-- Admin uploads a CSV; each row becomes a lead assigned to a single rep.
create table if not exists public.leads (
  id           uuid default gen_random_uuid() primary key,
  assigned_to  uuid references auth.users(id) on delete cascade not null,
  assigned_by  uuid references auth.users(id) on delete set null,
  data         jsonb not null default '{}'::jsonb,
  status       text not null default 'new' check (status in ('new','contacted','booked','closed','dead')),
  note         text,
  created_at   timestamptz default now()
);

create index if not exists leads_assigned_to_idx on public.leads (assigned_to, created_at desc);

-- For existing deployments — migrate any legacy 'quoted' rows then re-tighten the constraint
update public.leads set status = 'contacted' where status = 'quoted';
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check
  check (status in ('new','contacted','booked','closed','dead'));

alter table public.leads enable row level security;

drop policy if exists "Reps read own leads" on public.leads;
create policy "Reps read own leads"
  on public.leads for select
  using (auth.uid() = assigned_to);

drop policy if exists "Admins read all leads" on public.leads;
create policy "Admins read all leads"
  on public.leads for select
  using (public.is_admin());

-- Pin assigned_to / assigned_by via WITH CHECK so a rep can't steal
-- a teammate's lead by re-pointing the row at themselves or anyone else.
drop policy if exists "Reps update own leads" on public.leads;
create policy "Reps update own leads"
  on public.leads for update
  using (auth.uid() = assigned_to)
  with check (auth.uid() = assigned_to);

drop policy if exists "Admins manage leads" on public.leads;
create policy "Admins manage leads"
  on public.leads for all
  using (public.is_admin())
  with check (public.is_admin());

-- Live updates for the leads inbox
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'leads'
  ) then
    alter publication supabase_realtime add table public.leads;
  end if;
end $$;

-- ─── CUSTOM ROLES ────────────────────────────────────────────
-- Admin can create custom roles (Sales Manager, Marketing Specialist, etc.)
-- with their own per-tab visibility. The built-in 'admin' and 'rep' roles
-- are seeded and cannot be deleted. profiles.role references roles.name
-- by convention (no FK constraint so admin can rename / migrate freely).
create table if not exists public.roles (
  name         text primary key,
  label        text not null,
  allowed_tabs text[] not null default '{}'::text[],
  is_builtin   boolean not null default false,
  created_at   timestamptz default now()
);

alter table public.roles enable row level security;

drop policy if exists "Authenticated read roles" on public.roles;
create policy "Authenticated read roles"
  on public.roles for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins manage roles" on public.roles;
create policy "Admins manage roles"
  on public.roles for all
  using (public.is_admin());

-- Seed built-in roles with full access
insert into public.roles (name, label, allowed_tabs, is_builtin)
values
  ('admin', 'Admin',     array['dashboard','announcements','chat','leads','leaderboard','scheduling','training','reference','redline-ai'], true),
  ('rep',   'Sales Rep', array['dashboard','announcements','chat','leads','leaderboard','scheduling','training','reference','redline-ai'], true)
on conflict (name) do nothing;

-- Existing deployments: backfill 'redline-ai' onto built-in roles so the new
-- tab shows up after a schema re-run. Only adds the key if it's missing.
update public.roles
   set allowed_tabs = array_append(allowed_tabs, 'redline-ai')
 where is_builtin = true
   and not ('redline-ai' = any(allowed_tabs));

-- Loosen profiles.role so admin-created roles can be assigned to users.
-- Built-in 'admin' is still the only role that grants admin powers (the
-- is_admin() function checks role = 'admin' literally).
alter table public.profiles drop constraint if exists profiles_role_check;


-- ─── OUTREACH TRACKING ──────────────────────────────────────
-- Immutable event log: every time a lead moves OUT of 'new' status,
-- one row is inserted. Rows persist even if the lead is later deleted
-- (lead_id is ON DELETE SET NULL), so reps' historical totals are
-- preserved no matter what they do with the underlying lead.
create table if not exists public.outreach_events (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  lead_id     uuid references public.leads(id) on delete set null,
  from_status text,
  to_status   text,
  created_at  timestamptz not null default now()
);

create index if not exists outreach_events_user_idx
  on public.outreach_events (user_id, created_at desc);

alter table public.outreach_events enable row level security;

drop policy if exists "Own outreach events read" on public.outreach_events;
create policy "Own outreach events read"
  on public.outreach_events for select
  using (auth.uid() = user_id);

drop policy if exists "Admins read all outreach" on public.outreach_events;
create policy "Admins read all outreach"
  on public.outreach_events for select
  using (public.is_admin());

-- Only the system (via trigger) inserts. No client-side insert/update/delete.
-- (No policies granted for those actions; security definer trigger fn handles inserts.)

-- Per-user goals — reps set their own targets for daily/weekly/monthly outreach.
create table if not exists public.outreach_goals (
  user_id    uuid references auth.users(id) on delete cascade primary key,
  daily      integer not null default 0,
  weekly     integer not null default 0,
  monthly    integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.outreach_goals enable row level security;

drop policy if exists "Own goals read" on public.outreach_goals;
create policy "Own goals read"
  on public.outreach_goals for select
  using (auth.uid() = user_id);

drop policy if exists "Own goals upsert" on public.outreach_goals;
create policy "Own goals upsert"
  on public.outreach_goals for insert
  with check (auth.uid() = user_id);

drop policy if exists "Own goals update" on public.outreach_goals;
create policy "Own goals update"
  on public.outreach_goals for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Admins read all goals" on public.outreach_goals;
create policy "Admins read all goals"
  on public.outreach_goals for select
  using (public.is_admin());

-- Trigger: log an outreach event whenever a lead status transitions
-- AWAY FROM 'new'. Subsequent transitions (contacted → booked, etc.)
-- don't re-log — the count reflects "leads first touched".
-- Attributes the event to the lead's assigned_to so each rep gets credit
-- for their own pipeline movement.
create or replace function public.log_outreach_event()
returns trigger
language plpgsql
security definer
as $$
begin
  if (old.status = 'new' and new.status <> 'new' and new.status is not null) then
    insert into public.outreach_events (user_id, lead_id, from_status, to_status)
    values (new.assigned_to, new.id, old.status, new.status);
  end if;
  return new;
end;
$$;

drop trigger if exists on_lead_status_change on public.leads;
create trigger on_lead_status_change
  after update of status on public.leads
  for each row execute procedure public.log_outreach_event();

-- Realtime: opt outreach_events into supabase_realtime so the UI updates
-- live when a status change fires the trigger.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'outreach_events'
  ) then
    alter publication supabase_realtime add table public.outreach_events;
  end if;
end $$;
