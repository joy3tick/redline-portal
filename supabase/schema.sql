-- ============================================================
-- Redline Rep Portal — Supabase Database Schema
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

create policy "Own profile read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Authenticated users read all profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Own profile update"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins update any profile"
  on public.profiles for update
  using (public.is_admin());

-- Auto-create a profile row whenever a new user signs up.
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
    coalesce(new.raw_user_meta_data->>'role', 'rep')
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

create policy "Own progress all"
  on public.module_progress for all
  using (auth.uid() = user_id);

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

create policy "Own scores all"
  on public.quiz_scores for all
  using (auth.uid() = user_id);

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

create policy "Authenticated users read bonuses"
  on public.monthly_bonuses for select
  using (auth.role() = 'authenticated');

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

create policy "Authenticated users read all sales"
  on public.sales for select
  using (auth.role() = 'authenticated');

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

create policy "Authenticated users read schedule"
  on public.schedule for select
  using (auth.role() = 'authenticated');

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

create policy "Authenticated users read announcements"
  on public.announcements for select
  using (auth.role() = 'authenticated');

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

create policy "Authenticated users read messages"
  on public.messages for select
  using (auth.role() = 'authenticated');

create policy "Users insert own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Users delete own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

create policy "Admins delete any message"
  on public.messages for delete
  using (public.is_admin());
