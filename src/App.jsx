import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./lib/supabase";

/* ═══════════════════════════════════════════
   DESIGN TOKENS — single source of truth
   Hero = chartreuse only. Red = urgent only.
   ═══════════════════════════════════════════ */
const TOKENS = {
  bg:        "#0E0F14",
  surface:   "#15171E",
  surface2:  "rgba(255,255,255,0.03)",
  border:    "rgba(255,255,255,0.07)",
  borderStrong:"rgba(255,255,255,0.14)",
  text:      "#F2F4F8",
  textMuted: "#9098A8",
  textDim:   "#5E6376",
  textFaint: "#3D414B",
  // Hero — the ONLY accent for positive / active / energetic states
  hero:      "#CCFF00",
  heroDark:  "#88AB00",
  heroSoft:  "rgba(204,255,0,0.10)",
  heroBorder:"rgba(204,255,0,0.30)",
  // Brand red — reserved for urgent / negative / overdue / dead
  danger:    "#DC2626",
  dangerSoft:"rgba(220,38,38,0.10)",
  dangerBorder:"rgba(220,38,38,0.30)",
  // Funnel status colors (lead pipeline only — do not reuse as UI accents)
  funnel: { new:"#06D6F0", contacted:"#F59E0B", quoted:"#A78BFA", booked:"#14B8A6", closed:"#22C55E", dead:"#DC2626" },
  // Top performer accent — gold (used sparingly for #1 / Final Exam)
  gold:      "#FFD700",
  // Type system
  fontDisplay: "'Bebas Neue', sans-serif",
  fontBody:    "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  fontMono:    "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace",
};

