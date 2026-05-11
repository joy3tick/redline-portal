import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./lib/supabase";
const C = {
  "m1": { t: "Module 1 — Onboarding & Training", st: "Your foundation for closing deals and driving revenue.", s: [
    { h: "🏢  WHAT WE DO", b: "We deliver a premium experience for service-based small businesses — HVAC, plumbing, electrical, roofing, landscaping, and more.\n\n⚡ End-to-End Execution\nWe don't just \"help with a website.\" We handle strategy, design, development, optimization, and launch. The client's only job is to fill out a 5-minute form and keep answering their phone.\n\n⚡ Streamlined Process\nEvery project follows the same proven system: Onboarding Form → Discovery → Design → Build → Optimize → Launch. No scope creep. No surprises.\n\n⚡ Business Growth Focus\nWe don't sell pixels. We sell leads, calls, and revenue. If a site looks beautiful but doesn't convert, it's a liability. Every design choice we make is tied to a business outcome." },
    { h: "🔴  THE Redline DIFFERENCE", b: "Most agencies sell design. We sell outcomes.\n\nWhat clients actually get:\n→ Custom site built for their specific market and audience\n→ SEO baked in from day one (not bolted on later)\n→ Mobile-first design (60%+ of their traffic is on a phone)\n→ Conversion-optimized CTAs, forms, and trust signals\n→ AI chatbot capturing leads 24/7 while they sleep\n→ Ongoing maintenance so the site never degrades\n\nOur service tiers:\n• Starter — $1,497 → Conversion-focused site, fast turnaround\n• Pro — $2,497 → Advanced design + lead gen features\n• Elite — $4,497 → Premium design, full CRO, maximum conversion\n• Custom/Enterprise — $5,000+ → Fully scoped to the business\n\nFirm deadlines. No scope creep. We don't deliver and disappear — ongoing monitoring and revisions are standard." },
    { h: "🎯  YOUR ROLE", b: "Find the clients. Bring them in. Our team builds the site.\n\nWHAT YOU NEED TO KNOW\n• Master Redline's service tiers and what's included at each level\n• Understand the technical basics (SEO, CRO, page speed, mobile) — the Technical Bootcamp covers this\n• Know the target market inside and out (Module 2)\n• Internalize the scripts and objection handlers\n\nYOUR SUCCESS DRIVER\nCold calls and closing calls are the core of your role. Everything else — design, development, delivery — is handled by our build team. Your job is pipeline and revenue." },
    { h: "📊  ACTIVITY EXPECTATIONS", b: "100 COLD CALLS / WEEK\nThis is the baseline. No exceptions. No excuses.\n\nAll activity is tracked in a centralized Google Sheet with full transparency. Your numbers are visible. Results speak.\n\n→ Consistency beats talent. The rep who dials 100 quality calls every single week will outperform the \"natural salesperson\" who wings it.\n→ Success is a volume game multiplied by quality. More targeted outreach = more conversations = more audits = more closes.\n→ Show up every single week. Momentum compounds." },
    { h: "💰  COMPENSATION", b: "High-ticket, commission-only. Unlimited upside.\n\nDEAL SIZE: $1,500 – $4,500+ per closed deal\nEnterprise packages go well above $4,500.\n\nYou earn 25-35% of every deal depending on your tier:\n• Tier 1 (Day 1): 25% commission\n• Tier 2 (20 deals): 30% commission\n• Tier 3 (50 deals): 35% commission\n\nPlus $100 bonus per website deal at month-end.\nPlus $25/month recurring for every maintenance client.\n\nTop performers clear $8,000+/month within 6 months. Year 1 projection for high performers: $104,000+.\n\nSee the full Compensation Plan for detailed breakdowns and real-world examples." },
  ]},
  "m2": { t: "Module 2 — Target Market & Lead Generation", st: "Find the right businesses. Build the right list.", s: [
    { h: "🎯  WHO WE TARGET", b: "We don't target everyone. We target the right ones.\n\n✅ Revenue Necessity — Businesses where a website rebuild directly drives revenue. Not vanity projects. Not \"nice to have.\" The site is either making them money or losing them money.\n\n✅ Local Operators — Single-owner, local businesses. The owner answers the phone, makes the decisions, and feels the pain daily. Avoid franchises, multi-location chains, and corporate accounts.\n\n✅ Clear Pain Points — Outdated, slow, or non-mobile sites with no CTAs, no quote forms, and no way to convert a visitor into a lead. These are businesses bleeding money and they don't even know it." },
    { h: "🔧  TARGET NICHES", b: "HVAC • Plumbers • Electricians • Landscapers • Florists • Roofers • Solar Installers • Pest Control • Painters\n\nTHE PAIN POINT\n→ Outdated, slow, or non-mobile websites\n→ No clear calls-to-action\n→ No \"Request a Quote\" or \"Book Now\" forms\n→ Generic stock photos, no social proof\n→ Competitors with better sites are stealing their leads\n\nTHE SIGNAL\nIf their website doesn't actively generate leads, it's costing them money every single day. That gap between where they are and where they could be — that's our opening." },
    { h: "🗺️  LEAD GENERATION — GOOGLE MAPS", b: "Google Maps is your lead goldmine.\n\n1️⃣ Zoom into a specific town/city on Google Maps\n2️⃣ Search for a niche: \"Plumber near Waltham, MA\"\n3️⃣ Open their website. Assess in 30 seconds. If it's poor → it's a lead.\n4️⃣ Aim for 10–15 solid leads per town/search\n\n🔍 ORGANIC DISCOVERY\nZoom to street level in commercial areas. Look for small family-owned shops, cafes, gyms, salons. No digital presence or a bad site = money left on the table.\n\nThe best leads are businesses that are clearly good at what they do but terrible online. Their work speaks for itself — their website doesn't." },
    { h: "📞  CONTACT STRATEGY", b: "Skip the front desk. Get to the owner.\n\n🚫 THE REALITY\nIf you call a general business line, you're talking to a receptionist or a teenager who won't pass on your message. Front-desk lines are a dead end.\n\n✅ THE STRATEGY\n→ Find the owner's direct cell or personal number\n→ Check Google Business Profile for owner name\n→ Look for personal emails on the website's About page\n→ LinkedIn can sometimes surface direct contact info\n→ Your goal: decision-maker on the first dial" },
    { h: "📋  DAILY WORKFLOW", b: "100 HIGH-QUALITY LEADS / WEEK\nLogged in the provided Excel spreadsheet.\n\nWHAT TO LOG FOR EVERY LEAD:\n→ Business name\n→ Owner name (if found)\n→ Website URL\n→ Phone number (direct if possible)\n→ Quick note on what's wrong with their site\n\nThe quality of your list directly determines the quality of your results. 100 garbage leads = 0 deals. 100 targeted, researched leads = a full pipeline." },
  ]},
  "m3": { t: "Module 3 — Positioning & Call Strategy", st: "You're not a freelancer. You're a revenue consultant.", s: [
    { h: "👔  YOUR POSITIONING", b: "Act like a Revenue Consultant. Not a freelancer.\n\n🧠 THE MINDSET\n→ You're diagnosing a sickness (their website) and providing the only cure\n→ Shift the power dynamic early — you are busy, they need your help\n→ You are not begging for their business. You are offering to solve a problem that's costing them real money.\n\n📊 THE RESULT\n→ If you act like a freelancer, they will haggle, ghost you, and treat you like a vendor\n→ If you act like a consultant, they will listen, respect your time, and pay your price\n\nThe difference is not what you say — it's how you carry yourself on every single call." },
    { h: "🚪  THE GATEKEEPER PROBLEM", b: "Don't waste time on low-conversion activities.\n\n→ Calling a service business often leads to a receptionist or junior staff who won't pass your message\n→ Your time is valuable — don't trade hours for dead-end conversations\n→ Prioritize direct owner contact over calling front desks\n→ If you can't get the owner, move on. 100 other leads are waiting." },
    { h: "📧  POST-CALL FOLLOW-UP PROTOCOL", b: "After every cold call where there was interest, send a follow-up email. Structure with precision.\n\n1️⃣ SUBJECT LINE — Clear, professional, non-spammy\n2️⃣ THE HOOK — Reference the specific issue you discussed on the call\n3️⃣ THE VALUE — How a rebuild increases their lead flow\n4️⃣ THE CTA — \"Want me to send over that video audit we discussed?\"\n\n⚠️ This is NOT cold email outreach. This is a follow-up touchpoint after your cold call to reinforce the conversation and move toward the audit." },
  ]},
  "m4": { t: "Module 4 — Cold Call Mastery", st: "Earn attention. Don't demand it.", s: [
    { h: "🧠  THE MINDSET", b: "Most cold calls fail because they sound like a sales pitch.\n\n→ Cold calling works because of relevance, not volume\n→ Every business owner is bombarded with spam calls — your job is to earn attention, not demand it\n→ They don't care about our features. They care about their problems.\n→ The call has ONE job: book the video audit. That's it. Nothing else." },
    { h: "🚫  DO THIS, NOT THAT", b: "IF YOU DO THIS, YOU LOSE:\n→ Explain too much — you sound desperate\n→ Sound salesy — they hang up\n→ Use scripts they can smell — instant credibility death\n\n✅ INSTEAD:\n→ Observe something they already feel (\"I noticed your site doesn't have a quote form\")\n→ Keep it short and specific — under 2 minutes\n→ Focus on their pain, not your service\n→ Sound like a human having a real conversation" },
    { h: "⚡  CORE PRINCIPLES", b: "Personalization. Specificity. Brevity.\n\n🎯 PERSONALIZE — Proves you actually looked at their business. \"I was on your site this morning\" beats \"I help businesses like yours.\"\n\n🔍 BE SPECIFIC — \"Your site doesn't have a quote form\" beats \"I can help with your website.\" Specificity = credibility.\n\n✂️ BE BRIEF — Get to the point in the first 10 seconds. Rambling kills calls.\n\n👃 SMELL TEST — Business owners smell scripts instantly. No \"just checking in.\" No \"I came across your business.\" Sound real." },
    { h: "⏱️  THE FIRST 10 SECONDS", b: "The opener determines if the call lives or dies.\n\n🚫 NEVER USE:\n→ \"Hope you're doing well\"\n→ \"I came across your business\"\n→ Any generic opener that sounds like every other sales call they ignore\n\n✅ ALWAYS USE:\n→ Direct observations about their service, location, or site\n→ Something that proves you did 90 seconds of research\n→ A pattern interrupt that makes them laugh or think\n\nIf the first line is generic, nothing after it matters." },
    { h: "🔴  THE Redline TRIGGER", b: "Take 90 seconds before every dial to find one clear trigger.\n\nLOOK FOR:\n→ Outdated look / 2010 design\n→ Broken mobile layout\n→ No clear Call-to-Action\n→ Zero \"Request a Quote\" buttons\n→ Slow load time\n→ No reviews or social proof on the site\n\nTHE BRIDGE:\nConnect the observation to a fix.\n\"We help businesses in [Niche] fix exactly that.\"\nNo tech jargon. No feature lists. Just the problem and the solution." },
    { h: "🎯  THE CTA", b: "Your ask must feel optional — not committal.\n\n✅ GOOD CTAs:\n→ \"Worth a quick chat?\"\n→ \"Open to a short call?\"\n→ \"Can I send you a 2-minute video showing what I'd change?\"\n\n🚫 BAD CTAs:\n→ Asking for 30 minutes of their time\n→ \"Learn more\" or sending them to your site\n→ Anything that feels like a commitment\n\nMake it easy to say yes." },
    { h: "⚠️  COMMON MISTAKES", b: "If it sounds like a pitch, it already failed.\n\n→ Long calls — get to the point. Don't ramble.\n→ The \"I/We\" trap — talking about yourself or Redline too much. They don't care about us yet.\n→ The \"Formal\" trap — buzzwords, \"Hope this finds you well,\" corporate speak\n→ The Multi-Task — trying to accomplish more than one thing per call. Book the audit. That's it.\n→ Not shutting up — ask a question, then let them answer. Silence is power." },
    { h: "🔄  FOLLOW-UP PROTOCOL", b: "Silence is not rejection.\n\n📌 THE 2-3 RULE:\n→ Most responses come on the 2nd or 3rd touch\n→ Follow up max 3 times\n→ Each follow-up should be shorter than the last\n\n📌 THE TONE:\n→ Calm, respectful, direct\n→ No pressure. No guilt trips.\n→ Persistence with professionalism\n\nThe rep who follows up wins the deal the lazy rep left on the table." },
  ]},
  "m5": { t: "Module 5 — Reply Handling & Call Booking", st: "Move fast. Get on the phone. Close.", s: [
    { h: "⚡  PROTECT THE MOMENTUM", b: "Most deals die immediately after the first reply.\n\n→ Reps kill momentum by over-explaining or hesitating\n→ After a reply, your ONLY job is to move to a call\n→ The longer you stay in email, the weaker your position\n→ Email is for starting conversations. Calls are for selling.\n\nSpeed wins. The first rep to get on the phone usually wins the deal." },
    { h: "🔍  DECODING REPLIES", b: "What they say vs. what they actually mean:\n\n\"Sounds interesting\" → Open but needs a leader. They won't take the next step themselves — you need to direct them.\n\n\"Can you send more info?\" → Looking for a reason to say No. Don't send a brochure. Suggest a call.\n\n\"How much does this cost?\" → Trying to commoditize you. They want to compare you to the $500 Fiverr guy. Don't let them.\n\n\"Maybe later\" → Has pain but no urgency. Your job is to create urgency through opportunity cost.\n\nNone of these require a long explanation. All of them require direction toward a call." },
    { h: "📝  RESPONSE FORMULA", b: "Acknowledge + Short Value + Call Invitation.\n\n→ Keep it short: max 2–3 sentences\n→ Suggest a call immediately — don't ask, suggest\n→ Offer 2–3 specific time slots or your calendar link\n→ Speed > Perfection. Same business day replies.\n\nExample: \"Hey [Name], glad it caught your eye. Easiest next step is a quick 5-min call where I can walk you through what I found. How's Thursday at 2 or Friday at 10?\"" },
    { h: "🚫  THE NEVER LIST", b: "Protect your authority.\n\n→ NEVER pitch features over email\n→ NEVER send long PDF explanations\n→ NEVER negotiate or justify price over email\n→ NEVER wait 24+ hours to respond to a warm reply\n\nYou lose authority the second you start chasing them in the inbox. Email is a tool to get to the phone. That's it." },
    { h: "📅  DAILY DISCIPLINE", b: "Calls create leverage. Emails create busy work.\n\n→ Clean out the \"Pending Reply\" folder every morning and afternoon\n→ Clean, fast replies protect the Redline brand\n→ Your job is to guide, not convince\n→ If someone is warm, get them on the phone within 24 hours or the lead goes cold" },
  ]},
  "m6": { t: "Module 6 — Sales Call Framework", st: "Control the call. Close the deal.", s: [
    { h: "👑  ESTABLISH AUTHORITY", b: "They've been pitched by \"web guys\" before. They're skeptical.\n\n→ Confidence and visible structure build immediate trust\n→ You are not a salesperson — you are an authority diagnosing a problem\n→ You are the leader of this conversation. Rambling kills authority.\n→ If the prospect goes off-track, you pull them back\n→ Speak with certainty. If you sound unsure, they won't trust you with their money." },
    { h: "📋  THE 6-STEP CALL STRUCTURE", b: "Follow the sequence. No shortcuts.\n\n1️⃣ Opening & Agenda → Set the tone\n2️⃣ Business Discovery → Understand their operations\n3️⃣ Pain Identification → Where is the leak?\n4️⃣ Website Diagnosis → The technical \"why\"\n5️⃣ Redline Positioning → The solution\n6️⃣ The Close → Finalize the next step\n\nEvery step builds on the last. Skip one and the close falls apart." },
    { h: "🎤  OPENING & DISCOVERY", b: "Set the frame. Then listen.\n\nTHE AGENDA:\n\"The goal of today is to see if we can actually help you grow. I'll ask some questions, show you what we found, and we'll see if it's a fit. Sound good?\"\n\nDISCOVERY QUESTIONS:\n→ \"How are most of your jobs coming in right now?\"\n→ \"What does your ideal customer look like?\"\n→ \"What are your revenue goals for this year?\"\n→ \"When someone lands on your site, what do you want them to do?\"\n\nLet them talk. Take notes. The more they talk, the more ammunition you have for the close." },
    { h: "🩺  PAIN & DIAGNOSIS", b: "Make them feel the cost of their current site.\n\n→ \"How many customers are you losing because they can't find your 'Book' button?\"\n→ \"Your site loads in 6 seconds — 40% of visitors leave after 3. How many leads is that per month?\"\n→ Drop real data: load speeds, mobile errors, missing conversion triggers\n\n📌 LISTENING RULES:\n→ 80/20 rule — listen 80% of the time\n→ Use open-ended questions\n→ They buy when they feel understood, not when they feel sold to\n→ The best closers barely talk. They ask the right questions and let the prospect sell themselves." },
    { h: "🤝  REDIRECTING & CLOSING", b: "Every call ends with a clear, defined next step.\n\n🔄 REDIRECT TACTICS:\n→ \"That's an interesting point, but let's stay on track for your goals...\"\n→ Never accept \"Business is okay.\" Ask: \"What does 'okay' look like in monthly leads?\"\n→ Keep it centered on revenue and results\n\n💰 HANDLING \"I'LL THINK ABOUT IT\":\n→ \"What specifically do you need to look at?\"\n→ \"Is it the timing, the investment, or something else?\"\n→ Move to invoice or a scheduled follow-up with the decision-maker\n→ Never leave a call without the next step locked in" },
  ]},
  "m7": { t: "Module 7 — Value Proposition & Messaging", st: "We sell outcomes. Not design.", s: [
    { h: "💡  THE SHIFT", b: "Most agencies sell design. We sell business outcomes.\n\n→ A \"clean, modern site\" is the baseline — it doesn't justify our pricing\n→ Sell more leads, more calls, more revenue\n→ If a site looks good but doesn't convert, it's a liability\n→ Every design choice is tied to user behavior, trust, and CTAs\n\nWhen a prospect says \"I want a nice website,\" your job is to reframe: \"You don't need a nice website. You need a website that makes your phone ring.\"" },
    { h: "🏗️  THE APPROACH", b: "We don't just build. We optimize.\n\n🎯 User Behavior & Clarity — Every element serves a conversion purpose. Nothing is decorative.\n\n🛡️ Building Trust — Design that makes visitors confident to buy. Reviews, badges, real photos, professional layout.\n\n📍 Strategic CTAs — \"Get My Free Quote\" placed exactly where visitors are ready to act. Above the fold, after testimonials, at the bottom.\n\nA website is a sales asset, not a digital brochure. If it's not generating leads, it's a cost center." },
    { h: "📈  THE LEVERAGE PLAY", b: "A conversion fix has a 10x impact on the bottom line.\n\n🔥 THE OUTSIZED IMPACT RULE:\n→ A better site amplifies the traffic and reputation they already have\n→ If they're getting 500 visitors/month and converting at 1%, that's 5 leads\n→ We take them to 5-10% — that's 25-50 leads from the same traffic\n→ No extra ad spend. No extra work. Just a better machine.\n\n⚠️ THE Redline STANDARD:\n→ Never promise specific numbers\n→ Always anchor to the leverage the asset provides\n→ \"We can't guarantee 50 leads, but we can guarantee your site will be built to convert every visitor possible.\"" },
    { h: "🗣️  LANGUAGE GUIDE", b: "When they talk about colors, you talk about conversions.\n\n🚫 STOP SAYING:\n→ \"We'll make your site look better\"\n→ \"We do web design\"\n→ \"We build websites\"\n\n✅ START SAYING:\n→ \"Your website should be generating leads consistently\"\n→ \"We build revenue systems for service businesses\"\n→ \"We turn your website into your best salesperson\"\n\nEvery word matters. Design language attracts tire-kickers. Revenue language attracts buyers." },
  ]},
  "m8": { t: "Module 8 — Pricing & Objection Handling", st: "Price with confidence. Walk away if needed.", s: [
    { h: "💰  PRICING MINDSET", b: "Pricing only feels expensive if the leverage wasn't explained.\n\n→ We don't justify our price — we explain the outcome\n→ If they understand the ROI, the price is a logical next step\n→ State the price clearly and calmly\n→ Never apologize for the number. Never discount without removing scope.\n\nIf you've done your job in the call — stacked the value, identified the pain, shown the gap — the price should feel like a relief, not a shock." },
    { h: "🤫  THE GOLDEN RULE", b: "The first person to speak after the price is revealed loses leverage.\n\nSay the number. Stop talking. Let them process.\n\nSilence signals confidence and professionalism. Filling the silence with justification signals insecurity.\n\nThey might take 5 seconds. They might take 15. Let them think. The close is happening in their head right now. Don't interrupt it." },
    { h: "🛡️  OBJECTION FRAMEWORK", b: "Acknowledge. Re-anchor. Ask.\n\n1️⃣ ACKNOWLEDGE — Don't argue with the concern.\n\"That makes total sense. A lot of our clients felt the same way before they saw the results.\"\n\n2️⃣ RE-ANCHOR — Bring it back to business impact and revenue loss.\n\"The question isn't whether $2,497 is a lot — it's whether losing 10-15 leads per month is costing you more than that.\"\n\n3️⃣ ASK — Use a clarifying or closing question.\n\"If we could solve that, would you be ready to move forward?\"\n\nObjections usually mean uncertainty, not a final \"No.\" Your job is to resolve the uncertainty." },
    { h: "🚶  KNOW WHEN TO WALK", b: "Not every business is a Redline fit.\n\n→ Discounting destroys positioning. The moment you drop the price, you confirm their suspicion that it wasn't worth it.\n→ We do not compete on price — we compete on execution\n→ Walking away preserves your authority for the next deal\n→ A bad client at a discount is worse than no client at all\n\nIf they only care about the cheapest option, they're not our client. Let them hire the nephew." },
  ]},
  "m9": { t: "Module 9 — Post-Close & Client Handoff", st: "Precision in the handoff is non-negotiable.", s: [
    { h: "⚠️  WHY THIS MATTERS", b: "Clients judge us most intensely after they pay.\n\n→ A sloppy post-close experience kills referral potential and trust\n→ Precision in the handoff is non-negotiable\n→ The client should feel they are in a machine, not a chaotic workshop\n→ This is where lifetime value is built or destroyed\n\nEvery closed deal should generate 2-3 referrals. That only happens if the experience after the sale is as sharp as the pitch before it." },
    { h: "✅  THE HANDOFF CHECKLIST", b: "Execute every step. Every time. No shortcuts.\n\n1️⃣ Confirm Payment — Verify Stripe payment has cleared\n2️⃣ Restate Expectations — Recap exactly what they purchased and what's included\n3️⃣ Document Project Details — All info from the onboarding form logged and shared with the build team\n4️⃣ Explain 7–10 Day Delivery — Set the timeline clearly. No vague promises.\n\nThe client should leave the handoff knowing exactly what happens next, when it happens, and who to contact if they have questions." },
    { h: "🛡️  BRAND PROTECTION", b: "Professional and direct. Always.\n\n📌 THE VOICE:\n→ Professional and direct\n→ No slang, no emojis, no casual guarantees\n→ No personal opinions in client comms\n→ Write like you're representing a premium firm — because you are\n\n📌 THE RULE:\n→ Never speak negatively about competitors\n→ It makes us look small and insecure\n→ Let our work do the talking\n→ If they mention a competitor, acknowledge and redirect: \"Our focus is on what we can deliver for you.\"" },
  ]},
  "m10": { t: "Module 10 — Compensation & Growth", st: "Outcomes, not busy work. This is how you get paid.", s: [
    { h: "📊  HOW YOU'RE MEASURED", b: "This role rewards outcomes, not busy work.\n\n📌 WHAT COUNTS:\n→ Outreach quality & reply rates\n→ Calls booked & deals closed\n→ Activity matters, but the P&L matters more\n→ 100 calls that book 0 audits = a process problem, not an effort problem\n\n💰 COMMISSION STRUCTURE:\n→ Commission earned per closed deal\n→ Paid immediately after client payment clears\n→ Better positioning → higher deal value → higher commissions\n→ Maintenance clients = recurring monthly income that compounds" },
    { h: "🚀  THE GROWTH PATH", b: "This isn't a gig. It's a path to leadership.\n\n→ Top performers advance to Senior Closer and Leadership roles\n→ We are building a high-finance-style culture — performance is everything\n→ Treat this like a real business — because it is one\n\nRedline is scaling. The people who show up now, execute consistently, and close deals are the people who will be leading teams in 6 months." },
  ]},
  "m11": { t: "Module 11 — Full Deal Walkthrough", st: "Locate. Call. Book. Pitch. Close. Start to finish.", s: [
    { h: "🔄  THE FULL CYCLE", b: "Every deal follows the same 5-step process:\n\n1️⃣ LOCATE → Find the prospect\n2️⃣ CALL → Cold call the owner\n3️⃣ BOOK → Lock in the video audit\n4️⃣ PITCH → Deliver the audit + run the sales call\n5️⃣ CLOSE → Handle objections, get the signature\n\nThis module walks through a real deal from first touch to signed contract." },
    { h: "1️⃣  LOCATE", b: "→ Search Google Maps: \"HVAC near Waltham, MA\"\n→ Open their website — assess in 30 seconds\n→ Look for: outdated design, no CTAs, no quote form, slow load, broken mobile\n→ Check Google reviews — good reviews + bad site = perfect lead\n→ Find the owner's name and direct number\n→ Log it in the spreadsheet" },
    { h: "2️⃣  CALL", b: "→ Run the Redline Trigger: 90 seconds of research before you dial\n→ Open with pattern interrupt: \"I promise I'm not selling you a warranty\"\n→ Deliver your specific observation about their site\n→ Identify the pain in under 2 minutes\n→ ONE goal: get them to agree to the video audit\n→ If they're busy, offer a callback time. If not interested, leave clean." },
    { h: "3️⃣  BOOK THE AUDIT", b: "→ \"I'll have the video audit in your inbox by [Day]. What's the best email?\"\n→ Confirm their email live on the call\n→ Send a confirmation within 1 hour\n→ Speed matters — don't let momentum die between the call and the audit" },
    { h: "4️⃣  PITCH", b: "→ Walk through their site's problems on screen\n→ Use the 6-Step Call Structure from Module 6\n→ Make them feel the cost of their current site\n→ Position Redline as the solution, not a vendor\n→ 80/20 rule — let them talk\n→ Stack the value before you ever mention price" },
    { h: "5️⃣  CLOSE", b: "→ Use Module 8 framework: Acknowledge → Re-anchor → Ask\n→ State the price clearly — then stop talking\n→ If they're in: send PandaDoc contract immediately\n→ If they need time: schedule follow-up within 48 hours\n→ Run Module 9 handoff checklist after signature\n→ Never leave a call without a defined next step" },
  ]},
  "m12": { t: "Module 12 — Payment & Client Onboarding", st: "Send invoices professionally. Onboard with precision.", s: [
    { h: "📋  THE STANDARD", b: "Every client interaction after the close reflects the Redline brand.\n\n→ Invoices sent immediately after verbal confirmation\n→ Payment links are clean, correct, and professional\n→ Onboarding form included in every email\n→ No typos. No wrong links. No sloppy formatting.\n→ Send within 1 hour of verbal close" },
    { h: "💳  PAYMENT LINKS", b: "Use the correct Stripe link for their package:\n\n▶ Starter Build ($1,497)\nhttps://buy.stripe.com/dRmfZa5ucdSC9uDfAQ3ks08\n\n▶ Pro Build ($2,497)\nhttps://buy.stripe.com/aFaaEQ09Sg0K22bdsI3ks0c\n\n▶ Elite Build ($4,497)\nhttps://buy.stripe.com/aFabIUf4MaGq7mvgEU3ks09\n\n▶ Monthly Maintenance ($99/mo)\nhttps://buy.stripe.com/00w00c6yg4i2ayHfAQ3ks0a\n\n▶ Yearly Maintenance ($599/yr)\nhttps://buy.stripe.com/3cI4gs8Go29UfT19cs3ks0b\n\n⚠️ Only include the link(s) that match what the client purchased." },
    { h: "📝  ONBOARDING FORM", b: "This goes in every client email. No exceptions.\n\nhttps://forms.gle/EGaHjGUffqdGBH8v9\n\nThis gives the build team everything needed to start. Takes the client ~5 minutes.\n\n⚠️ Do not start work until both payment AND form are received." },
    { h: "📧  THE EMAIL TEMPLATE", b: "Subject: Redline Web Services — Next Steps & Onboarding | [CLIENT COMPANY NAME]\n\nHi [CLIENT FIRST NAME],\n\nThank you for choosing Redline Web Services — we're looking forward to building something that drives real results for [CLIENT COMPANY NAME].\n\nTo get started, we need two things from you:\n\n—\n\n1. COMPLETE YOUR ONBOARDING FORM\nThis gives our team everything we need to begin. Takes about 5 minutes.\nhttps://forms.gle/EGaHjGUffqdGBH8v9\n\n—\n\n2. FINALIZE YOUR PAYMENT\nClick the secure link below to complete payment for your [PACKAGE NAME] package:\n[INSERT CORRECT STRIPE LINK]\n\n—\n\nOnce we receive both the form and payment, our team gets to work immediately. You'll receive your first update within [TURNAROUND TIME].\n\nQuestions? Reply directly to this email or text me at [YOUR PHONE NUMBER].\n\nLooking forward to it,\n[YOUR FULL NAME]\nRedline Web Services\nwww.redlinewebservices.net\n\n💡 See the full Onboarding Email Template in Quick Reference for the complete payment links, professionalism checklist, and copy-paste instructions." },
  ]},
  "tech-bc": { t: "Technical Bootcamp", st: "Deep-dive crash course. Know what you sell inside and out.", s: [
    { h: "💡  WHY THIS MATTERS", b: "The Knowledge Advantage.\n\nDeep technical knowledge builds trust and is the key differentiator for high-performing reps. When you understand WHY our solutions work — not just what they are — you become a trusted advisor, not a salesperson.\n\nClients can feel the difference. The rep who can explain how page speed affects Google rankings closes 3x more than the rep who just says \"we make fast sites.\"\n\nThis bootcamp turns you from someone who sells websites into someone who sells business growth backed by technical authority." },
    { h: "🌐  WEB DESIGN & DEVELOPMENT", b: "A website is a 24/7 digital storefront. 75% of consumers judge a business's credibility by its website design.\n\n🎨 CUSTOM DESIGN vs. TEMPLATES\nRedline builds custom — not cookie-cutter templates. Every element is designed for that client's market, audience, and conversion goals. Templates look like templates. Custom looks like authority.\n\n🏗️ WEBSITE STRUCTURE & USER FLOW\nThe 5-Second Test: if a visitor can't understand what you do and what to do next within 5 seconds, the site fails. Structure = clarity = conversions.\n\n📱 RESPONSIVE DESIGN\n60%+ of traffic is mobile. If the site breaks on a phone, you're losing the majority of potential leads. This is non-negotiable — every Redline site is mobile-first." },
    { h: "🔍  SEO & GOOGLE RANKINGS", b: "Page 1 is non-negotiable. Position 1 gets ~27% of clicks. Page 2 gets less than 1%.\n\n📄 ON-PAGE SEO\n→ Keywords placed strategically (not stuffed)\n→ Optimized title tags and meta descriptions\n→ Schema markup — structured data that helps Google understand the business\n\n📍 LOCAL SEO\n→ Google Business Profile optimization\n→ NAP consistency (Name, Address, Phone — identical everywhere online)\n→ Maps 3-Pack positioning — the top 3 results shown on Google Maps\n\n⚙️ TECHNICAL SEO\n→ Site speed optimization\n→ HTTPS security\n→ Clean, crawlable code\n\n💡 KEY SELLING POINT:\nSEO is equity — it compounds over time. Paid ads are rent — when you stop paying, traffic stops. We build equity." },
    { h: "📈  CONVERSION RATE OPTIMIZATION (CRO)", b: "The science of turning visitors into customers.\n\nAverage sites convert at 2-3%. Top performers hit 10-20%+. That gap is real money.\n\n⬆️ ABOVE THE FOLD\nThe first screen visitors see without scrolling. Must answer: who you are, what you do, and what to do next.\n\n🛡️ TRUST SIGNALS\nReviews, certifications, guarantees, \"As Seen In\" logos — anything that removes doubt and builds confidence.\n\n🎯 CTAs (CALLS-TO-ACTION)\nBenefit-driven language wins every time:\n→ \"Get My Free Quote\" beats \"Submit\"\n→ \"Book My Service\" beats \"Contact Us\"\n→ Make the action feel valuable, not transactional\n\n📝 FORM DESIGN\n3-4 fields max: Name, Phone, Email, Job Description. Every extra field kills conversions." },
    { h: "🎨  BRANDING & DESIGN PSYCHOLOGY", b: "Design is not decoration. It's a psychological tool.\n\n🎨 COLOR PSYCHOLOGY\nBlue = trust and reliability. Red = urgency and action. Green = growth and money. The client's palette should match their market positioning.\n\n🔤 TYPOGRAPHY & READABILITY\nClean, modern fonts signal professionalism. Hard-to-read fonts signal amateur. We choose fonts that build trust.\n\n👁️ VISUAL HIERARCHY\nGuide the visitor's eye: headline → subhead → CTA. If everything looks equally important, nothing is.\n\n🔄 CONSISTENCY\nSame colors, fonts, and tone across every page builds subconscious trust. Inconsistency signals chaos." },
    { h: "⚡  SPEED, MOBILE & PERFORMANCE", b: "The Invisible Dealbreakers.\n\n🏎️ PAGE SPEED\n40% of visitors leave if load time exceeds 3 seconds. Every additional second = more lost leads. This is a silent revenue killer.\n\n📊 CORE WEB VITALS\nGoogle's performance metrics that directly impact rankings:\n→ Loading performance (how fast content appears)\n→ Interactivity (how fast the site responds to clicks)\n→ Visual stability (does the page jump around while loading?)\n\n📱 MOBILE PERFORMANCE\nNot just \"it works on a phone.\" It must be fast, clean, and thumb-friendly.\n\n🔒 SECURITY (HTTPS/SSL)\nWithout it, browsers show \"Not Secure.\" Instant trust killer. Google penalizes non-HTTPS sites." },
    { h: "🤖  AI INTEGRATION", b: "Our biggest differentiator. Most agencies don't touch this.\n\n💬 AI CHATBOTS\n24/7 lead capture. Qualifies visitors, answers questions, books appointments while the owner sleeps.\n\n🎯 AI LEAD QUALIFICATION\nAutomatically prioritize hot leads based on behavior. The owner talks to ready-to-buy prospects, not tire-kickers.\n\n⭐ AUTOMATED REVIEW COLLECTION\nAutomatically request reviews after completed jobs. More 5-star reviews = higher rankings = more leads.\n\n📅 SMART SCHEDULING\nAI books appointments directly into the owner's calendar. Zero back-and-forth.\n\n💡 SELLING POINT: Early adopter advantage. Their competitors aren't doing this yet. This is how they leapfrog." },
    { h: "🔧  MAINTENANCE PLANS", b: "A website is living technology. Without maintenance, it degrades.\n\n→ Security updates (prevent hacks)\n→ Performance optimization (keep it fast)\n→ Content updates (keep it fresh and relevant)\n→ Uptime monitoring (catch downtime before clients notice)\n\n💸 THE COST OF NEGLECT:\n→ Sites get hacked → costs thousands to fix\n→ Rankings decline → leads dry up\n→ Speed degrades → visitors bounce\n→ The entire investment rots\n\nSell it as: \"Protecting and growing their investment.\" Like a car — you don't buy it and never change the oil.\n\n$99/month or $599/year. Recurring revenue for you." },
    { h: "🏆  THE SALES FRAMEWORK", b: "How to use technical knowledge on calls:\n\n📌 RULE 1: Lead with the business outcome\nNever lead with features. \"Your site will generate more leads\" not \"We use React and Tailwind.\"\n\n📌 RULE 2: The \"Which Means\" bridge\n\"We optimize for mobile — which means the 60% of visitors on their phone can actually book a job.\"\n\n📌 RULE 3: Only go as deep as the client wants\nSome owners want details. Some just want to know it works. Read the room.\n\n📌 RULE 4: Use comparison to create urgency\n\"Your competitor loads in 1.8 seconds. Yours loads in 6. Guess who Google shows first?\"\n\n📌 RULE 5: Stack the technical value before the price\nBy the time you say the number, they should already feel like it's a steal." },
    { h: "📋  TECHNICAL CHEAT SHEET", b: "Quick translations for sales calls:\n\nCustom Design → \"Built specifically for your market and customers\"\nSEO → \"Getting found on Google without paying for every click\"\nLocal SEO → \"Showing up in Google Maps when someone searches your service\"\nCRO → \"Turning more visitors into paying customers\"\nPage Speed → \"40% of people leave if your site takes more than 3 seconds\"\nMobile → \"60%+ of your traffic is on a phone — it has to work perfectly\"\nHTTPS → \"Without it, browsers warn people your site isn't safe\"\nAI Chatbot → \"A 24/7 sales rep that books jobs while you sleep\"\nMaintenance → \"Protecting your investment so it keeps generating revenue\"\nSchema Markup → \"Code that tells Google exactly what your business does\"\nNAP Consistency → \"Your business info matching everywhere online so Google trusts you\"\n\n→ Always translate features into outcomes. That's the Redline way." },
  ]},
  "sales-bc": { t: "Sales Bootcamp", st: "The complete system that closes deals.", s: [
    { h: "🚨  THE WAKE-UP CALL", b: "Selling is not about talking or listing features.\n\nIt's about making the other person feel the gap between where they are and where they could be.\n\n→ A \"no\" is not personal — it's a reflection of their current understanding of the value\n→ Success is built on running a consistent system, not \"winging it\"\n→ You are not an order-taker. You are a closer running a proven process.\n→ The reps who follow the system eat. The reps who freelance starve." },
    { h: "📐  THE VALUE EQUATION", b: "The single most important concept in sales.\n\n         Dream Outcome × Likelihood of Achievement\nVALUE = ———————————————————————————\n         Time Delay × Effort & Sacrifice\n\n⬆️ INCREASE THE TOP:\n→ Paint a vivid dream: \"Your phone ringing with qualified leads every week\"\n→ Stack proof: before/afters, competitor comparisons, specific data\n→ Increase their confidence that it will actually work\n\n⬇️ DECREASE THE BOTTOM:\n→ Reduce time: \"Live in 7–10 days\"\n→ Reduce effort: \"We handle everything — you fill out a 5-minute form\"\n→ Reduce risk: \"You see the audit before spending a dollar\"\n\nWhen value is high enough, price becomes irrelevant. Your entire job is to maximize this equation on every call." },
    { h: "📦  STACK THE VALUE — OFFER FRAMEWORK", b: "Build an offer that's stupid to refuse.\n\n1️⃣ IDENTIFY THE REAL PROBLEM\nNot \"I need a website.\" The real problem: \"I'm losing leads to competitors with better online presence.\"\n\n2️⃣ PAINT THE DREAM STATE\n\"Imagine your site generating 10-15 qualified leads per week without lifting a finger.\"\n\n3️⃣ STACK THE DELIVERABLES\n→ Custom site built for their market\n→ SEO from day one\n→ Mobile-optimized\n→ AI chatbot capturing leads 24/7\n→ Conversion-optimized CTAs and forms\n→ Ongoing maintenance and monitoring\n\n4️⃣ REDUCE RISK\n→ Time: \"Live in 7–10 days\"\n→ Effort: \"We handle everything\"\n→ Financial: \"You see the audit before spending a dollar\"\n\n5️⃣ CREATE HONEST URGENCY\nOpportunity cost: \"Every day your current site is live, you're losing leads to whoever makes it easiest to book.\"" },
    { h: "📞  COLD CALL FORMULA", b: "Short. Specific. About them, not you.\n\n1️⃣ OBSERVATION — Something specific about their business\n\"I was looking at your site and noticed there's no way to request a quote.\"\n\n2️⃣ PAIN POINT — Connect it to a cost\n\"In your market, that's probably costing you 2-3 leads a week.\"\n\n3️⃣ PROOF — One line of credibility\n\"We work specifically with [niche] contractors on this exact problem.\"\n\n4️⃣ LOW-COMMITMENT CTA\n\"Would you be open to a 2-minute video showing what I'd change?\"\n\n5️⃣ HUMAN CLOSE\nBe a person. Not a robot. If they say no, leave clean and professional." },
    { h: "🔄  SPIN CALL FRAMEWORK", b: "Diagnostic questioning that controls the conversation.\n\n🔵 S — SITUATION: Where are they now?\n\"How are most of your jobs coming in right now?\"\n\"What does your current lead flow look like?\"\n\n🔴 P — PROBLEM: What's not working?\n\"Are you happy with the leads your site generates?\"\n\"What happens when someone finds you online?\"\n\n🔥 I — IMPLICATION: What's the cost? (Twist the knife)\n\"How many customers are you losing because they can't find your quote button?\"\n\"What does one lost job cost you — $500? $2,000?\"\n\n✅ N — NEED-PAYOFF: Would the solution be worth it?\n\"If your site was generating 10+ leads a week on autopilot, would that be worth a conversation?\"\n\nLet THEM say yes. Don't tell them — ask them." },
    { h: "🛡️  OBJECTION DESTRUCTION", b: "Three-step framework for handling any \"no.\"\n\n1️⃣ ACKNOWLEDGE — Validate the feeling\n\"That makes total sense.\" / \"I completely understand.\"\n\n2️⃣ ISOLATE — Is this the real objection?\n\"If we could solve [concern], would you be open to moving forward?\"\n\"Is it the timing, the budget, or something else?\"\n\n3️⃣ RESOLVE — Address with logic, proof, or reframing\n\n\"Too expensive\" → Not enough value. Re-stack the offer.\n\"Bad timing\" → \"What's the cost of waiting another 3 months?\"\n\"Need to think\" → \"What specifically are you weighing?\"\n\"Nephew does it\" → \"Big difference between a website and a lead generation system.\"\n\nObjections = uncertainty, not a final no." },
    { h: "🎭  THE EMOTIONAL PLAYBOOK", b: "People buy emotionally and justify logically. Master these triggers:\n\n😰 FEAR OF LOSS\n\"Every day your site underperforms, leads go to your competitors.\"\n\n👑 STATUS & IDENTITY\n\"Your work is elite — your website should match.\"\n\n👥 SOCIAL PROOF & FOMO\n\"We just finished a site for an HVAC company in your area — their leads doubled in 30 days.\"\n\n🔮 THE FUTURE SELF\n\"6 months from now, your phone rings consistently and you're picking which jobs to take.\"\n\n💸 PAIN OF THE STATUS QUO\n\"The most expensive thing you can do is nothing. Your current site is costing you money every single day.\"" },
    { h: "📅  THE DAILY SYSTEM", b: "The 100-Contact Rule. 20 new prospects per day. 100 per week.\n\n⏰ 30 MIN — Research & Prep\nBuild your call list. Find direct owner numbers. Run the Redline Trigger.\n\n📞 2 HOURS — Cold Calls\nDial through your list. Use the Cold Call Formula. Book audits.\n\n🔄 1 HOUR — Follow-Ups\n80% of deals require 5+ touches. Call back warm leads. Send post-call follow-up emails.\n\n🎯 BOOKED CALLS — Run SPIN\nEvery sales call follows the framework. No winging it.\n\n📊 END OF DAY — Log Everything\nUpdate the tracker. Know your numbers.\n\nConsistency > talent. Every. Single. Day." },
  ]},
  "m13": { t: "Module 13 \u2014 The Redline Pipeline", st: "Your CRM is a Google Sheet. Master it or lose deals.", s: [
    { h: "\ud83d\udcca  WHY THE PIPELINE MATTERS", b: "Every deal you work lives in one place: the Redline Pipeline.\n\nhttps://docs.google.com/spreadsheets/d/1CXPnhfQYXoQ9XKRuaA6dWjwpV8Ga2zPs\n\nThis is our shared Google Sheets CRM. Leadership tracks performance here, you track your deals here, and nothing falls through the cracks.\n\n\u2192 If it is not in the sheet, it did not happen\n\u2192 If you are not updating it, you are flying blind\n\u2192 If your pipeline is empty, your commission check will be too\n\nThe reps who keep a clean pipeline close more deals. Period. Knowing where every lead stands means you always know what to do next." },
    { h: "\ud83d\udccb  THE COLUMNS", b: "Every row is one lead. Every column captures critical info.\n\n\ud83d\udccc COMPANY\nThe business name exactly as it appears on their website or Google listing. No abbreviations. No nicknames.\n\n\ud83d\udccc OWNER\nThe decision-maker. First and last name. If unknown, write TBD but make it a priority to find it.\n\n\ud83d\udccc PHONE\nBest number to reach the owner. Direct cell preferred. Format: (555) 555-5555.\n\n\ud83d\udccc EMAIL\nOwner email address. Confirm on the call whenever possible. This is where the audit and onboarding email go.\n\n\ud83d\udccc SITE URL\nFull website URL including https://. Referenced for audits and used by the build team.\n\n\ud83d\udccc DEAL STAGE\nWhere this lead stands in the sales process. Must be one of the 6 official stages. Update the same day anything changes.\n\n\ud83d\udccc REP NAME\nYour full name. Every single row. No exceptions. This is how commission is tracked." },
    { h: "\ud83d\udd04  DEAL STAGES", b: "Every lead moves through these stages. Only log a lead once you have actually connected with a human.\n\n1\ufe0f\u20e3 CONNECTED\nYou got the owner on the phone and had a real conversation. Not a voicemail. Not a receptionist.\n\n2\ufe0f\u20e3 DEMO / INFO SESSION BOOKED\nThey agreed to a follow-up call. You have a date and time confirmed.\n\n3\ufe0f\u20e3 PITCHED\nYou delivered the audit or ran the sales call. They have seen the Redline pitch.\n\n4\ufe0f\u20e3 PROPOSAL SENT\nFormal proposal or PandaDoc contract sent. Ball is in their court.\n\n5\ufe0f\u20e3 CLOSED WON\nContract signed, payment received. Revenue. Move to Module 12 handoff.\n\n6\ufe0f\u20e3 CLOSED LOST\nDeal is dead. Log the reason if you know it.\n\n\u26a0\ufe0f Leads you cold called but never connected with do NOT go in the pipeline. The pipeline starts at connection." },
    { h: "\u2795  HOW TO ADD A LEAD", b: "When you connect with a prospect on a cold call:\n\n1\ufe0f\u20e3 Open the Redline Pipeline sheet\n2\ufe0f\u20e3 Go to the next empty row at the bottom. Never insert rows in the middle.\n3\ufe0f\u20e3 Fill in every column:\n\u2192 Company name (exact)\n\u2192 Owner name\n\u2192 Phone number\n\u2192 Email (if you have it)\n\u2192 Site URL\n\u2192 Deal Stage: Connected\n\u2192 Rep Name: Your full name\n\n\u26a0\ufe0f Do this immediately after the call. Not end of day. Not tomorrow. Right after you hang up." },
    { h: "\ud83d\udd04  WHEN TO UPDATE THE STAGE", b: "Update the Deal Stage column the same day the status changes.\n\n\u2192 CONNECTED: You just spoke with the owner\n\u2192 DEMO BOOKED: They agreed to a follow-up with confirmed date and time\n\u2192 PITCHED: You delivered the video audit or full sales call\n\u2192 PROPOSAL SENT: Contract or proposal is in their inbox\n\u2192 CLOSED WON: Payment received and contract signed\n\u2192 CLOSED LOST: They declined, ghosted after 3+ follow-ups, or went elsewhere\n\nDo not batch update at end of week. Real-time accuracy is how leadership knows what is happening." },
    { h: "\ud83d\udea8  THE RULES", b: "Non-negotiable. Break them and you lose credibility.\n\n\ud83d\udd34 RULE 1: UPDATE SAME DAY\nEvery stage change gets logged the day it happens. A stale pipeline is useless.\n\n\ud83d\udd34 RULE 2: NEVER DELETE ROWS\nEven lost deals stay. Change the stage to Closed Lost. We need historical data.\n\n\ud83d\udd34 RULE 3: NEVER LEAVE REP NAME BLANK\nNo name means no credit. Commission is tracked by Rep Name. Protect your money.\n\n\ud83d\udd34 RULE 4: ONE ROW PER COMPANY\nNo duplicates. If a lead is already in the sheet, update the existing row.\n\n\ud83d\udd34 RULE 5: KEEP IT CLEAN\nNo notes in random columns. No color-coding without approval. The sheet is shared.\n\n\ud83d\udca1 Think of the pipeline as a scoreboard. 15 leads in Connected and zero in Pitched tells you where to focus. 5 in Proposal Sent means follow up aggressively this week. The pipeline tells you what to do next." },
  ]},
  "call-script": { t: "Call Script & Objection Playbook", st: "Handle Every Objection. Control Every Call. Close the Audit.", s: [
    { h: "📌  CALL PRINCIPLES", b: "Every call has ONE objective: book the video audit.\n\n→ Mirror Their Energy — match their tempo\n→ Acknowledge Before Redirect — \"I totally get that\" before pivoting\n→ Silence Is Your Weapon — shut up after your pitch\n→ Use Their Name — 2–3 times max\n→ Student Card — \"I'm a finance student at Bentley — I started this because contractors were getting ripped off.\"" },
    { h: "📞  SCRIPT 1: DISCOVERY CALL", b: "\"Hey {{First Name}}, this is {{Your Name}} from Redline. I took a look at your site and had some thoughts. Mind if I share what I found?\"\n\nDIAGNOSIS:\n→ \"How are jobs coming in — referrals, Google, ads?\"\n→ \"Happy with leads from the site, or could it do more?\"\n→ \"Ever had someone call a competitor because their site looked more professional?\"\n\nBRIDGE:\n\"I'll put together a short video walkthrough showing where you're losing leads. No cost, no obligation. Fair enough?\"" },
    { h: "📞  SCRIPT 2: COLD CALL", b: "\"Hey {{First Name}}, I promise I'm not selling you a warranty. I run a web company for {{Industry}} contractors. Had a quick question — 30 seconds?\"\n\n✅ YES → \"Your site doesn't have a clear way to request a quote. That's probably costing you 2-3 leads a week. Open to a 2-min video showing what I'd fix?\"\n\n⏰ BUSY → \"Can I call back at a better time?\"\n\n🚫 NOT INTERESTED → \"Is it because you're happy with performance, or timing?\"" },
    { h: "🛡️  OBJECTIONS 1–4", b: "\"I have a website\" → \"I know — I was on it. Is it generating leads or just sitting there?\"\n\n\"Referrals only\" → \"Great until they slow down. Your site backs them up. First thing people do is Google you.\"\n\n\"How much?\" → \"Depends on your situation. That's why I do the audit first.\" ⚠️ Never price first call.\n\n\"Bad experience\" → \"I hear that a lot — it's why I started this. You see the work before spending a dollar.\"" },
    { h: "🛡️  OBJECTIONS 5–8", b: "\"Let me think\" → \"Is it timing, budget, or not sold the site costs you leads?\"\n\n\"Nephew does it\" → \"Big difference between a website and a lead generation system.\"\n\n\"Too busy\" → \"Best time. Site should stack leads while you're on jobs.\"\n\n\"Send info\" → \"A brochure won't help. A video of YOUR site showing lost leads — that's valuable.\"" },
    { h: "🎯  CLOSING THE CALL", b: "✅ THEY'RE IN:\n\"Perfect. I'll have the audit by {{Day}}. What's the best email?\"\n\n⏸️ NOT READY:\n\"I'll send a one-line email with my info. No spam. Appreciate your time.\"" },
  ]},
  "comp-plan": { t: "Sales Compensation Structure", st: "Performance-tiered · Re-evaluated monthly · Based on collected revenue", s: [
    { h: "💎  DIAMOND — TIER 5", b: "Monthly revenue: $40K+ collected\n\nPay: Negotiated salary + 38–40% commission\n\nTake-home: $20K+ / mo · $240K–$420K+ / yr" },
    { h: "🟣  PLATINUM — TIER 4", b: "Monthly revenue: $25–40K collected\n\nPay: $20 / hr + 36% commission\n\nTake-home: $12,460–$17,860 / mo · $150K–$214K / yr" },
    { h: "🟡  GOLD — TIER 3", b: "Monthly revenue: $12–25K collected\n\nPay: $15 / hr + 33% commission\n\nTake-home: $6,560–$10,850 / mo · $79K–$130K / yr" },
    { h: "⚪  SILVER — TIER 2", b: "Monthly revenue: $5–12K collected\n\nPay: 33% commission only\n\nTake-home: $1,650–$3,960 / mo · $20K–$48K / yr" },
    { h: "🟤  BRONZE — TIER 1", b: "Monthly revenue: $1.5–5K collected\n\nPay: 30% commission only\n\nTake-home: $450–$1,500 / mo · $5K–$18K / yr" },
    { h: "🆕  TRIAL — FIRST MONTH ONLY", b: "Pay: 25% commission only — placed into a tier at month-end\n\nTake-home: Varies based on performance" },
    { h: "📋  RULES", b: "1. Bracket placement is based on collected revenue (cash in bank), not signed contracts\n\n2. Hourly tiers (Gold and above) are paid in arrears — rep qualifies in month X, hourly starts month X+1\n\n3. Reps are reassessed monthly. 2 consecutive months below the current bracket triggers demotion\n\n4. 3 consecutive months in Bronze = parted ways\n\n5. Maintain / Optimize MRR attach: rep gets a one-time bonus equal to 1× the monthly fee at signing (e.g., $297 / mo Maintain = $297 bonus). No residual paid month-over-month\n\n6. Maintain MRR counts toward bracket placement only the signing month — not month-over-month\n\n7. Hourly assumes 40 hrs / wk (~173 hrs / mo)" },
  ]},
  "onboard-email": { t: "Client Onboarding Email Template", st: "The email your client receives after signing. Make it count.", s: [
    { h: "📋  HOW TO USE THIS TEMPLATE", b: "This is the first thing the client sees after they commit. It sets the tone for the entire relationship.\n\n→ Copy the email template below into Gmail or your email client\n→ Replace every [BRACKET] with the client's actual info\n→ Include ONLY the Stripe link for the package they purchased — delete all others\n→ The onboarding form link stays in every email. No exceptions.\n→ Send within 1 hour of verbal close. Speed = professionalism.\n→ Double-check every link before hitting send. Broken links destroy credibility." },
    { h: "✉️  SUBJECT LINE", b: "Redline Web Services — Next Steps & Onboarding | [CLIENT COMPANY NAME]\n\n💡 Keep the company name in the subject. It makes it easy for them to search their inbox later and signals this is specific to them, not a mass email." },
    { h: "📧  FULL EMAIL — COPY & SEND", b: "Hi [CLIENT FIRST NAME],\n\nThank you for choosing Redline Web Services — we're looking forward to building something that drives real results for [CLIENT COMPANY NAME].\n\nTo get started, we need two things from you:\n\n—\n\n1. COMPLETE YOUR ONBOARDING FORM\nThis gives our team everything we need to begin — your brand details, preferences, and project specifics. Takes about 5 minutes.\n\nhttps://forms.gle/EGaHjGUffqdGBH8v9\n\n—\n\n2. FINALIZE YOUR PAYMENT\nClick the secure link below to complete payment for your [PACKAGE NAME] package:\n\n[INSERT CORRECT STRIPE LINK HERE]\n\n—\n\nOnce we receive both the form and payment, our team gets to work immediately. You'll receive your first project update within [TURNAROUND TIME — e.g. 5-7 business days].\n\nIf you have any questions at all, reply directly to this email or text me at [YOUR PHONE NUMBER]. I'm here to make this as smooth as possible.\n\nLooking forward to it,\n\n[YOUR FULL NAME]\nRedline Web Services\nwww.redlinewebservices.net" },
    { h: "💳  STRIPE PAYMENT LINKS", b: "Copy the correct link for their package. Only include one.\n\n→ Starter Build ($1,497)\nhttps://buy.stripe.com/dRmfZa5ucdSC9uDfAQ3ks08\n\n→ Pro Build ($2,497)\nhttps://buy.stripe.com/aFaaEQ09Sg0K22bdsI3ks0c\n\n→ Elite Build ($4,497)\nhttps://buy.stripe.com/aFabIUf4MaGq7mvgEU3ks09\n\n→ Monthly Maintenance ($99/mo)\nhttps://buy.stripe.com/00w00c6yg4i2ayHfAQ3ks0a\n\n→ Yearly Maintenance ($599/yr)\nhttps://buy.stripe.com/3cI4gs8Go29UfT19cs3ks0b" },
    { h: "📝  ONBOARDING FORM", b: "This link goes in every single client email. No exceptions.\n\nhttps://forms.gle/EGaHjGUffqdGBH8v9\n\nThis form collects everything the build team needs:\n→ Business name and contact info\n→ Brand colors, logo, and visual preferences\n→ Target audience and service area\n→ Content and copy direction\n→ Any specific features or functionality requests\n\n⚠️ Do not begin any build work until BOTH payment AND completed form are received." },
    { h: "⚠️  PROFESSIONALISM CHECKLIST", b: "Before you hit send, run through this:\n\n→ Client's name spelled correctly? (Check their website or LinkedIn)\n→ Company name exact match? (Don't guess — verify)\n→ Correct Stripe link for their specific package?\n→ All other payment links deleted?\n→ Onboarding form link included and working?\n→ Your name and phone number filled in?\n→ No typos, no broken formatting?\n→ Sent within 1 hour of verbal close?\n\nThis email is the first deliverable. If it looks sloppy, they'll wonder what the website will look like." },
  ]},
};
const CATS = [
  { id: "m1", t: "MODULE", n: "MODULE 1", sub: "Onboarding & Training", d: "Your foundation for closing deals", ic: "⚡", k: "m1" },
  { id: "m2", t: "MODULE", n: "MODULE 2", sub: "Target Market & Lead Gen", d: "Find the right businesses", ic: "🎯", k: "m2" },
  { id: "m3", t: "MODULE", n: "MODULE 3", sub: "Positioning & Strategy", d: "Revenue consultant mindset", ic: "🧠", k: "m3" },
  { id: "m4", t: "MODULE", n: "MODULE 4", sub: "Cold Call Mastery", d: "Earn attention, don't demand it", ic: "🔥", k: "m4" },
  { id: "m5", t: "MODULE", n: "MODULE 5", sub: "Reply Handling", d: "Move fast, get on the phone", ic: "⏱️", k: "m5" },
  { id: "m6", t: "MODULE", n: "MODULE 6", sub: "Sales Call Framework", d: "Control the call, close the deal", ic: "📋", k: "m6" },
  { id: "m7", t: "MODULE", n: "MODULE 7", sub: "Value Prop & Messaging", d: "Sell outcomes, not design", ic: "💎", k: "m7" },
  { id: "m8", t: "MODULE", n: "MODULE 8", sub: "Pricing & Objections", d: "Price with confidence", ic: "💵", k: "m8" },
  { id: "m9", t: "MODULE", n: "MODULE 9", sub: "Post-Close & Handoff", d: "Precision in the handoff", ic: "🤝", k: "m9" },
  { id: "m10", t: "MODULE", n: "MODULE 10", sub: "Compensation & Growth", d: "How you get paid and advance", ic: "📈", k: "m10" },
  { id: "m11", t: "MODULE", n: "MODULE 11", sub: "Full Deal Walkthrough", d: "Locate → Call → Book → Pitch → Close", ic: "🎬", k: "m11" },
  { id: "m12", t: "MODULE", n: "MODULE 12", sub: "Payment & Onboarding", d: "Invoices, forms, and handoff", ic: "✅", k: "m12" },
  { id: "m13", t: "MODULE", n: "MODULE 13", sub: "The Redline Pipeline", d: "Master the Google Sheets CRM", ic: "📊", k: "m13" },
  { id: "d1", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Technical Knowledge", d: "Deep-dive on what you sell", ic: "🔧", k: "tech-bc" },
  { id: "d2", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Sales Crash Course", d: "The system that closes deals", ic: "💪", k: "sales-bc" },
  { id: "d3", t: "REFERENCE", n: "REFERENCE", sub: "Call Script & Objections", d: "Scripts and objection playbook", ic: "📞", k: "call-script" },
  { id: "d4", t: "REFERENCE", n: "REFERENCE", sub: "Compensation Plan", d: "Full commission breakdown", ic: "💰", k: "comp-plan" },
  { id: "d5", t: "REFERENCE", n: "REFERENCE", sub: "Onboarding Email Template", d: "Payment links and forms", ic: "📧", k: "onboard-email" },
  { id: "qz1", t: "QUIZ", n: "QUIZ", sub: "Modules 1–4", d: "Onboarding, targeting, positioning, cold calls", ic: "🧪", k: "q-m1-4" },
  { id: "qz2", t: "QUIZ", n: "QUIZ", sub: "Modules 5–8", d: "Replies, sales calls, value prop, pricing", ic: "🧪", k: "q-m5-8" },
  { id: "qz3", t: "QUIZ", n: "QUIZ", sub: "Modules 9–12", d: "Post-close, comp, deal cycle, onboarding", ic: "🧪", k: "q-m9-12" },
  { id: "qz4", t: "QUIZ", n: "QUIZ", sub: "Technical Bootcamp", d: "Web design, SEO, CRO, speed, AI", ic: "🧪", k: "q-tech" },
  { id: "qz5", t: "QUIZ", n: "QUIZ", sub: "Sales Bootcamp", d: "Value equation, SPIN, objections, daily system", ic: "🧪", k: "q-sales" },
  { id: "qz6", t: "QUIZ", n: "QUIZ", sub: "The Redline Pipeline", d: "CRM rules, stages, and process", ic: "🧪", k: "q-pipeline" },
];

const QUIZZES = {
  "q-m1-4": { title:"Modules 1–4 Quiz", subtitle:"Onboarding, Target Market, Positioning & Cold Calls", qs: [
    { q:"What is the ONE objective of every cold call?", o:["Close the deal on the phone","Book the free video audit","Get them to visit our website","Send them a pricing sheet"], a:1 },
    { q:"What is the minimum number of cold calls expected per week?", o:["50","75","100","200"], a:2 },
    { q:"Which of these is NOT a target niche for Redline?", o:["HVAC contractors","SaaS startups","Plumbers","Electricians"], a:1 },
    { q:"What is the primary lead generation tool taught in Module 2?", o:["LinkedIn Sales Navigator","Google Maps","Facebook Ads","Cold email lists"], a:1 },
    { q:"When cold calling, who should you try to reach?", o:["The receptionist","The marketing manager","The business owner directly","Anyone who answers"], a:2 },
    { q:"How should you position yourself on calls?", o:["As a freelancer looking for work","As a revenue consultant diagnosing a problem","As a web designer","As a student doing a project"], a:1 },
    { q:"What is the 'Redline Trigger' before a cold call?", o:["Checking if they have a website","Taking 90 seconds to find one clear issue with their site","Googling their revenue","Reading their reviews"], a:1 },
    { q:"What should you NEVER say on a cold call?", o:["\"I noticed your site has no quote form\"","\"I promise I'm not selling a warranty\"","\"Hope you're doing well\"","\"Do you have 30 seconds?\""], a:2 },
    { q:"What is the ideal CTA at the end of a cold call?", o:["\"Can I send a 30-page proposal?\"","\"Want a 1-hour meeting?\"","\"Open to a 2-min video showing what I'd change?\"","\"Can I give you pricing?\""], a:2 },
    { q:"Why skip general front-desk phone lines?", o:["They cost more","Receptionists won't pass on your message","It's against policy","Owners never have front desks"], a:1 },
  ]},
  "q-m5-8": { title:"Modules 5–8 Quiz", subtitle:"Reply Handling, Sales Calls, Value Prop & Pricing", qs: [
    { q:"When a prospect replies 'Sounds interesting,' what does it mean?", o:["Ready to buy","Open but needs a leader to direct them","Wants a brochure","Not interested"], a:1 },
    { q:"What is the response formula for warm replies?", o:["Send PDF + pricing + calendar","Acknowledge + Short Value + Call Invitation","Write detailed feature email","Wait 48 hours"], a:1 },
    { q:"What should you NEVER do over email?", o:["Confirm a meeting time","Send contact info","Negotiate or justify pricing","Say thank you"], a:2 },
    { q:"What is step 3 in the 6-Step Sales Call Structure?", o:["Redline Positioning","The Close","Pain Identification","Business Discovery"], a:2 },
    { q:"What is the 80/20 listening rule?", o:["Close 80% within 20 min","Listen 80%, talk 20%","80% revenue from 20% clients","80% calls, 20% email"], a:1 },
    { q:"What is the key shift in Module 7's value proposition?", o:["Cheapest websites","Design and aesthetics","Business outcomes — leads, calls, revenue","Maintenance plans"], a:2 },
    { q:"What is 'The Golden Rule' when presenting price?", o:["Always offer a discount","First person to speak after the price loses leverage","Never state price directly","Round down"], a:1 },
    { q:"What is the 3-step objection framework?", o:["Deny, Deflect, Close","Acknowledge, Re-anchor, Ask","Agree, Discount, Close","Listen, Pitch, Follow-up"], a:1 },
    { q:"'That's too expensive' really means:", o:["They can't afford it","You haven't built enough value","They want a different package","They're lying"], a:1 },
    { q:"When should you walk away from a deal?", o:["Never","When they want a discount that destroys positioning","When they take 24hrs to respond","When they mention a competitor"], a:1 },
  ]},
  "q-m9-12": { title:"Modules 9–12 Quiz", subtitle:"Post-Close, Compensation, Deal Cycle & Onboarding", qs: [
    { q:"Why does the post-close experience matter?", o:["It doesn't — sale is made","Clients judge us most intensely after they pay","Required by law","Build team handles it"], a:1 },
    { q:"What are the handoff checklist steps?", o:["Design, Build, Launch, Invoice","Confirm Payment, Restate Expectations, Document Details, Explain Timeline","Send Email, Wait, Build, Deliver","Call, Contract, Pay, Start"], a:1 },
    { q:"What should you NEVER do in client comms?", o:["Use their first name","Be direct","Speak negatively about competitors","Send a follow-up"], a:2 },
    { q:"What commission tier do new reps start at?", o:["10%","20%","25%","30%"], a:2 },
    { q:"How many deals unlock Tier 2 (30%)?", o:["10","20","50","100"], a:1 },
    { q:"Correct order of the full deal cycle?", o:["Call, Locate, Book, Close, Pitch","Locate, Call, Book, Pitch, Close","Book, Call, Locate, Pitch, Close","Pitch, Call, Book, Locate, Close"], a:1 },
    { q:"How soon should the onboarding email be sent?", o:["Within 24 hours","Within 1 hour","Within 1 week","After contract signing"], a:1 },
    { q:"What must you receive BEFORE starting build work?", o:["A signed NDA","Payment AND completed onboarding form","Three references","A detailed brief"], a:1 },
    { q:"Monthly recurring commission for a maintenance client?", o:["$10/mo","$25/mo","$50/mo","$99/mo"], a:1 },
    { q:"Year 1 earning projection for a high performer?", o:["$25,000+","$52,000+","$78,000+","$104,000+"], a:3 },
  ]},
  "q-tech": { title:"Technical Bootcamp Quiz", subtitle:"Web design, SEO, CRO, speed, AI & maintenance", qs: [
    { q:"What % of consumers judge credibility by website design?", o:["25%","50%","75%","90%"], a:2 },
    { q:"What % of traffic is typically mobile?", o:["20%+","40%+","60%+","80%+"], a:2 },
    { q:"What does the '5-Second Test' measure?", o:["Page load speed","Whether a visitor understands the site in 5 seconds","Time on page","Time to first click"], a:1 },
    { q:"What is NAP consistency in Local SEO?", o:["Number of Ads Placed","Name, Address, Phone matching everywhere","New Audience Penetration","National Ad Program"], a:1 },
    { q:"What % of visitors leave if load time exceeds 3 seconds?", o:["10%","20%","40%","60%"], a:2 },
    { q:"Average conversion rate for most websites?", o:["0.5-1%","2-3%","8-10%","15-20%"], a:1 },
    { q:"Why is SEO 'equity' vs paid ads 'rent'?", o:["SEO costs more","SEO compounds; ads stop when you stop paying","Ads are illegal for contractors","SEO only works for big companies"], a:1 },
    { q:"What should a CTA say instead of 'Submit'?", o:["Click Here","Send Form","Get My Free Quote","Go"], a:2 },
    { q:"What is Redline's biggest technical differentiator?", o:["Custom fonts","AI integration (chatbots, lead qualification, scheduling)","WordPress themes","Social media management"], a:1 },
    { q:"How to frame a maintenance plan?", o:["An upsell they don't need","Protecting and growing their investment","Optional but recommended","A legal requirement"], a:1 },
  ]},
  "q-sales": { title:"Sales Bootcamp Quiz", subtitle:"Value equation, SPIN, objections & the daily system", qs: [
    { q:"In the Value Equation, what's in the NUMERATOR?", o:["Time Delay × Effort","Dream Outcome × Perceived Likelihood","Price × Features","Objections × Competitors"], a:1 },
    { q:"To increase perceived value, you should:", o:["Lower the price","Increase dream outcome and reduce time/effort","Add more features","Send more emails"], a:1 },
    { q:"What does 'S' stand for in SPIN?", o:["Sales","Strategy","Situation","Solution"], a:2 },
    { q:"Purpose of 'Implication' questions in SPIN?", o:["Close the deal","Make them feel the cost of the problem","Explain pricing","Build rapport"], a:1 },
    { q:"In objection handling, after 'Acknowledge' comes:", o:["Close","Discount","Isolate","Pitch"], a:2 },
    { q:"Which trigger uses 'people fear losing more than gaining'?", o:["Status & Identity","Social Proof","Fear of Loss / Loss Aversion","The Future Self"], a:2 },
    { q:"Daily contact target in the Daily System?", o:["10 prospects","20 prospects/day","50 prospects","100 per week"], a:1 },
    { q:"What % of sales require 5+ touches?", o:["20%","40%","60%","80%"], a:3 },
    { q:"Step 5 of Stack the Value framework?", o:["Identify the problem","Paint the dream","Create honest urgency","Reduce risk"], a:2 },
    { q:"When someone says 'too expensive,' the #1 rule is:", o:["Offer a discount","Re-stack the value — you haven't built enough","Walk away","Send a comparison chart"], a:1 },
  ]},
  "q-pipeline": { title:"Pipeline Quiz", subtitle:"The Redline CRM — rules, stages, and process", qs: [
    { q:"When does a lead get added to the pipeline?", o:["After finding them on Google Maps","After leaving a voicemail","After actually connecting with the owner on a call","After sending an email"], a:2 },
    { q:"What are the 6 deal stages in order?", o:["New Lead, Called, Pitched, Sent, Won, Lost","Connected, Demo Booked, Pitched, Proposal Sent, Closed Won, Closed Lost","Called, Emailed, Pitched, Signed, Paid, Done","Lead, Contact, Meeting, Close, Invoice, Complete"], a:1 },
    { q:"When should you update the Deal Stage column?", o:["End of each week","Every Friday","The same day the status changes","When leadership asks"], a:2 },
    { q:"What should you NEVER do in the pipeline sheet?", o:["Add new leads","Update deal stages","Delete rows","Change your rep name"], a:2 },
    { q:"What goes in the Rep Name column?", o:["First name only","Slack handle","Your full name on every row","Only on Closed Won deals"], a:2 },
    { q:"You called a prospect but got voicemail. Do they go in the pipeline?", o:["Yes as New Lead","Yes as Connected","No — pipeline starts when you connect","Yes with a voicemail note"], a:2 },
    { q:"A lead already in the sheet just booked a demo. What do you do?", o:["Add a new row","Delete old row and make a new one","Update the existing row to Demo Booked","Text your manager"], a:2 },
    { q:"What is the correct Site URL format?", o:["johnsonhvac.com","www.johnsonhvac","https://johnsonhvac.com","Johnson HVAC website"], a:2 },
    { q:"A deal went cold after 3+ follow-ups. What stage?", o:["Delete the row","Leave as Proposal Sent","Change to Closed Lost","Move to a separate sheet"], a:2 },
    { q:"Why does the pipeline matter for YOU personally?", o:["It does not — just for management","Commission is tracked by Rep Name in the sheet","Legal requirement","It replaces cold calling"], a:1 },
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
@keyframes glow { 0%,100% { box-shadow:0 0 30px rgba(204,255,0,0.18),0 0 60px rgba(204,255,0,0.08) } 50% { box-shadow:0 0 60px rgba(204,255,0,0.36),0 0 110px rgba(204,255,0,0.16) } }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
@keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes borderSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes loginGlow { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes auroraDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-30px,30px) scale(0.95)} }
@keyframes slideIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
@keyframes popIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }

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
.aurora-bg {
  position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden;
}
.aurora-blob {
  position:absolute; border-radius:50%; filter:blur(80px); opacity:0.55; animation:auroraDrift 22s ease-in-out infinite;
}
.aurora-1 { width:520px; height:520px; top:-180px; left:-120px; background:radial-gradient(circle,rgba(204,255,0,0.18),transparent 65%); }
.aurora-2 { width:620px; height:620px; top:30%; right:-200px; background:radial-gradient(circle,rgba(99,102,241,0.13),transparent 65%); animation-delay:-7s; }
.aurora-3 { width:480px; height:480px; bottom:-160px; left:30%; background:radial-gradient(circle,rgba(245,158,11,0.10),transparent 65%); animation-delay:-14s; }

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
  color:#5E6376; transition: color 0.22s ease;
  border-radius:10px;
}
.tab-pill:hover { color:#A0A4B0 }
.tab-pill.active { color:#15171E }
.tab-pill .tab-bg {
  position:absolute; inset:0; border-radius:10px; opacity:0;
  background:linear-gradient(135deg,#CCFF00,#A8D900);
  box-shadow: 0 4px 16px rgba(204,255,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
  transition: opacity 0.28s ease;
  z-index:0;
}
.tab-pill.active .tab-bg { opacity:1 }
.tab-pill > span { position:relative; z-index:1 }

/* Buttons */
.btn-primary {
  background:linear-gradient(135deg,#CCFF00,#A8D900);
  color:#15171E; font-weight:800; letter-spacing:1.2px; text-transform:uppercase;
  border:none; border-radius:10px; cursor:pointer;
  box-shadow:0 6px 20px rgba(204,255,0,0.32), inset 0 1px 0 rgba(255,255,255,0.4);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.btn-primary:hover { transform:translateY(-1px); box-shadow:0 10px 28px rgba(204,255,0,0.45), inset 0 1px 0 rgba(255,255,255,0.5) }
.btn-primary:active { transform:translateY(0) }

.btn-ghost {
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  color:#9098A8; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
  border-radius:10px; cursor:pointer; transition: all 0.18s ease;
}
.btn-ghost:hover { background:rgba(255,255,255,0.07); color:#D6DAE2; border-color:rgba(255,255,255,0.14) }

/* Header pill buttons — Admin / Sign Out / Profile */
.btn-pill {
  display:inline-flex; align-items:center; justify-content:center; gap:7px;
  height:42px; padding:0 14px; font-size:11px; font-weight:700;
  letter-spacing:1.4px; text-transform:uppercase; border-radius:12px;
  cursor:pointer; transition: all 0.18s ease; font-family:inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08); color:#9098A8;
}
.btn-pill:hover { background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); color:#D6DAE2; border-color:rgba(255,255,255,0.16) }
.btn-pill.amber { color:#F59E0B; background: linear-gradient(180deg, rgba(245,158,11,0.10), rgba(245,158,11,0.04)); border-color:rgba(245,158,11,0.22) }
.btn-pill.amber:hover { background: linear-gradient(180deg, rgba(245,158,11,0.16), rgba(245,158,11,0.06)); border-color:rgba(245,158,11,0.36); color:#FBBF24 }
.btn-pill.icon-only { padding:0; width:42px; gap:0 }
.btn-pill svg { display:block }

/* Gradient text */
.red-gradient-text {
  background: linear-gradient(135deg, #DDFF40 0%, #CCFF00 50%, #E5FF1A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
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
    border: `1.5px solid ${hasErr ? "#FF3370" : "rgba(255,255,255,0.07)"}`,
    borderRadius:14, color:"#F2F4F8", fontSize:15, outline:"none",
    boxSizing:"border-box", fontFamily:"inherit", transition:"all 0.22s ease",
  });

  const onFocus = e => { e.target.style.borderColor = "rgba(204,255,0,0.6)"; e.target.style.boxShadow = "0 0 0 4px rgba(204,255,0,0.08)"; };
  const onBlur  = (e, hasErr) => { e.target.style.borderColor = hasErr ? "#FF3370" : "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; };

  return (
    <div className="dotgrid" style={{ minHeight:"100dvh", background:"#0E0F14", display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      {/* Aurora background to match the rest of the portal */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle, rgba(204,255,0,0.10) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:900, height:280, background:"radial-gradient(ellipse, rgba(204,255,0,0.05) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:420, animation:"fadeUp 0.7s cubic-bezier(0.4,0,0.2,1)", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 24px", filter:"drop-shadow(0 8px 36px rgba(204,255,0,0.5))" }}>
            <RedlineLogo height={56} />
          </div>
          <div className="red-gradient-text" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:14, lineHeight:1, animation:"gradShift 6s ease-in-out infinite", filter:"drop-shadow(0 0 32px rgba(204,255,0,0.35))" }}>REDLINE</div>
          <div style={{ fontSize:11, fontWeight:800, color:"#CCFF00", letterSpacing:6, textTransform:"uppercase", marginTop:9, opacity:0.85 }}>Rep Portal</div>
          <div style={{ width:64, height:1.5, background:"linear-gradient(90deg,transparent,#CCFF00,transparent)", margin:"16px auto 0", boxShadow:"0 0 12px rgba(204,255,0,0.6)" }} />
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3370" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{ color:"#FF3370", fontSize:12, fontWeight:600 }}>{err}</p>
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
      <div style={{ display:"flex", alignItems:"flex-start", gap:14, padding:dk?"16px 20px":"14px 16px", background:"linear-gradient(135deg, rgba(255,51,112,0.08), rgba(245,158,11,0.06))", border:"1px solid rgba(255,51,112,0.25)", borderRadius:14, marginBottom:24, animation:"fadeUp 0.4s ease" }}>
        <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,51,112,0.12)", border:"1px solid rgba(255,51,112,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FF3370" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:9.5, fontWeight:800, color:"#FF3370", letterSpacing:2.5, textTransform:"uppercase", marginBottom:4 }}>Mandatory Policy</div>
          <div style={{ fontSize:dk?13.5:12.5, fontWeight:700, color:"#F2F4F8", lineHeight:1.45, marginBottom:4 }}>
            2-day minimum office attendance per week
          </div>
          <div style={{ fontSize:dk?12.5:11.5, color:"#C4C8D4", lineHeight:1.55, fontWeight:500 }}>
            Every rep must book at least <span style={{ color:"#FF3370", fontWeight:700 }}>2 days</span> in the office each week. Failure to meet this minimum is grounds for <span style={{ color:"#FF3370", fontWeight:700 }}>termination</span>. No exceptions.
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
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#F59E0B80,transparent)", opacity:0.5 }} />
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
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${accent}80,transparent)`, opacity:0.5 }} />
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
                      onMouseEnter={e => { e.currentTarget.style.color="#FF3370"; e.currentTarget.style.borderColor="rgba(255,51,112,0.3)"; }}
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

  const clearDead = async () => {
    const targets = leads.filter(l => l.status === "dead" && (isAdmin || l.assigned_to === session.user.id));
    if (targets.length === 0) return;
    if (!confirm(`Delete ${targets.length} dead lead${targets.length === 1 ? "" : "s"}? This can't be undone.`)) return;
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
    { v: "dead",      label: "Dead",      color: "#FF3370" },
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
  const renderValue = (v) => {
    const s = (v ?? "").toString().trim();
    if (!s) return <span style={{ color:"#3A3D47" }}>—</span>;
    const linkStyle = { color:"#CCFF00", textDecoration:"none", borderBottom:"1px dotted rgba(204,255,0,0.4)" };
    // Explicit URL
    if (/^https?:\/\//i.test(s)) {
      return <a href={s} target="_blank" rel="noreferrer" style={linkStyle}>{s}</a>;
    }
    // www.something or bare domain like business.com / example.co.uk
    if (/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s) && /\.[a-z]{2,}/i.test(s)) {
      const href = /^www\./i.test(s) ? `https://${s}` : (s.includes(".") ? `https://${s}` : s);
      return <a href={href} target="_blank" rel="noreferrer" style={linkStyle}>{s}</a>;
    }
    // Email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) {
      return <a href={`mailto:${s}`} style={linkStyle}>{s}</a>;
    }
    // Phone — mostly digits with separators, ≥7 digits
    const digits = s.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15 && /^\+?[\d\s().+-]+$/.test(s)) {
      return <a href={`tel:${s.replace(/[^\d+]/g, "")}`} style={linkStyle}>{s}</a>;
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
        {statusFilter === "dead" && (counts.dead ?? 0) > 0 && (
          <button onClick={clearDead}
            style={{ background:"rgba(255,51,112,0.08)", border:"1px solid rgba(255,51,112,0.3)", color:"#FF3370", fontSize:10.5, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", padding:"7px 14px", borderRadius:8, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s", display:"flex", alignItems:"center", gap:8 }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,51,112,0.16)"; e.currentTarget.style.borderColor="rgba(255,51,112,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,51,112,0.08)"; e.currentTarget.style.borderColor="rgba(255,51,112,0.3)"; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Clear all ({counts.dead})
          </button>
        )}
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
                            <button onClick={() => removeLead(l.id)} className="btn-ghost" style={{ fontSize:10, padding:"7px 12px", color:"#FF3370", borderColor:"rgba(255,51,112,0.25)", background:"rgba(255,51,112,0.05)" }}>Delete</button>
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
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#CCFF00,transparent)", opacity:0.7, boxShadow:"0 0 14px rgba(204,255,0,0.5)" }} />
        {/* Subtle chartreuse glow at the top of the sidebar */}
        <div style={{ position:"absolute", top:-120, left:"50%", transform:"translateX(-50%)", width:"110%", height:280, background:"radial-gradient(ellipse at top, rgba(204,255,0,0.10), transparent 70%)", pointerEvents:"none" }} aria-hidden="true" />

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
          <div style={{ fontSize:13.5, fontWeight:800, color:"#F2F4F8", letterSpacing:"-0.01em" }}>Team Chat</div>
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
              <div style={{ fontSize:12 }}>Say hi to the team — break the ice.</div>
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
              <span style={{ fontStyle:"italic" }}>{label}</span>
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
        .msg-del:hover { color: #FF3370 !important; border-color: rgba(255,51,112,0.4) !important; }

        @keyframes typingBounce { 0%,80%,100% { transform: translateY(0); opacity: 0.4 } 40% { transform: translateY(-3px); opacity: 1 } }
        .typing-dots { display:inline-flex; gap:3px; align-items:center }
        .typing-dots span { width:4px; height:4px; border-radius:50%; background:#CCFF00; display:inline-block; animation: typingBounce 1.2s ease-in-out infinite; box-shadow: 0 0 6px rgba(204,255,0,0.6) }
        .typing-dots span:nth-child(2) { animation-delay: 0.15s }
        .typing-dots span:nth-child(3) { animation-delay: 0.3s }

        .chat-resize-handle:hover .chat-resize-grip,
        .chat-resize-handle:active .chat-resize-grip { background: #CCFF00 !important; height: 60px !important; box-shadow: 0 0 12px rgba(204,255,0,0.5); }

        .chat-input:focus {
          border-color: rgba(204,255,0,0.55) !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 0 0 4px rgba(204,255,0,0.10);
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.25); }

        .chat-send:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(204,255,0,0.4); }
        .chat-send:not(:disabled):active { transform: translateY(0); }

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
  const doneQuizzes = CATS.filter(x => x.t === "QUIZ" && quizScores[x.k]).length;

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

  const Card = ({ title, accent, action, actionOnClick, children, fullWidth }) => (
    <div className="dash-card" onMouseMove={onCardMove}
      style={{ padding:dk?"22px 24px":"18px 20px", gridColumn: fullWidth && wd ? "1 / -1" : undefined }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${accent}80,transparent)`, opacity:0.4 }} />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, position:"relative" }}>
        <div style={{ fontSize:10, fontWeight:800, color:accent, letterSpacing:2.5, textTransform:"uppercase" }}>{title}</div>
        {action && (
          <button onClick={actionOnClick}
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", color:"#9098A8", fontSize:9.5, fontWeight:700, letterSpacing:1.5, cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", padding:"6px 10px", borderRadius:8, transition:"all 0.18s" }}
            onMouseEnter={e => { e.currentTarget.style.color="#F2F4F8"; e.currentTarget.style.background="rgba(204,255,0,0.08)"; e.currentTarget.style.borderColor="rgba(204,255,0,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="#9098A8"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
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
        style={{ padding:dk?"26px 28px":"20px 20px", gridColumn: wd ? "1 / -1" : undefined,
          background: tierObj ? `linear-gradient(135deg, rgba(14,15,20,0.97) 0%, ${tierObj.color}10 100%)` : undefined,
          borderColor: tierObj ? `${tierObj.color}22` : undefined }}>
        {tierObj && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${tierObj.color}90,transparent)` }} />}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          {/* Left: tier name */}
          <div style={{ display:"flex", alignItems:"center", gap:dk?18:14 }}>
            <div style={{ width:dk?62:52, height:dk?62:52, borderRadius:16, background: tierObj ? `radial-gradient(circle at 35% 35%, ${tierObj.color}30, ${tierObj.color}08)` : "rgba(255,255,255,0.04)", border:`2px solid ${tierObj ? tierObj.color+"55" : "rgba(255,255,255,0.08)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow: tierObj ? `0 0 28px ${TIER_GLOW[tierObj.v]}` : undefined, fontSize:dk?26:22, lineHeight:1 }}>
              {tierObj ? tierObj.emoji : "?"}
            </div>
            <div>
              <div style={{ fontSize:9, fontWeight:800, color:"#5E6376", letterSpacing:2.5, textTransform:"uppercase", marginBottom:4 }}>Current Tier</div>
              <div style={{ fontSize:dk?30:24, fontWeight:900, color: tierObj ? tierObj.color : "#5E6376", letterSpacing:"-0.03em", lineHeight:1, textShadow: tierObj ? `0 0 24px ${TIER_GLOW[tierObj.v]}` : undefined }}>
                {tierObj ? tierObj.label.toUpperCase() : "—"}
              </div>
              {!tierObj && <div style={{ fontSize:11, color:"#444856", marginTop:4 }}>No tier assigned yet</div>}
            </div>
          </div>
          {/* Right: tier progression */}
          <div style={{ display:"flex", gap:dk?6:4, alignItems:"center" }}>
            {TIERS.map((t, i) => {
              const active = t.v === profile?.tier;
              const passed = tierIdx >= 0 && i < tierIdx;
              return (
                <div key={t.v} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{ width:dk?34:26, height:dk?34:26, borderRadius:9, background: active ? `radial-gradient(circle, ${t.color}30, ${t.color}10)` : passed ? `${t.color}15` : "rgba(255,255,255,0.03)", border:`1.5px solid ${active ? t.color : passed ? t.color+"50" : "rgba(255,255,255,0.07)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:dk?13:11, transition:"all 0.2s", boxShadow: active ? `0 0 14px ${TIER_GLOW[t.v]}` : undefined }}>
                    {active ? <span style={{ fontSize:dk?15:13 }}>{t.emoji}</span> : passed ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.12)" }} />}
                  </div>
                  {dk && <div style={{ fontSize:7.5, fontWeight:800, color: active ? t.color : passed ? t.color+"80" : "#5E6376", letterSpacing:1, textTransform:"uppercase" }}>{t.label}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Your Week */}
      <Card title="Your Week" accent="#CCFF00">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {[
            { v: myRankWeek >= 0 ? `#${myRankWeek + 1}` : "—", l: "Rank", c: "#FFD700" },
            { v: myWeek.count, l: "Sales", c: "#CCFF00" },
            { v: `${trainingPct}%`, l: "Training", c: "#22C55E" },
            { v: `${doneQuizzes}/${totalQuizzes}`, l: "Quizzes", c: "#10B981" },
          ].map(s => (
            <div key={s.l} style={{ background:`${s.c}10`, border:`1px solid ${s.c}20`, borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontSize:dk?24:19, fontWeight:900, color:s.c, lineHeight:1, letterSpacing:"-0.02em" }}>{s.v}</div>
              <div style={{ fontSize:8.5, color:`${s.c}70`, textTransform:"uppercase", letterSpacing:1.5, fontWeight:700, marginTop:5 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:16, padding:"14px 14px 10px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:12 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={{ fontSize:9, fontWeight:800, color:"#666C7E", letterSpacing:1.8, textTransform:"uppercase" }}>Daily Activity</div>
            {myWeek.total > 0 && (
              <div style={{ fontSize:11, fontWeight:700, color:"#22C55E" }}>${myWeek.total.toLocaleString()}</div>
            )}
          </div>
          <BarChart data={myDaily} accent="#CCFF00" highlight={todayIdx} height={dk?56:48} />
        </div>
      </Card>

      {/* Top Performers */}
      <Card title="This Week" accent="#FFD700" action="Leaderboard" actionOnClick={() => onGoTab("leaderboard")}>
        {rankedWeek.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 0", color:"#2E3140" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            <span style={{ fontSize:11, color:"#5E6376" }}>No sales yet this week</span>
          </div>
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
                <div style={{ fontSize:13, fontWeight:700, color:"#22C55E" }}>All modules complete</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Today on the Floor */}
      <Card title="On the Floor Today" accent="#F59E0B" action="Schedule" actionOnClick={() => onGoTab("scheduling")}>
        {todaysReps.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 0", color:"#2E3140" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span style={{ fontSize:11, color:"#5E6376" }}>Nobody in today</span>
          </div>
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
      <Card title="Team Pulse · This Week" accent="#06D6F0">
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:dk?28:24, fontWeight:900, color:"#F2F4F8", lineHeight:1, letterSpacing:"-0.03em" }}>
              {teamWeekCount} <span style={{ fontSize:13, color:"#666C7E", fontWeight:700 }}>{teamWeekCount === 1 ? "sale" : "sales"}</span>
            </div>
            {teamWeekTotal > 0 && (
              <div style={{ fontSize:12, color:"#22C55E", fontWeight:700, marginTop:5 }}>
                ${teamWeekTotal.toLocaleString()} <span style={{ color:"#666C7E", fontWeight:600 }}>team revenue</span>
              </div>
            )}
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:18, fontWeight:900, color:"#06D6F0", lineHeight:1 }}>{rankedWeek.length}</div>
            <div style={{ fontSize:8.5, color:"#06D6F099", textTransform:"uppercase", letterSpacing:1.5, fontWeight:800, marginTop:4 }}>Active reps</div>
          </div>
        </div>
        <BarChart data={teamDaily} accent="#06D6F0" highlight={todayIdx} height={dk?72:60} />
      </Card>

      {/* Recent Sales */}
      <Card title="Recent Sales" accent="#22C55E" action="All Sales" actionOnClick={() => onGoTab("leaderboard")}>
        {recentSales.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 0", color:"#2E3140" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span style={{ fontSize:11, color:"#5E6376" }}>No sales logged yet</span>
          </div>
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
                {s.amount > 0 && <div style={{ fontSize:13, fontWeight:800, color:"#22C55E", flexShrink:0 }}>${Number(s.amount).toLocaleString()}</div>}
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
          No sales logged {period === "week" ? "this week" : period === "month" ? "this month" : "yet"}. Be the first to log one!
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
                    {s.amount > 0 && <div style={{ fontSize:13, fontWeight:700, color:"#22C55E" }}>${Number(s.amount).toLocaleString()}</div>}
                    {s.retainer > 0 && <div style={{ fontSize:10, fontWeight:600, color:"#06D6F0" }}>+${Number(s.retainer).toLocaleString()}/mo</div>}
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
                      onMouseEnter={e => e.target.style.color="#FF3370"}
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
                        onMouseEnter={e=>e.target.style.color="#FF3370"} onMouseLeave={e=>e.target.style.color="#5E6376"}>End Bonus</button>
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

function AdminPanel({ profile, onBack, w, onSignOut }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "rep" : "admin";
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)
      .select()
      .single();
    if (error || !data) {
      console.error("toggleRole failed:", error);
      alert(`Couldn't update role: ${error?.message ?? "no row updated (likely RLS)"}`);
      return;
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: data.role } : u));
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

        {loading ? (
          <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>Loading reps…</div>
        ) : users.length === 0 ? (
          <div style={{ textAlign:"center", padding:60, color:"#666C7E", fontSize:13 }}>No users yet.</div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {users.map((u, i) => (
              <div key={u.id} style={{ background:"rgba(255,255,255,0.022)", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"20px 24px":"16px 18px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", animation:`fadeUp 0.4s ease ${0.05*i}s both`,  }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"linear-gradient(135deg,#CCFF00,#5C7A00)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#15171E", fontSize:18, flexShrink:0, boxShadow:"0 4px 14px rgba(204,255,0,0.35)" }}>
                  {u.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div style={{ flex:1, minWidth:140 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#EEF2F8" }}>{u.name || "—"}</div>
                  <div style={{ display:"flex", gap:6, marginTop:4, flexWrap:"wrap" }}>
                    <span style={{ display:"inline-block", fontSize:9, fontWeight:800, color: u.role === "admin" ? "#F59E0B" : "#06D6F0", letterSpacing:2, textTransform:"uppercase", background: u.role === "admin" ? "rgba(245,158,11,0.1)" : "rgba(6,214,240,0.1)", padding:"3px 9px", borderRadius:5, border:`1px solid ${u.role === "admin" ? "rgba(245,158,11,0.2)" : "rgba(6,214,240,0.2)"}` }}>{u.role}</span>
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
                    ...(u.quizzesAttempted > 0 ? [[Math.round(u.avgScore)+"%", "Avg Score", u.avgScore>=90?"#22C55E":u.avgScore>=70?"#F59E0B":"#FF3370"]] : []),
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
                  <button onClick={() => toggleRole(u.id, u.role)} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#7E8595", fontSize:10, fontWeight:700, cursor:"pointer", padding:"9px 16px", borderRadius:10, fontFamily:"inherit", letterSpacing:1.5, flexShrink:0, textTransform:"uppercase", transition:"all 0.2s" }}>
                    {u.role === "admin" ? "Make Rep" : "Make Admin"}
                  </button>
                )}
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
  const gc = grade >= 0.9 ? "#22C55E" : grade >= 0.7 ? "#F59E0B" : "#FF3370";
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
                if (showR) { bg = "rgba(255,51,112,0.08)"; bd = "rgba(255,51,112,0.35)"; tc = "#FF3370"; }
                if (!locked && isSel) { bg = "rgba(255,255,255,0.04)"; bd = "rgba(204,255,0,0.5)"; tc = "#F2F4F8"; }
                if (!locked && !isSel) { tc = "#8892A0"; }
                return (
                  <button key={idx} className="quiz-opt" onClick={() => pick(idx)} disabled={locked}
                    style={{ width:"100%", textAlign:"left", padding:"15px 18px", background:bg, border:`1.5px solid ${bd}`, borderRadius:14, cursor: locked ? "default" : "pointer", display:"flex", alignItems:"center", gap:14, fontFamily:"inherit", fontSize:14, color:tc, fontWeight: isSel || showG ? 600 : 400, boxShadow: showG ? "0 0 20px rgba(34,197,94,0.1)" : showR ? "0 0 20px rgba(255,51,112,0.08)" : "none" }}>
                    <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0, background: showG ? "rgba(34,197,94,0.15)" : showR ? "rgba(255,51,112,0.15)" : "rgba(255,255,255,0.04)", color: showG ? "#22C55E" : showR ? "#FF3370" : "#666C7E", border:`1px solid ${showG ? "rgba(34,197,94,0.25)" : showR ? "rgba(255,51,112,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                      {showG ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : showR ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3370" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> : String.fromCharCode(65 + idx)}
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
};
const IC_SHADOW = {
  MODULE:    "inset 0 0 0 1px rgba(204,255,0,0.22)",
  BOOTCAMP:  "inset 0 0 0 1px rgba(245,158,11,0.22)",
  REFERENCE: "inset 0 0 0 1px rgba(6,214,240,0.22)",
  QUIZ:      "inset 0 0 0 1px rgba(16,185,129,0.22)",
};
const LINK_ICONS = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
];

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
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
    const [profileRes, progressRes, scoresRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("module_progress").select("module_id").eq("user_id", userId),
      supabase.from("quiz_scores").select("quiz_id, score, total").eq("user_id", userId),
    ]);
    setProfile(profileRes.data);
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
  const chatSidebarW = w >= 768 ? chatW : 0;

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

  const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap";
  const baseStyle = { minHeight:"100dvh", background:"#0E0F14", color:"#FFF" };

  const bc = { MODULE:"#CCFF00", BOOTCAMP:"#F59E0B", REFERENCE:"#06D6F0", QUIZ:"#10B981" };
  const trainingGroups = [
    { label:null, color:"#CCFF00", items:CATS.filter(x=>x.t==="MODULE") },
    { label:"BOOTCAMPS", color:"#F59E0B", items:CATS.filter(x=>x.t==="BOOTCAMP") },
  ];
  const referenceItems = CATS.filter(x=>x.t==="REFERENCE");
  const quizItems = CATS.filter(x=>x.t==="QUIZ");
  const TABS = [
    { key:"dashboard",     label:"Dashboard",     short:"Home",     color:"#22C55E" },
    { key:"announcements", label:"Announcements", short:"News",     color:"#F59E0B" },
    { key:"leads",         label:"Leads",         short:"Leads",    color:"#06D6F0" },
    { key:"leaderboard",   label:"Leaderboard",   short:"Board",    color:"#FFD700" },
    { key:"scheduling",    label:"Scheduling",    short:"Schedule", color:"#F59E0B" },
    { key:"training",      label:"Training",      short:"Train",    color:"#CCFF00" },
    { key:"reference",     label:"Reference",     short:"Ref",      color:"#06D6F0" },
  ];

  if (loading) return (
    <div style={{ ...baseStyle, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ textAlign:"center", animation:"fadeUp 0.6s ease" }}>
        <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 20px", filter:"drop-shadow(0 6px 28px rgba(204,255,0,0.4))" }}>
          <RedlineLogo height={48} />
        </div>
        <div className="red-gradient-text" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:12, animation:"gradShift 6s ease-in-out infinite", filter:"drop-shadow(0 0 20px rgba(204,255,0,0.3))" }}>REDLINE</div>
        <div style={{ fontSize:10, color:"#5E6376", letterSpacing:3, textTransform:"uppercase", marginTop:8, fontWeight:800 }}>Loading…</div>
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
      <AdminPanel profile={profile} onBack={() => setView(null)} w={w} onSignOut={signOut} />
      <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />
    </div>
  );

  if (view && QUIZZES[view]) return (
    <div ref={ref} style={{ ...baseStyle, paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Quiz quizKey={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={(sc, tot) => saveScore(view, sc, tot)} />
      <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />
    </div>
  );

  if (view) return (
    <div ref={ref} style={{ ...baseStyle, paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Viewer ck={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={markComplete} />
      <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />
    </div>
  );

  return (
    <div ref={ref} className="dotgrid" style={{ ...baseStyle, position:"relative", paddingLeft: chatSidebarW }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />

      {/* Aurora background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Sticky header */}
      <div className="app-header">
        <div style={{ padding:wd?"22px 56px 0":dk?"18px 36px 0":"14px 20px 0" }}>
          <div style={{ maxWidth:1300, margin:"0 auto" }}>

            {/* Top row: logo + actions */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:dk?18:14, animation:"fadeUp 0.5s ease" }}>

              {/* Logo */}
              <div style={{ display:"flex", alignItems:"center", gap:dk?14:10 }}>
                <RedlineLogo height={dk?32:26} />
                <div>
                  <div className="title-display" style={{ fontSize:dk?24:19, color:"#F2F4F8" }}>REDLINE</div>
                  <div style={{ fontSize:9, fontWeight:800, color:"#CCFF00", letterSpacing:3.5, textTransform:"uppercase", marginTop:3 }}>Rep Portal</div>
                </div>
              </div>

              {/* Right actions */}
              <div style={{ display:"flex", alignItems:"center", gap:dk?8:6, animation:"fadeUp 0.5s ease 0.06s both" }}>
                {profile?.role === "admin" && (
                  <button onClick={() => setView("__admin")} className={`btn-pill amber${dk?"":" icon-only"}`} aria-label="Admin">
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
                return (
                  <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                    style={{ background:"rgba(255,255,255,0.022)", border:`1px solid ${qs ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.055)"}`, borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.05*i}s both`,  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD.QUIZ, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:IC_SHADOW.QUIZ }}>{x.ic}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, fontWeight:800, color:"#10B981", letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>QUIZ</div>
                        <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 3px", lineHeight:1.3 }}>{x.sub}</h3>
                        <p style={{ fontSize:11.5, color: qs ? "#10B981" : "#666C7E", margin:0, lineHeight:1.4, fontWeight: qs ? 600 : 500 }}>
                          {qs ? `Best: ${Math.round(qs.score/qs.total*100)}%` : x.d}
                        </p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                        {qs && <div style={{ width:20, height:20, borderRadius:6, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
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

      <Chat session={session} profile={profile} w={w} width={chatSidebarW} onResize={persistChatW} minW={CHAT_MIN} maxW={CHAT_MAX} />
    </div>
  );
}

function SectionLabel({ color, label, delay = 0 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"28px 0 13px", animation:`fadeUp 0.5s ease ${delay}s both` }}>
      <div style={{ fontSize:9.5, fontWeight:800, color:color, letterSpacing:3.5, textTransform:"uppercase" }}>{label}</div>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,0.05),transparent)" }} />
    </div>
  );
}