const C = {
  "m1": { t: "Module 1 — Onboarding & Culture", st: "Who Redline is, how we operate, what we will not be.", s: [
    { h: "🏢  1.1 — WELCOME TO REDLINE", b: "We build websites for contractors. That's it. We don't do logos, we don't do paid ads, we don't do social media management. We build conversion-focused websites for home service operators and we keep them running.\n\nFounder Alex Rogul came from finance, not design. He saw $500K+ contractors running businesses on websites that looked like Craigslist ads — losing jobs every day to faster competitors. Redline exists to close that gap.\n\n🎯  THE ONE FILTER\nEvery Redline site passes through one filter: Does it convert, rank, and drive booked jobs? If not, it doesn't ship." },
    { h: "📦  1.2 — WHAT WE SELL (30,000 FT)", b: "Two products:\n\n→ Build — a one-time, custom-built website ($1,497 / $2,497 / $4,497)\n→ Maintain — ongoing hosting and maintenance ($49 / $197 / $297 per month)\n\nEvery Build closes with a Maintain attached. That's the standard. Mechanics covered in Module 3." },
    { h: "🧠  1.3 — THE OPERATOR MINDSET", b: "We are not designers. We are not artists. We sell business infrastructure. Every word out of a rep's mouth ties back to one outcome: booked jobs. Not pixels. Not aesthetics. Not 'modern design.' Booked jobs.\n\nIf a prospect asks about color palettes or fonts, your answer is: 'We handle that — but what matters is whether the site converts. Tell me about your current lead flow.'" },
    { h: "📋  1.4 — REP EXPECTATIONS", b: "You represent Redline. The standard:\n\n→ Respond to lead notifications in under 5 minutes during business hours\n→ Show up to every internal meeting on time, every time\n→ Update the CRM end of day, no exceptions\n→ No fluff in client communication — direct, useful, professional\n→ Never overpromise. Never trash a competitor. Never quote a price you haven't been authorized to quote.\n\nIf you're unsure on a deal, ask. Mistakes are forgivable. Going dark or making up promises is not." },
    { h: "🛠️  1.5 — TOOLS YOU'LL USE", b: "→ Slack — team comms hub. Check first thing morning + before EOD.\n→ Google Sheets CRM — your pipeline lives here. Updated daily.\n→ PandaDoc — contracts go out through this, not email.\n→ Stripe — payment links come from here, not your personal Venmo.\n→ Lead Brief — leads land in your assigned channel with full context. Work them in order of assignment unless told otherwise." },
    { h: "💰  1.6 — YOUR COMPENSATION PATH", b: "You'll start in Trial at 25% commission for your first month. After that you're placed in a bracket (Bronze, Silver, Gold, Platinum, Diamond) based on revenue closed, and you're re-evaluated every month. Full breakdown in Module 12.\n\nQuick math: average Silver rep clears $1,650–$3,960/mo commission only. Gold clears $6,500–$10,800 (hourly + commission). The path is clear and the ceiling is high — but everyone starts the same way." },
  ]},

  "m2": { t: "Module 2 — The Contractor Mind", st: "Know the buyer better than the buyer knows themselves.", s: [
    { h: "🏗️  2.1 — THE HOME SERVICES INDUSTRY", b: "$650–750B/year market in the US. Highly fragmented — most operators are independent, locally-owned, 3–50 employees, $360K–$3M annual revenue. There is no Big Tech disrupting this space at scale yet. Owners are time-poor, revenue-focused, and skeptical of anyone in a suit promising 'marketing solutions.'" },
    { h: "🌅  2.2 — A DAY IN THE LIFE OF AN OWNER", b: "He's up at 5:30 AM. Coffee, schedule check, dispatch crews by 7. He's on jobs by 8, answering customer calls between meetings with crews. Quote in the morning, runs a service call himself at lunch because a tech called out, paperwork at 6 PM, in bed by 10. His 'website' is something his wife or nephew set up four years ago and he has not thought about it in 18 months.\n\nHe is not browsing agency portfolios. He is not on LinkedIn. He picks up the phone because his neighbor referred you or because his current site is so bad he's losing jobs to the kid down the street with a cleaner site." },
    { h: "📅  2.3 — SEASONALITY & MARGINS BY VERTICAL", b: "→ HVAC — peaks summer (AC failures) and winter (heating). Spring/fall = maintenance season + slow. Margins 40–55%. Average install $5–10K.\n→ Roofing — storm-driven. Spring/summer/fall = peak. Winter = slow except emergency leaks. Margins 25–40%. Average job $10–25K.\n→ Plumbing — emergency-heavy. 24/7 calls are gold. Margins 30–50%. Average ticket $300–2,500, with installs $5–15K.\n→ Electrical — project-based. Panel upgrades, EV chargers, generator installs are the high-ticket plays. Margins 35–50%. Average install $2–8K.\n→ Solar — incentive-driven. Long sales cycle (60–90 days). Leads go cold in 48 hours if not worked. Average system $20–40K.\n→ Landscaping — recurring contracts (mow/snow) are the real revenue. One-time installs are the upsell. Annual contracts $1.5–10K, installs $5–50K.\n\nReps need to know which vertical they're on the call with within 30 seconds of opening. The pitch shifts." },
    { h: "📲  2.4 — THE TECH STACK THEY ALREADY USE", b: "→ CRM/dispatch: ServiceTitan, Jobber, Housecall Pro, BuilderTrend\n→ Lead sources: Google Local Service Ads, Yelp, Angi, organic search, word of mouth\n→ Payments: QuickBooks, Square, Stripe (rarely)\n→ Their website: usually Wix, Squarespace, or 'my nephew built it on WordPress in 2017'\n\nYou're not replacing their CRM. You're replacing the front door that feeds it." },
    { h: "⚠️  2.5 — WHY THEIR WEBSITE IS A LIABILITY", b: "The site does one or more of these:\n\n→ Loads slow (over 3 seconds = lead bleed)\n→ Looks pre-2018 (immediate trust killer)\n→ Has no clear phone number or CTA above the fold\n→ No mobile optimization (70%+ of their traffic)\n→ No conversion tracking — they have no idea what's working\n→ Looks identical to every other contractor in their city\n\nOwners feel this. They know the site is bad. They've been told by their wife, their kids, and their best customer. They haven't fixed it because they don't have time and they've been burned by agencies before." },
    { h: "🗣️  2.6 — THE BUYER'S INTERNAL LANGUAGE", b: "They say: 'booked jobs,' 'calls,' 'leads,' 'the phone ringing,' 'trucks rolling,' 'putting boots on the ground,' 'estimates,' 'callbacks,' 'no-shows.'\n\nThey don't say: 'conversion rate optimization,' 'user experience,' 'responsive design,' 'brand identity,' 'engagement,' 'impressions.'\n\nIf you slip into agency-speak, you lose them in 30 seconds. Match their language. Always." },
    { h: "🎯  2.7 — TRIGGER EVENTS THAT MAKE THEM BUY", b: "→ Slow season — phone isn't ringing, they're worried\n→ A new competitor opened up in their market\n→ They lost a big job to someone with a better site\n→ They hired a salesperson and now have capacity to chase more leads\n→ They took on a partner who's pushing for growth\n→ They're trying to sell the business in 1–3 years and need the digital asset cleaned up\n\nListen for these on every call. They're buying signals." },
  ]},

  "m3": { t: "Module 3 — The Two Pillars: Product Mastery", st: "Sell what you know cold. This is the foundation everything else stacks on.", s: [
    { h: "🏗️  3.1 — BUILD: STARTER ($1,497, 7–10 DAYS)", b: "→ Up to 5 pages\n→ Custom site design (no templates, no shortcuts)\n→ Mobile-first build\n→ Contact form\n→ Google profile revamp\n→ Basic on-page SEO\n→ SSL certificate\n→ Speed optimization\n→ 1 round of revisions\n\nWho it's for: Solo operator or 1–2 truck shop with no site or a digital business card. Tight budget. Wants to stop losing jobs to 'you can't find us online.'\n\nThe pitch: 'Stop losing work to a missing website.'" },
    { h: "🚀  3.2 — BUILD: PRO ($2,497, 10–14 DAYS) — MOST POPULAR", b: "Everything in Starter, plus:\n→ Up to 8 pages\n→ Conversion-optimized design\n→ Advanced local SEO\n→ Reviews & testimonials section\n→ Service area pages\n→ Conversion tracking (GA4, call tracking, form attribution)\n→ Strategic CTA placement\n→ 2 rounds of revisions\n\nWho it's for: Established 3–10 person shop with a site that exists but doesn't convert. Wants to outrank competitors locally and turn traffic into calls.\n\nThe pitch: 'Built to convert. You have traffic — it's not turning into calls.'" },
    { h: "💎  3.3 — BUILD: ELITE ($4,497, 14–21 DAYS)", b: "Everything in Pro, plus:\n→ Up to 15 pages\n→ Job cost calculator / instant quote widget\n→ Competitor gap analysis\n→ Multi-location buildout\n→ Before & after project gallery\n→ Social media feed integration\n→ Interactive animations / dynamic site\n→ All custom graphic design\n→ Priority support\n→ 3 rounds of revisions\n\nWho it's for: Multi-trade, multi-location, or high-revenue operator ($150K+/mo). Wants the full system.\n\nThe pitch: 'The full system. Custom-built for max lead volume.'\n\nMulti-location: custom quote. Unified brand, location-specific pages, lead routing — scoped to footprint. Reps escalate to Alex for pricing." },
    { h: "🔧  3.4 — MAINTAIN: ALL THREE TIERS", b: "HOSTING ONLY — $49/mo (12-month minimum = $588 floor)\n→ Managed hosting. Site stays live. Nothing else.\n→ Price-objection fallback only. Never lead with this.\n\nSTANDARD — $197/mo or $1,499/yr (save $865)\n→ Everything in Hosting Only\n→ 24/7 uptime monitoring\n→ Security patches\n→ Bug fixes\n→ Monthly performance report\n→ DEFAULT offer for every Build client. This is your standard attach.\n→ Pitch: 'Most clients cover the cost with one lead they'd have lost.'\n\nPRO — $297/mo or $2,199/yr (save $1,365)\n→ Everything in Standard\n→ Up to 2 hrs updates/mo\n→ Priority response\n→ Proactive SEO optimizations\n→ Proactive speed optimizations\n→ For: Elite Build clients, growing operators who want ongoing optimization." },
    { h: "🎯  3.5 — POSITIONING MAINTAIN ON A BUILD CLOSE", b: "Maintain is not a separate sale. Maintain is the natural conclusion of a Build sale.\n\nThe script:\n'Look — you're spending [Build price] to get a website that books jobs. That investment only pays off if the site stays fast, stays secure, and stays current. Maintain runs you [Maintain price] per month — most clients cover that with one lead they'd have otherwise lost. Standard works for most operators, Pro is for guys who want us inside the site every month making it better. Which makes more sense for where you are?'\n\nThat last question is the assumptive close. Not 'do you want maintenance?' — 'which tier?' Make them pick." },
    { h: "📊  3.6 — DEFAULT TIER PAIRINGS", b: "Use these as starting points. Read the deal and adapt.\n\n→ Starter Build → Standard Maintain\n→ Pro Build → Standard (Pro if growth-oriented)\n→ Elite Build → Pro Maintain\n\nHosting-Only is a fallback, never the default." },
    { h: "🚫  3.7 — WHAT REDLINE DOES NOT DO", b: "Memorize this list. When prospects ask, say no clean and move on:\n\n→ Paid ads management (Google Ads, Meta Ads, LSAs)\n→ Standalone SEO content marketing\n→ Social media management or posting\n→ Logo design as a standalone service\n→ Email marketing campaigns\n→ General 'marketing consulting'\n\nIf they need any of these, you can recommend partners — but Redline doesn't do them." },
    { h: "🛡️  3.8 — THE GUARANTEE BUILT INTO EVERY SITE", b: "Every Redline site ships with our guarantee:\n\n'If your website doesn't generate enough leads to pay for itself, we keep working — for free. No time limits. No fine print. No excuses.'\n\nThis means: unlimited redesigns, ongoing optimization, conversion tracking, performance reports, and SEO/AEO work — until the site pays for itself.\n\nNo agency in the home services space offers this. It's the strongest weapon in your kit. Deployed as a closing tool in Module 10." },
  ]},

  "m4": { t: "Module 4 — Positioning & Strategy", st: "We are revenue consultants. Not designers.", s: [
    { h: "🔄  4.1 — OUTCOMES VS. AESTHETICS — THE LANGUAGE REFRAME", b: "Translation table:\n\n→ Beautiful website → Site that books jobs\n→ Modern design → Built to convert\n→ Responsive → Works on the phones your customers actually use\n→ User experience → Clear path to the phone call\n→ Branding → How you show up to a homeowner deciding who to call\n→ Engagement → Leads coming in\n→ Impressions → People who saw your site\n→ Bounce rate → People who left without calling\n\nIf you slip into a left-column phrase mid-call, course-correct out loud: 'Sorry, let me say that better — what I mean is…'" },
    { h: "⚡  4.2 — THE LIABILITY FRAME", b: "Your opening framing is always:\n\n'Right now, your website is a liability. It's costing you money every day it stays the way it is. We turn it into an asset — something that makes you money.'\n\nThat single reframe changes the conversation. You're not selling a $2,497 expense. You're stopping a daily revenue leak. People pay to stop bleeding." },
    { h: "🆚  4.3 — WE ARE NOT WIX OR SQUARESPACE", b: "When a prospect says 'why not just use Wix?' — answer:\n\n'You absolutely can use Wix. The question is what you want. Wix gives you a template that looks like every other contractor's site in your city. We build a custom asset engineered to rank locally, load fast, and turn visitors into booked jobs — backed by a guarantee that Wix doesn't offer. Different category. Different buyer.'" },
    { h: "🚫  4.4 — WE ARE NOT JUST ANOTHER AGENCY", b: "Agencies sell:\n→ 6-month creative journeys\n→ Brand identity workshops\n→ Mood boards and discovery phases\n→ Hourly billing and scope creep\n\nRedline sells:\n→ 7–21 day turnaround\n→ One flat rate, all-in\n→ A site engineered to convert from day one\n→ A guarantee that says we keep working free if it doesn't perform\n\nWhen prospects say 'I've worked with agencies before, it was a disaster' — your response: 'I get it. That's why we exist. We're not an agency.'" },
    { h: "🦅  4.5 — THE AUTHORITY STANCE", b: "Never beg. Never chase. Never apologize for the price.\n\nYou are running a qualification, not a sale. You are deciding if this prospect is a fit for Redline — not the other way around.\n\nIf a prospect says 'I'm not sure' — your answer is 'Totally fair. Let me ask you this — do you want more booked jobs or not?' If yes, you continue. If no, you wish them well and move on. There are more leads. There is one of you.\n\nThis stance reads through your voice, your pace, and your silences. Don't fill dead air. Don't soften your language with 'just' and 'I was wondering.' You are the expert. Talk like it." },
    { h: "🤝  4.6 — THE 'IF WE'RE A FIT' FRAME", b: "Every sales call opens with a version of:\n\n'This call is a 15–30 minute conversation to see if we're a fit for each other. If we are, I'll walk you through pricing and next steps. If we're not, I'll tell you that and we both move on. Sound fair?'\n\nThis puts you in the driver's seat. It also dramatically reduces objection volume — because you've already framed this as mutual evaluation, not a one-sided pitch." },
  ]},

  "m5": { t: "Module 5 — Lead Engagement & First Touch", st: "Speed kills the competition. Move on every lead like it's the last one.", s: [
    { h: "📥  5.1 — HOW LEADS ARRIVE", b: "Leads land in your assigned Slack channel with a brief. The brief includes:\n\n→ Business name + vertical\n→ Owner name + contact info (phone + email)\n→ Current website URL (if any)\n→ Website red flags identified\n→ Estimated revenue band\n→ Suggested Build tier\n→ Source / notes\n\nYou don't need to know how the lead was sourced or qualified. You need to act on it." },
    { h: "⚡  5.2 — THE 5-MINUTE PREP", b: "Before you dial, do this — and only this:\n\n1️⃣ Open the prospect's current site (or GBP if no site). 60 seconds. Note: load speed, mobile usability, CTAs above fold, last update.\n2️⃣ Note one specific observation you'll mention in the call. Examples: 'your site takes 7 seconds to load on mobile,' 'your contact form doesn't have a phone number above it,' 'you're not showing up for [city] HVAC searches.'\n3️⃣ Form a tier hypothesis. Starter / Pro / Elite — based on size and current site condition.\n\nThat's it. Don't deep-dive. Don't prep a slide deck. Dial." },
    { h: "📞  5.3 — FIRST TOUCH CHANNEL ORDER", b: "Always call first. Phone is the only channel that gets a real-time response.\n\n1️⃣ Call 1. No answer? Leave voicemail. Hang up.\n2️⃣ Text immediately after. Two-line text.\n3️⃣ Email within 15 minutes. Three-line email.\n\nNo prospect gets only an email. Ever." },
    { h: "🎬  5.4 — THE FIRST-CALL SCRIPT", b: "Opener (90 seconds max):\n\n'Hey [First Name], this is [Rep Name] with Redline — we build websites for [HVAC/roofing/etc] contractors. Got 60 seconds for the real reason I'm calling?'\n\nIf yes:\n'Took a quick look at your site. [One specific observation]. We're a Boston-based firm that builds conversion-focused sites for [vertical] operators in your range — the difference is we don't just build pretty sites, we build them to book jobs, and we back them with a guarantee that says they pay for themselves or we keep working free. Worth a 15-minute call to see if it's a fit?'\n\nIf they push back ('now's not a good time'):\n'Totally fair — when's a 15-minute window in the next 48 hours? I'll work around your schedule.'\n\nBook the call. End the conversation in under 4 minutes. First call is to book a sales call, not to sell." },
    { h: "📱  5.5 — VOICEMAIL & TEXT SCRIPTS", b: "Voicemail (15 seconds max):\n'Hey [Name], [Rep] with Redline. I build websites for [vertical] contractors and I noticed something on your site I wanted to flag. Give me a callback at [number] when you have a minute, or I'll try you again tomorrow.'\n\nNo pitch. No price. Just a callback hook.\n\nText (right after voicemail):\n'Hey [Name] — [Rep] with Redline. Just left you a voicemail about your site. Got a quick observation that could be costing you leads. When's a good time to chat?'\n\nEmail (within 15 min of first call):\nSubject: Your [vertical] site — one quick thing\n\n'Hey [Name],\n\nJust tried you — left a voicemail and text. Wanted to flag this:\n\n[One specific observation from your prep]\n\nWe fix this for contractors in your space. 15-minute call if it's worth a look. Reply with a time or grab a slot here: [calendar link]\n\n[Rep], Redline\n[Phone]'" },
    { h: "📅  5.6 — THE 5×5 FOLLOW-UP CADENCE", b: "Every lead gets 5 attempts in 5 business days before going to nurture:\n\n→ Day 1: Initial call + VM + text + email (all four channels)\n→ Day 2: Second call (different time of day) + follow-up text\n→ Day 3: Third call + value-add email (case study or guarantee page)\n→ Day 4: Fourth call + short text\n→ Day 5: Final call + breakup email ('haven't been able to reach you — closing the loop')\n\nAfter Day 5, lead moves to nurture (one touch every 3 weeks)." },
    { h: "⏱️  5.7 — SPEED-TO-LEAD STANDARD: UNDER 5 MINUTES", b: "During business hours (9 AM – 6 PM ET), every assigned lead gets first-touch contact attempted within 5 minutes. No exceptions.\n\nAfter hours, first-touch happens within the first hour of the next business day.\n\nThe CRM tracks your speed-to-lead time on every lead. This is a measured KPI." },
    { h: "🚪  5.8 — WHEN TO DISQUALIFY A LEAD", b: "Some leads aren't real. Disqualify and close the loop if:\n\n→ They explicitly say 'not interested' twice\n→ They reveal they're not the decision-maker and can't get you to one\n→ They reveal they're a franchise / national chain / not in our ICP\n→ They've already signed with another agency\n→ They want services we don't offer (paid ads, social media, etc.)\n\nMark the CRM, note the reason, move on. Don't waste cycles on a no." },
  ]},

  "m6": { t: "Module 6 — Discovery & Diagnosis", st: "Diagnose before you prescribe. The tier follows the pain.", s: [
    { h: "🩺  6.1 — THE DIAGNOSTIC MINDSET", b: "You are a doctor, not a vendor. A doctor doesn't ask: 'do you want surgery, medication, or physical therapy?' — they ask questions, examine the patient, then prescribe. You do the same.\n\nThe opposite of diagnostic selling is feature dumping. If you find yourself listing what's included in Pro vs. Elite before you've understood the prospect's business, stop. Back up. Ask another question." },
    { h: "📋  6.2 — THE 7-QUESTION DISCOVERY FRAMEWORK", b: "Ask these in order. Don't deviate.\n\n1️⃣ 'Walk me through your business — what do you do, what's your service area, how long have you been at it?' (Context, vertical confirmation, lets them talk.)\n\n2️⃣ 'What's your current website doing for you in terms of booked jobs?' (The money question. Listen for 'nothing,' 'I'm not sure,' or a number.)\n\n3️⃣ 'How many leads are you getting in a typical month — and where are they coming from?' (Tells you traffic vs. conversion problem.)\n\n4️⃣ 'What's your close rate on the leads you do get?' (Tells you if the problem is the site or their sales process.)\n\n5️⃣ 'What's the goal for the next 12 months — growth, stability, exit?' (Tier matching. Growth = Pro/Elite. Stability = Starter/Pro. Exit = Elite + Maintain Pro for asset value.)\n\n6️⃣ 'What's the biggest bottleneck right now — not enough leads, not enough capacity, or something else?' (Confirms fit. If 'capacity,' Redline isn't highest-leverage — flag and continue.)\n\n7️⃣ 'What have you tried before for your website, and what happened?' (Unpacks objections preemptively. 'I had an agency burn me' → you know to lead with the guarantee.)" },
    { h: "🎯  6.3 — TIER SELECTION LOGIC", b: "After discovery, use this to recommend:\n\n→ Solo operator, no site or 1–3 page disaster, tight budget → Starter Build + Standard Maintain\n→ 3–10 employees, exists but doesn't convert, has traffic → Pro Build + Standard\n→ Multi-trade, multi-location, $150K+/mo revenue → Elite Build + Pro Maintain\n→ Wants ongoing growth and active optimization → (any Build) + Pro Maintain\n→ Price-sensitive after Build → (any Build) + Standard (Hosting Only as fallback)\n\nStarting point. Read the deal. Adjust." },
    { h: "🚫  6.4 — SPOTTING DISQUALIFIERS MID-DISCOVERY", b: "Disqualify if you hear:\n\n→ 'I just need a quick redesign' → not our buyer\n→ 'My business partner / wife / father needs to approve' → require all parties on next call\n→ 'Money's tight right now' → genuine vs. negotiating tactic? Probe.\n→ 'I want to run Google Ads' → not our service. Refer or close loop.\n→ 'I'm shutting down / selling in 6 months' → no fit\n\nDon't waste a 30-minute pitch on a disqualified lead. Cut the call short, set a follow-up if appropriate, move on." },
    { h: "🔄  6.5 — THE RE-FRAME MOMENT", b: "Sometimes a prospect says: 'I just want a redesign.' Your job is to re-frame:\n\n'Totally get it. Let me ask though — if we just made the site look better and the phone still didn't ring, would you be happy?'\n\n→ 'No, I want it to bring in more business.'\n\n'Right. So what you actually want isn't a redesign — it's a site that converts. That's what we build. Let me walk you through how.'\n\nThat re-frame is the entire shift from price-shopping to value-selling." },
  ]},

  "m7": { t: "Module 7 — The Sales Call Framework", st: "Control the call. Lead with confidence. Close with clarity.", s: [
    { h: "🗺️  7.1 — THE REDLINE CALL STRUCTURE", b: "Every call follows this order. No exceptions:\n\nOpen → Discover → Diagnose → Pitch → Price → Close → Next Step\n\nTarget time allocation on a 30-min call:\n→ Open: 3 min\n→ Discover: 12 min\n→ Diagnose: 3 min\n→ Pitch: 5 min\n→ Price: 2 min\n→ Close + objections: 4 min\n→ Next step lock: 1 min\n\nIf you're 15 minutes in and still pitching, you've lost control. Back to discovery." },
    { h: "🎬  7.2 — THE OPENER (FIRST 3 MINUTES)", b: "The opener does four things: establishes you as the driver, sets the agenda, gets permission, and sets the 'fit' frame.\n\nScript:\n'Hey [Name], thanks for taking 30 minutes. Here's how I'm thinking about this call: I want to understand where your business is at today and what you're trying to grow into. From there, if it's a fit for what we do, I'll walk you through exactly how it works, what it costs, and what your next steps would look like. If it's not a fit, I'll tell you that straight up and we both save time. Sound fair?'\n\nGet the verbal yes ('yeah, sounds good'). That yes is a micro-commitment that anchors the rest of the call." },
    { h: "🔍  7.3 — DISCOVERY PHASE (12 MINUTES)", b: "Run the 7-question framework from Module 6. Listen more than you talk. Take notes — visible notes if you're on video, mental notes if audio only. Ask follow-up questions on key answers ('you mentioned the site's been the same for 4 years — what's stopped you from updating it before?').\n\nThe rule: ask, listen, ask again. Don't pitch in discovery. Don't even hint at the product." },
    { h: "🩻  7.4 — DIAGNOSE PHASE (3 MINUTES)", b: "Transition from discovery to pitch. Summarize what you heard:\n\n'So here's what I'm hearing. You're running [vertical] in [area], doing roughly [revenue band], getting most of your leads from [source]. The site hasn't been touched in [X] years, you're losing jobs to competitors who show up faster on Google, and you want to grow [target] over the next year. Did I get that right?'\n\nThey confirm (or correct, and you adjust). Then:\n\n'What you actually need is [Build tier] — and here's exactly why.'\n\nThat transition is the bridge. The prospect feels heard. The pitch now lands on prepared ground." },
    { h: "🎯  7.5 — PITCH PHASE (5 MINUTES)", b: "The pitch is short. You're not selling features. You're selling the path from where they are to where they want to be.\n\nStructure:\n1️⃣ Tier recommendation + headline outcome ('Pro Build — this gets you a site that ranks locally and turns traffic into calls')\n2️⃣ Top 3 deliverables that matter to them (not the full feature list — the 3 that solve their specific pain)\n3️⃣ The guarantee ('And here's the thing — if it doesn't pay for itself in leads, we keep working free until it does')\n4️⃣ Timeline ('You'd be live in 10–14 days')\n\nDon't read off the website. Don't list every feature. Five minutes max." },
    { h: "💵  7.6 — PRICE PHASE (2 MINUTES)", b: "The price drop. Done with confidence.\n\n'For everything I just walked you through — the full Pro Build — you're looking at $2,497, one-time, paid upfront. That includes everything. No hidden costs, no surprises.'\n\nThen shut up. Silence is the close. Whoever speaks first loses.\n\nIf they speak first with an objection, go to Module 9. If they speak first with a buying signal ('ok, what's next?'), move to close." },
    { h: "🤝  7.7 — CLOSE PHASE (4 MINUTES)", b: "Assumptive close. Never ask 'do you want to move forward' — that opens the door to 'let me think about it.'\n\nInstead:\n'Sounds like a fit. Here's what happens next: I'm going to send you a contract through PandaDoc — takes 2 minutes to review and sign. Once that's signed, the payment link goes through Stripe, and the moment that clears we kick off. We'd have you live by [date]. Cool?'\n\nGet the verbal yes. Send the contract while they're on the call." },
    { h: "🔗  7.8 — THE MAINTAIN ATTACH", b: "Before you end the price phase, you've already attached Maintain. The structure:\n\n'That $2,497 gets you the site built and launched. To keep it running — hosting, security, performance monitoring, the whole thing — that's our Maintain plan at $197/mo. Most clients cover that cost with one lead they'd have otherwise lost. Standard works for most operators, Pro is for guys who want us inside the site every month making it better. Which makes more sense for you?'\n\nNot 'do you want maintenance.' 'Which tier.' The attach happens by default." },
    { h: "📅  7.9 — THE NEXT-STEP LOCK", b: "Every call ends with one of three outcomes:\n\n1️⃣ Closed deal — contract sent, payment link sent, kickoff calendared\n2️⃣ Calendared next step — second call booked on the calendar before this one ends\n3️⃣ Closed loop — clear no, marked in CRM, moved on\n\nThere is no fourth outcome. 'I'll think about it and get back to you' is not an outcome. If you hear that, you have not done your job. Get the next step." },
  ]},

  "m8": { t: "Module 8 — Value Prop & Messaging", st: "Sell what they actually buy: booked jobs, not pixels.", s: [
    { h: "🔄  8.1 — THE OUTCOME TRANSLATION TABLE", b: "Memorize this. Every feature has a buyer-language version.\n\n→ Mobile-first build → 'Works on the phones your customers actually use — and 70% of your visitors are on phones'\n→ Conversion-optimized design → 'Every page is built to make the phone ring'\n→ Local SEO → 'When someone in [city] searches \\'[service] near me,\\' you show up'\n→ Service area pages → 'Show up for every town you actually serve, not just the one you're based in'\n→ Job cost calculator → 'Prospects price out their job before they call you — you only talk to qualified leads'\n→ Reviews section → 'Social proof at the top of the page — homeowners trust you before they call'\n→ Speed optimization → 'Loads in under 2 seconds — slow sites lose 40% of leads'\n→ Conversion tracking → 'You know exactly how many leads come from the site, what they cost, where they came from'\n→ Custom design → 'You don't look like every other contractor in your city'" },
    { h: "❓  8.2 — THE 'SO WHAT?' TEST", b: "Before every line you say, ask: so what?\n\n→ 'We use modern design' → so what? → 'We use designs that make homeowners trust you in the first 3 seconds.'\n→ 'We're mobile responsive' → so what? → 'Your site works on the phone, which is where 70% of your traffic comes from.'\n→ 'We do local SEO' → so what? → 'When a homeowner in [city] searches for an [vertical] contractor, you're the first one they see.'\n\nIf you can't pass the 'so what?' test, kill the line." },
    { h: "🎯  8.3 — VERTICAL-SPECIFIC PITCHES", b: "Same product. Different framing per vertical.\n\nHVAC:\n'When a homeowner's AC dies at 9 PM in July, the first site that loads fast and has a phone number above the fold gets the call. Right now, that's not you. We make sure it is.'\n\nRoofing:\n'Storm rolls through Tuesday. Homeowners are searching for roofers Wednesday morning. Your site needs to be the one they find — and the one they call. We make that happen.'\n\nPlumbing:\n'A burst pipe at 2 AM doesn't wait for business hours. Your site needs to capture that job before the homeowner dials the next number. We build sites that do that — 24/7.'\n\nElectrical:\n'Nobody hands an electrician the keys to their panel without trust. Your site needs to earn it before you ever pick up the phone. We build that trust on every page.'\n\nSolar:\n'Solar leads go cold in 48 hours. Your site needs to educate, build trust, and get the appointment request before your competitor calls them first. That's exactly what we build for.'\n\nLandscaping:\n'One-time mow vs. $3,400 annual contract — your site determines which one they ask for. We build it to sell the package, not just the visit.'" },
    { h: "💰  8.4 — ROI FRAMING", b: "Math the prospect can do on a napkin.\n\n'You said your average install is $7,500 and you close about 1 in 3 leads. So we need this site to bring you 1 new lead in the next 12 months to pay for itself. The average Redline site brings a 47% lead lift. You tell me — is that doable?'\n\nThey'll do the math. The math closes the deal." },
    { h: "🚫  8.5 — BANNED PHRASES", b: "Never say these. Hard rule.\n\n→ 'Beautiful website'\n→ 'Modern design' (unless followed by an outcome)\n→ 'User experience' or 'UX'\n→ 'Brand identity'\n→ 'Sleek' / 'clean' / 'stunning'\n→ 'Engagement'\n→ 'Cutting-edge'\n→ 'Innovative solution'\n→ 'Synergy'\n→ 'Best-in-class'\n→ 'World-class'\n\nIf you catch yourself saying any of these, course-correct on the call: 'Sorry, what I mean is — it'll book you more jobs.'" },
  ]},

  "m9": { t: "Module 9 — Pricing & Objections", st: "Price with confidence. Handle resistance without flinching.", s: [
    { h: "💵  9.1 — HOW TO PRESENT PRICE", b: "Three rules.\n\n1️⃣ State the price, then shut up. Whoever speaks first loses. If you fill the silence with justifications, you signal you don't believe in the price.\n\n2️⃣ No hedging language. Banned: 'the investment is...', 'it comes out to roughly...', 'it's around...', 'starting at...' Acceptable: '$2,497, one-time, paid upfront.'\n\n3️⃣ Anchor against the alternative. Before stating price, plant the comparison:\n\n'Most agencies in our space charge $8,000 to $15,000 for the same scope of work. We come in 50–70% lower because we specialize in [vertical] and run a tight operation. For the full Pro Build, you're at $2,497, one-time, paid upfront.'\n\nNow silence." },
    { h: "🔒  9.2 — WHY 100% UPFRONT IS THE STANDARD", b: "Don't apologize for it. Defend it:\n\n'Why upfront? Three reasons: One, it lets us move fast — your site's live in 10–14 days, not 6 months. Two, it filters serious buyers from tire-kickers, which keeps our cost structure low and your price low. Three, it means once you sign, we're 100% focused on building, not chasing payments. Most of our clients prefer it.'\n\nEnd of conversation. Don't negotiate to 50/50 unless explicitly authorized by Alex." },
    { h: "🛡️  9.3 — TOP 10 OBJECTIONS (1–5)", b: "OBJECTION 1: 'It's too expensive.'\n→ 'Let me ask — too expensive compared to what? Another agency, or just more than you were planning to spend?'\n→ Another agency: 'What are they quoting? Most agencies in our space are $8K–$15K for this scope. We're 50–70% lower because we specialize in [vertical] and we don't run six-month creative journeys.'\n→ More than planned: 'Totally fair. Let me ask — what's your average job worth? Right. So if this site brings you ONE new job in the next 12 months, it's already paid for itself. Our average client sees a 47% lift in leads. So the real question isn't whether it's expensive — it's whether you can afford to keep losing leads.'\n\nOBJECTION 2: 'I need to think about it.'\n→ 'Of course — this is real money. Just so I know what you're thinking through: is it the price, the timing, or something about the scope that doesn't sit right?' (Forces the real objection.)\n\nOBJECTION 3: 'Send me a proposal.'\n→ 'Happy to. Quick question first — if the proposal had everything we just walked through at the price we discussed, would you move forward this week, or is there someone else who needs to sign off?'\n→ If yes: 'Honestly, since we've already covered everything, let me just send the contract now instead. Same info, but you can actually take action on it. Sound good?'\n\nOBJECTION 4: 'My nephew/cousin/friend builds websites.'\n→ 'That's great — having a family option is real. Let me ask: how many sites has he built for contractors in your range, and what kind of lead results has he gotten them?' (Almost always: 'none.')\n→ 'Look, he can probably build you something. The question is whether it'll book jobs. We've built [X] sites for [vertical] contractors. We track every lead. We back it with a guarantee. If that doesn't pay for itself, we keep working free. That's a fundamentally different conversation.'\n\nOBJECTION 5: 'We already have a site.'\n→ 'I saw it — that's actually why I'm reaching out. The question isn't whether you have a site. It's whether the one you have is making your phone ring. Walk me through what your current site is doing for you in terms of booked jobs.'" },
    { h: "🛡️  9.4 — TOP 10 OBJECTIONS (6–10)", b: "OBJECTION 6: 'I need to talk to my partner / wife / business partner.'\n→ 'Totally fair. To save everyone time, let's get them on a 15-minute call together so I can answer their questions directly and you don't have to play telephone. When are you both free in the next 48 hours?' (Get the meeting booked on the calendar before this call ends.)\n\nOBJECTION 7: 'Not the right time.'\n→ 'Understood. Let me ask — what makes it the right time? Is it slow season, after a specific project wraps, after you hire someone?'\n→ Whatever they say: 'Here's the truth: the right time to fix a site that's costing you leads is right now. Every month you wait, you're losing jobs. The site takes 10–14 days to build. By the time your right time comes around, you could already have a converting site working for you.'\n\nOBJECTION 8: 'What's your guarantee?' (THIS IS A GIFT.)\n→ 'Your site pays for itself in leads, or we keep working for free. No time limits. No fine print. We rebuild pages until they convert. We're inside the site every week tracking what's working. You literally cannot lose.'\n→ 'That guarantee is why we sleep at night. Most agencies take your money and disappear. We don't have that option — we have skin in the game.'\n\nOBJECTION 9: 'Why not Wix or Squarespace?'\n→ 'You absolutely can use Wix. Real answer: it's a $20/mo template. You'll get a site that looks like every other contractor in your city. We build a custom asset engineered to rank locally, load fast, and turn visitors into booked jobs — backed by a guarantee that Wix doesn't offer. Different category, different buyer.'\n\nOBJECTION 10: 'What's the ROI?'\n→ 'Math: Pro is $2,497. You told me your average install is $[X]. If this site brings you ONE new job in the next 12 months, it's paid for itself. Our average client sees a 47% lift in leads. What does that look like in jobs for you?'" },
    { h: "🔄  9.5 — REFRAME VS. REBUTTAL", b: "Rebuttal = arguing back. 'It's not too expensive because…' This loses.\n\nReframe = changing the question. 'Compared to what? Let me ask…' This wins.\n\nWhen in doubt, ask a question instead of making a statement. Questions move the prospect's brain. Statements bounce off." },
    { h: "🚶  9.6 — WALK-AWAY POWER", b: "The single most powerful negotiating posture is genuine willingness to walk. If a prospect senses you need this deal, you've lost leverage. If they sense you're indifferent — that there are 50 more leads behind them — you have it all.\n\nYou don't fake this. You build it. Pipeline solves nervousness. Run your activity, work your leads, and you'll have so much pipeline you genuinely don't need any single deal. That's when you close at 30%+." },
    { h: "🎚️  9.7 — WHAT YOU CAN FLEX ON", b: "Flex authorized:\n→ Payment schedule (50/50 instead of 100% upfront) — only with Alex's pre-approval\n→ Throw in Maintain first month free at signing (if it gets the deal across the line)\n\nNever flex without Alex sign-off:\n→ Build price discounts\n→ Scope additions (extra pages, extra features beyond tier)\n→ Refund or money-back promises beyond the standard guarantee\n→ Custom payment plans\n→ Timeline guarantees beyond posted turnaround\n\nWhen in doubt: 'Let me check with my team and get back to you in the next hour.' Then ping Alex." },
  ]},

  "m10": { t: "Module 10 — Proof & Competitive Positioning", st: "Show, don't tell. Beat the competition before they're mentioned.", s: [
    { h: "🛡️  10.1 — THE GUARANTEE AS CLOSING WEAPON", b: "Read this twice:\n\n'If your website doesn't generate enough leads to pay for itself, we keep working — for free. No time limits. No fine print. No excuses.'\n\nThis means unlimited redesigns, ongoing optimization, conversion tracking, performance reports, SEO and AEO work — until the site pays for itself.\n\nWhen to deploy:\n→ After price is on the table\n→ After any 'risk' objection ('what if it doesn't work?')\n→ Before close, as the final lever\n\nThe deployment script:\n'Here's the thing — you don't have to take my word for it. If your site doesn't generate enough leads to pay for itself, we keep working for free. No time limits. No fine print. We rebuild pages until they convert. So the real question isn't whether this will work. It's whether you can afford to keep losing leads while you decide.'\n\nThat last line is the close. Use it." },
    { h: "📊  10.2 — THE PERFORMANCE STATS ARSENAL", b: "Memorize these. Deploy them naturally.\n\n→ 47% average lift in leads — every Redline site, traffic to call\n→ 8.7% average conversion rate (industry average is 2–3%)\n→ 100% on-time delivery — every project, no exceptions\n→ 73% average cost savings vs. agencies charging $8K–$15K for the same build\n→ 100% of sites tracked — conversion tracking, call tracking, real-time analytics\n\nWhen stats land:\n→ After a price objection ('73% less than competitors charging $10K+')\n→ After a quality objection ('8.7% conversion rate — industry average is 2-3%')\n→ After a risk objection ('100% on-time delivery, every project')" },
    { h: "🎨  10.3 — LIVE MOCKUP DEPLOYMENT", b: "We have a mockup generator. Reps can spin up a live React mockup of a prospect's redesigned site within minutes.\n\nWhen to use:\n→ After a strong discovery call where the prospect is engaged but hesitating\n→ Before a follow-up call (send the mockup link as the hook to get them back on)\n→ On a real-time screen share if the prospect is wavering on price\n\nWhen NOT to use:\n→ Before discovery — never lead with a mockup\n→ For tire-kickers who haven't committed to anything\n→ As a free deliverable in exchange for 'thinking about it'\n\nThe mockup script:\n'Want to see what your site could look like in 10 days? Give me 24 hours and I'll send you a live mockup of the homepage — built for your business, in your area, with your services. No commitment. Just so you can see what we mean by built to convert.'\n\nThat mockup is your second-call hook." },
    { h: "🆚  10.4 — BEATING THE COMPETITION", b: "Other agencies (don't trash them, reframe):\n'There are good agencies out there. Real question is what you're getting for $10K. A six-month timeline, a 12-page deck, and a designer's portfolio piece? Or a site that books jobs in 14 days backed by a guarantee? Different products. Choose what you actually need.'\n\nWix / Squarespace / DIY:\n'You're comparing a $20/mo template to a custom asset engineered for revenue. Different categories.'\n\nServiceTitan / Jobber marketplace listings:\n'Those marketplace listings are useful — they're a lead source. But they don't replace your website. When a homeowner gets your name from ServiceTitan, the very next thing they do is Google you. If your site doesn't close the trust gap, the marketplace lead goes nowhere. We build the site they land on after they hear your name.'\n\nThe nephew:\n'He can build a site. We build an asset that books jobs and we back it with a guarantee. Different conversation.'" },
    { h: "🎤  10.5 — THE FOUNDER STORY AS CLOSING TOOL", b: "When a prospect needs the 'why should I trust Redline' reassurance:\n\n'Quick context — Alex, the founder, came from finance, not design. Studied how businesses generate, protect, and grow revenue. The pattern he kept seeing: great contractors losing jobs every day to better websites. $500K+ businesses running off sites that looked like Craigslist ads. He built Redline specifically to fix that. Every site runs one filter: does it convert, rank, and drive booked jobs? If not, it doesn't ship.'\n\nUse sparingly. Only when the trust question is on the table." },
  ]},

  "m11": { t: "Module 11 — Post-Close, Handoff & Payment", st: "The deal isn't done until the project starts clean.", s: [
    { h: "✍️  11.1 — THE VERBAL YES → CONTRACT PIPELINE", b: "The moment a prospect says yes, you take three actions in this order, on the call if possible:\n\n1️⃣ Send the PandaDoc contract — generated from the template with tier and add-ons filled in. They sign on phone or laptop, takes 2 minutes.\n2️⃣ Send the Stripe payment link — auto-generated from the contract amount. They pay on the spot.\n3️⃣ Calendar the kickoff call — 24–72 hours out. Internal handoff team attends.\n\nIf they can't do all three on the call, get at least the contract signed. Payment by EOD same day. Kickoff scheduled within 24 hours." },
    { h: "💳  11.2 — PAYMENT COLLECTION", b: "Default: 100% upfront, paid by Stripe link.\n\nAuthorized exceptions (require Alex approval in writing):\n→ 50/50 (50% on signing, 50% at launch)\n→ Custom payment plans for Elite or Multi-location\n\nNever accept payment by:\n→ Personal Venmo / Zelle / cash app\n→ Check by mail (unless Alex specifically approves for a verified business)\n→ 'I'll send it next week' without a date on the calendar\n\nPayment hits before kickoff. No exceptions." },
    { h: "🤝  11.3 — THE INTERNAL HANDOFF", b: "The moment payment clears:\n\n1️⃣ Create a client Slack channel named client-[businessname]\n2️⃣ Post the handoff brief in the channel:\n→ Business name\n→ Owner contact (phone + email)\n→ Tier purchased + Maintain tier\n→ Contract signed (link)\n→ Payment confirmation (Stripe link)\n→ Kickoff call date/time\n→ Notes from sales calls (key concerns, must-haves, expectations set)\n3️⃣ Tag the delivery team for kickoff prep\n4️⃣ CC Alex if Elite or Multi-location" },
    { h: "📧  11.4 — THE KICKOFF CONFIRMATION EMAIL", b: "Send within 30 minutes of payment clearing. Template:\n\nSubject: Welcome to Redline — your kickoff is [date]\n\n'[Name],\n\nWelcome to Redline. Payment confirmed, contract signed, you're officially in build.\n\nKickoff call: [date/time] — calendar invite coming separately\nSite live target: [date based on tier turnaround]\n\nBefore kickoff, you'll get a short intake form to fill out (your logo if you have one, photos of your work, service areas, key services). Takes 15 minutes.\n\nIf you need anything before then, reply to this email or text me at [phone].\n\n[Rep name]\nRedline'" },
    { h: "🕐  11.5 — THE FIRST 48 HOURS POST-CLOSE", b: "Buyer's remorse usually hits within 48 hours. Pre-empt it:\n\n→ Send the welcome email within 30 min\n→ Personal text the next morning: 'Hey [name], excited to get this rolling. Anything come up overnight you want to flag before kickoff?'\n→ Don't go silent. Silence = doubt = refund request." },
    { h: "🚨  11.6 — WHEN THINGS GO SIDEWAYS", b: "If a client requests a refund or pushes back hard before kickoff:\n\n1️⃣ Don't argue. Don't promise anything. Listen.\n2️⃣ Ping Alex immediately in Slack with full context.\n3️⃣ Hold the line on payment — refunds are Alex's call, not yours.\n\nThe standard refund policy is on the website. Read it. Know it cold." },
  ]},

  "m12": { t: "Module 12 — Compensation, Growth & Pipeline", st: "How you get paid. How you grow. How you stay organized.", s: [
    { h: "💰  12.1 — THE COMPENSATION STRUCTURE", b: "You are placed in a bracket every month based on revenue collected. You move up or down at month-end.\n\n→ TRIAL — first month only — 25% commission only\n→ BRONZE — $1.5K–$5K — 30% commission only — $450–$1,500/mo\n→ SILVER — $5K–$12K — 33% commission only — $1,650–$3,960/mo\n→ GOLD — $12K–$25K — $15/hr + 33% commission — $6,560–$10,850/mo\n→ PLATINUM — $25K–$40K — $20/hr + 36% commission — $12,460–$17,860/mo\n→ DIAMOND — $40K+ — Negotiated salary + 38–40% commission — $20K+/mo\n\nKey rules:\n→ Hourly only kicks in the month AFTER you qualify for Gold or above. Can't qualify and collect hourly in the same month.\n→ 3 consecutive months in Bronze = we part ways. Bronze is a launchpad, not a destination.\n→ Maintain attach pays a 1× signing bonus equal to one month's fee. No residual. Example: $2,497 Build + $297/mo Pro Maintain = $824 commission + $297 attach bonus = $1,121." },
    { h: "📈  12.2 — THE GROWTH LADDER", b: "→ Trial → Bronze: Show up. Run the script. Close 1 deal in your first month.\n→ Bronze → Silver: Close $5K+ in collected revenue in a month. Most reps hit this in month 2 or 3.\n→ Silver → Gold: Close $12K+ in a month. The jump from Silver to Gold doubles take-home. This is the dream-tier jump.\n→ Gold → Platinum: Close $25K+ consistently. Multi-deal months become the norm.\n→ Platinum → Diamond: Close $40K+ consistently. At this point you're in negotiated comp territory and effectively running a book." },
    { h: "📊  12.3 — THE SHEETS CRM SOP", b: "The pipeline lives in Google Sheets. Required fields on every row:\n\n→ Lead name + business\n→ Vertical\n→ Date assigned\n→ First-touch time (auto-tracked)\n→ Disposition (Working / Booked / Lost / Closed)\n→ Tier recommended\n→ Notes (one-line summary of last contact)\n→ Next action + date\n\nHygiene standards:\n→ Updated end-of-day, every day. No exceptions.\n→ A lead with no next action date for 7+ days is dead. Mark Lost.\n→ A closed deal is moved to the Closed tab same day payment clears." },
    { h: "💬  12.4 — SLACK HYGIENE", b: "→ Check Slack first thing in the morning and before EOD.\n→ Respond to direct mentions within 1 business hour.\n→ Use threads, not channel spam.\n→ Don't @channel unless it's actually urgent." },
    { h: "🎯  12.5 — KPIS YOU ARE MEASURED ON", b: "Tracked weekly:\n\n→ Speed-to-lead — first-touch under 5 min during business hours\n→ Show rate — % of booked calls that happen (target: 67%)\n→ Book rate — % of first conversations that book a sales call (target: 30%)\n→ Close rate — % of held sales calls that close (target: 25%)\n→ Maintain attach rate — % of Build closes with Maintain attached (target: 100%)\n→ Revenue collected — drives bracket placement\n\nWeekly numbers reviewed every Friday with your coach. Numbers tell the story." },
    { h: "📅  12.6 — PERFORMANCE REVIEWS & COACHING", b: "→ Weekly: 15-min Friday review with your coach. KPIs, deals in flight, blockers.\n→ Monthly: Bracket review with Alex. Where you landed, what next month looks like, structural feedback.\n→ Quarterly: Full performance review. Skill gaps, growth plan, comp adjustments if warranted.\n\nThe coaching cadence is real. Show up to it." },
  ]},

  "tech-bc": { t: "Technical Bootcamp", st: "Deep-dive crash course. Know what you sell inside and out.", s: [
    { h: "🔧  WHAT THIS BOOTCAMP IS", b: "The Technical Bootcamp sits ON TOP of the core curriculum. It's an extension, not a replacement. Once you've passed Modules 1–12, this is where you go deep on the technical fundamentals so you can answer any 'how does it work?' question from a sophisticated prospect.\n\nThis bootcamp is optional but recommended for any rep targeting Gold+ tier." },
    { h: "🌐  WEB FUNDAMENTALS", b: "→ How a website actually loads (DNS → server → render)\n→ Why speed matters: under 2 seconds is the conversion threshold\n→ Mobile-first design: 70%+ of contractor traffic is on phones\n→ HTTPS and SSL: trust signal + Google ranking factor\n→ Why we build custom vs. on Wix/Squarespace templates" },
    { h: "📈  SEO BASICS", b: "→ Local SEO vs. national SEO: contractors only need local\n→ Google Business Profile: free, high-impact, often neglected\n→ Service area pages: how we rank for every town a contractor serves\n→ Backlinks vs. on-page: we focus on on-page; backlinks are a slow game\n→ AEO (Answer Engine Optimization): how AI search results are reshaping discovery" },
    { h: "🎯  CRO (CONVERSION RATE OPTIMIZATION)", b: "Industry average conversion rate: 2–3%. Redline average: 8.7%. The gap comes from:\n\n→ Above-the-fold clarity: phone number + CTA visible without scrolling\n→ Trust signals: reviews, certifications, real photos\n→ Form design: minimal fields, single primary CTA per page\n→ Mobile tap targets: thumb-sized buttons, no pinch-zoom required\n→ Speed: every 1 second of load time loses ~10% of leads" },
    { h: "🤖  AI & THE CONTRACTOR SITE", b: "AI is changing the contractor website game:\n→ AI chat agents that book jobs at 2 AM\n→ Auto-generated service area content (we still hand-tune)\n→ AI-powered conversion analysis (heatmaps, session replays)\n→ AEO content tuned for ChatGPT/Perplexity/Google AI answers\n\nWe deploy these where they help. We don't slap AI on a site for marketing copy purposes." },
  ]},

  "sales-bc": { t: "Sales Bootcamp", st: "The complete system that closes deals.", s: [
    { h: "🎯  WHAT THIS BOOTCAMP IS", b: "The Sales Bootcamp sits ON TOP of Modules 5–9. It's the deep-dive sales psychology and tactical playbook for reps who want to push close rate from 25% to 35%+.\n\nOptional but recommended for any rep targeting Platinum+ tier." },
    { h: "💡  THE VALUE EQUATION", b: "Why customers buy:\n\nValue = (Dream Outcome × Likelihood of Achievement) ÷ (Time Delay × Effort & Sacrifice)\n\n→ Dream outcome: 'phone ringing with qualified leads'\n→ Likelihood: 47% lead lift average + guarantee\n→ Time delay: 10–14 day turnaround (Pro)\n→ Effort: 15-minute intake form, then we run it\n\nMaximize the numerator. Minimize the denominator. Sale closes." },
    { h: "❓  SPIN SELLING", b: "Situation → Problem → Implication → Need-Payoff. Built into our 7-question discovery framework.\n\n→ Situation questions: 'How many leads/month?' (context)\n→ Problem questions: 'How many of those convert?' (surface the pain)\n→ Implication questions: 'What's that cost you per month?' (amplify the pain)\n→ Need-Payoff questions: 'What would solving that look like?' (let them sell themselves)" },
    { h: "🧠  OBJECTION PSYCHOLOGY", b: "All objections fall into 5 categories:\n\n→ Price ('too expensive') → Reframe to ROI\n→ Time ('not the right time') → Reframe to opportunity cost\n→ Trust ('how do I know it'll work?') → Deploy the guarantee\n→ Authority ('need to talk to my partner') → Book the joint call\n→ Comparison ('we use Wix') → Reframe to category difference\n\nMemorize the categories. The response always starts with a question that surfaces the real concern." },
    { h: "📅  THE DAILY SYSTEM", b: "Your day:\n→ 8:00 AM — Slack check, CRM review, top 3 priorities\n→ 8:30 AM — First-touch attempts on new leads\n→ 9:30 AM — Follow-up calls on Day 2/3/4 leads\n→ 11:00 AM — Sales calls (peak focus time)\n→ 1:00 PM — Lunch, mental reset\n→ 2:00 PM — More sales calls / discovery\n→ 4:00 PM — Admin: CRM updates, post-close handoffs, contract sends\n→ 5:30 PM — EOD CRM update, next-day prep\n→ 6:00 PM — Done.\n\nDeviate when needed. Default to the system." },
  ]},

  "call-script": { t: "Call Script & Objection Playbook", st: "Handle every objection. Control every call. Close the deal.", s: [
    { h: "📞  THE FIRST-TOUCH SCRIPT", b: "Opener (90 seconds max):\n\n'Hey [First Name], this is [Rep Name] with Redline — we build websites for [vertical] contractors. Got 60 seconds for the real reason I'm calling?'\n\nIf yes:\n'Took a quick look at your site. [One specific observation]. We're a Boston-based firm that builds conversion-focused sites for [vertical] operators in your range — the difference is we don't just build pretty sites, we build them to book jobs, and we back them with a guarantee that says they pay for themselves or we keep working free. Worth a 15-minute call to see if it's a fit?'\n\nIf they push back:\n'Totally fair — when's a 15-minute window in the next 48 hours? I'll work around your schedule.'" },
    { h: "📋  THE SALES CALL STRUCTURE", b: "Open → Discover → Diagnose → Pitch → Price → Close → Next Step\n\nTime budget on a 30-min call:\n→ Open: 3 min\n→ Discover: 12 min (7-question framework)\n→ Diagnose: 3 min (summarize back)\n→ Pitch: 5 min (tier + 3 deliverables + guarantee + timeline)\n→ Price: 2 min (anchor + state + silence)\n→ Close + objections: 4 min (assumptive close)\n→ Next-step lock: 1 min" },
    { h: "🛡️  TOP OBJECTIONS — QUICK REFERENCE", b: "→ 'Too expensive' → 'Compared to what?' Then anchor against $8–15K agencies.\n→ 'Need to think' → 'Just so I know what you're thinking through: price, timing, or scope?'\n→ 'Send proposal' → 'If proposal had everything we discussed, would you move forward this week?' Pitch contract instead.\n→ 'Nephew builds sites' → 'How many for contractors in your range? What kind of lead results?'\n→ 'Already have a site' → 'Walk me through what it's doing for you in terms of booked jobs.'\n→ 'Need partner approval' → Book the joint call before this call ends.\n→ 'Not right time' → Reframe to opportunity cost of waiting.\n→ 'What's your guarantee?' → THE GIFT. Deploy the full guarantee.\n→ 'Why not Wix?' → Different category. $20/mo template vs. custom asset.\n→ 'What's the ROI?' → Math. One job pays for itself. 47% lift average." },
    { h: "💵  PRICING SCRIPT", b: "'Most agencies in our space charge $8,000 to $15,000 for the same scope of work. We come in 50–70% lower because we specialize in [vertical] and run a tight operation. For the full Pro Build, you're at $2,497, one-time, paid upfront.'\n\n[SILENCE. WHOEVER SPEAKS FIRST LOSES.]" },
    { h: "🤝  CLOSE SCRIPT", b: "'Sounds like a fit. Here's what happens next: I'm going to send you a contract through PandaDoc — takes 2 minutes to review and sign. Once that's signed, the payment link goes through Stripe, and the moment that clears we kick off. We'd have you live by [date]. Cool?'\n\nMaintain attach:\n'That $2,497 gets you the site built and launched. To keep it running — hosting, security, performance monitoring — that's our Maintain plan at $197/mo. Most clients cover that cost with one lead they'd have otherwise lost. Standard or Pro — which makes more sense for you?'" },
  ]},

  "comp-plan": { t: "Sales Compensation Structure", st: "Performance-tiered · Re-evaluated monthly · Based on collected revenue", s: [
    { h: "💎  DIAMOND — TIER 5", b: "Monthly revenue: $40K+ collected\n\nPay: Negotiated salary + 38–40% commission\n\nTake-home: $20K+ / mo · $240K–$420K+ / yr" },
    { h: "🟣  PLATINUM — TIER 4", b: "Monthly revenue: $25–40K collected\n\nPay: $20 / hr + 36% commission\n\nTake-home: $12,460–$17,860 / mo · $150K–$214K / yr" },
    { h: "🟡  GOLD — TIER 3", b: "Monthly revenue: $12–25K collected\n\nPay: $15 / hr + 33% commission\n\nTake-home: $6,560–$10,850 / mo · $79K–$130K / yr" },
    { h: "⚪  SILVER — TIER 2", b: "Monthly revenue: $5–12K collected\n\nPay: 33% commission only\n\nTake-home: $1,650–$3,960 / mo · $20K–$48K / yr" },
    { h: "🟤  BRONZE — TIER 1", b: "Monthly revenue: $1.5–5K collected\n\nPay: 30% commission only\n\nTake-home: $450–$1,500 / mo · $5K–$18K / yr" },
    { h: "🆕  TRIAL — FIRST MONTH ONLY", b: "Pay: 25% commission only — placed into a tier at month-end\n\nTake-home: Varies based on performance" },
    { h: "📋  RULES", b: "1. Bracket placement is based on collected revenue (cash in bank), not signed contracts.\n\n2. Hourly tiers (Gold and above) are paid in arrears — rep qualifies in month X, hourly starts month X+1.\n\n3. Reps are reassessed monthly. 2 consecutive months below the current bracket triggers demotion.\n\n4. 3 consecutive months in Bronze = parted ways.\n\n5. Maintain MRR attach: rep gets a one-time bonus equal to 1× the monthly fee at signing (e.g., $297 / mo Pro Maintain = $297 bonus). No residual paid month-over-month.\n\n6. Maintain MRR counts toward bracket placement only the signing month — not month-over-month.\n\n7. Hourly assumes 40 hrs / wk (~173 hrs / mo)." },
  ]},

  "onboard-email": { t: "Client Onboarding Email Template", st: "The email your client receives after signing. Make it count.", s: [
    { h: "📧  THE WELCOME EMAIL", b: "Send within 30 minutes of payment clearing.\n\nSubject: Welcome to Redline — your kickoff is [date]\n\n'[Name],\n\nWelcome to Redline. Payment confirmed, contract signed, you're officially in build.\n\nKickoff call: [date/time] — calendar invite coming separately\nSite live target: [date based on tier turnaround]\n\nBefore kickoff, you'll get a short intake form to fill out (your logo if you have one, photos of your work, service areas, key services). Takes 15 minutes.\n\nIf you need anything before then, reply to this email or text me at [phone].\n\n[Rep name]\nRedline'" },
    { h: "📱  THE NEXT-DAY TEXT", b: "Send the morning after the close to pre-empt buyer's remorse:\n\n'Hey [name], excited to get this rolling. Anything come up overnight you want to flag before kickoff?'\n\nKeep it conversational. Don't sell. Just stay top of mind." },
    { h: "📋  THE INTAKE FORM PACKET", b: "Sent ~24 hours after payment. The intake collects:\n\n→ Business legal name + DBA\n→ Service area (cities, ZIP codes)\n→ Services offered (top 5 priorities)\n→ Logo / brand assets (if any)\n→ Photos of work (5–15, more is better)\n→ Reviews / testimonials to feature\n→ Phone number for call tracking\n→ Email for form submissions\n→ Hours of operation\n→ Anything not to include\n\n15 minutes to fill out. We chase if not returned within 48 hours." },
  ]},
};

const CATS = [
  { id: "m1", t: "MODULE", n: "MODULE 1", sub: "Onboarding & Culture", d: "Who Redline is and how we operate", ic: "🏢", k: "m1" },
  { id: "m2", t: "MODULE", n: "MODULE 2", sub: "The Contractor Mind", d: "Know the buyer cold", ic: "🧠", k: "m2" },
  { id: "m3", t: "MODULE", n: "MODULE 3", sub: "Two Pillars: Product Mastery", d: "Build + Maintain every tier", ic: "🏗️", k: "m3" },
  { id: "m4", t: "MODULE", n: "MODULE 4", sub: "Positioning & Strategy", d: "Revenue consultants, not designers", ic: "🎯", k: "m4" },
  { id: "m5", t: "MODULE", n: "MODULE 5", sub: "Lead Engagement & First Touch", d: "Speed kills the competition", ic: "⚡", k: "m5" },
  { id: "m6", t: "MODULE", n: "MODULE 6", sub: "Discovery & Diagnosis", d: "Tier follows the pain", ic: "🩺", k: "m6" },
  { id: "m7", t: "MODULE", n: "MODULE 7", sub: "The Sales Call Framework", d: "Control the call from open to close", ic: "📋", k: "m7" },
  { id: "m8", t: "MODULE", n: "MODULE 8", sub: "Value Prop & Messaging", d: "Sell booked jobs, not pixels", ic: "💎", k: "m8" },
  { id: "m9", t: "MODULE", n: "MODULE 9", sub: "Pricing & Objections", d: "Price with confidence", ic: "💵", k: "m9" },
  { id: "m10", t: "MODULE", n: "MODULE 10", sub: "Proof & Competitive Positioning", d: "Deploy the guarantee", ic: "🛡️", k: "m10" },
  { id: "m11", t: "MODULE", n: "MODULE 11", sub: "Post-Close, Handoff & Payment", d: "Clean execution after the yes", ic: "🤝", k: "m11" },
  { id: "m12", t: "MODULE", n: "MODULE 12", sub: "Compensation, Growth & Pipeline", d: "How you get paid and advance", ic: "📈", k: "m12" },
  { id: "d1", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Technical Knowledge", d: "Deep-dive on what you sell", ic: "🔧", k: "tech-bc" },
  { id: "d2", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Sales Crash Course", d: "Value equation, SPIN, daily system", ic: "💪", k: "sales-bc" },
  { id: "d3", t: "REFERENCE", n: "REFERENCE", sub: "Call Script & Objections", d: "Scripts and objection playbook", ic: "📞", k: "call-script" },
  { id: "d4", t: "REFERENCE", n: "REFERENCE", sub: "Compensation Plan", d: "Full commission breakdown", ic: "💰", k: "comp-plan" },
  { id: "d5", t: "REFERENCE", n: "REFERENCE", sub: "Onboarding Email Template", d: "Welcome email + intake form", ic: "📧", k: "onboard-email" },
  { id: "qz1",  t: "QUIZ", n: "QUIZ 1",  sub: "Onboarding & Culture",             d: "Module 1 — 100% to pass",  ic: "🧪", k: "q-m1" },
  { id: "qz2",  t: "QUIZ", n: "QUIZ 2",  sub: "The Contractor Mind",              d: "Module 2 — 100% to pass",  ic: "🧪", k: "q-m2" },
  { id: "qz3",  t: "QUIZ", n: "QUIZ 3",  sub: "Two Pillars: Product Mastery",     d: "Module 3 — 100% to pass",  ic: "🧪", k: "q-m3" },
  { id: "qz4",  t: "QUIZ", n: "QUIZ 4",  sub: "Positioning & Strategy",           d: "Module 4 — 100% to pass",  ic: "🧪", k: "q-m4" },
  { id: "qz5",  t: "QUIZ", n: "QUIZ 5",  sub: "Lead Engagement & First Touch",    d: "Module 5 — 100% to pass",  ic: "🧪", k: "q-m5" },
  { id: "qz6",  t: "QUIZ", n: "QUIZ 6",  sub: "Discovery & Diagnosis",            d: "Module 6 — 100% to pass",  ic: "🧪", k: "q-m6" },
  { id: "qz7",  t: "QUIZ", n: "QUIZ 7",  sub: "The Sales Call Framework",         d: "Module 7 — 100% to pass",  ic: "🧪", k: "q-m7" },
  { id: "qz8",  t: "QUIZ", n: "QUIZ 8",  sub: "Value Prop & Messaging",           d: "Module 8 — 100% to pass",  ic: "🧪", k: "q-m8" },
  { id: "qz9",  t: "QUIZ", n: "QUIZ 9",  sub: "Pricing & Objections",             d: "Module 9 — 100% to pass",  ic: "🧪", k: "q-m9" },
  { id: "qz10", t: "QUIZ", n: "QUIZ 10", sub: "Proof & Competitive Positioning",  d: "Module 10 — 100% to pass", ic: "🧪", k: "q-m10" },
  { id: "qz11", t: "QUIZ", n: "QUIZ 11", sub: "Post-Close & Handoff",             d: "Module 11 — 100% to pass", ic: "🧪", k: "q-m11" },
  { id: "qz12", t: "QUIZ", n: "QUIZ 12", sub: "Compensation, Growth & Pipeline",  d: "Module 12 — 100% to pass", ic: "🧪", k: "q-m12" },
  { id: "qzF",  t: "FINAL", n: "FINAL EXAM", sub: "Redline Sales Academy",       d: "Unlocks at 12/12. One attempt.", ic: "🏆", k: "q-final" },
];

const QUIZZES = {
  "q-m1": { title:"Module 1 Quiz", subtitle:"Onboarding & Culture · 100% to pass", qs: [
    { q:"What does Redline sell?", o:["Logos and brand identity","Two products: Build (one-time website) and Maintain (ongoing hosting/maintenance)","Paid ads management","Social media content"], a:1 },
    { q:"What is the ONE filter every Redline site passes through?", o:["Is the design modern?","Does the client like the colors?","Does it convert, rank, and drive booked jobs?","Is it cheaper than the competition?"], a:2 },
    { q:"What is the speed-to-lead standard during business hours?", o:["Within 1 hour","Within 30 minutes","Under 5 minutes","Same business day"], a:2 },
    { q:"What is the commission rate during the first (Trial) month?", o:["20%","25%","30%","33%"], a:1 },
    { q:"Which of these is NOT a service Redline offers?", o:["Custom website Build","Ongoing Maintain plan","Paid ads management","Site hosting"], a:2 },
    { q:"What tool do contracts go out through?", o:["Email attachment","DocuSign","PandaDoc","Google Docs"], a:2 },
    { q:"What is the rep expectation for CRM updates?", o:["Once a week","End of day, every day","Whenever you have time","Only after a closed deal"], a:1 },
    { q:"What does Alex Rogul's background bring to Redline?", o:["Graphic design and branding","Finance — the discipline of revenue and business operations","Software engineering","Marketing agency experience"], a:1 },
  ]},

  "q-m2": { title:"Module 2 Quiz", subtitle:"The Contractor Mind · 100% to pass", qs: [
    { q:"Roughly how large is the US home services market?", o:["$50–100B / year","$200–300B / year","$650–750B / year","Over $2 trillion / year"], a:2 },
    { q:"How long do solar leads typically stay 'warm' before going cold?", o:["48 hours","1 week","30 days","No time limit"], a:0 },
    { q:"Which of these phrases should reps NEVER use with a contractor?", o:["Booked jobs","User experience / UX","The phone ringing","Estimates"], a:1 },
    { q:"What does HVAC demand look like in spring and fall?", o:["Peak season — maximum demand","Slow / maintenance season","Same as winter","Same as summer"], a:1 },
    { q:"What's the most common buying trigger event for a contractor?", o:["Reading an agency blog post","Slow season / lost jobs to a competitor","Hiring a marketing manager","Attending a trade show"], a:1 },
    { q:"What's the typical revenue range of Redline's target buyer?", o:["Under $100K / yr","$100K–$300K / yr","$360K–$3M / yr","$10M+ / yr"], a:2 },
    { q:"Which language should you match on every call?", o:["The agency's","The buyer's — their internal language","Your own preferred language","Industry-standard marketing-speak"], a:1 },
    { q:"What percentage of a typical contractor's traffic comes from mobile?", o:["About 20%","About 40%","About 70%+","About 90%+"], a:2 },
  ]},

  "q-m3": { title:"Module 3 Quiz", subtitle:"Two Pillars: Product Mastery · 100% to pass", qs: [
    { q:"What is the price of a Starter Build?", o:["$997","$1,497","$2,497","$4,497"], a:1 },
    { q:"What is the turnaround time for a Pro Build?", o:["3–5 days","7–10 days","10–14 days","14–21 days"], a:2 },
    { q:"What is the monthly price of the Standard Maintain plan?", o:["$49","$99","$197","$297"], a:2 },
    { q:"Which Maintain tier is the DEFAULT attach for every Build?", o:["Hosting Only","Standard","Pro","Whichever the client picks first"], a:1 },
    { q:"What is the price of a Pro Maintain plan per month?", o:["$197","$249","$297","$399"], a:2 },
    { q:"What is the recommended default Maintain tier for an Elite Build?", o:["Hosting Only","Standard","Pro","No Maintain attached"], a:2 },
    { q:"Which of these does Redline NOT do?", o:["Custom website builds","Hosting and maintenance","Paid ads management (Google Ads / Meta)","Local SEO baked into the build"], a:2 },
    { q:"What is the price of an Elite Build?", o:["$2,497","$3,497","$4,497","$6,497"], a:2 },
    { q:"What is the Redline guarantee?", o:["30-day money-back refund","If the site doesn't pay for itself in leads, we keep working free until it does","One free redesign within 6 months","Full refund if not satisfied"], a:1 },
    { q:"What is the answer when a prospect asks 'what platform do you build on'?", o:["WordPress","Webflow","Wix","'We build on a custom stack engineered for performance and conversion'"], a:3 },
  ]},

  "q-m4": { title:"Module 4 Quiz", subtitle:"Positioning & Strategy · 100% to pass", qs: [
    { q:"What's the buyer-language reframe of 'beautiful website'?", o:["Modern site","Sleek design","Site that books jobs","Custom-built website"], a:2 },
    { q:"What's the 'Liability Frame' opening?", o:["'Your website is fine but could be better'","'Your website is a liability — costing you money every day. We turn it into an asset.'","'Most contractors have outdated sites'","'You should consider an upgrade'"], a:1 },
    { q:"What is the Authority Stance?", o:["Apologize for the price and ask for feedback","You are qualifying them — they aren't qualifying you. Never beg or chase.","Defer to whatever the prospect wants","Lead with discounts to close faster"], a:1 },
    { q:"What's the 'If We're a Fit' frame's main purpose?", o:["To make the prospect comfortable","To put you in the driver's seat and frame the call as mutual evaluation","To leave space for negotiation","To soften your pitch"], a:1 },
    { q:"How should you respond to 'I've worked with agencies before, it was a disaster'?", o:["Apologize for the industry","Explain why your agency is different","'I get it. That's why we exist. We're not an agency.'","Offer a discount as compensation"], a:2 },
    { q:"What's the answer when a prospect asks 'why not just use Wix?'", o:["Trash Wix as a bad platform","Match Wix's price","'Different category. Wix is a template. We build a custom asset backed by a guarantee.'","Offer to migrate their Wix site"], a:2 },
    { q:"How do you handle 'I'm not sure'?", o:["Discount the price","'Totally fair. Do you want more booked jobs or not?'","Send them more information","Schedule a follow-up call later"], a:1 },
  ]},

  "q-m5": { title:"Module 5 Quiz", subtitle:"Lead Engagement & First Touch · 100% to pass", qs: [
    { q:"What is the speed-to-lead standard during business hours?", o:["Within 30 minutes","Within 1 hour","Under 5 minutes","Same business day"], a:2 },
    { q:"What is the first channel of contact on every lead?", o:["Email","Text","Phone call","LinkedIn message"], a:2 },
    { q:"How long should a voicemail be?", o:["5 seconds","15 seconds","30 seconds","1 minute"], a:1 },
    { q:"How many attempts does a lead get before moving to nurture?", o:["3","5","10","Unlimited"], a:1 },
    { q:"What is the goal of the FIRST call?", o:["Close the deal on the call","Send a proposal","Book a sales call","Get them to visit the website"], a:2 },
    { q:"What is the prep time before dialing a new lead?", o:["No prep — just call","About 5 minutes","30 minutes","An hour"], a:1 },
    { q:"Which is a valid disqualifier?", o:["They mention they shopped around","Their site is on Squarespace","They're a national franchise not in our ICP","They asked for the price upfront"], a:2 },
    { q:"What is the 5×5 follow-up cadence?", o:["5 calls in 5 days, then nurture","5 calls per week, every week, forever","5 emails per day for 5 days","5 attempts per channel"], a:0 },
    { q:"What should be in every first-touch voicemail?", o:["The full pitch","Pricing","A callback hook — no pitch, no price","A discount offer"], a:2 },
  ]},

  "q-m6": { title:"Module 6 Quiz", subtitle:"Discovery & Diagnosis · 100% to pass", qs: [
    { q:"What is the 'diagnostic mindset'?", o:["Quote the lowest-tier price first","Ask questions and examine before prescribing — like a doctor","Pitch every feature, let them choose","Always recommend Elite"], a:1 },
    { q:"How many questions are in the core discovery framework?", o:["3","5","7","10"], a:2 },
    { q:"What is the 'money question' in discovery?", o:["'What's your budget?'","'When do you want to start?'","'What's your current website doing for you in terms of booked jobs?'","'Have you worked with an agency before?'"], a:2 },
    { q:"If a prospect says 'I just need a quick redesign,' what should you do?", o:["Send them the Starter package","Reframe: 'If we just made it look better and the phone still didn't ring, would you be happy?'","Politely end the call","Match their redesign request"], a:1 },
    { q:"For a multi-location, $150K+/mo revenue operator, what tier do you recommend?", o:["Starter + Hosting Only","Pro + Standard","Elite + Pro Maintain","Custom only"], a:2 },
    { q:"What is a clear disqualifier mid-discovery?", o:["'I want to grow next year'","'My business partner / wife needs to approve' — and you can't get them on the call","'I get most leads from referrals'","'I haven't updated my site in a while'"], a:1 },
    { q:"What do you do if a prospect says their biggest bottleneck is 'capacity, not leads'?", o:["Push harder on the Build pitch","Flag that Redline may not be the highest-leverage move and continue diagnostic","Offer them a discount","Recommend Elite tier"], a:1 },
  ]},

  "q-m7": { title:"Module 7 Quiz", subtitle:"The Sales Call Framework · 100% to pass", qs: [
    { q:"What is the correct order of the Redline call structure?", o:["Pitch → Discover → Price → Close","Open → Discover → Diagnose → Pitch → Price → Close → Next Step","Open → Pitch → Discover → Price → Close","Discover → Diagnose → Close"], a:1 },
    { q:"On a 30-minute call, how much time should be spent on Discovery?", o:["3 minutes","6 minutes","12 minutes","20 minutes"], a:2 },
    { q:"What is the Opener supposed to get from the prospect?", o:["A signed contract","A verbal yes to 'sound fair?'","A price commitment","A meeting with their partner"], a:1 },
    { q:"What should you do immediately after stating price?", o:["List all the included features","Shut up. Silence is the close.","Offer a discount","Send the proposal"], a:1 },
    { q:"What is the correct phrasing of the Maintain attach?", o:["'Do you want maintenance with that?'","'Standard or Pro Maintain — which makes more sense for you?'","'We can add maintenance later if you want'","'Maintenance is optional'"], a:1 },
    { q:"What are the three valid call outcomes?", o:["Closed deal, calendared next step, or closed loop (clear no)","Send proposal, follow up, or close","Verbal yes, soft yes, or no","Discount offered, price held, or walk away"], a:0 },
    { q:"What is 'I'll think about it and get back to you' considered?", o:["A valid outcome","NOT a valid outcome — you need a calendared next step or it's a no","A polite yes","A buying signal"], a:1 },
    { q:"What is the close style Redline uses?", o:["Hard close — 'sign now or else'","Consultative — leave it up to them","Assumptive — 'here's what happens next'","Discount close — drop the price to get the yes"], a:2 },
  ]},

  "q-m8": { title:"Module 8 Quiz", subtitle:"Value Prop & Messaging · 100% to pass", qs: [
    { q:"What's the buyer-outcome translation of 'mobile-first build'?", o:["'Responsive design'","'Works on the phones your customers actually use — 70% of your visitors'","'Cross-platform compatibility'","'Modern web standards'"], a:1 },
    { q:"What is the 'So What?' test?", o:["Ask the prospect 'so what' to provoke a response","Before every line, ask yourself 'so what?' — if you can't answer in buyer language, kill the line","A pricing question","A closing technique"], a:1 },
    { q:"Which of these is a BANNED phrase?", o:["Booked jobs","The phone ringing","Engagement / Brand identity / Cutting-edge","Conversion-optimized (with buyer-language follow-up)"], a:2 },
    { q:"What's the ROI framing line?", o:["'It's the cheapest in the industry'","'Math: if this site brings ONE new job in 12 months, it pays for itself. Average 47% lead lift.'","'You'll get more impressions'","'It's a great long-term investment'"], a:1 },
    { q:"What's the vertical-specific HVAC pitch hook?", o:["'AC dies at 9 PM in July — the first site that loads fast gets the call.'","'You need a modern website'","'Let's improve your SEO'","'Better photography matters'"], a:0 },
    { q:"What's the Solar-specific lead urgency point?", o:["Solar leads stay warm for months","Solar leads go cold in 48 hours","Solar is a slow-cycle business","Solar leads don't need fast response"], a:1 },
    { q:"What should you do if you catch yourself using a banned phrase?", o:["Ignore it","Course-correct out loud: 'Sorry, what I mean is — it'll book you more jobs.'","Apologize at length","Restart the call"], a:1 },
  ]},

  "q-m9": { title:"Module 9 Quiz", subtitle:"Pricing & Objections · 100% to pass", qs: [
    { q:"What is the THREE-rule structure for presenting price?", o:["Apologize, justify, discount","State the price, shut up, anchor against the alternative","Soften, hedge, ask if they're comfortable","Drop, retreat, re-pitch"], a:1 },
    { q:"What is the default payment structure?", o:["50/50 (deposit + final)","Monthly installments","100% upfront","Pay-on-launch"], a:2 },
    { q:"How should you respond to 'It's too expensive'?", o:["Drop the price","'Compared to what — another agency, or just more than you planned?' Then anchor against $8–15K agencies.","Apologize for the pricing","Switch to Starter tier"], a:1 },
    { q:"What is the response structure for 'I need to think about it'?", o:["Accept it and follow up next week","'Of course — just so I know what you're thinking through: is it the price, the timing, or the scope?'","Send a discount offer","Send a long email recap"], a:1 },
    { q:"How do you handle 'My nephew builds websites'?", o:["Match the nephew's expected price","'How many sites has he built for contractors in your range, and what lead results has he gotten them?'","Walk away politely","Apologize for the awkwardness"], a:1 },
    { q:"What is the 'walk-away power' principle?", o:["Always be willing to negotiate","Genuine willingness to walk gives you leverage — built by having pipeline","Pretend you don't need the deal","Threaten to walk to extract a yes"], a:1 },
    { q:"Which is a flex you CAN authorize on your own?", o:["A Build price discount","Throwing in Maintain first month free if it gets the deal across the line","Adding extra pages beyond the tier","Custom payment plans"], a:1 },
    { q:"What's the response to 'Send me a proposal'?", o:["Send the proposal","'If it had everything we discussed at the price we discussed, would you move forward this week?' Then pitch sending the contract instead.","Politely decline","Drop the price first"], a:1 },
    { q:"What's the difference between rebuttal and reframe?", o:["Rebuttal asks questions; reframe makes statements","Rebuttal argues back; reframe changes the question","They're the same thing","Reframe is more aggressive"], a:1 },
  ]},

  "q-m10": { title:"Module 10 Quiz", subtitle:"Proof & Competitive Positioning · 100% to pass", qs: [
    { q:"What is the Redline Guarantee?", o:["30-day money back","If the site doesn't generate enough leads to pay for itself, we keep working free — no time limits, no fine print","Free first month of Maintain","Performance bonuses tied to lead volume"], a:1 },
    { q:"What is the average lead lift on a Redline site?", o:["10%","25%","47%","100%"], a:2 },
    { q:"What is the industry-average conversion rate for contractor sites?", o:["2–3%","5–6%","8–10%","15%+"], a:0 },
    { q:"What is Redline's average conversion rate?", o:["3.2%","5.4%","8.7%","12.1%"], a:2 },
    { q:"When should you deploy the Guarantee on a sales call?", o:["In the opener","Before discovery","After price is on the table OR after any 'risk' objection","After the close"], a:2 },
    { q:"When should you NOT use a mockup?", o:["After a strong discovery call","Before a follow-up call","Before discovery — never lead with a mockup","On a real-time screen share with a wavering prospect"], a:2 },
    { q:"What % cost savings does Redline offer vs. competing agencies?", o:["10–20%","30–40%","About 73%","More than 90%"], a:2 },
    { q:"How should you talk about other agencies on a call?", o:["Trash them","Reframe: 'There are good agencies. Real question is what you're getting for $10K. Six-month timeline and a deck, or a site that books jobs in 14 days backed by a guarantee?'","Pretend they don't exist","Match their pricing"], a:1 },
  ]},

  "q-m11": { title:"Module 11 Quiz", subtitle:"Post-Close & Handoff · 100% to pass", qs: [
    { q:"What are the THREE actions on a verbal yes (in order)?", o:["Email confirmation, ship the site, send invoice","Send PandaDoc contract, send Stripe payment link, calendar the kickoff call","Send Slack message, schedule a call, send a proposal","Mark the CRM, email the client, get coffee"], a:1 },
    { q:"What is the default payment method?", o:["Personal Venmo","Check by mail","Stripe payment link","Wire transfer"], a:2 },
    { q:"Which payment methods are NEVER accepted?", o:["Stripe link","Personal Venmo / Zelle / cash app","Authorized 50/50 splits","Pre-approved check (with Alex sign-off)"], a:1 },
    { q:"How soon should the welcome email be sent after payment clears?", o:["Within 30 minutes","Within 24 hours","Within 1 week","After the kickoff call"], a:0 },
    { q:"What is the goal of the next-day text to the client?", o:["Pre-empt buyer's remorse — keep them engaged, surface any concerns early","Upsell them to Pro Maintain","Get a referral","Request a review"], a:0 },
    { q:"What do you do if a client requests a refund before kickoff?", o:["Refund immediately to avoid drama","Argue with them","Don't argue. Don't promise anything. Ping Alex immediately. Refunds are Alex's call.","Offer a discount to keep the deal"], a:2 },
    { q:"What is the kickoff call scheduling window?", o:["Same day","24–72 hours after payment clears","2 weeks","Within 24 hours of contract signing only"], a:1 },
  ]},

  "q-m12": { title:"Module 12 Quiz", subtitle:"Compensation, Growth & Pipeline · 100% to pass", qs: [
    { q:"What is the Trial-month commission rate?", o:["20%","25%","30%","33%"], a:1 },
    { q:"What is the Silver-tier (Tier 2) commission structure?", o:["25% commission only","30% commission only","33% commission only","$15/hr + 33% commission"], a:2 },
    { q:"What is the Gold-tier (Tier 3) pay structure?", o:["33% commission only","$15/hr + 33% commission","$20/hr + 36% commission","Negotiated salary + 40%"], a:1 },
    { q:"What does the Maintain attach pay you on signing?", o:["Nothing — it's recurring revenue for Redline","A 1× bonus equal to one month's Maintain fee","Recurring monthly residual","A percentage of Maintain MRR forever"], a:1 },
    { q:"What happens after 3 consecutive months in Bronze?", o:["You're moved to Silver automatically","You get a raise","Redline parts ways with you","You stay in Bronze forever"], a:2 },
    { q:"When does the hourly pay (Gold+) kick in?", o:["The same month you qualify","The month AFTER you qualify (paid in arrears)","After 90 days at the tier","Never — it's commission only"], a:1 },
    { q:"What's the target close rate KPI?", o:["10%","15%","25%","50%"], a:2 },
    { q:"What's the target Maintain attach rate KPI?", o:["50%","75%","90%","100%"], a:3 },
    { q:"How often is the CRM updated?", o:["End of every day, no exceptions","Once a week","Whenever convenient","Only after deals close"], a:0 },
    { q:"What's the Speed-to-Lead KPI standard?", o:["Within 1 hour","Within 30 minutes","Under 5 minutes during business hours","Same business day"], a:2 },
  ]},

  "q-final": { title:"Final Exam — Redline Sales Academy", subtitle:"All 12 modules · ONE attempt · Locked permanently after submission", qs: [
    { q:"What is the ONE filter every Redline site must pass?", o:["Modern visual design","Does it convert, rank, and drive booked jobs?","Most pages per dollar","Compatible with WordPress"], a:1 },
    { q:"Which two products does Redline sell?", o:["Build (one-time) and Maintain (recurring)","SEO and content marketing","Logo design and websites","Ads and email marketing"], a:0 },
    { q:"What is the speed-to-lead standard during business hours?", o:["1 hour","30 minutes","Under 5 minutes","Same day"], a:2 },
    { q:"What is the price of a Pro Build?", o:["$997","$1,497","$2,497","$4,497"], a:2 },
    { q:"What is the price of an Elite Build?", o:["$2,497","$3,497","$4,497","$6,497"], a:2 },
    { q:"What is the monthly price of Standard Maintain?", o:["$49","$99","$197","$297"], a:2 },
    { q:"Which Maintain plan is the DEFAULT attach for every Build?", o:["Hosting Only","Standard","Pro","No default — depends on client"], a:1 },
    { q:"What is the Redline Guarantee?", o:["30-day money back","If the site doesn't pay for itself in leads, we keep working free until it does","Lifetime free hosting","Performance-based pricing"], a:1 },
    { q:"What is Redline's average lead lift?", o:["10%","25%","47%","75%"], a:2 },
    { q:"Industry-average contractor site conversion rate?", o:["2–3%","5–6%","8–10%","15%+"], a:0 },
    { q:"Redline's average conversion rate?", o:["3.2%","5.4%","8.7%","12.1%"], a:2 },
    { q:"What is the correct call structure?", o:["Open → Pitch → Price → Close","Open → Discover → Diagnose → Pitch → Price → Close → Next Step","Discover → Close","Pitch → Discover → Close"], a:1 },
    { q:"On a 30-min call, target time for Discovery?", o:["3 min","6 min","12 min","20 min"], a:2 },
    { q:"How many discovery questions in the core framework?", o:["3","5","7","10"], a:2 },
    { q:"What do you do immediately after stating price?", o:["Justify it","Shut up — silence is the close","Offer a discount","Pivot to features"], a:1 },
    { q:"Which is the assumptive close phrasing?", o:["'Do you want to move forward?'","'Sounds like a fit. Here's what happens next…'","'Let me know when you're ready'","'I'll send a proposal'"], a:1 },
    { q:"What are the three valid call outcomes?", o:["Closed deal, calendared next step, or closed loop","Verbal yes, soft yes, hard yes","Pitch, follow-up, send proposal","Open, close, walk away"], a:0 },
    { q:"How do you handle 'It's too expensive'?", o:["Drop the price","'Compared to what?' Anchor against $8–15K agencies","Apologize","Switch to Starter"], a:1 },
    { q:"How do you handle 'My nephew builds websites'?", o:["Match his price","'How many sites for contractors in your range? What lead results?'","Walk away","Lower your fee"], a:1 },
    { q:"What is the default payment structure?", o:["50/50","Monthly installments","100% upfront via Stripe","Pay-on-launch"], a:2 },
    { q:"Which payment methods are NEVER accepted?", o:["Pre-approved 50/50","Stripe links","Personal Venmo / Zelle / cash app","Wire (with Alex approval)"], a:2 },
    { q:"How long after payment should the welcome email go out?", o:["Within 30 minutes","Within 24 hours","Within 1 week","Whenever ready"], a:0 },
    { q:"Maintain attach pays the rep:", o:["Nothing","A 1× signing bonus equal to one month's Maintain fee","Recurring monthly residual","A percentage of MRR forever"], a:1 },
    { q:"Trial-month commission %?", o:["20%","25%","30%","33%"], a:1 },
    { q:"Silver tier commission structure?", o:["25% commission only","30% commission only","33% commission only","$15/hr + 33%"], a:2 },
    { q:"Gold tier pay structure?", o:["33% commission only","$15/hr + 33%","$20/hr + 36%","Negotiated + 40%"], a:1 },
    { q:"3 consecutive months in Bronze = ?", o:["Auto-promotion to Silver","Raise","Redline parts ways","No change"], a:2 },
    { q:"Target close rate KPI?", o:["10%","15%","25%","50%"], a:2 },
    { q:"Target Maintain attach rate KPI?", o:["50%","75%","90%","100%"], a:3 },
    { q:"What is the buyer-language translation of 'beautiful website'?", o:["Modern design","Sleek site","Site that books jobs","Stunning visuals"], a:2 },
    { q:"Which is a BANNED phrase?", o:["Booked jobs","Engagement / brand identity / cutting-edge","The phone ringing","Trucks rolling"], a:1 },
    { q:"How do you handle 'I need to think about it'?", o:["Accept and follow up next week","'Just so I know what you're thinking through: price, timing, or scope?'","Drop the price","Send more info"], a:1 },
    { q:"When deploying a mockup, what should you NEVER do?", o:["Send it after a strong discovery call","Use it as a follow-up hook","Lead with it BEFORE discovery","Show it on a real-time screen share with a hesitating prospect"], a:2 },
    { q:"What's the answer when asked 'what platform do you build on'?", o:["WordPress","Webflow","Wix","'A custom stack engineered for performance and conversion'"], a:3 },
    { q:"What's the goal of the FIRST call (the first-touch call)?", o:["Close the deal","Send a proposal","Book a sales call","Send pricing"], a:2 },
  ]},
};

const LINKS = [
  { label: "Redline CRM", desc: "Pipeline tracking sheet", url: "https://docs.google.com/spreadsheets/d/1CXPnhfQYXoQ9XKRuaA6dWjwpV8Ga2zPs/edit?usp=sharing&ouid=110338344597415049477&rtpof=true&sd=true", ic: "📊" },
  { label: "Weekly Office Scheduling", desc: "Book your office days", url: "https://docs.google.com/spreadsheets/d/1HtVfIS11tMoQr3TgM_bxKv62-8yaVnUI/edit?usp=sharing&ouid=110338344597415049477&rtpof=true&sd=true", ic: "📅" },
  { label: "Redline Homepage", desc: "redlinewebservices.net", url: "https://www.redlinewebservices.net/", ic: "🌐" },
];



/* ═══════════════════════════════════════════
   GLOBAL STYLES — injected once
   ═══════════════════════════════════════════ */
const GLOBAL_CSS = `
@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
@keyframes popIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

*{margin:0;padding:0;box-sizing:border-box}
html,body,#root{min-height:100dvh;background:#0E0F14}
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden;font-family:'Inter',system-ui,sans-serif;letter-spacing:-0.011em;font-feature-settings:"kern","liga","calt","ss01","cv11"}
::selection{background:rgba(204,255,0,0.32);color:#15171E}
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:10px;transition:background 0.2s}
::-webkit-scrollbar-thumb:hover{background:rgba(204,255,0,0.3)}
input::placeholder{color:#3A3D47}
button{font-family:inherit}

/* Backgrounds */
.dotgrid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Glass surface */
.glass {
  background: rgba(20,22,28,0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.06);
}
.glass-soft {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
}

/* Sticky header chrome */
.app-header {
  position:sticky; top:0; z-index:30;
  background: rgba(14,15,20,0.85);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

/* Cards — flat, minimal */
.card-hover { transition: background 0.18s ease, border-color 0.18s ease }
.card-hover:hover { background:rgba(255,255,255,0.028) !important; border-color:rgba(255,255,255,0.12) !important }

.dash-card {
  position:relative;
  background: rgba(255,255,255,0.022);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  transition: background 0.18s ease, border-color 0.18s ease;
  overflow:hidden;
}
.dash-card::before { content:none; }
.dash-card:hover { background:rgba(255,255,255,0.032); border-color:rgba(255,255,255,0.10); }

/* Accordion */
.acc-btn { transition: background 0.18s ease }
.acc-btn:hover { background:rgba(255,255,255,0.03) !important }

/* Nav back */
.back-btn { transition: opacity 0.18s, transform 0.18s }
.back-btn:hover { opacity:0.75; transform:translateX(-2px) }

/* Video card */
.vid-card { transition: background 0.18s ease, border-color 0.18s ease }
.vid-card:hover { background:rgba(255,255,255,0.03) !important; border-color:rgba(204,255,0,0.35) !important }
.play-pulse { animation: pulse 2.5s ease-in-out infinite }

/* Stat cards */
.stat-card { transition: background 0.18s ease, border-color 0.18s ease }
.stat-card:hover { background:rgba(255,255,255,0.03) !important; border-color:rgba(255,255,255,0.12) !important }

/* Tabular numerals for any displayed numeric data */
.num-display, .stat-card, .dash-card { font-variant-numeric: tabular-nums }
.num-display { letter-spacing: -0.04em; font-feature-settings: "tnum","ss01","cv11" }

/* Quiz options */
.quiz-opt { transition: all 0.18s ease }
.quiz-opt:hover:not(:disabled) { transform:translateX(3px) }

/* Tab pills */
.tab-pill {
  position:relative; background:none; border:none; cursor:pointer;
  font-family:inherit; font-weight:700; letter-spacing:1.8px; text-transform:uppercase;
  color: rgba(242,244,248,0.65); transition: color 0.18s ease;
  border-radius:10px;
}
.tab-pill::after {
  content:""; position:absolute; left:14%; right:14%; bottom:-1px; height:2px;
  background:#CCFF00; border-radius:2px; opacity:0; transition: opacity 0.18s ease;
}
.tab-pill:not(.active):hover { color:#F2F4F8 }
.tab-pill:not(.active):hover::after { opacity:0.5 }
.tab-pill.active { color:#15171E }
.tab-pill .tab-bg {
  position:absolute; inset:0; border-radius:10px; opacity:0;
  background:#CCFF00;
  transition: opacity 0.22s ease;
  z-index:0;
}
.tab-pill.active .tab-bg { opacity:1 }
.tab-pill > span { position:relative; z-index:1 }

/* Buttons — three variants only */
/* Primary: chartreuse fill, charcoal text — main CTAs */
.btn-primary {
  background:#CCFF00;
  color:#15171E; font-weight:800; letter-spacing:1.2px; text-transform:uppercase;
  border:none; border-radius:10px; cursor:pointer;
  transition: filter 0.16s ease, background 0.16s ease;
}
.btn-primary:hover { filter: brightness(1.06) }
.btn-primary:active { filter: brightness(0.94) }
.btn-primary:disabled { cursor:default; filter:none }

/* Secondary: charcoal fill, chartreuse border + text — less critical actions */
.btn-secondary {
  background:transparent; border:1px solid #CCFF00; color:#CCFF00;
  font-weight:800; letter-spacing:1.2px; text-transform:uppercase;
  border-radius:10px; cursor:pointer; transition: all 0.16s ease;
}
.btn-secondary:hover { background:rgba(204,255,0,0.08) }
.btn-secondary:active { background:rgba(204,255,0,0.14) }

/* Tertiary (ghost): muted text, chartreuse on hover — utility / nav */
.btn-ghost {
  background:transparent; border:1px solid transparent;
  color:#9098A8; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
  border-radius:10px; cursor:pointer; transition: all 0.16s ease;
}
.btn-ghost:hover { color:#CCFF00; background:rgba(204,255,0,0.06); border-color:rgba(204,255,0,0.20) }

/* Type utilities */
.mono { font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.08em; line-height: 1; }
.eyebrow { font-size: 9px; font-weight: 800; letter-spacing: 2.4px; text-transform: uppercase; color: #9098A8; }

/* Header pill buttons — Admin / Sign Out / Profile (all tertiary) */
.btn-pill {
  display:inline-flex; align-items:center; justify-content:center; gap:7px;
  height:42px; padding:0 14px; font-size:11px; font-weight:700;
  letter-spacing:1.4px; text-transform:uppercase; border-radius:12px;
  cursor:pointer; transition: all 0.16s ease; font-family:inherit;
  background: transparent; border: 1px solid transparent; color:#9098A8;
}
.btn-pill:hover { background: rgba(204,255,0,0.06); border-color: rgba(204,255,0,0.22); color:#CCFF00 }
.btn-pill.amber, .btn-pill.amber:hover { /* legacy class — collapsed to tertiary so no orange admin outlier */ }
.btn-pill.icon-only { padding:0; width:42px; gap:0 }
.btn-pill svg { display:block }

/* Live header status tiles */
.hdr-stat { display:flex; flex-direction:column; align-items:flex-start; gap:2px; padding:0 18px; border-left:1px solid rgba(255,255,255,0.06) }
.hdr-stat:first-child { border-left:none; padding-left:0 }
.hdr-stat-val { font-family:'IBM Plex Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; font-weight:600; font-size:22px; color:#F2F4F8; line-height:1; letter-spacing:-0.02em }
.hdr-stat-val.hero { color:#CCFF00 }
.hdr-stat-val.danger { color:#DC2626 }
.hdr-stat-label { font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#5E6376 }
.title-display {
  font-family:'Bebas Neue',sans-serif; letter-spacing:0.32em; line-height:1;
}

/* Profile pill */
.profile-pill {
  display:flex; align-items:center; gap:10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; padding: 6px 14px 6px 6px; cursor:pointer;
  transition: all 0.2s ease;
}
.profile-pill:hover { border-color:rgba(204,255,0,0.25); background:linear-gradient(180deg, rgba(204,255,0,0.05), rgba(204,255,0,0.01)) }
`;

/* ═══════════════════════════════════════════
   RICH TEXT RENDERER
   ═══════════════════════════════════════════ */
function RedlineLogo({ height = 28, style }) {
  return (
    <img
      src="/redline-logo.png"
      alt="Redline"
      height={height}
      style={{ height, width: "auto", display: "block", flexShrink: 0, ...style }}
    />
  );
}

function RichText({ text }) {
  const lines = text.split("\n");
  return (
    <div style={{ fontSize:13.5, color:"#D6DAE2", lineHeight:1.85 }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height:12 }} />;

        if (t === "—" || t === "---" || t === "———") return (
          <div key={i} style={{ padding:"8px 0" }}>
            <div style={{ height:1, background:"linear-gradient(90deg,transparent,#3D414B,transparent)" }} />
          </div>
        );

        if (t.startsWith("→ ") || t.startsWith("• ")) return (
          <div key={i} style={{ display:"flex", gap:12, padding:"4px 0 4px 2px" }}>
            <span style={{ color:"#CCFF00", flexShrink:0, fontSize:8, marginTop:7, width:6, height:6, borderRadius:"50%", background:"#CCFF00", display:"inline-block" }}></span>
            <span style={{ flex:1 }}>{t.slice(2)}</span>
          </div>
        );

        if (/^[1-9]️⃣/.test(t)) {
          const sp = t.indexOf(" ");
          return (
            <div key={i} style={{ display:"flex", gap:12, padding:"6px 0", alignItems:"flex-start" }}>
              <span style={{ background:"#CCFF0015", color:"#CCFF00", width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0, fontWeight:700 }}>{t.slice(0,sp)}</span>
              <span style={{ fontWeight:600, color:"#E8ECF0", paddingTop:3 }}>{t.slice(sp+1)}</span>
            </div>
          );
        }

        if (t.startsWith("⚠️") || t.startsWith("⚠")) return (
          <div key={i} style={{ background:"linear-gradient(135deg,#1a120810,#1a120820)", border:"1px solid #33281025", borderRadius:10, padding:"12px 16px", margin:"8px 0", fontSize:12.5, color:"#F59E0B", display:"flex", gap:10, alignItems:"flex-start" }}>
            <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>⚠️</span><span style={{flex:1}}>{t.replace(/^⚠️?\s*/, "")}</span>
          </div>
        );

        if (t.startsWith("💡")) return (
          <div key={i} style={{ background:"linear-gradient(135deg,#0a121810,#0a121820)", border:"1px solid #0f203025", borderRadius:10, padding:"12px 16px", margin:"8px 0", fontSize:12.5, color:"#60A5FA", display:"flex", gap:10, alignItems:"flex-start" }}>
            <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>💡</span><span style={{flex:1}}>{t.replace(/^💡\s*/, "")}</span>
          </div>
        );

        const isSub = /^[A-Z][A-Z\s&\/\-—:()]{6,}$/.test(t) || (/^[A-Z🔵🔴🔥✅📌]/.test(t) && t.endsWith(":") && t.length < 60);
        if (isSub) return (
          <div key={i} style={{ fontSize:10.5, fontWeight:700, color:"#CCFF00", letterSpacing:2, marginTop:20, marginBottom:6, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:12, height:1, background:"#CCFF0050" }}></span>
            {t.replace(/:$/, "")}
          </div>
        );

        if (/^[^\w\s]/.test(t) && t.length < 80 && /[A-Z]{3,}/.test(t.slice(0,20))) {
          const parts = t.split(/\s[—–-]\s/);
          if (parts.length === 2) return (
            <div key={i} style={{ padding:"5px 0", display:"flex", gap:6 }}>
              <span style={{ fontWeight:700, color:"#EEF0F4" }}>{parts[0]}</span>
              <span style={{ color:"#8E929D" }}>—</span>
              <span style={{flex:1}}>{parts[1]}</span>
            </div>
          );
        }

        if (/https?:\/\//.test(t)) {
          const urlMatch = t.match(/(https?:\/\/[^\s]+)/);
          if (urlMatch) {
            const label = t.replace(urlMatch[0], "").replace(/^[▶\s]+/, "").trim();
            return (
              <div key={i} style={{ padding:"4px 0" }}>
                {label && <span style={{ color:"#EEF0F4", fontWeight:500 }}>{label} </span>}
                <a href={urlMatch[0]} target="_blank" rel="noreferrer" style={{ color:"#CCFF00", wordBreak:"break-all", fontSize:12, textDecoration:"none", borderBottom:"1px solid #CCFF0040" }}>{urlMatch[0]}</a>
              </div>
            );
          }
        }

        if (t.includes("$") && (t.includes("T1") || t.includes("Starter") || t.includes("Pro ") || t.includes("Elite"))) return (
          <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#8A8E98", padding:"2px 0", whiteSpace:"pre", background:"#272A32", borderRadius:6, padding:"8px 12px", margin:"4px 0", border:"1px solid #3D414B" }}>{line}</div>
        );

        return <div key={i} style={{ padding:"2px 0" }}>{t}</div>;
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOOK
   ═══════════════════════════════════════════ */
function useW() {
  const [w, setW] = useState(typeof window!=="undefined"?window.innerWidth:400);
  useEffect(() => { const h=()=>setW(window.innerWidth); window.addEventListener("resize",h); return ()=>window.removeEventListener("resize",h); }, []);
  return w;
}

/* ═══════════════════════════════════════════
   LOGIN
   ═══════════════════════════════════════════ */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [ld, setLd] = useState(false);

  const go = async () => {
    if (!email || !password) return;
    setLd(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr("Invalid email or password.");
    setLd(false);
  };

  const fieldStyle = (hasErr) => ({
    width:"100%", padding:"15px 20px",
    background:"rgba(7,8,12,0.9)",
    border: `1.5px solid ${hasErr ? "#DC2626" : "rgba(255,255,255,0.07)"}`,
    borderRadius:14, color:"#F2F4F8", fontSize:15, outline:"none",
    boxSizing:"border-box", fontFamily:"inherit", transition:"all 0.22s ease",
  });

  const onFocus = e => { e.target.style.borderColor = "rgba(204,255,0,0.6)"; e.target.style.boxShadow = "0 0 0 4px rgba(204,255,0,0.08)"; };
  const onBlur  = (e, hasErr) => { e.target.style.borderColor = hasErr ? "#DC2626" : "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; };

  return (
    <div className="dotgrid" style={{ minHeight:"100dvh", background:"#0E0F14", display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      <div style={{ width:"100%", maxWidth:420, animation:"fadeUp 0.5s ease", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 20px" }}>
            <RedlineLogo height={52} />
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:38, letterSpacing:12, color:"#F2F4F8", lineHeight:1 }}>REDLINE</div>
          <div style={{ fontSize:10.5, fontWeight:700, color:"#5E6376", letterSpacing:5, textTransform:"uppercase", marginTop:8 }}>Portal</div>
        </div>

        <div style={{ background:"linear-gradient(145deg,rgba(16,18,24,0.99),rgba(11,12,17,0.99))", border:"1px solid rgba(255,255,255,0.07)", borderRadius:24, padding:"36px 32px 32px", boxShadow:"0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(204,255,0,0.06)" }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:9.5, fontWeight:700, color:"#4D5260", letterSpacing:3, marginBottom:10, textTransform:"uppercase" }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="you@redline.com" autoFocus style={fieldStyle(!!err)} onFocus={onFocus} onBlur={e=>onBlur(e,!!err)} />
          </div>
          <div>
            <label style={{ display:"block", fontSize:9.5, fontWeight:700, color:"#4D5260", letterSpacing:3, marginBottom:10, textTransform:"uppercase" }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="••••••••" style={fieldStyle(!!err)} onFocus={onFocus} onBlur={e=>onBlur(e,!!err)} />
          </div>
          {err && (
            <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:12 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ color:"#DC2626", fontSize:12, fontWeight:600 }}>{err}</p>
            </div>
          )}
          <button onClick={go} disabled={ld} style={{ width:"100%", padding:"16px", background: ld ? "#3E5200" : "linear-gradient(135deg,#CCFF00,#6E9100)", color: ld ? "#FFF" : "#15171E", border:"none", borderRadius:14, fontSize:11, fontWeight:800, letterSpacing:4, cursor: ld ? "wait" : "pointer", marginTop:20, textTransform:"uppercase", boxShadow: ld ? "none" : "0 6px 28px rgba(204,255,0,0.3)", transition:"all 0.25s ease", fontFamily:"inherit" }}>
            {ld ? "Signing In…" : "Enter Portal"}
          </button>
        </div>
        <p style={{ color:"#292C35", fontSize:9, marginTop:32, letterSpacing:2, textTransform:"uppercase", textAlign:"center" }}>© 2026 Redline Web Services LLC</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════════ */
const SUPABASE_USERS_URL = "https://supabase.com/dashboard/project/xhowrnywnbotzlyovxgs/auth/users";

/* ═══════════════════════════════════════════
   OFFICE SCHEDULER
   ═══════════════════════════════════════════ */
function Scheduler({ session, profile, w }) {
  const [entries, setEntries] = useState([]);
  const [repProfiles, setRepProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const dk = w >= 768;

  const getMonday = (d) => {
    const date = new Date(d); date.setHours(0,0,0,0);
    const day = date.getDay();
    date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
    return date;
  };

  const today = new Date(); today.setHours(0,0,0,0);
  const weekStart = getMonday(today);
  const nextWeekEnd = new Date(weekStart); nextWeekEnd.setDate(nextWeekEnd.getDate() + 11); // Fri of next week

  const days = [];
  for (let i = 0; i < 10; i++) {
    const d = new Date(weekStart); d.setDate(d.getDate() + Math.floor(i/5)*7 + (i%5));
    days.push(d);
  }

  const ds = (d) => d.toISOString().split("T")[0];
  const startStr = ds(weekStart), endStr = ds(nextWeekEnd);

  const load = async () => {
    const [schedRes, profRes] = await Promise.all([
      supabase.from("schedule").select("id, user_id, date").gte("date", startStr).lte("date", endStr),
      supabase.from("profiles").select("id, name"),
    ]);
    setEntries(schedRes.data ?? []);
    const pm = {};
    for (const p of profRes.data ?? []) pm[p.id] = p.name || "Rep";
    setRepProfiles(pm);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("schedule-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "schedule" }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const toggle = async (day) => {
    const dateStr = ds(day);
    const mine = entries.find(e => e.user_id === session.user.id && e.date === dateStr);
    if (mine) {
      await supabase.from("schedule").delete().eq("id", mine.id);
      setEntries(prev => prev.filter(e => e.id !== mine.id));
    } else {
      const dayCount = entries.filter(e => e.date === dateStr).length;
      if (dayCount >= 6) return;
      const { data } = await supabase.from("schedule").insert({ user_id: session.user.id, date: dateStr }).select().single();
      if (data) setEntries(prev => [...prev, data]);
    }
  };

  const DAY_NAMES = ["MON","TUE","WED","THU","FRI"];
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const byDate = {};
  for (const e of entries) { if (!byDate[e.date]) byDate[e.date] = []; byDate[e.date].push(e); }

  if (loading) return <div style={{ textAlign:"center", padding:60, color:"#7E8290", fontSize:13 }}>Loading schedule...</div>;

  return (
    <div>
      {/* Policy notice */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:14, padding:dk?"16px 20px":"14px 16px", background:"linear-gradient(135deg, rgba(220,38,38,0.08), rgba(245,158,11,0.06))", border:"1px solid rgba(220,38,38,0.25)", borderRadius:14, marginBottom:24, animation:"fadeUp 0.4s ease" }}>
        <div style={{ width:38, height:38, borderRadius:11, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:9.5, fontWeight:800, color:"#DC2626", letterSpacing:2.5, textTransform:"uppercase", marginBottom:4 }}>Mandatory Policy</div>
          <div style={{ fontSize:dk?13.5:12.5, fontWeight:700, color:"#F2F4F8", lineHeight:1.45, marginBottom:4 }}>
            2-day minimum office attendance per week
          </div>
          <div style={{ fontSize:dk?12.5:11.5, color:"#C4C8D4", lineHeight:1.55, fontWeight:500 }}>
            Every rep must book at least <span style={{ color:"#DC2626", fontWeight:700 }}>2 days</span> in the office each week. Failure to meet this minimum is grounds for <span style={{ color:"#DC2626", fontWeight:700 }}>termination</span>. No exceptions.
          </div>
        </div>
      </div>

      {[0,1].map(week => (
        <div key={week} style={{ marginBottom:32, animation:"fadeUp 0.4s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, paddingBottom:14 }}>
            <div style={{ fontSize:10, fontWeight:700, color: week===0?"#CCFF00":"#F59E0B", letterSpacing:3, textTransform:"uppercase" }}>{week===0?"This Week":"Next Week"}</div>
            <div style={{ flex:1, height:1, background:"#1F2229" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:dk?"repeat(5,1fr)":"repeat(2,1fr)", gap:10 }}>
            {days.slice(week*5, week*5+5).map((day, di) => {
              const dateStr = ds(day);
              const dayEntries = byDate[dateStr] ?? [];
              const isPast = day < today;
              const isToday = dateStr === ds(today);
              const isMine = dayEntries.some(e => e.user_id === session.user.id);
              const isFull = dayEntries.length >= 6 && !isMine;
              return (
                <div key={dateStr} onClick={() => !isPast && !isFull && toggle(day)}
                  className={isPast || isFull ? "" : "card-hover"}
                  style={{ background: isMine?"#CCFF0008":"#23262E", border:"1px solid "+(isMine?"#CCFF0030":isToday?"#404450":"#2D3038"), borderRadius:16, padding:"16px 14px", cursor:isPast||isFull?"default":"pointer", opacity:isPast?0.35:1, transition:"all 0.2s", minHeight:140, position:"relative" }}>
                  {isToday && !isFull && <div style={{ position:"absolute", top:10, right:12, fontSize:8, fontWeight:700, color:"#CCFF00", letterSpacing:2, textTransform:"uppercase" }}>Today</div>}
                  {isFull && <div style={{ position:"absolute", top:10, right:12, fontSize:8, fontWeight:700, color:"#F59E0B", letterSpacing:2, textTransform:"uppercase" }}>Full</div>}
                  <div style={{ fontSize:9, fontWeight:700, color:isToday?"#CCFF00":"#7E8290", letterSpacing:2, marginBottom:4 }}>{DAY_NAMES[di]}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:isToday?"#FFF":"#8A8E98", marginBottom:4, lineHeight:1 }}>
                    {day.getDate()} <span style={{ fontSize:12, fontWeight:500, color:"#7E8290" }}>{MONTHS[day.getMonth()]}</span>
                  </div>
                  <div style={{ fontSize:9, color:"#5C6175", marginBottom:12, letterSpacing:1, display:"flex", justifyContent:"space-between" }}>
                    <span>9:00 AM – 5:00 PM</span>
                    <span style={{ color: dayEntries.length >= 6 ? "#F59E0B" : "#5C6175" }}>{dayEntries.length}/6</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {dayEntries.map(e => (
                      <div key={e.id} style={{ fontSize:11, fontWeight:600, color:e.user_id===session.user.id?"#CCFF00":"#D6DAE2", background:e.user_id===session.user.id?"#CCFF0012":"#2B2E37", border:"1px solid "+(e.user_id===session.user.id?"#CCFF0025":"#3D414B"), borderRadius:6, padding:"4px 8px" }}>
                        {repProfiles[e.user_id] || "Rep"}
                      </div>
                    ))}
                    {dayEntries.length === 0 && !isPast && (
                      <div style={{ fontSize:10, color:"#5C6175" }}>+ Add yourself</div>
                    )}
                    {isFull && !isMine && (
                      <div style={{ fontSize:10, color:"#F59E0B88" }}>Day is full</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const TIER_GLOW = { trial:"rgba(6,214,240,0.3)", bronze:"rgba(184,115,42,0.35)", silver:"rgba(192,200,216,0.3)", gold:"rgba(255,215,0,0.4)", platinum:"rgba(167,139,250,0.35)", diamond:"rgba(204,255,0,0.4)" };

function Announcements({ session, profile, w }) {
  const [items, setItems] = useState([]);
  const [authors, setAuthors] = useState({});
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const dk = w >= 768;
  const isAdmin = profile?.role === "admin";

  const load = async () => {
    const [annRes, profRes] = await Promise.all([
      supabase.from("announcements").select("id, posted_by, title, body, pinned, created_at").order("pinned", { ascending: false }).order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, name"),
    ]);
    setItems(annRes.data ?? []);
    const am = {};
    for (const p of profRes.data ?? []) am[p.id] = p.name || "Admin";
    setAuthors(am);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("announcements-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const post = async () => {
    const trimmedBody = body.trim();
    if (!trimmedBody) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("announcements")
      .insert({ posted_by: session.user.id, title: title.trim() || null, body: trimmedBody })
      .select()
      .single();
    setSaving(false);
    if (error || !data) {
      alert(`Couldn't post: ${error?.message ?? "no row returned"}`);
      return;
    }
    setTitle(""); setBody(""); setComposing(false);
    setItems(prev => [data, ...prev]);
  };

  const remove = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      alert(`Couldn't delete: ${error.message}`);
      return;
    }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const togglePin = async (id, pinned) => {
    const { data, error } = await supabase
      .from("announcements")
      .update({ pinned: !pinned })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) {
      alert(`Couldn't update: ${error?.message ?? "no row returned"}`);
      return;
    }
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, pinned: data.pinned } : i);
      next.sort((a, b) => (b.pinned - a.pinned) || (new Date(b.created_at) - new Date(a.created_at)));
      return next;
    });
  };

  const fmtWhen = (iso) => {
    const d = new Date(iso);
    const today = new Date(); today.setHours(0,0,0,0);
    const ds = new Date(d); ds.setHours(0,0,0,0);
    const diff = Math.round((today - ds) / 86400000);
    const time = d.toLocaleTimeString("en-US",{ hour:"numeric", minute:"2-digit" });
    if (diff === 0) return `Today · ${time}`;
    if (diff === 1) return `Yesterday · ${time}`;
    if (diff < 7) return d.toLocaleDateString("en-US",{ weekday:"long" }) + ` · ${time}`;
    return d.toLocaleDateString("en-US",{ month:"short", day:"numeric", year: d.getFullYear() === today.getFullYear() ? undefined : "numeric" });
  };

  return (
    <div style={{ animation:"fadeUp 0.35s ease", display:"flex", flexDirection:"column", gap:14 }}>

      {isAdmin && (
        <div className="dash-card" style={{ padding:dk?"20px 22px":"16px 18px" }}>
          {!composing ? (
            <button onClick={() => setComposing(true)}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.1)", borderRadius:12, padding:"14px 16px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", color:"#666C7E", fontSize:13, fontWeight:600, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(245,158,11,0.35)"; e.currentTarget.style.color="#F59E0B"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#666C7E"; }}>
              <div style={{ width:32, height:32, borderRadius:9, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              Post a new announcement…
            </button>
          ) : (
            <div>
              <div style={{ fontSize:10, fontWeight:800, color:"#F59E0B", letterSpacing:2.5, textTransform:"uppercase", marginBottom:14 }}>New Announcement</div>
              <input
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title (optional)"
                style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#F2F4F8", fontSize:14, fontWeight:700, padding:"11px 14px", fontFamily:"inherit", outline:"none", boxSizing:"border-box", marginBottom:8 }}
              />
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="What do reps need to know?"
                rows={4}
                style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#F2F4F8", fontSize:13, fontWeight:500, padding:"11px 14px", fontFamily:"inherit", outline:"none", boxSizing:"border-box", resize:"vertical", lineHeight:1.5 }}
              />
              <div style={{ display:"flex", gap:8, marginTop:12, justifyContent:"flex-end" }}>
                <button onClick={() => { setComposing(false); setTitle(""); setBody(""); }} className="btn-ghost" style={{ fontSize:11, padding:"10px 18px" }}>Cancel</button>
                <button onClick={post} disabled={saving || !body.trim()} className="btn-primary" style={{ fontSize:11, padding:"10px 22px", opacity: saving || !body.trim() ? 0.5 : 1, cursor: saving || !body.trim() ? "default" : "pointer" }}>
                  {saving ? "Posting…" : "Post"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>Loading…</div>
      ) : items.length === 0 ? (
        <div className="dash-card" style={{ padding:"48px 24px", textAlign:"center" }}>
          <div style={{ width:54, height:54, borderRadius:16, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:"#D6DAE2", marginBottom:6 }}>No announcements yet</div>
          <div style={{ fontSize:12, color:"#666C7E" }}>{isAdmin ? "Post the first one above." : "Check back soon — leadership posts updates here."}</div>
        </div>
      ) : (
        items.map((a, i) => {
          const accent = a.pinned ? "#F59E0B" : "#06D6F0";
          return (
            <div key={a.id} className="dash-card" style={{ padding:dk?"20px 22px":"16px 18px", animation:`fadeUp 0.35s ease ${0.04*i}s both`, borderColor: a.pinned ? "rgba(245,158,11,0.22)" : undefined }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:38, height:38, borderRadius:11, background: a.pinned ? "linear-gradient(135deg,#F59E0B,#B45309)" : "linear-gradient(135deg,#06D6F0,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow: a.pinned ? "0 4px 14px rgba(245,158,11,0.35)" : "0 4px 14px rgba(6,214,240,0.3)" }}>
                  {a.pinned ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#15171E" stroke="#15171E" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4l4 4-7 7-1 4-4-4 4-1 7-7-3-3z"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15171E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                  )}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:a.title?6:4 }}>
                    {a.pinned && <span style={{ fontSize:8.5, fontWeight:800, color:"#F59E0B", background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)", padding:"3px 8px", borderRadius:5, letterSpacing:1.5, textTransform:"uppercase" }}>Pinned</span>}
                    <span style={{ fontSize:10.5, fontWeight:700, color:"#D6DAE2" }}>{authors[a.posted_by] || "Admin"}</span>
                    <span style={{ fontSize:10, color:"#5E6376" }}>· {fmtWhen(a.created_at)}</span>
                  </div>
                  {a.title && <div style={{ fontSize:dk?17:15, fontWeight:800, color:"#F2F4F8", letterSpacing:"-0.01em", lineHeight:1.3, marginBottom:6 }}>{a.title}</div>}
                  <div style={{ fontSize:dk?13.5:12.5, color:"#C4C8D4", lineHeight:1.6, fontWeight:500, whiteSpace:"pre-wrap" }}>{a.body}</div>
                </div>
                {isAdmin && (
                  <div style={{ display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
                    <button onClick={() => togglePin(a.id, a.pinned)} title={a.pinned ? "Unpin" : "Pin"}
                      style={{ width:30, height:30, borderRadius:8, background:"rgba(255,255,255,0.04)", border:`1px solid ${a.pinned ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`, color: a.pinned ? "#F59E0B" : "#666C7E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, transition:"all 0.18s" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={a.pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
                    </button>
                    <button onClick={() => remove(a.id)} title="Delete"
                      style={{ width:30, height:30, borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#666C7E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, transition:"all 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.color="#DC2626"; e.currentTarget.style.borderColor="rgba(220,38,38,0.3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color="#666C7E"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function Leads({ session, profile, w }) {
  const [leads, setLeads] = useState([]);
  const [reps, setReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [draftNote, setDraftNote] = useState("");
  // Admin upload state
  const [uploading, setUploading] = useState(false);
  const [parsed, setParsed] = useState(null); // { headers, rows, fileName }
  const [assignTo, setAssignTo] = useState("");
  const fileInputRef = useRef(null);
  const dk = w >= 768;
  const isAdmin = profile?.role === "admin";

  const load = async () => {
    const [leadsRes, profRes] = await Promise.all([
      supabase.from("leads")
        .select("id, assigned_to, assigned_by, data, status, note, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, name, role").order("name"),
    ]);
    setLeads(leadsRes.data ?? []);
    const repList = (profRes.data ?? []).filter(p => p.role === "rep");
    setReps(repList);
    if (!assignTo && repList.length) setAssignTo(repList[0].id);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("leads-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const repById = Object.fromEntries(reps.map(r => [r.id, r.name || "Rep"]));

  // CSV parser handles quoted fields, embedded commas/newlines, and "" escapes.
  const parseCSV = (text) => {
    const rows = []; let row = [], cur = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQ) {
        if (c === '"') {
          if (text[i+1] === '"') { cur += '"'; i++; } else inQ = false;
        } else cur += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ',') { row.push(cur); cur = ""; }
        else if (c === '\n') { row.push(cur); cur = ""; rows.push(row); row = []; }
        else if (c !== '\r') cur += c;
      }
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    return rows.filter(r => r.some(c => (c ?? "").trim() !== ""));
  };

  const onFile = async (file) => {
    if (!file) return;
    let text = await file.text();
    // Strip UTF-8 BOM that Excel and Google Sheets often prepend; otherwise the first header key starts with ﻿ and lookups miss.
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const rows = parseCSV(text);
    if (rows.length < 2) {
      alert("CSV needs a header row and at least one data row.");
      return;
    }
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(r => {
      const o = {};
      headers.forEach((h, i) => { o[h] = (r[i] ?? "").trim(); });
      return o;
    });
    setParsed({ headers, rows: data, fileName: file.name });
  };

  const upload = async () => {
    if (!parsed || !assignTo || uploading) return;
    setUploading(true);
    const payload = parsed.rows.map(d => ({
      assigned_to: assignTo,
      assigned_by: session.user.id,
      data: d,
    }));
    const { error } = await supabase.from("leads").insert(payload);
    setUploading(false);
    if (error) {
      alert(`Upload failed: ${error.message}`);
      return;
    }
    setParsed(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    load();
  };

  const setStatus = async (id, status) => {
    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) {
      alert(`Couldn't update: ${error?.message ?? "no row returned (RLS?)"}`);
      return;
    }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: data.status } : l));
  };

  const saveNote = async (id) => {
    const { data, error } = await supabase
      .from("leads")
      .update({ note: draftNote.trim() || null })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) {
      alert(`Couldn't save note: ${error?.message ?? "no row returned"}`);
      return;
    }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, note: data.note } : l));
  };

  const removeLead = async (id) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) { alert(`Couldn't delete: ${error.message}`); return; }
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const clearByStatus = async (status) => {
    const targets = leads.filter(l => l.status === status && (isAdmin || l.assigned_to === session.user.id));
    if (targets.length === 0) return;
    const label = STATUSES.find(s => s.v === status)?.label?.toLowerCase() ?? status;
    if (!confirm(`Delete ${targets.length} ${label} lead${targets.length === 1 ? "" : "s"}? This can't be undone.`)) return;
    const ids = targets.map(t => t.id);
    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (error) { alert(`Couldn't clear: ${error.message}`); return; }
    setLeads(prev => prev.filter(l => !ids.includes(l.id)));
  };

  const STATUSES = [
    { v: "new",       label: "New",       color: "#06D6F0" },
    { v: "contacted", label: "Contacted", color: "#F59E0B" },
    { v: "booked",    label: "Booked",    color: "#14B8A6" },
    { v: "closed",    label: "Closed",    color: "#22C55E" },
    { v: "dead",      label: "Dead",      color: "#DC2626" },
  ];
  const statusByV = Object.fromEntries(STATUSES.map(s => [s.v, s]));

  const visible = leads.filter(l => {
    if (!isAdmin && l.assigned_to !== session.user.id) return false;
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    return true;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.v] = leads.filter(l => (isAdmin || l.assigned_to === session.user.id) && l.status === s.v).length;
    return acc;
  }, {});
  const totalForFilter = leads.filter(l => isAdmin || l.assigned_to === session.user.id).length;

  // Pretty primary line: try common keys, else first non-empty value
  const primaryLine = (d) => {
    if (!d) return "Lead";
    const keys = Object.keys(d);
    const lower = keys.map(k => k.toLowerCase());
    const PREF = ["business","company","name","business name","client","title"];
    for (const p of PREF) {
      const idx = lower.indexOf(p);
      if (idx >= 0 && (d[keys[idx]] ?? "").toString().trim()) return d[keys[idx]];
    }
    for (const k of keys) {
      const v = (d[k] ?? "").toString().trim();
      if (v) return v;
    }
    return "Lead";
  };
  const secondaryLine = (d) => {
    if (!d) return "";
    const lower = Object.keys(d).reduce((a,k) => (a[k.toLowerCase()] = d[k], a), {});
    const phone = lower.phone || lower["phone number"] || lower.tel;
    const email = lower.email || lower["email address"];
    const city = lower.city || lower.location;
    const niche = lower.niche || lower.industry || lower.category;
    return [phone, email, city, niche].filter(Boolean).join(" · ");
  };

  // Render a CSV value: if it looks like a URL/email/phone, make it clickable.
  // All link branches validate via the URL parser so a malicious CSV row
  // can't smuggle a javascript:/data:/file: href through to the browser.
  const renderValue = (v) => {
    const s = (v ?? "").toString().trim();
    if (!s) return <span style={{ color:"#3A3D47" }}>—</span>;
    const linkStyle = { color:"#CCFF00", textDecoration:"none", borderBottom:"1px dotted rgba(204,255,0,0.4)" };
    const safeHttpUrl = (raw) => {
      try {
        const u = new URL(raw);
        return (u.protocol === "http:" || u.protocol === "https:") ? u.href : null;
      } catch { return null; }
    };
    // Explicit URL (must parse cleanly + be http/https)
    if (/^https?:\/\//i.test(s)) {
      const href = safeHttpUrl(s);
      if (href) return <a href={href} target="_blank" rel="noreferrer" style={linkStyle}>{s}</a>;
      return s;
    }
    // Bare domain / www.something — we control the scheme by prepending https://
    if (/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s) && /\.[a-z]{2,}/i.test(s)) {
      const href = safeHttpUrl(`https://${s}`);
      if (href) return <a href={href} target="_blank" rel="noreferrer" style={linkStyle}>{s}</a>;
      return s;
    }
    // Email — strict shape, mailto: is safe because mail clients ignore scripts
    if (/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(s)) {
      return <a href={`mailto:${encodeURIComponent(s)}`} style={linkStyle}>{s}</a>;
    }
    // Phone — strip to digits + leading plus, then tel:
    const digits = s.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15 && /^\+?[\d\s().+-]+$/.test(s)) {
      const cleaned = s.replace(/[^\d+]/g, "");
      return <a href={`tel:${cleaned}`} style={linkStyle}>{s}</a>;
    }
    return s;
  };

  return (
    <div style={{ animation:"fadeUp 0.35s ease", display:"flex", flexDirection:"column", gap:14 }}>

      {/* Pipeline overview */}
      {!loading && totalForFilter > 0 && (
        <div className="dash-card" style={{ padding:dk?"16px 22px":"14px 16px" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <div>
              <div style={{ fontSize:9.5, fontWeight:800, color:"#5E6376", letterSpacing:2.5, textTransform:"uppercase" }}>Pipeline</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?38:32, lineHeight:1, color:"#F2F4F8", letterSpacing:0.5, marginTop:4, fontVariantNumeric:"tabular-nums" }}>{totalForFilter}<span style={{ fontSize:dk?14:12, color:"#5E6376", marginLeft:8, letterSpacing:1.5, fontFamily:"'Inter',sans-serif", fontWeight:600 }}>leads</span></div>
            </div>
            <div style={{ display:"flex", gap:dk?20:14, flexWrap:"wrap" }}>
              {STATUSES.filter(s => (counts[s.v] ?? 0) > 0).map(s => (
                <div key={s.v}>
                  <div style={{ fontSize:9, fontWeight:800, color:s.color, letterSpacing:1.8, textTransform:"uppercase" }}>{s.label}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?22:20, lineHeight:1, color:"#F2F4F8", marginTop:3, fontVariantNumeric:"tabular-nums" }}>{counts[s.v] ?? 0}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admin upload card */}
      {isAdmin && (
        <div className="dash-card" style={{ padding:dk?"20px 22px":"16px 18px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:10, fontWeight:800, color:"#F59E0B", letterSpacing:2.5, textTransform:"uppercase" }}>Assign Leads · CSV Upload</div>
          </div>

          {!parsed ? (
            <div>
              <label
                htmlFor="leads-csv-input"
                style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.1)", borderRadius:12, cursor:"pointer", transition:"all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(245,158,11,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                <div style={{ width:38, height:38, borderRadius:11, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#EEF2F8" }}>Upload a CSV file</div>
                  <div style={{ fontSize:11, color:"#666C7E", marginTop:3 }}>First row should be column headers (Business, Phone, Email, etc.)</div>
                </div>
              </label>
              <input
                id="leads-csv-input"
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={e => onFile(e.target.files?.[0])}
                style={{ display:"none" }}
              />
            </div>
          ) : (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:10, marginBottom:14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <div style={{ flex:1, minWidth:0, fontSize:12, fontWeight:600, color:"#D6DAE2" }}>
                  <span style={{ color:"#22C55E", fontWeight:800 }}>{parsed.rows.length}</span> {parsed.rows.length === 1 ? "lead" : "leads"} parsed from <span style={{ color:"#F2F4F8" }}>{parsed.fileName}</span>
                </div>
                <button onClick={() => { setParsed(null); if (fileInputRef.current) fileInputRef.current.value=""; }}
                  style={{ background:"none", border:"none", color:"#666C7E", fontSize:11, fontWeight:700, cursor:"pointer", textTransform:"uppercase", letterSpacing:1.5, padding:"4px 8px", fontFamily:"inherit" }}>Clear</button>
              </div>

              {/* Preview a few rows */}
              <div style={{ overflow:"auto", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, marginBottom:14, maxHeight:200 }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11.5 }}>
                  <thead style={{ position:"sticky", top:0, background:"rgba(20,22,28,0.95)", backdropFilter:"blur(8px)" }}>
                    <tr>
                      {parsed.headers.map(h => (
                        <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:9.5, fontWeight:800, color:"#666C7E", letterSpacing:1.5, textTransform:"uppercase", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.rows.slice(0, 6).map((r, i) => (
                      <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                        {parsed.headers.map(h => (
                          <td key={h} style={{ padding:"8px 12px", color:"#C4C8D4", whiteSpace:"nowrap", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis" }}>{r[h] || "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsed.rows.length > 6 && (
                  <div style={{ padding:"8px 12px", fontSize:10.5, color:"#5E6376", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.04)" }}>+ {parsed.rows.length - 6} more row{parsed.rows.length - 6 === 1 ? "" : "s"}</div>
                )}
              </div>

              <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
                <div style={{ flex:"1 1 200px" }}>
                  <div style={{ fontSize:9.5, fontWeight:700, color:"#666C7E", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Assign to rep</div>
                  <select value={assignTo} onChange={e => setAssignTo(e.target.value)}
                    style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#F2F4F8", fontSize:13, fontWeight:600, padding:"10px 12px", fontFamily:"inherit", outline:"none", cursor:"pointer" }}>
                    {reps.length === 0 && <option>No reps available</option>}
                    {reps.map(r => <option key={r.id} value={r.id}>{r.name || "Rep"}</option>)}
                  </select>
                </div>
                <button onClick={upload} disabled={uploading || !assignTo || !parsed.rows.length} className="btn-primary"
                  style={{ padding:"10px 22px", fontSize:11, opacity: uploading || !assignTo ? 0.5 : 1, cursor: uploading || !assignTo ? "default" : "pointer", flexShrink:0 }}>
                  {uploading ? "Uploading…" : `Send to rep`}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status filter row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <button onClick={() => setStatusFilter("all")}
            style={{ background: statusFilter === "all" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)", border:`1px solid ${statusFilter === "all" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`, color: statusFilter === "all" ? "#F2F4F8" : "#7E8595", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", padding:"8px 14px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s", display:"flex", alignItems:"center", gap:8 }}>
            All <span style={{ fontVariantNumeric:"tabular-nums", color: statusFilter === "all" ? "#A8AEBA" : "#5E6376", fontSize:11 }}>{totalForFilter}</span>
          </button>
          {STATUSES.map(s => (
            <button key={s.v} onClick={() => setStatusFilter(s.v)}
              style={{ background: statusFilter === s.v ? `${s.color}14` : "rgba(255,255,255,0.02)", border:`1px solid ${statusFilter === s.v ? `${s.color}40` : "rgba(255,255,255,0.06)"}`, color: statusFilter === s.v ? s.color : "#7E8595", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", padding:"8px 14px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:s.color, opacity: statusFilter === s.v ? 1 : 0.5 }} />
              {s.label} <span style={{ fontVariantNumeric:"tabular-nums", color: statusFilter === s.v ? s.color : "#5E6376", fontSize:11 }}>{counts[s.v] ?? 0}</span>
            </button>
          ))}
        </div>
        {(statusFilter === "dead" || statusFilter === "contacted") && (counts[statusFilter] ?? 0) > 0 && (() => {
          const c = STATUSES.find(s => s.v === statusFilter)?.color ?? "#DC2626";
          return (
            <button onClick={() => clearByStatus(statusFilter)}
              style={{ background:`${c}14`, border:`1px solid ${c}4D`, color:c, fontSize:10.5, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", padding:"7px 14px", borderRadius:8, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s", display:"flex", alignItems:"center", gap:8 }}
              onMouseEnter={e => { e.currentTarget.style.background=`${c}28`; e.currentTarget.style.borderColor=`${c}80`; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${c}14`; e.currentTarget.style.borderColor=`${c}4D`; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              Clear all ({counts[statusFilter]})
            </button>
          );
        })()}
      </div>

      {/* Leads list */}
      {loading ? (
        <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>Loading…</div>
      ) : visible.length === 0 ? (
        <div className="dash-card" style={{ padding:"48px 24px", textAlign:"center" }}>
          <div style={{ width:54, height:54, borderRadius:16, background:"rgba(6,214,240,0.08)", border:"1px solid rgba(6,214,240,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06D6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:"#D6DAE2", marginBottom:6 }}>No leads {statusFilter === "all" ? "yet" : `· ${statusByV[statusFilter]?.label ?? statusFilter}`}</div>
          <div style={{ fontSize:12, color:"#666C7E" }}>{isAdmin ? "Upload a CSV above to assign leads to a rep." : "When admin sends you leads, they'll show up here."}</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {visible.map((l, i) => {
            const s = statusByV[l.status] ?? STATUSES[0];
            const isExpanded = expandedId === l.id;
            const data = l.data || {};
            return (
              <div key={l.id} className="dash-card" style={{ padding:0, animation:`fadeUp 0.3s ease ${0.03*i}s both`, overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:s.color, opacity:isExpanded?1:0.7 }} />
                <div onClick={() => { setExpandedId(isExpanded ? null : l.id); setDraftNote(l.note || ""); }}
                  style={{ display:"flex", alignItems:"center", gap:dk?16:12, cursor:"pointer", padding:dk?"16px 20px 16px 22px":"14px 14px 14px 18px" }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:dk?14.5:13.5, fontWeight:700, color:"#EEF2F8", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", letterSpacing:"-0.005em" }}>{primaryLine(data)}</div>
                    {secondaryLine(data) && <div style={{ fontSize:11.5, color:"#666C7E", marginTop:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{secondaryLine(data)}</div>}
                  </div>
                  <span style={{ fontSize:9, fontWeight:800, color:s.color, background:`${s.color}14`, border:`1px solid ${s.color}30`, padding:"4px 9px", borderRadius:5, letterSpacing:1.5, textTransform:"uppercase", flexShrink:0 }}>{s.label}</span>
                  {isAdmin && (
                    <span style={{ fontSize:10.5, fontWeight:700, color:"#9098A8", flexShrink:0 }}>→ {repById[l.assigned_to] || "Rep"}</span>
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E6376" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, transform: isExpanded ? "rotate(90deg)" : "none", transition:"transform 0.18s" }}><polyline points="9 18 15 12 9 6"/></svg>
                </div>

                {isExpanded && (
                  <div style={{ padding:dk?"16px 20px 18px 22px":"14px 14px 16px 18px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.2s ease" }}>
                    {/* All CSV fields */}
                    <div style={{ display:"grid", gridTemplateColumns:dk?"repeat(auto-fill, minmax(200px, 1fr))":"1fr", gap:10 }}>
                      {Object.entries(data).map(([k, v]) => (
                        <div key={k}>
                          <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>{k}</div>
                          <div style={{ fontSize:12.5, color:"#EEF2F8", fontWeight:500, wordBreak:"break-word" }}>{renderValue(v)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Status setter */}
                    <div>
                      <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Update status</div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {STATUSES.map(opt => (
                          <button key={opt.v} onClick={() => setStatus(l.id, opt.v)}
                            style={{ background: l.status === opt.v ? `${opt.color}18` : "rgba(255,255,255,0.04)", border:`1px solid ${l.status === opt.v ? `${opt.color}55` : "rgba(255,255,255,0.07)"}`, color: l.status === opt.v ? opt.color : "#9098A8", fontSize:10, fontWeight:800, letterSpacing:1.3, textTransform:"uppercase", padding:"6px 12px", borderRadius:7, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s" }}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Note</div>
                      <textarea
                        value={draftNote}
                        onChange={e => setDraftNote(e.target.value)}
                        placeholder="Call notes, contact attempts, next steps…"
                        rows={2}
                        style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#F2F4F8", fontSize:12.5, fontWeight:500, padding:"10px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box", resize:"vertical", lineHeight:1.5 }}
                      />
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                        <div style={{ fontSize:10, color:"#5E6376" }}>
                          Assigned {new Date(l.created_at).toLocaleDateString("en-US",{ month:"short", day:"numeric" })}
                          {l.assigned_by && repById[l.assigned_by] ? ` · by ${repById[l.assigned_by]}` : ""}
                        </div>
                        <div style={{ display:"flex", gap:6 }}>
                          {isAdmin && (
                            <button onClick={() => removeLead(l.id)} className="btn-ghost" style={{ fontSize:10, padding:"7px 12px", color:"#DC2626", borderColor:"rgba(220,38,38,0.25)", background:"rgba(220,38,38,0.05)" }}>Delete</button>
                          )}
                          <button onClick={() => saveNote(l.id)} className="btn-primary" style={{ fontSize:10, padding:"7px 14px" }}>Save note</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chat({ session, profile, w, width, minW = 220, maxW = 520, onResize }) {
  const [msgs, setMsgs] = useState([]);
  const [reps, setReps] = useState({});
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState({}); // { uid: { name, t: epoch } }
  const scrollRef = useRef(null);
  const stickyRef = useRef(true);
  const channelRef = useRef(null);
  const lastTypingSentRef = useRef(0);
  const dk = w >= 768;
  const isAdmin = profile?.role === "admin";
  const myName = profile?.name || "Rep";

  const load = async () => {
    const [mRes, pRes] = await Promise.all([
      supabase.from("messages").select("id, user_id, body, created_at").order("created_at", { ascending: true }).limit(200),
      supabase.from("profiles").select("id, name, role"),
    ]);
    setMsgs(mRes.data ?? []);
    const pm = {};
    for (const p of pRes.data ?? []) pm[p.id] = { name: p.name || "Rep", role: p.role };
    setReps(pm);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("messages-rt", { config: { broadcast: { self: false } } });
    ch.on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        setMsgs(prev => prev.some(m => m.id === payload.new.id) ? prev : [...prev, payload.new]);
        // Hide typing indicator for the sender as soon as their message arrives
        setTyping(prev => {
          if (!prev[payload.new.user_id]) return prev;
          const next = { ...prev }; delete next[payload.new.user_id]; return next;
        });
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages" }, (payload) => {
        setMsgs(prev => prev.filter(m => m.id !== payload.old.id));
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        if (!payload?.uid || payload.uid === session.user.id) return;
        setTyping(prev => ({ ...prev, [payload.uid]: { name: payload.name || "Rep", t: Date.now() } }));
      })
      .on("broadcast", { event: "stop_typing" }, ({ payload }) => {
        if (!payload?.uid) return;
        setTyping(prev => {
          if (!prev[payload.uid]) return prev;
          const next = { ...prev }; delete next[payload.uid]; return next;
        });
      })
      .subscribe();
    channelRef.current = ch;

    // Tick to expire stale typing entries after 4s of silence
    const tick = setInterval(() => {
      const now = Date.now();
      setTyping(prev => {
        let changed = false;
        const next = {};
        for (const [uid, info] of Object.entries(prev)) {
          if (now - info.t < 4000) next[uid] = info; else changed = true;
        }
        return changed ? next : prev;
      });
    }, 1000);

    return () => { clearInterval(tick); supabase.removeChannel(ch); channelRef.current = null; };
  }, []);

  const broadcastTyping = () => {
    if (!channelRef.current) return;
    const now = Date.now();
    if (now - lastTypingSentRef.current < 1500) return;
    lastTypingSentRef.current = now;
    channelRef.current.send({ type:"broadcast", event:"typing", payload: { uid: session.user.id, name: myName } });
  };

  const broadcastStopTyping = () => {
    if (!channelRef.current) return;
    lastTypingSentRef.current = 0;
    channelRef.current.send({ type:"broadcast", event:"stop_typing", payload: { uid: session.user.id } });
  };

  const onScroll = () => {
    const el = scrollRef.current; if (!el) return;
    stickyRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  useEffect(() => {
    if (loading) return;
    const el = scrollRef.current; if (!el) return;
    if (stickyRef.current) el.scrollTop = el.scrollHeight;
  }, [msgs, loading]);

  const send = async () => {
    const trimmed = body.trim();
    if (!trimmed || sending) return;
    setSending(true);
    const { data, error } = await supabase
      .from("messages")
      .insert({ user_id: session.user.id, body: trimmed })
      .select()
      .single();
    setSending(false);
    if (error || !data) {
      alert(`Couldn't send: ${error?.message ?? "no row returned (likely RLS or missing 'messages' table)"}`);
      return;
    }
    setBody("");
    broadcastStopTyping();
    stickyRef.current = true;
    setMsgs(prev => prev.some(m => m.id === data.id) ? prev : [...prev, data]);
  };

  const onBodyChange = (val) => {
    setBody(val);
    if (val.trim()) broadcastTyping();
    else broadcastStopTyping();
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) { alert(`Couldn't delete: ${error.message}`); return; }
    setMsgs(prev => prev.filter(m => m.id !== id));
  };

  const fmtTime = (iso) => new Date(iso).toLocaleTimeString("en-US",{ hour:"numeric", minute:"2-digit" });
  const fmtDay = (iso) => {
    const d = new Date(iso);
    const today = new Date(); today.setHours(0,0,0,0);
    const ds = new Date(d); ds.setHours(0,0,0,0);
    const diff = Math.round((today - ds) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return d.toLocaleDateString("en-US",{ weekday:"long" });
    return d.toLocaleDateString("en-US",{ month:"short", day:"numeric", year: d.getFullYear() === today.getFullYear() ? undefined : "numeric" });
  };

  // Group messages by day, then collapse runs by same author within 3 minutes
  const grouped = [];
  let lastDay = null, lastUid = null, lastTs = 0;
  for (const m of msgs) {
    const day = fmtDay(m.created_at);
    if (day !== lastDay) {
      grouped.push({ kind: "day", id: `d-${day}-${m.id}`, label: day });
      lastDay = day; lastUid = null;
    }
    const ts = new Date(m.created_at).getTime();
    const continued = m.user_id === lastUid && (ts - lastTs) < 3 * 60 * 1000;
    grouped.push({ kind: "msg", continued, ...m });
    lastUid = m.user_id; lastTs = ts;
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const palette = ["#CCFF00","#06D6F0","#F59E0B","#FFD700","#A78BFA","#22C55E","#FF7AB6","#FB7185"];
  const colorFor = (uid) => {
    let h = 0; for (let i = 0; i < uid.length; i++) h = (h * 31 + uid.charCodeAt(i)) >>> 0;
    return palette[h % palette.length];
  };

  // Hide on small mobile screens (no room for a permanent sidebar).
  if (w < 768) return null;
  const sidebarW = typeof width === "number" ? width : (w >= 1280 ? 320 : 280);

  // Drag-to-resize the sidebar
  const dragRef = useRef({ active: false });
  const startDrag = (e) => {
    e.preventDefault();
    dragRef.current.active = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    const move = (ev) => {
      if (!dragRef.current.active) return;
      const x = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX) ?? 0;
      const next = Math.max(minW, Math.min(maxW, x));
      onResize?.(next);
    };
    const up = () => {
      dragRef.current.active = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
  };

  return (
    <>
      {/* Permanent left sidebar */}
      <aside
        style={{
          position:"fixed", left:0, top:0, bottom:0, zIndex:40,
          width:sidebarW,
          display:"flex", flexDirection:"column",
          background:"linear-gradient(180deg, rgba(18,20,26,0.97), rgba(11,12,16,0.97))",
          backdropFilter:"blur(24px) saturate(140%)",
          WebkitBackdropFilter:"blur(24px) saturate(140%)",
          borderRight:"1px solid rgba(255,255,255,0.06)",
          boxShadow:"8px 0 40px rgba(0,0,0,0.45)",
          overflow:"hidden",
        }}>
        {/* Resize handle */}
        <div
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          title="Drag to resize"
          className="chat-resize-handle"
          style={{
            position:"absolute", top:0, bottom:0, right:-4, width:10,
            cursor:"ew-resize", zIndex:41, touchAction:"none",
          }}>
          <div className="chat-resize-grip" style={{
            position:"absolute", top:"50%", right:1, transform:"translateY(-50%)",
            width:3, height:46, borderRadius:2,
            background:"rgba(255,255,255,0.07)",
            transition:"background 0.15s ease, height 0.15s ease",
          }} />
        </div>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"18px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)", flexShrink:0, position:"relative" }}>
          <div className="display" style={{ fontSize:18, color:"#F2F4F8", letterSpacing:"0.08em" }}>TEAM CHAT</div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, position:"relative", minHeight:0 }}>
          {/* Top fade — softens the line where messages disappear under the header */}
          <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:24, background:"linear-gradient(180deg, rgba(11,12,16,0.85), transparent)", pointerEvents:"none", zIndex:1 }} />
          <div ref={scrollRef} onScroll={onScroll} className="chat-scroll" style={{ position:"absolute", inset:0, overflowY:"auto", padding:dk?"16px 22px":"14px 16px" }}>
          {loading ? (
            <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>Loading…</div>
          ) : msgs.length === 0 ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", textAlign:"center", color:"#666C7E", padding:"40px 20px" }}>
              <div style={{ width:54, height:54, borderRadius:16, background:"rgba(204,255,0,0.08)", border:"1px solid rgba(204,255,0,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:"#D6DAE2", marginBottom:6 }}>No messages yet</div>
              <div style={{ fontSize:12 }}>Send the first one.</div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {grouped.map(g => {
                if (g.kind === "day") return (
                  <div key={g.id} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"22px 0 12px" }}>
                    <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />
                    <div style={{ fontSize:9, fontWeight:800, color:"#7E8595", letterSpacing:2, textTransform:"uppercase", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", padding:"4px 10px", borderRadius:999, whiteSpace:"nowrap" }}>{g.label}</div>
                    <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />
                  </div>
                );
                const isMe = g.user_id === session.user.id;
                const r = reps[g.user_id];
                const name = r?.name || "Rep";
                const isAdminMsg = r?.role === "admin";
                const c = colorFor(g.user_id);
                return (
                  <div key={g.id} style={{ display:"flex", flexDirection: isMe ? "row-reverse" : "row", gap:10, marginTop:g.continued?2:10, alignItems:"flex-end" }}>
                    <div style={{ width:32, height:32, flexShrink:0, visibility: g.continued ? "hidden" : "visible" }}>
                      <div style={{ width:32, height:32, borderRadius:10, background: isMe ? "linear-gradient(135deg,#CCFF00,#88AB00)" : `linear-gradient(135deg,${c},${c}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:12.5, fontWeight:900, color:"#15171E", boxShadow: isMe ? "0 4px 14px rgba(204,255,0,0.32), inset 0 1px 0 rgba(255,255,255,0.4)" : `0 3px 10px ${c}40, inset 0 1px 0 rgba(255,255,255,0.3)` }}>
                        {name[0]?.toUpperCase()}
                      </div>
                    </div>
                    <div style={{ maxWidth:"min(74%, 560px)", display:"flex", flexDirection:"column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                      {!g.continued && (
                        <div style={{ display:"flex", gap:8, alignItems:"baseline", padding: isMe ? "0 4px 5px 0" : "0 0 5px 4px", flexDirection: isMe ? "row-reverse" : "row" }}>
                          <span style={{ fontSize:11, fontWeight:700, color: isMe ? "#CCFF00" : "#D6DAE2", letterSpacing:"-0.005em" }}>{isMe ? "You" : name}</span>
                          {isAdminMsg && !isMe && <span style={{ fontSize:8, fontWeight:800, color:"#F59E0B", background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)", padding:"1.5px 6px", borderRadius:4, letterSpacing:1.5, textTransform:"uppercase" }}>Admin</span>}
                          <span style={{ fontSize:9.5, color:"#5E6376" }}>{fmtTime(g.created_at)}</span>
                        </div>
                      )}
                      <div className="chat-bubble" style={{ position:"relative", padding:"10px 14px", background: isMe ? "linear-gradient(135deg,rgba(204,255,0,0.18),rgba(204,255,0,0.07))" : "linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.035))", border:`1px solid ${isMe ? "rgba(204,255,0,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: g.continued
                        ? (isMe ? "18px 6px 18px 18px" : "6px 18px 18px 18px")
                        : (isMe ? "18px 4px 18px 18px" : "4px 18px 18px 18px"),
                        color:"#EEF2F8", fontSize:13.5, lineHeight:1.5, fontWeight:500, whiteSpace:"pre-wrap", wordBreak:"break-word", boxShadow: isMe ? "0 2px 12px rgba(204,255,0,0.08)" : "0 2px 10px rgba(0,0,0,0.25)", transition:"border-color 0.18s ease, background 0.18s ease" }}>
                        {g.body}
                        {(isMe || isAdmin) && (
                          <button onClick={() => remove(g.id)} title="Delete message" className="msg-del"
                            style={{ position:"absolute", top:-8, right: isMe ? -8 : "auto", left: isMe ? "auto" : -8, width:22, height:22, borderRadius:6, background:"rgba(20,22,28,0.95)", border:"1px solid rgba(255,255,255,0.1)", color:"#666C7E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, transition:"all 0.15s", opacity:0, pointerEvents:"none" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </div>

        {/* Typing indicator */}
        {(() => {
          const others = Object.entries(typing).filter(([uid]) => uid !== session.user.id).map(([, v]) => v.name);
          if (others.length === 0) return null;
          const label = others.length === 1
            ? `${others[0]} is typing`
            : others.length === 2
              ? `${others[0]} and ${others[1]} are typing`
              : `${others.length} people are typing`;
          return (
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:dk?"8px 22px 0":"6px 16px 0", flexShrink:0, color:"#A0A4B0", fontSize:11.5, fontWeight:600, height:22, animation:"fadeIn 0.2s ease" }}>
              <span className="typing-dots" aria-hidden="true">
                <span /><span /><span />
              </span>
              <span>{label}</span>
            </div>
          );
        })()}

        {/* Composer */}
        <div style={{ display:"flex", gap:10, padding:dk?"12px 18px 16px":"10px 14px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", background:"linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.025))", flexShrink:0, alignItems:"flex-end" }}>
          <div className="chat-input-wrap" style={{ flex:1, position:"relative" }}>
            <textarea
              value={body}
              onChange={e => onBodyChange(e.target.value)}
              onBlur={() => { if (!body.trim()) broadcastStopTyping(); }}
              onKeyDown={onKeyDown}
              placeholder="Chat"
              rows={1}
              className="chat-input"
              style={{ width:"100%", background:"rgba(255,255,255,0.045)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:14, color:"#F2F4F8", fontSize:13.5, fontWeight:500, padding:"12px 15px", fontFamily:"inherit", outline:"none", boxSizing:"border-box", resize:"none", lineHeight:1.5, maxHeight:140, transition:"border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease" }}
            />
          </div>
          <button onClick={send} disabled={sending || !body.trim()} className="btn-primary chat-send"
            aria-label="Send message"
            style={{ width:42, height:42, padding:0, borderRadius:14, opacity: sending || !body.trim() ? 0.45 : 1, cursor: sending || !body.trim() ? "default" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </aside>

      <style>{`
        .chat-bubble:hover { border-color: rgba(255,255,255,0.14) !important; }
        .chat-bubble:hover .msg-del { opacity: 1 !important; pointer-events: auto !important; }
        .msg-del:hover { color: #DC2626 !important; border-color: rgba(220,38,38,0.4) !important; }

        @keyframes typingBounce { 0%,80%,100% { transform: translateY(0); opacity: 0.4 } 40% { transform: translateY(-3px); opacity: 1 } }
        .typing-dots { display:inline-flex; gap:3px; align-items:center }
        .typing-dots span { width:4px; height:4px; border-radius:50%; background:#9098A8; display:inline-block; animation: typingBounce 1.2s ease-in-out infinite }
        .typing-dots span:nth-child(2) { animation-delay: 0.15s }
        .typing-dots span:nth-child(3) { animation-delay: 0.3s }

        .chat-resize-handle:hover .chat-resize-grip,
        .chat-resize-handle:active .chat-resize-grip { background: rgba(255,255,255,0.18) !important; height: 56px !important; }

        .chat-input:focus {
          border-color: rgba(255,255,255,0.18) !important;
          background: rgba(255,255,255,0.055) !important;
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.25); }

        .chat-send:not(:disabled):hover { filter: brightness(1.05); }
        .chat-send:not(:disabled):active { filter: brightness(0.95); }

        .chat-scroll::-webkit-scrollbar { width: 5px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 6px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(204,255,0,0.35); }
      `}</style>
    </>
  );
}

function Dashboard({ session, profile, w, completedModules, quizScores, onGoTab, onOpenModule }) {
  const [sales, setSales] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [repProfiles, setRepProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const dk = w >= 768;
  const wd = w >= 1100;
  const isAdmin = profile?.role === "admin";

  const today = new Date(); today.setHours(0,0,0,0);
  const todayStr = today.toISOString().split("T")[0];
  const mon = new Date(today); mon.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);

  const load = async () => {
    const [salesRes, schedRes, profRes] = await Promise.all([
      supabase.from("sales").select("id, user_id, amount, note, sale_date, created_at").order("created_at", { ascending: false }),
      supabase.from("schedule").select("id, user_id, date").eq("date", todayStr),
      supabase.from("profiles").select("id, name"),
    ]);
    setSales(salesRes.data ?? []);
    setSchedule(schedRes.data ?? []);
    const pm = {};
    for (const p of profRes.data ?? []) pm[p.id] = p.name || "Rep";
    setRepProfiles(pm);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("dashboard-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "schedule" }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const weekSales = sales.filter(s => { const d = new Date(s.sale_date); return d >= mon && d <= sun; });
  const byRepWeek = {};
  for (const s of weekSales) {
    if (!byRepWeek[s.user_id]) byRepWeek[s.user_id] = { count: 0, total: 0 };
    byRepWeek[s.user_id].count++;
    byRepWeek[s.user_id].total += s.amount ?? 0;
  }
  const rankedWeek = Object.entries(byRepWeek)
    .map(([uid, stats]) => ({ uid, name: repProfiles[uid] || "Rep", ...stats }))
    .sort((a, b) => b.count - a.count || b.total - a.total);

  const myWeek = byRepWeek[session.user.id] ?? { count: 0, total: 0 };
  const myRankWeek = rankedWeek.findIndex(r => r.uid === session.user.id);

  const totalModules = CATS.filter(x => x.t === "MODULE" || x.t === "BOOTCAMP").length;
  const doneModules = CATS.filter(x => (x.t === "MODULE" || x.t === "BOOTCAMP") && completedModules.has(x.k)).length;
  const trainingPct = totalModules > 0 ? Math.round((doneModules / totalModules) * 100) : 0;
  const totalQuizzes = CATS.filter(x => x.t === "QUIZ").length;
  const doneQuizzes = CATS.filter(x => {
    if (x.t !== "QUIZ") return false;
    const qs = quizScores[x.k];
    return qs && qs.total > 0 && qs.score >= qs.total;
  }).length;

  const nextModule = CATS.find(x => (x.t === "MODULE" || x.t === "BOOTCAMP") && !completedModules.has(x.k));
  const todaysReps = schedule.map(e => repProfiles[e.user_id] || "Rep");
  const recentSales = sales.slice(0, 5);
  const MEDALS = ["🥇","🥈","🥉"];

  // Daily breakdown (Mon..Sun) for the current week
  const dayLabels = ["M","T","W","T","F","S","S"];
  const myDaily = Array(7).fill(0);
  const teamDaily = Array(7).fill(0);
  const teamDailyAmount = Array(7).fill(0);
  for (const s of weekSales) {
    const d = new Date(s.sale_date); d.setHours(0,0,0,0);
    const idx = Math.max(0, Math.min(6, Math.round((d - mon) / 86400000)));
    if (s.user_id === session.user.id) myDaily[idx]++;
    teamDaily[idx]++;
    teamDailyAmount[idx] += s.amount ?? 0;
  }
  const teamWeekTotal = teamDailyAmount.reduce((a,b) => a+b, 0);
  const teamWeekCount = teamDaily.reduce((a,b) => a+b, 0);
  const todayIdx = Math.max(0, Math.min(6, Math.round((today - mon) / 86400000)));

  const tierObj = TIERS.find(t => t.v === profile?.tier) ?? null;
  const tierIdx = tierObj ? TIERS.indexOf(tierObj) : -1;

  const onCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Weekly sales bar chart (SVG)
  const BarChart = ({ data, accent, height = 64, highlight = -1 }) => {
    const max = Math.max(1, ...data);
    const cols = data.length;
    const gap = 8;
    return (
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap, alignItems:"end", height:height+22 }}>
        {data.map((v, i) => {
          const h = Math.round((v / max) * height);
          const isToday = i === highlight;
          return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ height, width:"100%", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <div style={{
                  width:"100%",
                  height: h || 3,
                  background: v > 0
                    ? `linear-gradient(180deg,${accent},${accent}66)`
                    : "rgba(255,255,255,0.06)",
                  borderRadius:6,
                  boxShadow: v > 0 ? `0 0 12px ${accent}40` : "none",
                  border: isToday ? `1px solid ${accent}` : "none",
                  transition:"height 0.5s cubic-bezier(0.4,0,0.2,1)"
                }} />
              </div>
              <div style={{ fontSize:9, fontWeight:800, color: isToday ? accent : "#5E6376", letterSpacing:1 }}>{dayLabels[i]}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Circular progress ring
  const Ring = ({ pct, accent, size = 88, stroke = 8, label, sublabel }) => {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return (
      <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={accent} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            style={{ transition:"stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)", filter:`drop-shadow(0 0 6px ${accent}55)` }} />
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <div style={{ fontSize:18, fontWeight:900, color:"#F2F4F8", lineHeight:1, letterSpacing:"-0.02em" }}>{label}</div>
          {sublabel && <div style={{ fontSize:8.5, fontWeight:800, color:"#666C7E", letterSpacing:1.5, textTransform:"uppercase", marginTop:3 }}>{sublabel}</div>}
        </div>
      </div>
    );
  };

  const Card = ({ title, action, actionOnClick, children, fullWidth }) => (
    <div className="dash-card" onMouseMove={onCardMove}
      style={{ padding:dk?"22px 24px":"18px 20px", gridColumn: fullWidth && wd ? "1 / -1" : undefined }}>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:16, position:"relative", gap:12 }}>
        <div className="display" style={{ fontSize:dk?18:16, color:"#F2F4F8", letterSpacing:"0.07em" }}>{title}</div>
        {action && (
          <button onClick={actionOnClick} className="btn-ghost"
            style={{ fontSize:9.5, padding:"5px 9px", borderRadius:7, height:"auto" }}>
            {action} →
          </button>
        )}
      </div>
      <div style={{ position:"relative" }}>{children}</div>
    </div>
  );

  if (loading) return <div style={{ textAlign:"center", padding:60, color:"#7E8290", fontSize:13 }}>Loading…</div>;

  return (
    <div style={{ animation:"fadeUp 0.35s ease", display:"grid", gridTemplateColumns: wd ? "1fr 1fr" : "1fr", gap:dk?18:14 }}>

      {/* Tier Card — full width */}
      <div className="dash-card" onMouseMove={onCardMove}
        style={{ padding:dk?"22px 26px":"18px 18px", gridColumn: wd ? "1 / -1" : undefined }}>
        <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:2.4, textTransform:"uppercase", marginBottom:14 }}>Current Tier</div>
        <div style={{ display:"flex", alignItems:"center", gap:dk?12:6, position:"relative" }}>
          {/* Connector line that runs behind the badges */}
          <div aria-hidden="true" style={{ position:"absolute", left:0, right:0, top:dk?22:18, height:1, background:"linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04))", zIndex:0 }} />
          {TIERS.map((t, i) => {
            const active = t.v === profile?.tier;
            const passed = tierIdx >= 0 && i < tierIdx;
            const hero = "#CCFF00";
            return (
              <div key={t.v} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:8, position:"relative", zIndex:1 }}>
                <div style={{
                  width:dk?46:34, height:dk?46:34, borderRadius:dk?13:10,
                  background: active ? "rgba(204,255,0,0.10)" : passed ? "rgba(204,255,0,0.04)" : "rgba(255,255,255,0.025)",
                  border: `1.5px solid ${active ? hero : passed ? "rgba(204,255,0,0.30)" : "rgba(255,255,255,0.07)"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow: active ? `0 0 28px rgba(204,255,0,0.32), 0 0 0 4px rgba(204,255,0,0.06)` : "none",
                  transition:"all 0.22s ease",
                }}>
                  {active ? (
                    <span style={{ fontSize:dk?18:14, lineHeight:1 }}>{t.emoji}</span>
                  ) : passed ? (
                    <svg width={dk?14:11} height={dk?14:11} viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.18)" }} />
                  )}
                </div>
                <div className="display" style={{ fontSize:dk?13:11, color: active ? "#F2F4F8" : passed ? "#A0A4B0" : "#5E6376", letterSpacing:"0.06em" }}>{t.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Week */}
      <Card title="Your Week" accent="#CCFF00">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {[
            { v: myRankWeek >= 0 ? myRankWeek + 1 : "—", unit: myRankWeek >= 0 ? "rank" : null, l: "Rank",     hero: false },
            { v: myWeek.count,                                unit: null,                                  l: "Sales",    hero: myWeek.count > 0 },
            { v: trainingPct,                                 unit: "%",                                   l: "Training", hero: trainingPct === 100 },
            { v: doneQuizzes,                                 unit: `/${totalQuizzes}`,                    l: "Quizzes",  hero: doneQuizzes === totalQuizzes && totalQuizzes > 0 },
          ].map(s => (
            <div key={s.l} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:3 }}>
                <span className="mono" style={{ fontSize:dk?24:20, fontWeight:600, color: s.hero ? "#CCFF00" : "#F2F4F8", lineHeight:1 }}>{s.v}</span>
                {s.unit && <span className="mono" style={{ fontSize:dk?13:11, fontWeight:500, color: s.hero ? "rgba(204,255,0,0.55)" : "#5E6376", lineHeight:1 }}>{s.unit}</span>}
              </div>
              <div style={{ fontSize:8.5, color:"#5E6376", textTransform:"uppercase", letterSpacing:1.6, fontWeight:700, marginTop:6 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:16, padding:"14px 14px 10px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:12 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={{ fontSize:9, fontWeight:800, color:"#666C7E", letterSpacing:1.8, textTransform:"uppercase" }}>Daily Activity</div>
            {myWeek.total > 0 && (
              <div className="mono" style={{ fontSize:12, fontWeight:600, color:"#CCFF00" }}>${myWeek.total.toLocaleString()}</div>
            )}
          </div>
          <BarChart data={myDaily} accent="#CCFF00" highlight={todayIdx} height={dk?56:48} />
        </div>
      </Card>

      {/* Top Performers */}
      <Card title="This Week" action="Leaderboard" actionOnClick={() => onGoTab("leaderboard")}>
        {rankedWeek.length === 0 ? (
          <button onClick={() => onGoTab("leaderboard")}
            style={{ display:"block", width:"100%", padding:"10px 0", background:"transparent", border:"none", color:"#CCFF00", fontSize:13, fontWeight:700, letterSpacing:0.3, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
            Be first on the board →
          </button>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {rankedWeek.slice(0, 3).map((rep, i) => {
              const isMe = rep.uid === session.user.id;
              const leadCount = rankedWeek[0]?.count || 1;
              const pct = Math.max(8, Math.round((rep.count / leadCount) * 100));
              const barColor = isMe ? "#CCFF00" : i===0 ? "#FFD700" : "#888D9C";
              return (
                <div key={rep.uid} style={{ position:"relative", overflow:"hidden", background: isMe ? "rgba(204,255,0,0.06)" : i===0 ? "rgba(255,215,0,0.04)" : "rgba(255,255,255,0.025)", border:`1px solid ${isMe ? "rgba(204,255,0,0.18)" : i===0 ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.06)"}`, borderRadius:10, padding:"10px 12px" }}>
                  <div style={{ position:"absolute", inset:0, width:`${pct}%`, background:`linear-gradient(90deg,${barColor}18,${barColor}04)`, transition:"width 0.6s ease" }} />
                  <div style={{ position:"relative", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ fontSize:16, minWidth:22, textAlign:"center" }}>{MEDALS[i]}</div>
                    <div style={{ flex:1, minWidth:0, fontSize:12.5, fontWeight:700, color: isMe ? "#F2F4F8" : "#D6DAE2", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {rep.name}{isMe ? <span style={{ fontSize:9, fontWeight:700, color:"#CCFF00", letterSpacing:1.5, marginLeft:7, textTransform:"uppercase" }}>you</span> : ""}
                    </div>
                    <div style={{ fontSize:17, fontWeight:900, color: barColor, lineHeight:1 }}>{rep.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Continue Training */}
      <Card title="Training" accent="#CCFF00" action="All Modules" actionOnClick={() => onGoTab("training")}>
        <div style={{ display:"flex", alignItems:"center", gap:dk?18:14 }}>
          <Ring pct={trainingPct} accent="#CCFF00" size={dk?92:78} stroke={dk?9:8} label={`${trainingPct}%`} sublabel={`${doneModules}/${totalModules}`} />
          <div style={{ flex:1, minWidth:0 }}>
            {nextModule ? (
              <div onClick={() => onOpenModule(nextModule.k)}
                style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"10px 12px", transition:"border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(204,255,0,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                <div style={{ width:42, height:42, borderRadius:11, background:IC_GRAD[nextModule.t], display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, boxShadow:IC_SHADOW[nextModule.t] }}>{nextModule.ic}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:9, fontWeight:800, color: nextModule.t === "MODULE" ? "#CCFF00" : "#F59E0B", letterSpacing:2, marginBottom:3, textTransform:"uppercase" }}>Up Next</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#EEF2F8", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{nextModule.sub}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555A6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            ) : (
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:"rgba(34,197,94,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:"#CCFF00" }}>All modules complete</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Today on the Floor */}
      <Card title="On the Floor Today" action="Schedule" actionOnClick={() => onGoTab("scheduling")}>
        {todaysReps.length === 0 ? (
          <button onClick={() => onGoTab("scheduling")}
            style={{ display:"block", width:"100%", padding:"10px 0", background:"transparent", border:"none", color:"#CCFF00", fontSize:13, fontWeight:700, letterSpacing:0.3, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
            {isAdmin ? "Get reps on the floor →" : "Book yourself in →"}
          </button>
        ) : (
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {todaysReps.map((name, i) => {
              const isMe = schedule[i]?.user_id === session.user.id;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:7, background:isMe?"rgba(204,255,0,0.08)":"rgba(255,255,255,0.04)", border:`1px solid ${isMe?"rgba(204,255,0,0.2)":"rgba(255,255,255,0.07)"}`, borderRadius:8, padding:"6px 10px" }}>
                  <div style={{ width:22, height:22, borderRadius:6, background: isMe ? "linear-gradient(135deg,#CCFF00,#6E9100)" : "rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color: isMe?"#15171E":"#666C7E" }}>
                    {name[0]?.toUpperCase()}
                  </div>
                  <div style={{ fontSize:12, fontWeight:600, color: isMe?"#F2F4F8":"#B0B5C4" }}>{name}</div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Team Pulse */}
      <Card title="Team Pulse · This Week">
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
              <span className="mono" style={{ fontSize:dk?28:24, fontWeight:600, color:"#F2F4F8", lineHeight:1 }}>{teamWeekCount}</span>
              <span style={{ fontSize:13, color:"#5E6376", fontWeight:700 }}>{teamWeekCount === 1 ? "sale" : "sales"}</span>
            </div>
            {teamWeekTotal > 0 && (
              <div className="mono" style={{ fontSize:12, color:"#CCFF00", fontWeight:600, marginTop:6 }}>
                ${teamWeekTotal.toLocaleString()} <span style={{ color:"#5E6376", fontWeight:600, fontFamily:"inherit" }}>team revenue</span>
              </div>
            )}
          </div>
          <div style={{ textAlign:"right" }}>
            <div className="mono" style={{ fontSize:18, fontWeight:600, color:"#F2F4F8", lineHeight:1 }}>{rankedWeek.length}</div>
            <div style={{ fontSize:8.5, color:"#5E6376", textTransform:"uppercase", letterSpacing:1.5, fontWeight:800, marginTop:4 }}>Active reps</div>
          </div>
        </div>
        <BarChart data={teamDaily} accent="#CCFF00" highlight={todayIdx} height={dk?72:60} />
      </Card>

      {/* Recent Sales */}
      <Card title="Recent Sales" action="All Sales" actionOnClick={() => onGoTab("leaderboard")}>
        {recentSales.length === 0 ? (
          <button onClick={() => onGoTab("leaderboard")}
            style={{ display:"block", width:"100%", padding:"10px 0", background:"transparent", border:"none", color:"#CCFF00", fontSize:13, fontWeight:700, letterSpacing:0.3, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
            Log your first sale →
          </button>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {recentSales.map(s => (
              <div key={s.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:9 }}>
                <div style={{ width:28, height:28, borderRadius:8, background: s.user_id===session.user.id ? "linear-gradient(135deg,#CCFF00,#6E9100)" : "rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color: s.user_id===session.user.id ? "#15171E" : "#555A6A", flexShrink:0 }}>
                  {(repProfiles[s.user_id] || "R")[0]?.toUpperCase()}
                </div>
                <div style={{ flex:1, minWidth:0, fontSize:12, color:"#C4C9D4", fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {repProfiles[s.user_id] || "Rep"}
                </div>
                {s.amount > 0 && <div className="mono" style={{ fontSize:13, fontWeight:600, color:"#CCFF00", flexShrink:0 }}>${Number(s.amount).toLocaleString()}</div>}
              </div>
            ))}
          </div>
        )}
      </Card>

    </div>
  );
}

function Leaderboard({ session, profile, w }) {
  const [sales, setSales] = useState([]);
  const [repProfiles, setRepProfiles] = useState({});
  const [bonuses, setBonuses] = useState([]);
  const [period, setPeriod] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [dealAmt, setDealAmt] = useState(null);
  const [customAmt, setCustomAmt] = useState("");
  const [retainer, setRetainer] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingBonus, setEditingBonus] = useState(null);
  const [showAddBonus, setShowAddBonus] = useState(false);
  const [bonusForm, setBonusForm] = useState({ label:"", threshold:"", amount:"", period:"month", description:"" });
  const DEAL_OPTS = [1497, 2497, 4497];
  const RETAINER_OPTS = [49, 197, 297];
  const dk = w >= 768;
  const isAdmin = profile?.role === "admin";

  const loadBonuses = async () => {
    const { data } = await supabase.from("monthly_bonuses").select("*").order("created_at", { ascending: false }).limit(1);
    setBonuses(data ?? []);
  };

  const load = async () => {
    const [salesRes, profRes] = await Promise.all([
      supabase.from("sales").select("id, user_id, amount, retainer, note, sale_date, created_at").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, name"),
    ]);
    setSales(salesRes.data ?? []);
    const pm = {};
    for (const p of profRes.data ?? []) pm[p.id] = p.name || "Rep";
    setRepProfiles(pm);
  };

  useEffect(() => {
    load();
    loadBonuses();
    const ch = supabase.channel("sales-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "monthly_bonuses" }, loadBonuses)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const resetForm = () => { setDealAmt(null); setCustomAmt(""); setRetainer(null); setNote(""); setShowAdd(false); };
  const resetBonusForm = () => { setBonusForm({ label:"", threshold:"", amount:"", period:"month", description:"" }); setShowAddBonus(false); setEditingBonus(null); };

  const saveBonus = async () => {
    const threshold = parseInt(bonusForm.threshold);
    const amount = parseFloat(bonusForm.amount);
    if (isNaN(threshold) || threshold <= 0 || isNaN(amount) || amount <= 0) return;
    const payload = {
      label: bonusForm.label.trim() || null,
      threshold,
      amount,
      period: bonusForm.period === "week" ? "week" : "month",
      description: bonusForm.description.trim() || null,
    };
    if (editingBonus) {
      const { error } = await supabase
        .from("monthly_bonuses")
        .update(payload)
        .eq("id", editingBonus.id);
      if (error) { alert(`Couldn't save bonus: ${error.message}`); return; }
    } else {
      // Replace any prior active bonus with the new one.
      const delRes = await supabase.from("monthly_bonuses").delete().not("id", "is", null);
      if (delRes.error) { alert(`Couldn't clear old bonus: ${delRes.error.message}`); return; }
      const insRes = await supabase.from("monthly_bonuses").insert(payload);
      if (insRes.error) { alert(`Couldn't add bonus: ${insRes.error.message}`); return; }
    }
    resetBonusForm();
  };

  const deleteBonus = async (id) => {
    const { error } = await supabase.from("monthly_bonuses").delete().eq("id", id);
    if (error) { alert(`Couldn't delete bonus: ${error.message}`); }
  };

  const addSale = async () => {
    const finalAmt = dealAmt === "custom" ? parseFloat(customAmt) : dealAmt;
    if (!finalAmt || isNaN(finalAmt) || finalAmt <= 0) return;
    if (retainer === null) return;
    setSaving(true);
    const { data } = await supabase.from("sales").insert({
      user_id: session.user.id,
      amount: finalAmt,
      retainer: retainer || null,
      note: note.trim() || null,
      sale_date: new Date().toISOString().split("T")[0],
    }).select().single();
    if (data) setSales(prev => [data, ...prev]);
    resetForm(); setSaving(false);
  };

  const now = new Date();
  const filtered = sales.filter(s => {
    if (period === "all") return true;
    const d = new Date(s.sale_date);
    if (period === "month") return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    if (period === "week") {
      const mon = new Date(now); mon.setHours(0,0,0,0);
      mon.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
      const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
      return d >= mon && d <= sun;
    }
    return true;
  });

  const byRep = {};
  for (const s of filtered) {
    if (!byRep[s.user_id]) byRep[s.user_id] = { count: 0, total: 0, retainerTotal: 0 };
    byRep[s.user_id].count++;
    byRep[s.user_id].total += s.amount ?? 0;
    byRep[s.user_id].retainerTotal += s.retainer ?? 0;
  }
  const ranked = Object.entries(byRep)
    .map(([uid, stats]) => ({ uid, name: repProfiles[uid] || "Rep", ...stats }))
    .sort((a, b) => b.count - a.count || b.total - a.total);

  const MEDALS = ["🥇","🥈","🥉"];
  const PERIODS = [
    { key:"all", label:"All Time" },
    { key:"month", label:"This Month" },
    { key:"week", label:"This Week" },
  ];

  const myEntry = ranked.find(r => r.uid === session.user.id);
  const myRank = myEntry ? ranked.indexOf(myEntry) + 1 : null;

  return (
    <div style={{ animation:"fadeUp 0.35s ease" }}>

      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:3, gap:2 }}>
          {PERIODS.map(p => (
            <button key={p.key} onClick={() => setPeriod(p.key)}
              style={{ background: period===p.key ? "rgba(255,215,0,0.12)" : "none", border: period===p.key ? "1px solid rgba(255,215,0,0.2)" : "1px solid transparent", borderRadius:7, color: period===p.key ? "#FFD700" : "#666C7E", fontSize:10.5, fontWeight:700, letterSpacing:1.5, padding:"8px 16px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", transition:"all 0.15s" }}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(v => !v)}
          style={{ background:"#CCFF00", border:"none", borderRadius:9, color:"#15171E", fontSize:11, fontWeight:800, letterSpacing:1.5, padding:"10px 20px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", boxShadow:"0 4px 16px rgba(204,255,0,0.35)", transition:"all 0.18s" }}>
          + Log Sale
        </button>
      </div>

      {/* Add sale form */}
      {showAdd && (
        <div style={{ background:"#1A1C24", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:22, marginBottom:20, animation:"fadeUp 0.2s ease" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div style={{ fontSize:10, fontWeight:800, color:"#666C7E", letterSpacing:2.5, textTransform:"uppercase" }}>Log a Sale</div>
            <button onClick={resetForm} style={{ background:"none", border:"none", color:"#444856", fontSize:18, cursor:"pointer", lineHeight:1, padding:0 }}>×</button>
          </div>

          {/* Step 1: Deal Value */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:9.5, fontWeight:700, color: dealAmt ? "#22C55E" : "#F59E0B", letterSpacing:2, textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
              {dealAmt ? "✓ " : "1 · "}Deal Value
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {DEAL_OPTS.map(v => (
                <button key={v} onClick={() => setDealAmt(v)}
                  style={{ background: dealAmt===v ? "rgba(204,255,0,0.15)" : "rgba(255,255,255,0.04)", border:`1px solid ${dealAmt===v ? "rgba(204,255,0,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius:10, color: dealAmt===v ? "#DDFF40" : "#9CA3AF", fontSize:14, fontWeight:700, padding:"12px 20px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                  ${v.toLocaleString()}
                </button>
              ))}
              <button onClick={() => setDealAmt("custom")}
                style={{ background: dealAmt==="custom" ? "rgba(204,255,0,0.15)" : "rgba(255,255,255,0.04)", border:`1px solid ${dealAmt==="custom" ? "rgba(204,255,0,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius:10, color: dealAmt==="custom" ? "#DDFF40" : "#9CA3AF", fontSize:13, fontWeight:700, padding:"12px 16px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                Custom
              </button>
            </div>
            {dealAmt === "custom" && (
              <input autoFocus type="number" min="0" value={customAmt} onChange={e => setCustomAmt(e.target.value)}
                placeholder="Enter amount…"
                style={{ marginTop:10, width:"100%", maxWidth:200, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#F2F4F8", fontSize:14, fontWeight:600, padding:"10px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
            )}
          </div>

          {/* Step 2: Retainer (only shown after deal value picked) */}
          {dealAmt && (
            <div style={{ marginBottom:20, animation:"fadeUp 0.2s ease" }}>
              <div style={{ fontSize:9.5, fontWeight:700, color: retainer !== null ? "#22C55E" : "#F59E0B", letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>
                {retainer !== null ? "✓ " : "2 · "}Maintenance Retainer
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {RETAINER_OPTS.map(v => (
                  <button key={v} onClick={() => setRetainer(v)}
                    style={{ background: retainer===v ? "rgba(6,214,240,0.15)" : "rgba(255,255,255,0.04)", border:`1px solid ${retainer===v ? "rgba(6,214,240,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius:10, color: retainer===v ? "#5DE9F8" : "#9CA3AF", fontSize:14, fontWeight:700, padding:"12px 20px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                    ${v}/mo
                  </button>
                ))}
                <button onClick={() => setRetainer(0)}
                  style={{ background: retainer===0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border:`1px solid ${retainer===0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`, borderRadius:10, color: retainer===0 ? "#D6DAE2" : "#9CA3AF", fontSize:13, fontWeight:700, padding:"12px 16px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                  No Retainer
                </button>
              </div>
            </div>
          )}

          {/* Note + Save (only shown after both steps done) */}
          {dealAmt && retainer !== null && (
            <div style={{ animation:"fadeUp 0.2s ease" }}>
              <div style={{ fontSize:9.5, fontWeight:700, color:"#444856", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Note (optional)</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <input type="text" value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => e.key === "Enter" && addSale()}
                  placeholder="Client name, product, etc."
                  style={{ flex:"1 1 200px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, color:"#F2F4F8", fontSize:13, fontWeight:500, padding:"10px 12px", fontFamily:"inherit", outline:"none" }} />
                <button onClick={addSale} disabled={saving}
                  style={{ background:"#CCFF00", border:"none", borderRadius:8, color:"#15171E", fontSize:12, fontWeight:800, letterSpacing:1, padding:"10px 24px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", opacity:saving?0.6:1, flexShrink:0 }}>
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* My rank badge */}
      {myRank && (
        <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(204,255,0,0.06)", border:"1px solid rgba(204,255,0,0.15)", borderRadius:12, padding:"12px 18px", marginBottom:16 }}>
          <div style={{ fontSize:20 }}>{MEDALS[myRank-1] ?? `#${myRank}`}</div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#CCFF00", letterSpacing:1.5, textTransform:"uppercase" }}>Your Rank</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#D6DAE2" }}>{myEntry.count} {myEntry.count === 1 ? "sale" : "sales"}{myEntry.total > 0 ? ` · $${myEntry.total.toLocaleString()}` : ""}</div>
          </div>
        </div>
      )}

      {/* Leaderboard list */}
      {ranked.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"#444856", fontSize:13 }}>
          No sales logged {period === "week" ? "this week" : period === "month" ? "this month" : "yet"}.
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {ranked.map((rep, i) => {
            const isMe = rep.uid === session.user.id;
            const isTop = i < 3;
            const medal = MEDALS[i];
            return (
              <div key={rep.uid} style={{ display:"flex", alignItems:"center", gap:dk?16:12, background: isMe ? "rgba(204,255,0,0.06)" : i===0 ? "rgba(255,215,0,0.04)" : "rgba(255,255,255,0.025)", border:`1px solid ${isMe ? "rgba(204,255,0,0.18)" : i===0 ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.06)"}`, borderRadius:13, padding:dk?"16px 20px":"13px 16px", transition:"all 0.15s" }}>
                <div style={{ fontSize: isTop ? 22 : 14, fontWeight:800, color:"#444856", minWidth:32, textAlign:"center", lineHeight:1 }}>
                  {medal ?? `#${i+1}`}
                </div>
                <div style={{ width:36, height:36, borderRadius:9, background: isMe ? "linear-gradient(135deg,#CCFF00,#6E9100)" : "linear-gradient(135deg,#2A2D38,#1E2028)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:800, color: isMe ? "#15171E" : "#888D9C", flexShrink:0, boxShadow: isMe ? "0 2px 10px rgba(204,255,0,0.3)" : "none" }}>
                  {rep.name[0]?.toUpperCase()}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:700, color: isMe ? "#F2F4F8" : "#D6DAE2", lineHeight:1 }}>{rep.name}{isMe ? <span style={{ fontSize:9, fontWeight:700, color:"#CCFF00", letterSpacing:1.5, marginLeft:8, textTransform:"uppercase" }}>you</span> : ""}</div>
                  <div style={{ fontSize:11, color:"#444856", marginTop:3, display:"flex", gap:8 }}>
                    {rep.total > 0 && <span style={{ color:"#22C55E66" }}>${rep.total.toLocaleString()}</span>}
                    {rep.retainerTotal > 0 && <span style={{ color:"#06D6F066" }}>+${rep.retainerTotal.toLocaleString()}/mo retainer</span>}
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:dk?26:22, fontWeight:900, color: i===0 ? "#FFD700" : isMe ? "#CCFF00" : "#666C7E", lineHeight:1, letterSpacing:"-0.02em" }}>{rep.count}</div>
                  <div style={{ fontSize:9, color:"#5E6376", textTransform:"uppercase", letterSpacing:1.5, fontWeight:700, marginTop:3 }}>{rep.count === 1 ? "sale" : "sales"}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent activity feed */}
      {filtered.length > 0 && (
        <div style={{ marginTop:32 }}>
          <div style={{ fontSize:9.5, fontWeight:800, color:"#444856", letterSpacing:3, textTransform:"uppercase", marginBottom:14 }}>Recent Activity</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {filtered.slice(0, 10).map(s => {
              const isOwn = s.user_id === session.user.id;
              return (
                <div key={s.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:10 }}>
                  <div style={{ width:28, height:28, borderRadius:7, background: isOwn ? "linear-gradient(135deg,#CCFF00,#6E9100)" : "rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color: isOwn ? "#15171E" : "#666C7E", flexShrink:0 }}>
                    {(repProfiles[s.user_id] || "R")[0]?.toUpperCase()}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#D6DAE2" }}>{repProfiles[s.user_id] || "Rep"}</span>
                    {s.note && <span style={{ fontSize:11, color:"#444856" }}> — {s.note}</span>}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2, flexShrink:0 }}>
                    {s.amount > 0 && <div className="mono" style={{ fontSize:13, fontWeight:600, color:"#CCFF00" }}>${Number(s.amount).toLocaleString()}</div>}
                    {s.retainer > 0 && <div className="mono" style={{ fontSize:10, fontWeight:600, color:"#9098A8" }}>+${Number(s.retainer).toLocaleString()}/mo</div>}
                  </div>
                  <div style={{ fontSize:10, color:"#5E6376", flexShrink:0 }}>{new Date(s.sale_date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
                  {isOwn && (
                    <button onClick={async () => {
                      setSales(prev => prev.filter(x => x.id !== s.id));
                      const { error } = await supabase.from("sales").delete().eq("id", s.id);
                      if (error) {
                        alert(`Couldn't delete sale: ${error.message}`);
                        setSales(prev => prev.some(x => x.id === s.id) ? prev : [s, ...prev].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
                      }
                    }} style={{ background:"none", border:"none", color:"#5E6376", fontSize:16, cursor:"pointer", padding:"0 2px", lineHeight:1, flexShrink:0, transition:"color 0.15s" }}
                      onMouseEnter={e => e.target.style.color="#DC2626"}
                      onMouseLeave={e => e.target.style.color="#5E6376"}>
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Bonus */}
      {(() => {
        const activeBonus = bonuses[0] ?? null;
        const computeMyCount = (b) => sales.filter(s => {
          if (s.user_id !== session.user.id) return false;
          const d = new Date(s.sale_date);
          if (b.period === "week") {
            const mon = new Date(now); mon.setHours(0,0,0,0);
            mon.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
            const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
            return d >= mon && d <= sun;
          }
          return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        }).length;
        return (
          <div style={{ marginTop:40 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ fontSize:16 }}>🏆</div>
                <div style={{ fontSize:10, fontWeight:800, color:"#FFD700", letterSpacing:3, textTransform:"uppercase" }}>Active Bonus</div>
              </div>
              {isAdmin && !activeBonus && !showAddBonus && (
                <button onClick={() => { resetBonusForm(); setShowAddBonus(true); }}
                  style={{ background:"rgba(255,215,0,0.08)", border:"1px solid rgba(255,215,0,0.2)", borderRadius:8, color:"#FFD700", fontSize:10, fontWeight:700, letterSpacing:1.5, padding:"7px 14px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" }}>
                  + Set Bonus
                </button>
              )}
            </div>

            {/* Add / Edit bonus form (admin only) */}
            {isAdmin && (showAddBonus || editingBonus) && (
              <div style={{ background:"#1A1C24", border:"1px solid rgba(255,215,0,0.12)", borderRadius:14, padding:18, marginBottom:16, animation:"fadeUp 0.2s ease" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#666C7E", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>{editingBonus ? "Edit Active Bonus" : "Set Active Bonus"}</div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#444856", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Period</div>
                  <div style={{ display:"flex", gap:6 }}>
                    {[{v:"week", l:"This Week"}, {v:"month", l:"This Month"}].map(p => (
                      <button key={p.v} type="button" onClick={() => setBonusForm(f => ({...f, period:p.v}))}
                        style={{ flex:1, background: bonusForm.period===p.v ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.04)", border:`1px solid ${bonusForm.period===p.v ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius:8, color: bonusForm.period===p.v ? "#FFD700" : "#9CA3AF", fontSize:12, fontWeight:700, padding:"10px 0", cursor:"pointer", fontFamily:"inherit" }}>
                        {p.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:10 }}>
                  <div style={{ flex:"1 1 120px" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"#444856", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Sales Needed</div>
                    <input type="number" min="1" value={bonusForm.threshold} onChange={e => setBonusForm(p=>({...p, threshold:e.target.value}))} placeholder="e.g. 5"
                      style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, color:"#F2F4F8", fontSize:13, fontWeight:600, padding:"9px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
                  </div>
                  <div style={{ flex:"1 1 120px" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"#444856", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Bonus ($)</div>
                    <input type="number" min="1" value={bonusForm.amount} onChange={e => setBonusForm(p=>({...p, amount:e.target.value}))} placeholder="e.g. 500"
                      style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, color:"#F2F4F8", fontSize:13, fontWeight:600, padding:"9px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
                  </div>
                </div>
                <div style={{ marginBottom:8, fontSize:11, color:"#7E8595", fontWeight:500 }}>
                  Hit <span style={{ color:"#FFD700", fontWeight:700 }}>{bonusForm.threshold || "?"} sale{bonusForm.threshold==="1"?"":"s"}</span> {bonusForm.period === "week" ? "this week" : "this month"} to earn <span style={{ color:"#FFD700", fontWeight:700 }}>${bonusForm.amount ? Number(bonusForm.amount).toLocaleString() : "?"}</span>.
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#444856", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Description (optional)</div>
                  <input value={bonusForm.description} onChange={e => setBonusForm(p=>({...p, description:e.target.value}))} placeholder="Any extra details…"
                    style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, color:"#F2F4F8", fontSize:13, fontWeight:500, padding:"9px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={saveBonus} style={{ background:"#FFD700", border:"none", borderRadius:8, color:"#111", fontSize:12, fontWeight:800, letterSpacing:1, padding:"10px 22px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" }}>Save</button>
                  <button onClick={resetBonusForm} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, color:"#666C7E", fontSize:12, fontWeight:700, padding:"10px 16px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Active bonus card */}
            {!activeBonus && !showAddBonus ? (
              <div style={{ fontSize:12, color:"#5E6376", padding:"20px 0" }}>{isAdmin ? "No active bonus. Click + Set Bonus to create one." : "No active bonus right now."}</div>
            ) : activeBonus ? (() => {
              const b = activeBonus;
              const myCount = computeMyCount(b);
              const reached = myCount >= (b.threshold ?? Infinity);
              const pct = Math.min(100, b.threshold ? (myCount / b.threshold) * 100 : 0);
              const periodLabel = b.period === "week" ? "this week" : "this month";
              return (
                <div style={{ background: reached ? "linear-gradient(180deg,rgba(255,215,0,0.10),rgba(255,215,0,0.04))" : "rgba(255,255,255,0.03)", border:`1px solid ${reached ? "rgba(255,215,0,0.32)" : "rgba(255,255,255,0.08)"}`, borderRadius:16, padding:dk?"22px 26px":"18px 20px", position:"relative" }}>
                  {reached && <div style={{ position:"absolute", top:14, right:16, fontSize:10, fontWeight:800, color:"#FFD700", letterSpacing:1.5, textTransform:"uppercase" }}>✓ Reached</div>}
                  <div style={{ fontSize:9.5, fontWeight:800, color:"#FFD700", letterSpacing:2.5, textTransform:"uppercase", marginBottom:6 }}>{b.period === "week" ? "Weekly Goal" : "Monthly Goal"}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:10, flexWrap:"wrap", marginBottom:10 }}>
                    <div style={{ fontSize:dk?34:28, fontWeight:900, color: reached ? "#FFD700" : "#F2F4F8", lineHeight:1, letterSpacing:"-0.02em" }}>${Number(b.amount).toLocaleString()}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#9CA3AF" }}>for {b.threshold} {b.threshold===1?"sale":"sales"} {periodLabel}</div>
                  </div>
                  {b.label && <div style={{ fontSize:13, fontWeight:600, color:"#D6DAE2", marginBottom:b.description?4:10 }}>{b.label}</div>}
                  {b.description && <div style={{ fontSize:12, color:"#7E8595", marginBottom:10 }}>{b.description}</div>}
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
                    <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#CCFF00,#FFD700)", borderRadius:4, transition:"width 0.4s" }} />
                    </div>
                    <div style={{ fontSize:12, fontWeight:700, color: reached ? "#FFD700" : "#D6DAE2", whiteSpace:"nowrap" }}>{myCount} / {b.threshold}</div>
                  </div>
                  {isAdmin && (
                    <div style={{ display:"flex", gap:8, marginTop:14 }}>
                      <button onClick={() => { setEditingBonus(b); setBonusForm({ label:b.label??'', threshold:b.threshold??'', amount:b.amount, period:b.period||"month", description:b.description??'' }); setShowAddBonus(false); }}
                        style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, color:"#9CA3AF", fontSize:10, fontWeight:700, padding:"6px 14px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", letterSpacing:1 }}>Edit</button>
                      <button onClick={() => deleteBonus(b.id)}
                        style={{ background:"none", border:"none", color:"#5E6376", fontSize:10, fontWeight:700, padding:"6px 10px", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", letterSpacing:1, transition:"color 0.15s" }}
                        onMouseEnter={e=>e.target.style.color="#DC2626"} onMouseLeave={e=>e.target.style.color="#5E6376"}>End Bonus</button>
                    </div>
                  )}
                </div>
              );
            })() : null}
          </div>
        );
      })()}

    </div>
  );
}

const TIERS = [
  { v: "trial",    label: "Trial",    short: "TRIAL", emoji: "🆕", color: "#06D6F0" },
  { v: "bronze",   label: "Bronze",   short: "T1",    emoji: "🟤", color: "#B8732A" },
  { v: "silver",   label: "Silver",   short: "T2",    emoji: "⚪", color: "#C0C8D8" },
  { v: "gold",     label: "Gold",     short: "T3",    emoji: "🟡", color: "#FFD700" },
  { v: "platinum", label: "Platinum", short: "T4",    emoji: "🟣", color: "#A78BFA" },
  { v: "diamond",  label: "Diamond",  short: "T5",    emoji: "💎", color: "#CCFF00" },
];
const TIER_BY_VALUE = Object.fromEntries(TIERS.map(t => [t.v, t]));

const ROLEABLE_TABS = [
  { key:"dashboard",     label:"Dashboard",     color:"#22C55E" },
  { key:"announcements", label:"Announcements", color:"#F59E0B" },
  { key:"chat",          label:"Chat",          color:"#CCFF00" },
  { key:"leads",         label:"Leads",         color:"#06D6F0" },
  { key:"leaderboard",   label:"Leaderboard",   color:"#FFD700" },
  { key:"scheduling",    label:"Scheduling",    color:"#F59E0B" },
  { key:"training",      label:"Training",      color:"#CCFF00" },
  { key:"reference",     label:"Reference",     color:"#06D6F0" },
];

function AdminPanel({ profile, roles, setRoles, onBack, w, onSignOut }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState(null); // role.name or "__new"
  const [draftRole, setDraftRole] = useState({ name:"", label:"", allowed_tabs:[] });
  const dk = w >= 768;

  useEffect(() => {
    const load = async () => {
      const [profilesRes, progressRes, scoresRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at"),
        supabase.from("module_progress").select("user_id"),
        supabase.from("quiz_scores").select("user_id, quiz_id, score, total"),
      ]);
      const byUser = {};
      for (const p of progressRes.data ?? []) byUser[p.user_id] = (byUser[p.user_id] ?? 0) + 1;
      const quizByUser = {};
      for (const s of scoresRes.data ?? []) {
        if (!quizByUser[s.user_id]) quizByUser[s.user_id] = {};
        const ex = quizByUser[s.user_id][s.quiz_id];
        if (!ex || s.score / s.total > ex.score / ex.total) quizByUser[s.user_id][s.quiz_id] = s;
      }
      setUsers((profilesRes.data ?? []).map(u => ({
        ...u,
        modulesCompleted: byUser[u.id] ?? 0,
        quizzesAttempted: Object.keys(quizByUser[u.id] ?? {}).length,
        avgScore: Object.values(quizByUser[u.id] ?? {}).reduce((a, s) => a + s.score / s.total, 0) /
          Math.max(Object.keys(quizByUser[u.id] ?? {}).length, 1) * 100,
      })));
      setLoading(false);
    };
    load();
  }, []);

  const setUserRole = async (userId, newRole) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)
      .select()
      .single();
    if (error || !data) {
      alert(`Couldn't update role: ${error?.message ?? "no row updated (likely RLS)"}`);
      return;
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: data.role } : u));
  };

  const startNewRole = () => {
    setEditingRole("__new");
    setDraftRole({ name:"", label:"", allowed_tabs:["dashboard"] });
  };
  const startEditRole = (r) => {
    setEditingRole(r.name);
    setDraftRole({ name:r.name, label:r.label, allowed_tabs:[...(r.allowed_tabs || [])] });
  };
  const cancelEditRole = () => { setEditingRole(null); setDraftRole({ name:"", label:"", allowed_tabs:[] }); };

  const saveRole = async () => {
    const slug = (draftRole.name || draftRole.label).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug || !draftRole.label.trim()) { alert("Need a role label."); return; }
    const payload = { name: slug, label: draftRole.label.trim(), allowed_tabs: draftRole.allowed_tabs };
    const { data, error } = await supabase.from("roles").upsert(payload).select().single();
    if (error || !data) { alert(`Couldn't save role: ${error?.message ?? "no row"}`); return; }
    setRoles(prev => {
      const i = prev.findIndex(r => r.name === data.name);
      if (i >= 0) { const next = [...prev]; next[i] = { ...prev[i], ...data }; return next; }
      return [...prev, data];
    });
    cancelEditRole();
  };

  const deleteRole = async (r) => {
    if (r.is_builtin) { alert("Built-in roles can't be deleted."); return; }
    const inUse = users.filter(u => u.role === r.name).length;
    if (inUse > 0) { alert(`${inUse} user${inUse===1?" is":"s are"} still assigned to ${r.label}. Reassign them first.`); return; }
    if (!confirm(`Delete role ${r.label}?`)) return;
    const { error } = await supabase.from("roles").delete().eq("name", r.name);
    if (error) { alert(`Couldn't delete: ${error.message}`); return; }
    setRoles(prev => prev.filter(x => x.name !== r.name));
  };

  const toggleTabInDraft = (key) => {
    setDraftRole(d => ({ ...d, allowed_tabs: d.allowed_tabs.includes(key) ? d.allowed_tabs.filter(k => k !== key) : [...d.allowed_tabs, key] }));
  };

  const setTier = async (userId, tier) => {
    const next = tier || null;
    const { data, error } = await supabase
      .from("profiles")
      .update({ tier: next })
      .eq("id", userId)
      .select()
      .single();
    if (error || !data) {
      console.error("setTier failed:", error);
      alert(`Couldn't save tier: ${error?.message ?? "no row updated (likely RLS or missing 'tier' column)"}`);
      return;
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, tier: data.tier } : u));
  };

  const resetFinalExam = async (userId, userName) => {
    if (!confirm(`Reset the Final Exam attempt for ${userName || "this rep"}? They'll be able to take it again.`)) return;
    const { error } = await supabase.from("quiz_scores").delete().eq("user_id", userId).eq("quiz_id", "q-final");
    if (error) { alert(`Couldn't reset final exam: ${error.message}`); return; }
    alert(`Final Exam attempt cleared for ${userName || "rep"}.`);
  };

  return (
    <div>
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,8,12,0.92)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", padding:dk?"0 44px":"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button className="back-btn" onClick={onBack} style={{ background:"none", border:"none", color:"#CCFF00", fontSize:13, fontWeight:700, cursor:"pointer", padding:"6px 0", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Portal
          </button>
          <button onClick={onSignOut} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#7E8595", fontSize:10, fontWeight:700, cursor:"pointer", padding:"8px 16px", borderRadius:9, fontFamily:"inherit", letterSpacing:1.5, textTransform:"uppercase" }}>Sign Out</button>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:dk?"0 44px 90px":"0 20px 90px" }}>
        <div style={{ padding:"40px 0 28px", animation:"fadeUp 0.5s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <div style={{ width:32, height:4, background:"linear-gradient(90deg,#F59E0B,transparent)", borderRadius:4 }} />
            <div style={{ fontSize:9.5, fontWeight:800, color:"#F59E0B", letterSpacing:3.5, textTransform:"uppercase" }}>Admin</div>
          </div>
          <h2 style={{ fontSize:dk?30:24, fontWeight:800, color:"#F2F4F8", margin:"0 0 8px", letterSpacing:"-0.03em" }}>Admin Panel</h2>
          <p style={{ fontSize:14, color:"#7E8595", margin:0, fontWeight:500 }}>Rep accounts, progress, and access management.</p>
        </div>

        <a href={SUPABASE_USERS_URL} target="_blank" rel="noreferrer" className="card-hover vid-card"
          style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, background:"linear-gradient(135deg,rgba(20,16,8,0.95),rgba(14,12,6,0.95))", border:"1px solid rgba(245,158,11,0.2)", borderRadius:18, padding:"20px 24px", marginBottom:28, textDecoration:"none", animation:"fadeUp 0.5s ease 0.1s both", boxShadow:"0 4px 24px rgba(0,0,0,0.35)" }}>
          <div>
            <div style={{ fontSize:9.5, fontWeight:800, color:"#F59E0B", letterSpacing:3, marginBottom:6, textTransform:"uppercase" }}>Add New Rep</div>
            <div style={{ fontSize:13, color:"#7E8595", lineHeight:1.6, fontWeight:500 }}>Open Supabase → Authentication → Users → Add User. New accounts appear here automatically.</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        {/* Roles management section */}
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, gap:10 }}>
            <div style={{ fontSize:9.5, fontWeight:800, color:"#A78BFA", letterSpacing:3, textTransform:"uppercase" }}>Roles & Access</div>
            {editingRole === null && (
              <button onClick={startNewRole} className="btn-primary" style={{ fontSize:10, padding:"7px 14px" }}>+ New Role</button>
            )}
          </div>

          {editingRole !== null && (
            <div style={{ background:"rgba(167,139,250,0.05)", border:"1px solid rgba(167,139,250,0.22)", borderRadius:14, padding:dk?"20px 22px":"16px 18px", marginBottom:14 }}>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
                <input value={draftRole.label} onChange={e => setDraftRole(d => ({ ...d, label: e.target.value }))} placeholder="Role name (e.g. Sales Manager)" autoFocus
                  style={{ flex:"1 1 240px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.10)", borderRadius:10, color:"#F2F4F8", fontSize:13, fontWeight:600, padding:"10px 12px", fontFamily:"inherit", outline:"none" }} />
              </div>
              <div style={{ fontSize:9.5, fontWeight:800, color:"#7E8595", letterSpacing:1.8, textTransform:"uppercase", marginBottom:10 }}>Allowed Tabs</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                {ROLEABLE_TABS.map(t => {
                  const on = draftRole.allowed_tabs.includes(t.key);
                  return (
                    <button key={t.key} onClick={() => toggleTabInDraft(t.key)}
                      style={{ background: on ? `${t.color}18` : "rgba(255,255,255,0.03)", border:`1px solid ${on ? `${t.color}55` : "rgba(255,255,255,0.08)"}`, color: on ? t.color : "#7E8595", fontSize:11, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", padding:"7px 13px", borderRadius:9, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:t.color, opacity: on ? 1 : 0.4 }} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={saveRole} className="btn-primary" style={{ fontSize:10, padding:"8px 18px" }}>Save role</button>
                <button onClick={cancelEditRole} className="btn-ghost" style={{ fontSize:10, padding:"8px 16px" }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display:"grid", gridTemplateColumns:dk?"1fr 1fr":"1fr", gap:10 }}>
            {roles.map(r => {
              const userCount = users.filter(u => u.role === r.name).length;
              const tabs = r.allowed_tabs || [];
              return (
                <div key={r.name} style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:dk?"16px 18px":"14px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:10 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:10, minWidth:0 }}>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#F2F4F8", letterSpacing:1.5, lineHeight:1 }}>{r.label}</div>
                      {r.is_builtin && <span style={{ fontSize:9, fontWeight:800, color:"#7E8595", letterSpacing:1.5, textTransform:"uppercase" }}>Built-in</span>}
                      <span style={{ fontSize:11, color:"#7E8595", fontVariantNumeric:"tabular-nums" }}>· {userCount} {userCount===1?"member":"members"}</span>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={() => startEditRole(r)} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#9098A8", fontSize:10, fontWeight:700, cursor:"pointer", padding:"5px 10px", borderRadius:7, fontFamily:"inherit", letterSpacing:1.2, textTransform:"uppercase" }}>Edit</button>
                      {!r.is_builtin && (
                        <button onClick={() => deleteRole(r)} style={{ background:"rgba(220,38,38,0.06)", border:"1px solid rgba(220,38,38,0.18)", color:"#DC2626", fontSize:10, fontWeight:700, cursor:"pointer", padding:"5px 10px", borderRadius:7, fontFamily:"inherit", letterSpacing:1.2, textTransform:"uppercase" }}>Delete</button>
                      )}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {tabs.length === 0 ? <span style={{ fontSize:11, color:"#5E6376" }}>No tabs assigned</span> :
                      ROLEABLE_TABS.filter(t => tabs.includes(t.key)).map(t => (
                        <span key={t.key} style={{ fontSize:9.5, fontWeight:700, color:t.color, letterSpacing:1.2, textTransform:"uppercase", background:`${t.color}14`, padding:"3px 8px", borderRadius:5, border:`1px solid ${t.color}30` }}>{t.label}</span>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User list */}
        {loading ? (
          <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>Loading reps…</div>
        ) : users.length === 0 ? (
          <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>No users yet.</div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ fontSize:9.5, fontWeight:800, color:"#06D6F0", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>People · {users.length}</div>
            {users.map((u, i) => (
              <div key={u.id} style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"20px 24px":"16px 18px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", animation:`fadeUp 0.4s ease ${0.05*i}s both`,  }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"linear-gradient(135deg,#CCFF00,#5C7A00)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#15171E", fontSize:18, flexShrink:0, boxShadow:"0 4px 14px rgba(204,255,0,0.35)" }}>
                  {u.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div style={{ flex:1, minWidth:140 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#EEF2F8" }}>{u.name || "—"}</div>
                  <div style={{ display:"flex", gap:6, marginTop:4, flexWrap:"wrap" }}>
                    {(() => {
                      const isAdminRole = u.role === "admin";
                      const c = isAdminRole ? "#F59E0B" : "#06D6F0";
                      const label = roles.find(r => r.name === u.role)?.label ?? u.role ?? "—";
                      return (
                        <span style={{ display:"inline-block", fontSize:9, fontWeight:800, color:c, letterSpacing:2, textTransform:"uppercase", background:`${c}1A`, padding:"3px 9px", borderRadius:5, border:`1px solid ${c}33` }}>{label}</span>
                      );
                    })()}
                    {u.tier && TIER_BY_VALUE[u.tier] && (
                      <span style={{ display:"inline-block", fontSize:9, fontWeight:800, color: TIER_BY_VALUE[u.tier].color, letterSpacing:2, textTransform:"uppercase", background:`${TIER_BY_VALUE[u.tier].color}1A`, padding:"3px 9px", borderRadius:5, border:`1px solid ${TIER_BY_VALUE[u.tier].color}33` }}>
                        {TIER_BY_VALUE[u.tier].emoji} {TIER_BY_VALUE[u.tier].label} · {TIER_BY_VALUE[u.tier].short}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display:"flex", gap:dk?24:16, flexWrap:"wrap" }}>
                  {[
                    [u.modulesCompleted, "Completed", "#22C55E"],
                    [u.quizzesAttempted, "Quizzes", "#10B981"],
                    ...(u.quizzesAttempted > 0 ? [[Math.round(u.avgScore)+"%", "Avg Score", u.avgScore>=90?"#22C55E":u.avgScore>=70?"#F59E0B":"#DC2626"]] : []),
                  ].map(([val, lab, col]) => (
                    <div key={lab} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:20, fontWeight:900, color:col, lineHeight:1, letterSpacing:"-0.02em" }}>{val}</div>
                      <div style={{ fontSize:9, color:"#666C7E", textTransform:"uppercase", letterSpacing:1.5, marginTop:3, fontWeight:700 }}>{lab}</div>
                    </div>
                  ))}
                </div>
                <select value={u.tier ?? ""} onChange={e => setTier(u.id, e.target.value)}
                  style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#D6DAE2", fontSize:11, fontWeight:700, cursor:"pointer", padding:"9px 12px", borderRadius:10, fontFamily:"inherit", letterSpacing:0.5, flexShrink:0, outline:"none" }}>
                  <option value="">— No tier —</option>
                  {TIERS.map(t => (
                    <option key={t.v} value={t.v}>{t.emoji} {t.label} ({t.short})</option>
                  ))}
                </select>
                {u.id !== profile.id && (
                  <select value={u.role || "rep"} onChange={e => setUserRole(u.id, e.target.value)}
                    style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#D6DAE2", fontSize:11, fontWeight:700, cursor:"pointer", padding:"9px 12px", borderRadius:10, fontFamily:"inherit", letterSpacing:0.5, flexShrink:0, outline:"none" }}>
                    {roles.map(r => <option key={r.name} value={r.name}>{r.label}</option>)}
                    {!roles.find(r => r.name === u.role) && u.role && <option value={u.role}>{u.role}</option>}
                  </select>
                )}
                <button onClick={() => resetFinalExam(u.id, u.name)}
                  title="Clear this rep's Final Exam attempt so they can retake it"
                  style={{ background:"rgba(255,215,0,0.05)", border:"1px solid rgba(255,215,0,0.22)", color:"#FFD700", fontSize:10, fontWeight:800, cursor:"pointer", padding:"9px 12px", borderRadius:10, fontFamily:"inherit", letterSpacing:1.5, flexShrink:0, textTransform:"uppercase" }}>
                  Reset Final
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTENT VIEWER
   ═══════════════════════════════════════════ */
function Viewer({ ck, onBack, w, onComplete }) {
  const [oi, setOi] = useState(0);
  const ref = useRef(null);
  const c = C[ck];
  const dk = w >= 768;
  const accent = ck.includes("bc") ? "#F59E0B" : ck.includes("call") || ck.includes("comp") || ck.includes("onboard") ? "#06D6F0" : "#CCFF00";
  const accentBg = ck.includes("bc") ? "rgba(245,158,11,0.08)" : ck.includes("call") || ck.includes("comp") || ck.includes("onboard") ? "rgba(6,214,240,0.08)" : "rgba(204,255,0,0.08)";

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior:"smooth" });
    setOi(0);
    if (onComplete) onComplete(ck);
  }, [ck]);

  return (
    <div ref={ref}>
      {/* Sticky nav */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,8,12,0.9)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:820, margin:"0 auto", padding:dk?"0 44px":"0 20px", height:52, display:"flex", alignItems:"center" }}>
          <button className="back-btn" onClick={onBack} style={{ background:"none", border:"none", color:accent, fontSize:13, fontWeight:700, cursor:"pointer", padding:"6px 0", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", letterSpacing:0.3 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Portal
          </button>
        </div>
      </div>

      <div style={{ maxWidth:820, margin:"0 auto", padding:dk?"0 44px":"0 20px" }}>
        {/* Hero */}
        <div style={{ padding:"40px 0 28px", animation:"fadeUp 0.5s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <div style={{ width:32, height:4, background:`linear-gradient(90deg,${accent},transparent)`, borderRadius:4 }} />
            <div style={{ fontSize:9.5, fontWeight:800, color:accent, letterSpacing:3.5, textTransform:"uppercase" }}>
              {ck.includes("m") && !ck.includes("bc") ? "Training Module" : ck.includes("bc") ? "Bootcamp" : ck.includes("q-") ? "Quiz" : "Reference"}
            </div>
          </div>
          <h2 style={{ fontSize:dk?32:24, fontWeight:800, color:"#F2F4F8", margin:"0 0 10px", letterSpacing:"-0.03em", lineHeight:1.15 }}>{c.t}</h2>
          <p style={{ fontSize:14, color:"#7E8595", margin:0, lineHeight:1.6, fontWeight:500 }}>{c.st}</p>
        </div>


        {/* Sections */}
        <div style={{ paddingBottom:90 }}>
          {ck === "comp-plan" ? <CompPlanView dk={dk} /> : c.s.map((s, i) => {
            const open = oi === i;
            return (
              <div key={i} style={{ marginBottom:5, animation:`fadeUp 0.4s ease ${0.04*i}s both` }}>
                <button className="acc-btn" onClick={() => setOi(open ? null : i)}
                  style={{
                    width:"100%", textAlign:"left",
                    background: open ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.018)",
                    border: `1px solid ${open ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: open ? "12px 12px 0 0" : 12,
                    padding: dk ? "20px 24px" : "17px 20px",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between",
                    fontFamily:"inherit", minHeight:58
                  }}>
                  <span style={{ fontSize:dk?14.5:13.5, fontWeight:700, color: open ? "#F2F4F8" : "#8892A0", lineHeight:1.35, paddingRight:16 }}>{s.h}</span>
                  <div style={{ width:30, height:30, borderRadius:9, background: open ? accentBg : "rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.25s", border:`1px solid ${open ? accent+"25" : "transparent"}` }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? accent : "#5E6376"} strokeWidth="2.5" strokeLinecap="round" style={{ transition:"transform 0.25s ease", transform: open ? "rotate(180deg)" : "none" }}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </button>
                {open && (
                  <div style={{
                    background:"rgba(255,255,255,0.012)",
                    border:"1px solid rgba(255,255,255,0.10)", borderTop:"none",
                    borderRadius:"0 0 12px 12px", padding:dk?"28px 26px 30px":"22px 20px 26px",
                    animation:"fadeIn 0.25s ease",
                  }}>
                    <RichText text={s.b} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const COMP_TIERS = [
  { name:"DIAMOND",  num:5, tag:"Top 1%",      rev:"$40K+ collected / mo",  pay:"Salary + 38–40% commission",  monthlyMin:"$20,000+",  monthlyMax:null,           yearly:"$240K – $420K+ / yr",  grad:"linear-gradient(135deg,#A78BFA 0%,#06D6F0 100%)", border:"rgba(167,139,250,0.45)", glow:"rgba(167,139,250,0.35)", text:"#0E0F14", featured:true },
  { name:"PLATINUM", num:4, tag:"Elite",       rev:"$25K – $40K / mo",      pay:"$20/hr + 36% commission",     monthlyMin:"$12,460",   monthlyMax:"$17,860",      yearly:"$150K – $214K / yr",   grad:"linear-gradient(135deg,#E2E8F0 0%,#64748B 100%)", border:"rgba(226,232,240,0.35)", glow:"rgba(148,163,184,0.25)", text:"#0E0F14", featured:false },
  { name:"GOLD",     num:3, tag:"Performer",   rev:"$12K – $25K / mo",      pay:"$15/hr + 33% commission",     monthlyMin:"$6,560",    monthlyMax:"$10,850",      yearly:"$79K – $130K / yr",    grad:"linear-gradient(135deg,#FFD700 0%,#D97706 100%)", border:"rgba(255,215,0,0.45)",   glow:"rgba(255,215,0,0.3)",    text:"#0E0F14", featured:false },
  { name:"SILVER",   num:2, tag:"Building",    rev:"$5K – $12K / mo",       pay:"33% commission",              monthlyMin:"$1,650",    monthlyMax:"$3,960",       yearly:"$20K – $48K / yr",     grad:"linear-gradient(135deg,#CBD5E1 0%,#64748B 100%)", border:"rgba(203,213,225,0.3)",  glow:"rgba(203,213,225,0.2)",  text:"#0E0F14", featured:false },
  { name:"BRONZE",   num:1, tag:"Starting",    rev:"$1.5K – $5K / mo",      pay:"30% commission",              monthlyMin:"$450",      monthlyMax:"$1,500",       yearly:"$5K – $18K / yr",      grad:"linear-gradient(135deg,#F97316 0%,#7C2D12 100%)", border:"rgba(249,115,22,0.35)",  glow:"rgba(249,115,22,0.2)",   text:"#FFF6EE", featured:false },
  { name:"TRIAL",    num:0, tag:"First month", rev:"Onboarding period",     pay:"25% commission",              monthlyMin:"Variable",  monthlyMax:null,           yearly:"Placed into tier at month-end", grad:"linear-gradient(135deg,#475569 0%,#1E293B 100%)", border:"rgba(148,163,184,0.18)", glow:"rgba(71,85,105,0.15)",   text:"#F1F5F9", featured:false },
];

const COMP_RULES = [
  "Bracket placement is based on collected revenue (cash in bank), not signed contracts.",
  "Hourly tiers (Gold and above) are paid in arrears — qualify in month X, hourly starts month X+1.",
  "Reps are reassessed monthly. 2 consecutive months below the current bracket triggers demotion.",
  "3 consecutive months in Bronze = parted ways.",
  "Maintain / Optimize MRR attach: one-time bonus equal to 1× the monthly fee at signing.",
  "Maintain MRR counts toward bracket placement only the signing month.",
  "Hourly assumes 40 hrs / wk (~173 hrs / mo).",
];

function CompStat({ label, value, accent, dk }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:dk?"10px 14px":"9px 12px", minWidth:dk?120:"auto" }}>
      <div style={{ fontSize:9, fontWeight:800, color:accent, letterSpacing:1.8, textTransform:"uppercase" }}>{label}</div>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?24:22, color:"#F2F4F8", letterSpacing:1, lineHeight:1.1, marginTop:3, fontVariantNumeric:"tabular-nums" }}>{value}</div>
    </div>
  );
}

function CompMetric({ label, value, dk }) {
  return (
    <div>
      <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:1.8, textTransform:"uppercase" }}>{label}</div>
      <div style={{ fontSize:dk?13.5:12.5, color:"#D6DAE2", fontWeight:600, marginTop:4, lineHeight:1.35 }}>{value}</div>
    </div>
  );
}

function CompPlanView({ dk }) {
  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{
        position:"relative", overflow:"hidden",
        background:"rgba(167,139,250,0.05)",
        border:"1px solid rgba(167,139,250,0.18)", borderRadius:14,
        padding:dk?"30px 32px":"24px 22px", marginBottom:22,
      }}>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:24, height:3, background:"linear-gradient(90deg,#A78BFA,transparent)", borderRadius:4 }} />
            <div style={{ fontSize:9.5, fontWeight:800, color:"#A78BFA", letterSpacing:3, textTransform:"uppercase" }}>Earning Potential</div>
          </div>
          <div style={{ display:"flex", flexDirection:dk?"row":"column", alignItems:dk?"flex-end":"flex-start", gap:dk?28:18, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?68:54, lineHeight:1, color:"#F2F4F8", letterSpacing:1, fontVariantNumeric:"tabular-nums" }}>$240K+</div>
              <div style={{ fontSize:12, color:"#A8AEBA", marginTop:6, fontWeight:500 }}>Year 1 projection for top performers</div>
            </div>
            <div style={{ display:"flex", gap:dk?14:10, flexWrap:"wrap" }}>
              <CompStat label="Top monthly take-home" value="$20K+" accent="#A78BFA" dk={dk} />
              <CompStat label="Top commission rate" value="40%" accent="#06D6F0" dk={dk} />
              <CompStat label="Tiers" value="5" accent="#FFD700" dk={dk} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0 16px" }}>
        <div style={{ fontSize:9.5, fontWeight:800, color:"#06D6F0", letterSpacing:3.5, textTransform:"uppercase" }}>Tier Ladder</div>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,0.05),transparent)" }} />
      </div>

      <div style={{ display:"grid", gap:14 }}>
        {COMP_TIERS.map((t, i) => (
          <div key={t.name} style={{
            position:"relative", overflow:"hidden",
            background:"rgba(255,255,255,0.022)",
            border:`1px solid ${t.featured ? t.border : "rgba(255,255,255,0.06)"}`,
            borderRadius:14,
            padding:dk?"24px 26px":"20px 18px",
            animation:`fadeUp 0.4s ease ${0.05*i}s both`,
          }}>
            <div style={{ position:"relative", display:"flex", flexDirection:dk?"row":"column", alignItems:dk?"center":"flex-start", gap:dk?22:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0, minWidth:dk?170:"auto" }}>
                <div style={{
                  width:dk?54:48, height:dk?54:48, borderRadius:12,
                  background:t.grad, color:t.text,
                  display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
                  flexShrink:0,
                }}>
                  <div style={{ fontSize:9, fontWeight:800, letterSpacing:1.4, opacity:0.7 }}>TIER</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, lineHeight:1, letterSpacing:1 }}>{t.num || "—"}</div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?26:22, color:"#F2F4F8", letterSpacing:2.5, lineHeight:1 }}>{t.name}</div>
                  <div style={{ fontSize:10.5, color:"#7E8595", letterSpacing:1.8, textTransform:"uppercase", fontWeight:700, marginTop:5 }}>{t.tag}</div>
                </div>
              </div>
              <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:dk?14:10, width:"100%" }}>
                <CompMetric label="Revenue" value={t.rev} dk={dk} />
                <CompMetric label="Pay" value={t.pay} dk={dk} />
              </div>
              <div style={{ flexShrink:0, textAlign:dk?"right":"left", minWidth:dk?180:"auto", borderTop:dk?"none":"1px solid rgba(255,255,255,0.05)", paddingTop:dk?0:14, width:dk?"auto":"100%" }}>
                <div style={{ fontSize:9.5, fontWeight:800, color:t.featured?"#A78BFA":"#06D6F0", letterSpacing:2, textTransform:"uppercase" }}>Take-Home</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?38:32, lineHeight:1.05, color:"#F2F4F8", letterSpacing:0.5, marginTop:4, fontVariantNumeric:"tabular-nums" }}>
                  {t.monthlyMin}
                  {t.monthlyMax ? <span style={{ fontSize:dk?20:18, color:"#7E8595" }}>{" – " + t.monthlyMax}</span> : null}
                  {!t.monthlyMax && t.monthlyMin !== "Variable" ? <span style={{ fontSize:dk?20:18, color:"#7E8595" }}> /mo</span> : null}
                </div>
                <div style={{ fontSize:11.5, color:"#7E8595", marginTop:6, fontWeight:500 }}>{t.yearly}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"36px 0 16px" }}>
        <div style={{ fontSize:9.5, fontWeight:800, color:"#F59E0B", letterSpacing:3.5, textTransform:"uppercase" }}>Rules & Mechanics</div>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,0.05),transparent)" }} />
      </div>

      <div style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:dk?"24px 26px":"20px 18px" }}>
        {COMP_RULES.map((r, i) => (
          <div key={i} style={{ display:"flex", gap:14, padding:"12px 0", borderTop: i===0 ? "none" : "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width:24, height:24, borderRadius:7, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, fontWeight:800, color:"#F59E0B", fontVariantNumeric:"tabular-nums" }}>{i+1}</div>
            <div style={{ fontSize:dk?13.5:13, color:"#B9BEC8", lineHeight:1.55, fontWeight:500, paddingTop:2 }}>{r}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

function Quiz({ quizKey, onBack, w, onComplete }) {
  const [ci, setCi] = useState(0);
  const [sel, setSel] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const q = QUIZZES[quizKey];
  const dk = w >= 768;
  useEffect(() => { ref.current?.scrollIntoView({ behavior:"smooth" }); setCi(0); setSel(null); setLocked(false); setScore(0); setDone(false); }, [quizKey]);
  const cur = q.qs[ci], tot = q.qs.length, pct = done ? 100 : Math.round((ci / tot) * 100);
  const pick = (idx) => { if (locked) return; setSel(idx); setLocked(true); if (idx === cur.a) setScore(s => s + 1); };
  const nxt = () => { if (ci + 1 >= tot) { setDone(true); if (onComplete) onComplete(score, tot); return; } setCi(ci + 1); setSel(null); setLocked(false); };
  const retry = () => { setCi(0); setSel(null); setLocked(false); setScore(0); setDone(false); };
  const grade = score / tot;
  const gc = grade >= 0.9 ? "#22C55E" : grade >= 0.7 ? "#F59E0B" : "#DC2626";
  const gl = grade >= 0.9 ? "Excellent — you're ready to close" : grade >= 0.7 ? "Good — review weaker areas" : "Needs work — re-study the modules";
  return (
    <div ref={ref}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,8,12,0.92)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:dk?"0 44px":"0 20px", height:52, display:"flex", alignItems:"center" }}>
          <button className="back-btn" onClick={onBack} style={{ background:"none", border:"none", color:"#10B981", fontSize:13, fontWeight:700, cursor:"pointer", padding:"6px 0", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Portal
          </button>
        </div>
      </div>
      <div style={{ maxWidth:660, margin:"0 auto", padding:dk?"0 44px":"0 20px" }}>
        {/* Header */}
        <div style={{ padding:"36px 0 22px", animation:"fadeUp 0.5s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:28, height:3.5, background:"linear-gradient(90deg,#10B981,transparent)", borderRadius:4 }} />
            <span style={{ fontSize:9.5, fontWeight:800, color:"#10B981", letterSpacing:3.5, textTransform:"uppercase" }}>Practice Quiz</span>
          </div>
          <h2 style={{ fontSize:dk?27:22, fontWeight:800, color:"#F2F4F8", margin:"0 0 6px", letterSpacing:"-0.03em" }}>{q.title}</h2>
          <p style={{ fontSize:13, color:"#7E8595", margin:0, fontWeight:500 }}>{q.subtitle}</p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom:28, animation:"fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, alignItems:"center" }}>
            <span style={{ fontSize:11, fontWeight:600, color:"#666C7E", letterSpacing:0.5 }}>{done ? "Complete" : `Question ${ci + 1} of ${tot}`}</span>
            <span style={{ fontSize:11, fontWeight:800, color: done ? gc : "#666C7E" }}>{pct}%</span>
          </div>
          <div style={{ height:5, background:"rgba(255,255,255,0.05)", borderRadius:6, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background: done ? `linear-gradient(90deg,${gc},${gc}90)` : "linear-gradient(90deg,#CCFF00,#F59E0B,#10B981)", borderRadius:6, transition:"width 0.55s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>

        {done ? (
          <div style={{ textAlign:"center", padding:"36px 0 90px", animation:"fadeUp 0.5s ease" }}>
            <div style={{ width:110, height:110, borderRadius:32, background:`linear-gradient(135deg,${gc}18,${gc}08)`, border:`1.5px solid ${gc}35`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:`0 8px 40px ${gc}20` }}>
              <span style={{ fontSize:32, fontWeight:900, color:gc, lineHeight:1 }}>{score}</span>
              <span style={{ fontSize:12, color:gc+"90", fontWeight:600 }}>/ {tot}</span>
            </div>
            <h3 style={{ fontSize:28, fontWeight:900, color:"#F2F4F8", margin:"0 0 8px", letterSpacing:"-0.03em" }}>{Math.round(grade * 100)}%</h3>
            <p style={{ fontSize:14, color:gc, fontWeight:700, margin:"0 0 36px", letterSpacing:0.3 }}>{gl}</p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={retry} style={{ padding:"14px 28px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, color:"#C0C8D8", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>Retake Quiz</button>
              <button onClick={onBack} style={{ padding:"14px 32px", background:"linear-gradient(135deg,#CCFF00,#6E9100)", border:"none", borderRadius:14, color:"#15171E", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 24px rgba(204,255,0,0.28)", letterSpacing:0.5 }}>Back to Portal</button>
            </div>
          </div>
        ) : (
          <div style={{ paddingBottom:90, animation:"fadeUp 0.3s ease" }}>
            <div style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:dk?"28px":"22px 18px", marginBottom:20 }}>
              <h3 style={{ fontSize:dk?18:16, fontWeight:700, color:"#F2F4F8", margin:0, lineHeight:1.5 }}>{cur.q}</h3>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {cur.o.map((opt, idx) => {
                const isSel = sel === idx, isCor = idx === cur.a, showG = locked && isCor, showR = locked && isSel && !isCor;
                let bg = "rgba(12,14,18,0.9)", bd = "rgba(255,255,255,0.05)", tc = "#8892A0";
                if (showG) { bg = "rgba(34,197,94,0.08)"; bd = "rgba(34,197,94,0.35)"; tc = "#22C55E"; }
                if (showR) { bg = "rgba(220,38,38,0.08)"; bd = "rgba(220,38,38,0.35)"; tc = "#DC2626"; }
                if (!locked && isSel) { bg = "rgba(255,255,255,0.04)"; bd = "rgba(204,255,0,0.5)"; tc = "#F2F4F8"; }
                if (!locked && !isSel) { tc = "#8892A0"; }
                return (
                  <button key={idx} className="quiz-opt" onClick={() => pick(idx)} disabled={locked}
                    style={{ width:"100%", textAlign:"left", padding:"15px 18px", background:bg, border:`1.5px solid ${bd}`, borderRadius:14, cursor: locked ? "default" : "pointer", display:"flex", alignItems:"center", gap:14, fontFamily:"inherit", fontSize:14, color:tc, fontWeight: isSel || showG ? 600 : 400, boxShadow: showG ? "0 0 20px rgba(34,197,94,0.1)" : showR ? "0 0 20px rgba(220,38,38,0.08)" : "none" }}>
                    <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0, background: showG ? "rgba(34,197,94,0.15)" : showR ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.04)", color: showG ? "#22C55E" : showR ? "#DC2626" : "#666C7E", border:`1px solid ${showG ? "rgba(34,197,94,0.25)" : showR ? "rgba(220,38,38,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                      {showG ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : showR ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> : String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ flex:1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>
            {locked && (
              <button onClick={nxt} style={{ width:"100%", padding:"16px", background:"linear-gradient(135deg,#CCFF00,#6E9100)", color:"#15171E", border:"none", borderRadius:14, fontSize:12, fontWeight:800, letterSpacing:2.5, cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", marginTop:18, boxShadow:"0 6px 24px rgba(204,255,0,0.28)", animation:"fadeUp 0.3s ease" }}>
                {ci + 1 >= tot ? "See Results" : "Next Question →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

/* Icon gradient per category */
const IC_GRAD = {
  MODULE:    "rgba(204,255,0,0.10)",
  BOOTCAMP:  "rgba(245,158,11,0.10)",
  REFERENCE: "rgba(6,214,240,0.10)",
  QUIZ:      "rgba(16,185,129,0.10)",
  FINAL:     "rgba(255,215,0,0.10)",
};
const IC_SHADOW = {
  MODULE:    "inset 0 0 0 1px rgba(204,255,0,0.22)",
  BOOTCAMP:  "inset 0 0 0 1px rgba(245,158,11,0.22)",
  REFERENCE: "inset 0 0 0 1px rgba(6,214,240,0.22)",
  QUIZ:      "inset 0 0 0 1px rgba(16,185,129,0.22)",
  FINAL:     "inset 0 0 0 1px rgba(255,215,0,0.35)",
};
const LINK_ICONS = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
];

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [quizScores, setQuizScores] = useState({});
  const [view, setView] = useState(null);
  const ref = useRef(null);
  const w = useW();
  const dk = w >= 768;
  const wd = w >= 1100;

  const top = useCallback(() => { ref.current?.scrollIntoView({ behavior:"smooth" }); }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else { setProfile(null); setCompletedModules(new Set()); setQuizScores({}); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    const [profileRes, progressRes, scoresRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("module_progress").select("module_id").eq("user_id", userId),
      supabase.from("quiz_scores").select("quiz_id, score, total").eq("user_id", userId),
      supabase.from("roles").select("*").order("is_builtin", { ascending: false }).order("label"),
    ]);
    setProfile(profileRes.data);
    setRoles(rolesRes.data ?? []);
    setCompletedModules(new Set(progressRes.data?.map(r => r.module_id) ?? []));
    const best = {};
    for (const s of scoresRes.data ?? []) {
      if (!best[s.quiz_id] || s.score / s.total > best[s.quiz_id].score / best[s.quiz_id].total) best[s.quiz_id] = s;
    }
    setQuizScores(best);
    setLoading(false);
  };

  const markComplete = async (moduleId) => {
    if (completedModules.has(moduleId) || !session) return;
    setCompletedModules(prev => new Set([...prev, moduleId]));
    await supabase.from("module_progress").upsert({ user_id: session.user.id, module_id: moduleId });
  };

  const saveScore = async (quizId, score, total) => {
    if (!session) return;
    await supabase.from("quiz_scores").insert({ user_id: session.user.id, quiz_id: quizId, score, total });
    setQuizScores(prev => {
      const ex = prev[quizId];
      if (!ex || score / total > ex.score / ex.total) return { ...prev, [quizId]: { quiz_id: quizId, score, total } };
      return prev;
    });
  };

  const [tab, setTab] = useState("dashboard");
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState("");

  const CHAT_MIN = 220, CHAT_MAX = 520;
  const chatDefault = w >= 1280 ? 320 : 280;
  const [chatW, setChatW] = useState(() => {
    try {
      const saved = parseInt(localStorage.getItem("chatSidebarW") || "", 10);
      if (!isNaN(saved) && saved >= CHAT_MIN && saved <= CHAT_MAX) return saved;
    } catch { /* ignore */ }
    return chatDefault;
  });
  const persistChatW = (px) => {
    const clamped = Math.max(CHAT_MIN, Math.min(CHAT_MAX, Math.round(px)));
    setChatW(clamped);
    try { localStorage.setItem("chatSidebarW", String(clamped)); } catch { /* ignore */ }
  };
  const rawChatSidebarW = w >= 768 ? chatW : 0;

  const saveName = async () => {
    const trimmed = nameEdit.trim();
    if (!trimmed) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({ name: trimmed })
      .eq("id", session.user.id)
      .select()
      .single();
    if (error || !data) {
      alert(`Couldn't save name: ${error?.message ?? "no row returned"}`);
      return;
    }
    setProfile(prev => ({ ...prev, name: data.name }));
    setShowNameEdit(false);
  };

  const signOut = async () => { await supabase.auth.signOut(); setView(null); };

  const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap";
  const baseStyle = { minHeight:"100dvh", background:"#0E0F14", color:"#FFF" };

  const bc = { MODULE:"#CCFF00", BOOTCAMP:"#F59E0B", REFERENCE:"#06D6F0", QUIZ:"#10B981", FINAL:"#FFD700" };
  const trainingGroups = [
    { label:null, color:"#CCFF00", items:CATS.filter(x=>x.t==="MODULE") },
    { label:"BOOTCAMPS", color:"#F59E0B", items:CATS.filter(x=>x.t==="BOOTCAMP") },
  ];
  const referenceItems = CATS.filter(x=>x.t==="REFERENCE");
  const quizItems = CATS.filter(x=>x.t==="QUIZ");
  const finalItem = CATS.find(x=>x.t==="FINAL");

  // Final exam gating: requires 100% on every module quiz (q-m1 … q-m12) AND no prior attempt at q-final.
  const moduleQuizKeys = quizItems.map(x => x.k);
  const modulesAtHundred = moduleQuizKeys.filter(k => {
    const qs = quizScores[k];
    return qs && qs.total > 0 && qs.score >= qs.total;
  }).length;
  const finalUnlocked = modulesAtHundred === moduleQuizKeys.length;
  const finalAttempted = !!quizScores["q-final"];
  const ALL_TABS = [
    { key:"dashboard",     label:"Dashboard",     short:"Home",     color:"#22C55E" },
    { key:"announcements", label:"Announcements", short:"News",     color:"#F59E0B" },
    { key:"leads",         label:"Leads",         short:"Leads",    color:"#06D6F0" },
    { key:"leaderboard",   label:"Leaderboard",   short:"Board",    color:"#FFD700" },
    { key:"scheduling",    label:"Scheduling",    short:"Schedule", color:"#F59E0B" },
    { key:"training",      label:"Training",      short:"Train",    color:"#CCFF00" },
    { key:"reference",     label:"Reference",     short:"Ref",      color:"#06D6F0" },
  ];
  // Tabs the current user can see. Admin always sees everything. If no
  // role record exists yet (e.g. before the migration runs), default to
  // showing all tabs so the portal stays accessible.
  const currentRole = roles.find(r => r.name === profile?.role);
  const allowedKeys = profile?.role === "admin"
    ? ALL_TABS.map(t => t.key).concat("chat")
    : (currentRole?.allowed_tabs ?? ALL_TABS.map(t => t.key).concat("chat"));
  const TABS = ALL_TABS.filter(t => allowedKeys.includes(t.key));
  const showChat = allowedKeys.includes("chat");
  const chatSidebarW = showChat ? rawChatSidebarW : 0;

  // Live header stats — small batched fetch on session ready, refreshed on realtime events.
  const [hdrStats, setHdrStats] = useState({ active: 0, today: 0, pipe: 0 });
  useEffect(() => {
    if (!session) return;
    const todayStr = new Date().toISOString().split("T")[0];
    const loadStats = async () => {
      const [activeRes, todayRes, pipeRes] = await Promise.all([
        supabase.from("schedule").select("user_id", { count: "exact", head: true }).eq("date", todayStr),
        supabase.from("sales").select("id", { count: "exact", head: true }).eq("sale_date", todayStr),
        supabase.from("leads").select("id", { count: "exact", head: true }).not("status", "in", "(closed,dead)"),
      ]);
      setHdrStats({
        active: activeRes.count ?? 0,
        today:  todayRes.count ?? 0,
        pipe:   pipeRes.count ?? 0,
      });
    };
    loadStats();
    const ch = supabase.channel("hdr-stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, loadStats)
      .on("postgres_changes", { event: "*", schema: "public", table: "schedule" }, loadStats)
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, loadStats)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [session]);

  // If the active tab gets revoked by a role change, fall back to the first allowed one.
  useEffect(() => {
    if (!profile || TABS.length === 0) return;
    if (!TABS.some(t => t.key === tab)) setTab(TABS[0].key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.role, roles.length]);

  if (loading) return (
    <div style={{ ...baseStyle, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ textAlign:"center", animation:"fadeUp 0.4s ease" }}>
        <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 16px" }}>
          <RedlineLogo height={44} />
        </div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:10, color:"#F2F4F8" }}>REDLINE</div>
        <div style={{ fontSize:10, color:"#5E6376", letterSpacing:3, textTransform:"uppercase", marginTop:8, fontWeight:700 }}>Loading…</div>
      </div>
    </div>
  );

  if (!session) return (
    <div style={baseStyle}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Login />
    </div>
  );

  if (view === "__admin" && profile?.role === "admin") return (
    <div ref={ref} style={{ ...baseStyle, paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <AdminPanel profile={profile} roles={roles} setRoles={setRoles} onBack={() => setView(null)} w={w} onSignOut={signOut} />
      {showChat && <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />}
    </div>
  );

  if (view && QUIZZES[view]) {
    // Defense in depth — block final-exam route if not unlocked or already submitted.
    if (view === "q-final" && (!finalUnlocked || finalAttempted)) {
      setView(null);
      return null;
    }
    return (
    <div ref={ref} style={{ ...baseStyle, paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Quiz quizKey={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={(sc, tot) => saveScore(view, sc, tot)} />
      {showChat && <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />}
    </div>
    );
  }

  if (view) return (
    <div ref={ref} style={{ ...baseStyle, paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Viewer ck={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={markComplete} />
      {showChat && <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />}
    </div>
  );

  return (
    <div ref={ref} className="dotgrid" style={{ ...baseStyle, position:"relative", paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />

      {/* Sticky header */}
      <div className="app-header">
        <div style={{ padding:wd?"22px 56px 0":dk?"18px 36px 0":"14px 20px 0" }}>
          <div style={{ maxWidth:1300, margin:"0 auto" }}>

            {/* Top row: logo + live stats + actions */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:dk?18:14, gap:dk?24:12, animation:"fadeUp 0.5s ease" }}>

              {/* Logo + wordmark — left-anchored, tight */}
              <div style={{ display:"flex", alignItems:"center", gap:dk?12:8, flexShrink:0 }}>
                <RedlineLogo height={dk?40:32} />
                <div>
                  <div className="display" style={{ fontSize:dk?34:24, color:"#F2F4F8", letterSpacing:dk?"0.06em":"0.05em" }}>REDLINE</div>
                  <div className="eyebrow" style={{ color:"#5E6376", marginTop:dk?4:2 }}>Portal</div>
                </div>
              </div>

              {/* Live stats — center, hidden on mobile to keep header tight */}
              {wd && (
                <div style={{ display:"flex", alignItems:"center", flex:"0 1 auto", marginLeft:"auto", marginRight:24 }}>
                  <div className="hdr-stat">
                    <span className="hdr-stat-val hero">{hdrStats.active}</span>
                    <span className="hdr-stat-label">Active today</span>
                  </div>
                  <div className="hdr-stat">
                    <span className="hdr-stat-val">{hdrStats.today}</span>
                    <span className="hdr-stat-label">Sales today</span>
                  </div>
                  <div className="hdr-stat">
                    <span className="hdr-stat-val">{hdrStats.pipe}</span>
                    <span className="hdr-stat-label">In pipe</span>
                  </div>
                </div>
              )}

              {/* Right actions */}
              <div style={{ display:"flex", alignItems:"center", gap:dk?8:6, animation:"fadeUp 0.5s ease 0.06s both" }}>
                {profile?.role === "admin" && (
                  <button onClick={() => setView("__admin")} className={`btn-pill${dk?"":" icon-only"}`} aria-label="Admin">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {dk && "Admin"}
                  </button>
                )}

                {/* Avatar + name edit */}
                <div style={{ position:"relative", display:"flex", alignItems:"center", gap:0 }}>
                  <div className="profile-pill"
                    onClick={() => { setShowNameEdit(v => !v); setNameEdit(profile?.name ?? ""); }}>
                    <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#CCFF00,#88AB00)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:900, color:"#15171E", flexShrink:0, boxShadow:"0 2px 10px rgba(204,255,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)" }}>
                      {profile?.name?.[0]?.toUpperCase() ?? "R"}
                    </div>
                    {dk && <span style={{ fontSize:12.5, fontWeight:600, color:"#D6DAE2", letterSpacing:0.2 }}>{profile?.name ?? "Rep"}</span>}
                    {dk && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7E8595" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft:2, transform: showNameEdit?"rotate(180deg)":"none", transition:"transform 0.18s ease" }}><polyline points="6 9 12 15 18 9"/></svg>}
                  </div>
                  {showNameEdit && (
                    <div className="glass" style={{ position:"absolute", top:"calc(100% + 10px)", right:0, borderRadius:14, padding:18, width:240, zIndex:200, boxShadow:"0 24px 60px rgba(0,0,0,0.7)", animation:"popIn 0.18s ease" }}>
                      <div style={{ fontSize:10, fontWeight:800, color:"#666C7E", letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 }}>Display Name</div>
                      <input
                        autoFocus
                        value={nameEdit}
                        onChange={e => setNameEdit(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setShowNameEdit(false); }}
                        placeholder="Your name…"
                        style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#F2F4F8", fontSize:13, fontWeight:500, padding:"11px 13px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
                      />
                      <div style={{ display:"flex", gap:8, marginTop:10 }}>
                        <button onClick={saveName} className="btn-primary" style={{ flex:1, fontSize:12, padding:"12px 0" }}>Save</button>
                        <button onClick={() => setShowNameEdit(false)} className="btn-ghost" style={{ flex:1, fontSize:12, padding:"12px 0" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={signOut} className={`btn-pill${dk?"":" icon-only"}`} aria-label="Sign Out">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  {dk && "Sign Out"}
                </button>
              </div>
            </div>

            {/* Tab Nav — scrollable, no scrollbar */}
            <div style={{ display:"flex", gap:4, overflowX:"auto", paddingBottom:10, marginBottom:-1, animation:"fadeUp 0.5s ease 0.1s both", scrollbarWidth:"none", msOverflowStyle:"none" }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={"tab-pill" + (tab===t.key ? " active" : "")}
                  style={{ fontSize:10.5, padding:dk?"10px 18px":"9px 12px", whiteSpace:"nowrap", flexShrink:0 }}>
                  <span className="tab-bg" />
                  <span>{dk ? t.label : t.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Tab Content */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1300, margin:"0 auto", padding:wd?"28px 56px 90px":dk?"24px 36px 90px":"16px 16px 90px" }}>

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <Dashboard
            session={session}
            profile={profile}
            w={w}
            completedModules={completedModules}
            quizScores={quizScores}
            onGoTab={setTab}
            onOpenModule={(k) => { setView(k); setTimeout(top, 50); }}
          />
        )}

        {/* ANNOUNCEMENTS TAB */}
        {tab === "announcements" && (
          <Announcements session={session} profile={profile} w={w} />
        )}

        {/* LEADS TAB */}
        {tab === "leads" && (
          <Leads session={session} profile={profile} w={w} />
        )}

        {/* LEADERBOARD TAB */}
        {tab === "leaderboard" && (
          <Leaderboard session={session} profile={profile} w={w} />
        )}

        {/* SCHEDULING TAB */}
        {tab === "scheduling" && (
          <Scheduler session={session} profile={profile} w={w} />
        )}

        {/* TRAINING TAB */}
        {tab === "training" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            {trainingGroups.map((g, gi) => (
              <div key={gi}>
                {g.label
                  ? <SectionLabel color={g.color} label={g.label} delay={0.04 * gi} />
                  : <div style={{ height:4 }} />
                }
                <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8 }}>
                  {g.items.map((x, i) => {
                    const done = completedModules.has(x.k);
                    return (
                      <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                        style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${done ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.055)"}`, borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.04*(gi*4+i)}s both`,  }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                          <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD[x.t], display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:IC_SHADOW[x.t] }}>{x.ic}</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:9, fontWeight:800, color:bc[x.t], letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>{x.n || x.t}</div>
                            <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 3px", lineHeight:1.3 }}>{x.sub}</h3>
                            <p style={{ fontSize:11.5, color:"#666C7E", margin:0, lineHeight:1.4, fontWeight:500 }}>{x.d}</p>
                          </div>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                            {done && <div style={{ width:20, height:20, borderRadius:6, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
                            <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666C7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <SectionLabel color="#10B981" label="QUIZZES" delay={0.04 * trainingGroups.length} />
            <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8 }}>
              {quizItems.map((x, i) => {
                const qs = quizScores[x.k];
                const isPerfect = qs && qs.total > 0 && qs.score >= qs.total;
                return (
                  <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                    style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${isPerfect ? "rgba(16,185,129,0.28)" : qs ? "rgba(245,158,11,0.18)" : "rgba(255,255,255,0.055)"}`, borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.05*i}s both`,  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD.QUIZ, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:IC_SHADOW.QUIZ }}>{x.ic}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, fontWeight:800, color:"#10B981", letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>QUIZ</div>
                        <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 3px", lineHeight:1.3 }}>{x.sub}</h3>
                        <p style={{ fontSize:11.5, color: isPerfect ? "#10B981" : qs ? "#F59E0B" : "#666C7E", margin:0, lineHeight:1.4, fontWeight: qs ? 600 : 500 }}>
                          {isPerfect ? "Passed · 100%" : qs ? `Best: ${Math.round(qs.score/qs.total*100)}% — retake for 100%` : x.d}
                        </p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                        {isPerfect && <div style={{ width:20, height:20, borderRadius:6, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
                        <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666C7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {finalItem && (
              <>
                <SectionLabel color="#FFD700" label="FINAL EXAM" delay={0.04 * (trainingGroups.length + 1)} />
                <div onClick={() => {
                  if (finalAttempted) {
                    const qs = quizScores["q-final"];
                    alert(`Final Exam already submitted. Your score: ${qs.score}/${qs.total} (${Math.round(qs.score/qs.total*100)}%). One attempt only — contact an admin if you need this reset.`);
                    return;
                  }
                  if (!finalUnlocked) {
                    alert(`Final Exam is locked. Complete all 12 module quizzes at 100% first (${modulesAtHundred}/${moduleQuizKeys.length} done).`);
                    return;
                  }
                  if (!confirm("This is the FINAL EXAM. You only get ONE attempt — your score is permanent. Ready to begin?")) return;
                  setView(finalItem.k); setTimeout(top, 50);
                }}
                className={finalUnlocked && !finalAttempted ? "card-hover" : ""}
                style={{
                  background: finalAttempted ? "rgba(255,215,0,0.04)" : finalUnlocked ? "linear-gradient(135deg,rgba(255,215,0,0.06),rgba(255,255,255,0.02))" : "rgba(255,255,255,0.022)",
                  border: `1px solid ${finalAttempted ? "rgba(255,215,0,0.25)" : finalUnlocked ? "rgba(255,215,0,0.32)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius:16, padding:dk?"22px 20px":"18px 16px", cursor: finalAttempted || !finalUnlocked ? "not-allowed" : "pointer",
                  opacity: finalUnlocked || finalAttempted ? 1 : 0.6,
                  animation:`fadeUp 0.38s ease ${0.05*(quizItems.length+1)}s both`,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD.FINAL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, boxShadow:IC_SHADOW.FINAL }}>{finalItem.ic}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, fontWeight:800, color:"#FFD700", letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>{finalItem.n}</div>
                      <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 3px", lineHeight:1.3 }}>{finalItem.sub}</h3>
                      <p style={{ fontSize:11.5, color: finalAttempted ? "#FFD700" : finalUnlocked ? "#A0A4B0" : "#666C7E", margin:0, lineHeight:1.4, fontWeight:500 }}>
                        {finalAttempted
                          ? `Submitted · ${quizScores["q-final"].score}/${quizScores["q-final"].total} (${Math.round(quizScores["q-final"].score/quizScores["q-final"].total*100)}%)`
                          : finalUnlocked
                            ? "Unlocked. ONE attempt only — your score will be permanent."
                            : `Locked · ${modulesAtHundred}/${moduleQuizKeys.length} module quizzes at 100%`}
                      </p>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                      {!finalUnlocked && !finalAttempted && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5E6376" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      )}
                      <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666C7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* REFERENCE TAB */}
        {tab === "reference" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <a href="https://www.redlinewebservices.net/" target="_blank" rel="noreferrer" className="card-hover"
              style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"18px":"15px 14px", textDecoration:"none", marginBottom:10,  }}>
              <div style={{ width:46, height:46, borderRadius:13, background:"linear-gradient(135deg,#06D6F0,#0588A0)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:22, boxShadow:"0 4px 16px rgba(6,214,240,0.35)" }}>🌐</div>
              <div style={{ flex:1, minWidth:0 }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 2px" }}>Redline Homepage</h3>
                <p style={{ fontSize:11.5, color:"#4A5060", margin:0, fontWeight:500 }}>redlinewebservices.net</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E6376" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8 }}>
              {referenceItems.map((x, i) => (
                <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                  style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.05*i}s both`,  }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD.REFERENCE, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:IC_SHADOW.REFERENCE }}>{x.ic}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, fontWeight:800, color:"#06D6F0", letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>REFERENCE</div>
                      <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 3px", lineHeight:1.3 }}>{x.sub}</h3>
                      <p style={{ fontSize:11.5, color:"#666C7E", margin:0, lineHeight:1.4, fontWeight:500 }}>{x.d}</p>
                    </div>
                    <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666C7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {showChat && <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />}
    </div>
  );
}

function SectionLabel({ color, label, delay = 0 }) {
  // Section headers are typographic, not chromatic — they outrank stat labels via size+weight.
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:"30px 0 14px", animation:`fadeUp 0.5s ease ${delay}s both` }}>
      <div className="display" style={{ fontSize:22, color:"#F2F4F8", letterSpacing:"0.08em" }}>{label}</div>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,0.06),transparent)" }} />
    </div>
  );
}
