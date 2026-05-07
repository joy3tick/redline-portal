import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./lib/supabase";
const C = {
  "m1": { t: "Module 1 — Onboarding & Training", st: "Your foundation for closing deals and driving revenue.", vid: "https://youtu.be/Xfhpyj7Fhdw", s: [
    { h: "🏢  WHAT WE DO", b: "We deliver a premium experience for service-based small businesses — HVAC, plumbing, electrical, roofing, landscaping, and more.\n\n⚡ End-to-End Execution\nWe don't just \"help with a website.\" We handle strategy, design, development, optimization, and launch. The client's only job is to fill out a 5-minute form and keep answering their phone.\n\n⚡ Streamlined Process\nEvery project follows the same proven system: Onboarding Form → Discovery → Design → Build → Optimize → Launch. No scope creep. No surprises.\n\n⚡ Business Growth Focus\nWe don't sell pixels. We sell leads, calls, and revenue. If a site looks beautiful but doesn't convert, it's a liability. Every design choice we make is tied to a business outcome." },
    { h: "🔴  THE Redline DIFFERENCE", b: "Most agencies sell design. We sell outcomes.\n\nWhat clients actually get:\n→ Custom site built for their specific market and audience\n→ SEO baked in from day one (not bolted on later)\n→ Mobile-first design (60%+ of their traffic is on a phone)\n→ Conversion-optimized CTAs, forms, and trust signals\n→ AI chatbot capturing leads 24/7 while they sleep\n→ Ongoing maintenance so the site never degrades\n\nOur service tiers:\n• Starter — $1,497 → Conversion-focused site, fast turnaround\n• Pro — $2,497 → Advanced design + lead gen features\n• Elite — $4,497 → Premium design, full CRO, maximum conversion\n• Custom/Enterprise — $5,000+ → Fully scoped to the business\n\nFirm deadlines. No scope creep. We don't deliver and disappear — ongoing monitoring and revisions are standard." },
    { h: "🎯  YOUR ROLE", b: "Find the clients. Bring them in. Our team builds the site.\n\nWHAT YOU NEED TO KNOW\n• Master Redline's service tiers and what's included at each level\n• Understand the technical basics (SEO, CRO, page speed, mobile) — the Technical Bootcamp covers this\n• Know the target market inside and out (Module 2)\n• Internalize the scripts and objection handlers\n\nYOUR SUCCESS DRIVER\nCold calls and closing calls are the core of your role. Everything else — design, development, delivery — is handled by our build team. Your job is pipeline and revenue." },
    { h: "📊  ACTIVITY EXPECTATIONS", b: "100 COLD CALLS / WEEK\nThis is the baseline. No exceptions. No excuses.\n\nAll activity is tracked in a centralized Google Sheet with full transparency. Your numbers are visible. Results speak.\n\n→ Consistency beats talent. The rep who dials 100 quality calls every single week will outperform the \"natural salesperson\" who wings it.\n→ Success is a volume game multiplied by quality. More targeted outreach = more conversations = more audits = more closes.\n→ Show up every single week. Momentum compounds." },
    { h: "💰  COMPENSATION", b: "High-ticket, commission-only. Unlimited upside.\n\nDEAL SIZE: $1,500 – $4,500+ per closed deal\nEnterprise packages go well above $4,500.\n\nYou earn 25-35% of every deal depending on your tier:\n• Tier 1 (Day 1): 25% commission\n• Tier 2 (20 deals): 30% commission\n• Tier 3 (50 deals): 35% commission\n\nPlus $100 bonus per website deal at month-end.\nPlus $25/month recurring for every maintenance client.\n\nTop performers clear $8,000+/month within 6 months. Year 1 projection for high performers: $104,000+.\n\nSee the full Compensation Plan for detailed breakdowns and real-world examples." },
  ]},
  "m2": { t: "Module 2 — Target Market & Lead Generation", st: "Find the right businesses. Build the right list.", vid: "https://youtu.be/PGaMSwhRirQ", s: [
    { h: "🎯  WHO WE TARGET", b: "We don't target everyone. We target the right ones.\n\n✅ Revenue Necessity — Businesses where a website rebuild directly drives revenue. Not vanity projects. Not \"nice to have.\" The site is either making them money or losing them money.\n\n✅ Local Operators — Single-owner, local businesses. The owner answers the phone, makes the decisions, and feels the pain daily. Avoid franchises, multi-location chains, and corporate accounts.\n\n✅ Clear Pain Points — Outdated, slow, or non-mobile sites with no CTAs, no quote forms, and no way to convert a visitor into a lead. These are businesses bleeding money and they don't even know it." },
    { h: "🔧  TARGET NICHES", b: "HVAC • Plumbers • Electricians • Landscapers • Florists • Roofers • Solar Installers • Pest Control • Painters\n\nTHE PAIN POINT\n→ Outdated, slow, or non-mobile websites\n→ No clear calls-to-action\n→ No \"Request a Quote\" or \"Book Now\" forms\n→ Generic stock photos, no social proof\n→ Competitors with better sites are stealing their leads\n\nTHE SIGNAL\nIf their website doesn't actively generate leads, it's costing them money every single day. That gap between where they are and where they could be — that's our opening." },
    { h: "🗺️  LEAD GENERATION — GOOGLE MAPS", b: "Google Maps is your lead goldmine.\n\n1️⃣ Zoom into a specific town/city on Google Maps\n2️⃣ Search for a niche: \"Plumber near Waltham, MA\"\n3️⃣ Open their website. Assess in 30 seconds. If it's poor → it's a lead.\n4️⃣ Aim for 10–15 solid leads per town/search\n\n🔍 ORGANIC DISCOVERY\nZoom to street level in commercial areas. Look for small family-owned shops, cafes, gyms, salons. No digital presence or a bad site = money left on the table.\n\nThe best leads are businesses that are clearly good at what they do but terrible online. Their work speaks for itself — their website doesn't." },
    { h: "📞  CONTACT STRATEGY", b: "Skip the front desk. Get to the owner.\n\n🚫 THE REALITY\nIf you call a general business line, you're talking to a receptionist or a teenager who won't pass on your message. Front-desk lines are a dead end.\n\n✅ THE STRATEGY\n→ Find the owner's direct cell or personal number\n→ Check Google Business Profile for owner name\n→ Look for personal emails on the website's About page\n→ LinkedIn can sometimes surface direct contact info\n→ Your goal: decision-maker on the first dial" },
    { h: "📋  DAILY WORKFLOW", b: "100 HIGH-QUALITY LEADS / WEEK\nLogged in the provided Excel spreadsheet.\n\nWHAT TO LOG FOR EVERY LEAD:\n→ Business name\n→ Owner name (if found)\n→ Website URL\n→ Phone number (direct if possible)\n→ Quick note on what's wrong with their site\n\nThe quality of your list directly determines the quality of your results. 100 garbage leads = 0 deals. 100 targeted, researched leads = a full pipeline." },
  ]},
  "m3": { t: "Module 3 — Positioning & Call Strategy", st: "You're not a freelancer. You're a revenue consultant.", vid: "https://youtu.be/DxbkUwYUpBI", s: [
    { h: "👔  YOUR POSITIONING", b: "Act like a Revenue Consultant. Not a freelancer.\n\n🧠 THE MINDSET\n→ You're diagnosing a sickness (their website) and providing the only cure\n→ Shift the power dynamic early — you are busy, they need your help\n→ You are not begging for their business. You are offering to solve a problem that's costing them real money.\n\n📊 THE RESULT\n→ If you act like a freelancer, they will haggle, ghost you, and treat you like a vendor\n→ If you act like a consultant, they will listen, respect your time, and pay your price\n\nThe difference is not what you say — it's how you carry yourself on every single call." },
    { h: "🚪  THE GATEKEEPER PROBLEM", b: "Don't waste time on low-conversion activities.\n\n→ Calling a service business often leads to a receptionist or junior staff who won't pass your message\n→ Your time is valuable — don't trade hours for dead-end conversations\n→ Prioritize direct owner contact over calling front desks\n→ If you can't get the owner, move on. 100 other leads are waiting." },
    { h: "📧  POST-CALL FOLLOW-UP PROTOCOL", b: "After every cold call where there was interest, send a follow-up email. Structure with precision.\n\n1️⃣ SUBJECT LINE — Clear, professional, non-spammy\n2️⃣ THE HOOK — Reference the specific issue you discussed on the call\n3️⃣ THE VALUE — How a rebuild increases their lead flow\n4️⃣ THE CTA — \"Want me to send over that video audit we discussed?\"\n\n⚠️ This is NOT cold email outreach. This is a follow-up touchpoint after your cold call to reinforce the conversation and move toward the audit." },
  ]},
  "m4": { t: "Module 4 — Cold Call Mastery", st: "Earn attention. Don't demand it.", vid: "https://youtu.be/3jIfae8L30", s: [
    { h: "🧠  THE MINDSET", b: "Most cold calls fail because they sound like a sales pitch.\n\n→ Cold calling works because of relevance, not volume\n→ Every business owner is bombarded with spam calls — your job is to earn attention, not demand it\n→ They don't care about our features. They care about their problems.\n→ The call has ONE job: book the video audit. That's it. Nothing else." },
    { h: "🚫  DO THIS, NOT THAT", b: "IF YOU DO THIS, YOU LOSE:\n→ Explain too much — you sound desperate\n→ Sound salesy — they hang up\n→ Use scripts they can smell — instant credibility death\n\n✅ INSTEAD:\n→ Observe something they already feel (\"I noticed your site doesn't have a quote form\")\n→ Keep it short and specific — under 2 minutes\n→ Focus on their pain, not your service\n→ Sound like a human having a real conversation" },
    { h: "⚡  CORE PRINCIPLES", b: "Personalization. Specificity. Brevity.\n\n🎯 PERSONALIZE — Proves you actually looked at their business. \"I was on your site this morning\" beats \"I help businesses like yours.\"\n\n🔍 BE SPECIFIC — \"Your site doesn't have a quote form\" beats \"I can help with your website.\" Specificity = credibility.\n\n✂️ BE BRIEF — Get to the point in the first 10 seconds. Rambling kills calls.\n\n👃 SMELL TEST — Business owners smell scripts instantly. No \"just checking in.\" No \"I came across your business.\" Sound real." },
    { h: "⏱️  THE FIRST 10 SECONDS", b: "The opener determines if the call lives or dies.\n\n🚫 NEVER USE:\n→ \"Hope you're doing well\"\n→ \"I came across your business\"\n→ Any generic opener that sounds like every other sales call they ignore\n\n✅ ALWAYS USE:\n→ Direct observations about their service, location, or site\n→ Something that proves you did 90 seconds of research\n→ A pattern interrupt that makes them laugh or think\n\nIf the first line is generic, nothing after it matters." },
    { h: "🔴  THE Redline TRIGGER", b: "Take 90 seconds before every dial to find one clear trigger.\n\nLOOK FOR:\n→ Outdated look / 2010 design\n→ Broken mobile layout\n→ No clear Call-to-Action\n→ Zero \"Request a Quote\" buttons\n→ Slow load time\n→ No reviews or social proof on the site\n\nTHE BRIDGE:\nConnect the observation to a fix.\n\"We help businesses in [Niche] fix exactly that.\"\nNo tech jargon. No feature lists. Just the problem and the solution." },
    { h: "🎯  THE CTA", b: "Your ask must feel optional — not committal.\n\n✅ GOOD CTAs:\n→ \"Worth a quick chat?\"\n→ \"Open to a short call?\"\n→ \"Can I send you a 2-minute video showing what I'd change?\"\n\n🚫 BAD CTAs:\n→ Asking for 30 minutes of their time\n→ \"Learn more\" or sending them to your site\n→ Anything that feels like a commitment\n\nMake it easy to say yes." },
    { h: "⚠️  COMMON MISTAKES", b: "If it sounds like a pitch, it already failed.\n\n→ Long calls — get to the point. Don't ramble.\n→ The \"I/We\" trap — talking about yourself or Redline too much. They don't care about us yet.\n→ The \"Formal\" trap — buzzwords, \"Hope this finds you well,\" corporate speak\n→ The Multi-Task — trying to accomplish more than one thing per call. Book the audit. That's it.\n→ Not shutting up — ask a question, then let them answer. Silence is power." },
    { h: "🔄  FOLLOW-UP PROTOCOL", b: "Silence is not rejection.\n\n📌 THE 2-3 RULE:\n→ Most responses come on the 2nd or 3rd touch\n→ Follow up max 3 times\n→ Each follow-up should be shorter than the last\n\n📌 THE TONE:\n→ Calm, respectful, direct\n→ No pressure. No guilt trips.\n→ Persistence with professionalism\n\nThe rep who follows up wins the deal the lazy rep left on the table." },
  ]},
  "m5": { t: "Module 5 — Reply Handling & Call Booking", st: "Move fast. Get on the phone. Close.", vid: "https://youtu.be/AMRjCkgIYLg", s: [
    { h: "⚡  PROTECT THE MOMENTUM", b: "Most deals die immediately after the first reply.\n\n→ Reps kill momentum by over-explaining or hesitating\n→ After a reply, your ONLY job is to move to a call\n→ The longer you stay in email, the weaker your position\n→ Email is for starting conversations. Calls are for selling.\n\nSpeed wins. The first rep to get on the phone usually wins the deal." },
    { h: "🔍  DECODING REPLIES", b: "What they say vs. what they actually mean:\n\n\"Sounds interesting\" → Open but needs a leader. They won't take the next step themselves — you need to direct them.\n\n\"Can you send more info?\" → Looking for a reason to say No. Don't send a brochure. Suggest a call.\n\n\"How much does this cost?\" → Trying to commoditize you. They want to compare you to the $500 Fiverr guy. Don't let them.\n\n\"Maybe later\" → Has pain but no urgency. Your job is to create urgency through opportunity cost.\n\nNone of these require a long explanation. All of them require direction toward a call." },
    { h: "📝  RESPONSE FORMULA", b: "Acknowledge + Short Value + Call Invitation.\n\n→ Keep it short: max 2–3 sentences\n→ Suggest a call immediately — don't ask, suggest\n→ Offer 2–3 specific time slots or your calendar link\n→ Speed > Perfection. Same business day replies.\n\nExample: \"Hey [Name], glad it caught your eye. Easiest next step is a quick 5-min call where I can walk you through what I found. How's Thursday at 2 or Friday at 10?\"" },
    { h: "🚫  THE NEVER LIST", b: "Protect your authority.\n\n→ NEVER pitch features over email\n→ NEVER send long PDF explanations\n→ NEVER negotiate or justify price over email\n→ NEVER wait 24+ hours to respond to a warm reply\n\nYou lose authority the second you start chasing them in the inbox. Email is a tool to get to the phone. That's it." },
    { h: "📅  DAILY DISCIPLINE", b: "Calls create leverage. Emails create busy work.\n\n→ Clean out the \"Pending Reply\" folder every morning and afternoon\n→ Clean, fast replies protect the Redline brand\n→ Your job is to guide, not convince\n→ If someone is warm, get them on the phone within 24 hours or the lead goes cold" },
  ]},
  "m6": { t: "Module 6 — Sales Call Framework", st: "Control the call. Close the deal.", vid: "https://youtu.be/boWThJ6ob7I", s: [
    { h: "👑  ESTABLISH AUTHORITY", b: "They've been pitched by \"web guys\" before. They're skeptical.\n\n→ Confidence and visible structure build immediate trust\n→ You are not a salesperson — you are an authority diagnosing a problem\n→ You are the leader of this conversation. Rambling kills authority.\n→ If the prospect goes off-track, you pull them back\n→ Speak with certainty. If you sound unsure, they won't trust you with their money." },
    { h: "📋  THE 6-STEP CALL STRUCTURE", b: "Follow the sequence. No shortcuts.\n\n1️⃣ Opening & Agenda → Set the tone\n2️⃣ Business Discovery → Understand their operations\n3️⃣ Pain Identification → Where is the leak?\n4️⃣ Website Diagnosis → The technical \"why\"\n5️⃣ Redline Positioning → The solution\n6️⃣ The Close → Finalize the next step\n\nEvery step builds on the last. Skip one and the close falls apart." },
    { h: "🎤  OPENING & DISCOVERY", b: "Set the frame. Then listen.\n\nTHE AGENDA:\n\"The goal of today is to see if we can actually help you grow. I'll ask some questions, show you what we found, and we'll see if it's a fit. Sound good?\"\n\nDISCOVERY QUESTIONS:\n→ \"How are most of your jobs coming in right now?\"\n→ \"What does your ideal customer look like?\"\n→ \"What are your revenue goals for this year?\"\n→ \"When someone lands on your site, what do you want them to do?\"\n\nLet them talk. Take notes. The more they talk, the more ammunition you have for the close." },
    { h: "🩺  PAIN & DIAGNOSIS", b: "Make them feel the cost of their current site.\n\n→ \"How many customers are you losing because they can't find your 'Book' button?\"\n→ \"Your site loads in 6 seconds — 40% of visitors leave after 3. How many leads is that per month?\"\n→ Drop real data: load speeds, mobile errors, missing conversion triggers\n\n📌 LISTENING RULES:\n→ 80/20 rule — listen 80% of the time\n→ Use open-ended questions\n→ They buy when they feel understood, not when they feel sold to\n→ The best closers barely talk. They ask the right questions and let the prospect sell themselves." },
    { h: "🤝  REDIRECTING & CLOSING", b: "Every call ends with a clear, defined next step.\n\n🔄 REDIRECT TACTICS:\n→ \"That's an interesting point, but let's stay on track for your goals...\"\n→ Never accept \"Business is okay.\" Ask: \"What does 'okay' look like in monthly leads?\"\n→ Keep it centered on revenue and results\n\n💰 HANDLING \"I'LL THINK ABOUT IT\":\n→ \"What specifically do you need to look at?\"\n→ \"Is it the timing, the investment, or something else?\"\n→ Move to invoice or a scheduled follow-up with the decision-maker\n→ Never leave a call without the next step locked in" },
  ]},
  "m7": { t: "Module 7 — Value Proposition & Messaging", st: "We sell outcomes. Not design.", vid: "https://youtu.be/9F4K9dCRe5g", s: [
    { h: "💡  THE SHIFT", b: "Most agencies sell design. We sell business outcomes.\n\n→ A \"clean, modern site\" is the baseline — it doesn't justify our pricing\n→ Sell more leads, more calls, more revenue\n→ If a site looks good but doesn't convert, it's a liability\n→ Every design choice is tied to user behavior, trust, and CTAs\n\nWhen a prospect says \"I want a nice website,\" your job is to reframe: \"You don't need a nice website. You need a website that makes your phone ring.\"" },
    { h: "🏗️  THE APPROACH", b: "We don't just build. We optimize.\n\n🎯 User Behavior & Clarity — Every element serves a conversion purpose. Nothing is decorative.\n\n🛡️ Building Trust — Design that makes visitors confident to buy. Reviews, badges, real photos, professional layout.\n\n📍 Strategic CTAs — \"Get My Free Quote\" placed exactly where visitors are ready to act. Above the fold, after testimonials, at the bottom.\n\nA website is a sales asset, not a digital brochure. If it's not generating leads, it's a cost center." },
    { h: "📈  THE LEVERAGE PLAY", b: "A conversion fix has a 10x impact on the bottom line.\n\n🔥 THE OUTSIZED IMPACT RULE:\n→ A better site amplifies the traffic and reputation they already have\n→ If they're getting 500 visitors/month and converting at 1%, that's 5 leads\n→ We take them to 5-10% — that's 25-50 leads from the same traffic\n→ No extra ad spend. No extra work. Just a better machine.\n\n⚠️ THE Redline STANDARD:\n→ Never promise specific numbers\n→ Always anchor to the leverage the asset provides\n→ \"We can't guarantee 50 leads, but we can guarantee your site will be built to convert every visitor possible.\"" },
    { h: "🗣️  LANGUAGE GUIDE", b: "When they talk about colors, you talk about conversions.\n\n🚫 STOP SAYING:\n→ \"We'll make your site look better\"\n→ \"We do web design\"\n→ \"We build websites\"\n\n✅ START SAYING:\n→ \"Your website should be generating leads consistently\"\n→ \"We build revenue systems for service businesses\"\n→ \"We turn your website into your best salesperson\"\n\nEvery word matters. Design language attracts tire-kickers. Revenue language attracts buyers." },
  ]},
  "m8": { t: "Module 8 — Pricing & Objection Handling", st: "Price with confidence. Walk away if needed.", vid: "https://youtu.be/SEZ00YEKy5w", s: [
    { h: "💰  PRICING MINDSET", b: "Pricing only feels expensive if the leverage wasn't explained.\n\n→ We don't justify our price — we explain the outcome\n→ If they understand the ROI, the price is a logical next step\n→ State the price clearly and calmly\n→ Never apologize for the number. Never discount without removing scope.\n\nIf you've done your job in the call — stacked the value, identified the pain, shown the gap — the price should feel like a relief, not a shock." },
    { h: "🤫  THE GOLDEN RULE", b: "The first person to speak after the price is revealed loses leverage.\n\nSay the number. Stop talking. Let them process.\n\nSilence signals confidence and professionalism. Filling the silence with justification signals insecurity.\n\nThey might take 5 seconds. They might take 15. Let them think. The close is happening in their head right now. Don't interrupt it." },
    { h: "🛡️  OBJECTION FRAMEWORK", b: "Acknowledge. Re-anchor. Ask.\n\n1️⃣ ACKNOWLEDGE — Don't argue with the concern.\n\"That makes total sense. A lot of our clients felt the same way before they saw the results.\"\n\n2️⃣ RE-ANCHOR — Bring it back to business impact and revenue loss.\n\"The question isn't whether $2,497 is a lot — it's whether losing 10-15 leads per month is costing you more than that.\"\n\n3️⃣ ASK — Use a clarifying or closing question.\n\"If we could solve that, would you be ready to move forward?\"\n\nObjections usually mean uncertainty, not a final \"No.\" Your job is to resolve the uncertainty." },
    { h: "🚶  KNOW WHEN TO WALK", b: "Not every business is a Redline fit.\n\n→ Discounting destroys positioning. The moment you drop the price, you confirm their suspicion that it wasn't worth it.\n→ We do not compete on price — we compete on execution\n→ Walking away preserves your authority for the next deal\n→ A bad client at a discount is worse than no client at all\n\nIf they only care about the cheapest option, they're not our client. Let them hire the nephew." },
  ]},
  "m9": { t: "Module 9 — Post-Close & Client Handoff", st: "Precision in the handoff is non-negotiable.", vid: "https://youtu.be/6iq3JNdpMSA", s: [
    { h: "⚠️  WHY THIS MATTERS", b: "Clients judge us most intensely after they pay.\n\n→ A sloppy post-close experience kills referral potential and trust\n→ Precision in the handoff is non-negotiable\n→ The client should feel they are in a machine, not a chaotic workshop\n→ This is where lifetime value is built or destroyed\n\nEvery closed deal should generate 2-3 referrals. That only happens if the experience after the sale is as sharp as the pitch before it." },
    { h: "✅  THE HANDOFF CHECKLIST", b: "Execute every step. Every time. No shortcuts.\n\n1️⃣ Confirm Payment — Verify Stripe payment has cleared\n2️⃣ Restate Expectations — Recap exactly what they purchased and what's included\n3️⃣ Document Project Details — All info from the onboarding form logged and shared with the build team\n4️⃣ Explain 7–10 Day Delivery — Set the timeline clearly. No vague promises.\n\nThe client should leave the handoff knowing exactly what happens next, when it happens, and who to contact if they have questions." },
    { h: "🛡️  BRAND PROTECTION", b: "Professional and direct. Always.\n\n📌 THE VOICE:\n→ Professional and direct\n→ No slang, no emojis, no casual guarantees\n→ No personal opinions in client comms\n→ Write like you're representing a premium firm — because you are\n\n📌 THE RULE:\n→ Never speak negatively about competitors\n→ It makes us look small and insecure\n→ Let our work do the talking\n→ If they mention a competitor, acknowledge and redirect: \"Our focus is on what we can deliver for you.\"" },
  ]},
  "m10": { t: "Module 10 — Compensation & Growth", st: "Outcomes, not busy work. This is how you get paid.", vid: "https://youtu.be/EzBhLyGKqF4", s: [
    { h: "📊  HOW YOU'RE MEASURED", b: "This role rewards outcomes, not busy work.\n\n📌 WHAT COUNTS:\n→ Outreach quality & reply rates\n→ Calls booked & deals closed\n→ Activity matters, but the P&L matters more\n→ 100 calls that book 0 audits = a process problem, not an effort problem\n\n💰 COMMISSION STRUCTURE:\n→ Commission earned per closed deal\n→ Paid immediately after client payment clears\n→ Better positioning → higher deal value → higher commissions\n→ Maintenance clients = recurring monthly income that compounds" },
    { h: "🚀  THE GROWTH PATH", b: "This isn't a gig. It's a path to leadership.\n\n→ Top performers advance to Senior Closer and Leadership roles\n→ We are building a high-finance-style culture — performance is everything\n→ Treat this like a real business — because it is one\n\nRedline is scaling. The people who show up now, execute consistently, and close deals are the people who will be leading teams in 6 months." },
  ]},
  "m11": { t: "Module 11 — Full Deal Walkthrough", st: "Locate. Call. Book. Pitch. Close. Start to finish.", vid: "https://youtu.be/XOy3tkW6cds", s: [
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
@keyframes glow { 0%,100% { box-shadow:0 0 30px rgba(220,38,38,0.15),0 0 60px rgba(220,38,38,0.06) } 50% { box-shadow:0 0 50px rgba(220,38,38,0.28),0 0 90px rgba(220,38,38,0.12) } }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
@keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes borderSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes loginGlow { 0%,100%{opacity:.5} 50%{opacity:1} }

*{margin:0;padding:0;box-sizing:border-box}
html,body,#root{min-height:100dvh;background:#15171E}
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
::selection{background:rgba(220,38,38,0.28);color:#fff}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#15171E}
::-webkit-scrollbar-thumb{background:#33363F;border-radius:10px}
::-webkit-scrollbar-thumb:hover{background:#525866}
input::placeholder{color:#3A3D47}

.dotgrid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Cards */
.card-hover { transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s ease, border-color 0.28s ease }
.card-hover:hover { transform:translateY(-3px); border-color:rgba(255,255,255,0.1) !important; box-shadow:0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(220,38,38,0.1) !important }

/* Accordion */
.acc-btn { transition: background 0.22s ease }
.acc-btn:hover { background:#1A1D24 !important }

/* Nav back */
.back-btn { transition: all 0.2s }
.back-btn:hover { opacity:0.75; transform:translateX(-3px) }

/* Video card */
.vid-card { transition: all 0.3s ease }
.vid-card:hover { border-color:rgba(220,38,38,0.7) !important; box-shadow:0 0 36px rgba(220,38,38,0.18) !important }
.play-pulse { animation: pulse 2.5s ease-in-out infinite }

/* Stat cards */
.stat-card { transition: transform 0.22s ease, box-shadow 0.22s ease }
.stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.35) !important }

/* Quiz options */
.quiz-opt { transition: all 0.18s ease }
.quiz-opt:hover:not(:disabled) { transform:translateX(3px) }

/* Gradient text utility */
.red-gradient-text {
  background: linear-gradient(135deg, #FF4545 0%, #DC2626 50%, #FF2020 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

/* ═══════════════════════════════════════════
   RICH TEXT RENDERER
   ═══════════════════════════════════════════ */
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
            <span style={{ color:"#DC2626", flexShrink:0, fontSize:8, marginTop:7, width:6, height:6, borderRadius:"50%", background:"#DC2626", display:"inline-block" }}></span>
            <span style={{ flex:1 }}>{t.slice(2)}</span>
          </div>
        );

        if (/^[1-9]️⃣/.test(t)) {
          const sp = t.indexOf(" ");
          return (
            <div key={i} style={{ display:"flex", gap:12, padding:"6px 0", alignItems:"flex-start" }}>
              <span style={{ background:"#DC262615", color:"#DC2626", width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0, fontWeight:700 }}>{t.slice(0,sp)}</span>
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
          <div key={i} style={{ fontSize:10.5, fontWeight:700, color:"#DC2626", letterSpacing:2, marginTop:20, marginBottom:6, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:12, height:1, background:"#DC262650" }}></span>
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
                <a href={urlMatch[0]} target="_blank" rel="noreferrer" style={{ color:"#DC2626", wordBreak:"break-all", fontSize:12, textDecoration:"none", borderBottom:"1px solid #DC262640" }}>{urlMatch[0]}</a>
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

  const onFocus = e => { e.target.style.borderColor = "rgba(220,38,38,0.6)"; e.target.style.boxShadow = "0 0 0 4px rgba(220,38,38,0.08)"; };
  const onBlur  = (e, hasErr) => { e.target.style.borderColor = hasErr ? "#DC2626" : "rgba(255,255,255,0.07)"; e.target.style.boxShadow = "none"; };

  return (
    <div className="dotgrid" style={{ minHeight:"100dvh", background:"#15171E", display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:900, height:280, background:"radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:420, animation:"fadeUp 0.7s cubic-bezier(0.4,0,0.2,1)", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ width:72, height:72, borderRadius:22, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 8px 36px rgba(220,38,38,0.4)", animation:"glow 3s ease-in-out infinite" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:14, color:"#DC2626", lineHeight:1, textShadow:"0 0 50px rgba(220,38,38,0.3)" }}>REDLINE</div>
          <div style={{ fontSize:11, fontWeight:700, color:"#4D5260", letterSpacing:6, textTransform:"uppercase", marginTop:7 }}>Rep Portal</div>
          <div style={{ width:56, height:1.5, background:"linear-gradient(90deg,transparent,#DC2626,transparent)", margin:"14px auto 0" }} />
        </div>

        <div style={{ background:"linear-gradient(145deg,rgba(16,18,24,0.99),rgba(11,12,17,0.99))", border:"1px solid rgba(255,255,255,0.07)", borderRadius:24, padding:"36px 32px 32px", boxShadow:"0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(220,38,38,0.06)" }}>
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
          <button onClick={go} disabled={ld} style={{ width:"100%", padding:"16px", background: ld ? "#5A0A0A" : "linear-gradient(135deg,#E5222B,#991B1B)", color:"#FFF", border:"none", borderRadius:14, fontSize:11, fontWeight:800, letterSpacing:4, cursor: ld ? "wait" : "pointer", marginTop:20, textTransform:"uppercase", boxShadow: ld ? "none" : "0 6px 28px rgba(220,38,38,0.3)", transition:"all 0.25s ease", fontFamily:"inherit" }}>
            {ld ? "Signing In…" : "Enter Academy"}
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
      {[0,1].map(week => (
        <div key={week} style={{ marginBottom:32, animation:"fadeUp 0.4s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, paddingBottom:14 }}>
            <div style={{ width:8, height:8, borderRadius:4, background: week===0?"#DC2626":"#F59E0B" }} />
            <div style={{ fontSize:10, fontWeight:700, color: week===0?"#DC2626":"#F59E0B", letterSpacing:3, textTransform:"uppercase" }}>{week===0?"This Week":"Next Week"}</div>
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
                  style={{ background: isMine?"#DC262608":"#23262E", border:"1px solid "+(isMine?"#DC262630":isToday?"#404450":"#2D3038"), borderRadius:16, padding:"16px 14px", cursor:isPast||isFull?"default":"pointer", opacity:isPast?0.35:1, transition:"all 0.2s", minHeight:140, position:"relative" }}>
                  {isToday && !isFull && <div style={{ position:"absolute", top:10, right:12, fontSize:8, fontWeight:700, color:"#DC2626", letterSpacing:2, textTransform:"uppercase" }}>Today</div>}
                  {isFull && <div style={{ position:"absolute", top:10, right:12, fontSize:8, fontWeight:700, color:"#F59E0B", letterSpacing:2, textTransform:"uppercase" }}>Full</div>}
                  <div style={{ fontSize:9, fontWeight:700, color:isToday?"#DC2626":"#7E8290", letterSpacing:2, marginBottom:4 }}>{DAY_NAMES[di]}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:isToday?"#FFF":"#8A8E98", marginBottom:4, lineHeight:1 }}>
                    {day.getDate()} <span style={{ fontSize:12, fontWeight:500, color:"#7E8290" }}>{MONTHS[day.getMonth()]}</span>
                  </div>
                  <div style={{ fontSize:9, color:"#5C6175", marginBottom:12, letterSpacing:1, display:"flex", justifyContent:"space-between" }}>
                    <span>9:00 AM – 5:00 PM</span>
                    <span style={{ color: dayEntries.length >= 6 ? "#F59E0B" : "#5C6175" }}>{dayEntries.length}/6</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {dayEntries.map(e => (
                      <div key={e.id} style={{ fontSize:11, fontWeight:600, color:e.user_id===session.user.id?"#DC2626":"#D6DAE2", background:e.user_id===session.user.id?"#DC262612":"#2B2E37", border:"1px solid "+(e.user_id===session.user.id?"#DC262625":"#3D414B"), borderRadius:6, padding:"4px 8px" }}>
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
    await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div>
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(7,8,12,0.92)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", padding:dk?"0 44px":"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button className="back-btn" onClick={onBack} style={{ background:"none", border:"none", color:"#DC2626", fontSize:13, fontWeight:700, cursor:"pointer", padding:"6px 0", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Academy
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
              <div key={u.id} style={{ background:"linear-gradient(135deg,rgba(16,18,24,0.98),rgba(11,12,16,0.98))", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"20px 24px":"16px 18px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", animation:`fadeUp 0.4s ease ${0.05*i}s both`, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:18, flexShrink:0, boxShadow:"0 4px 14px rgba(220,38,38,0.35)" }}>
                  {u.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div style={{ flex:1, minWidth:140 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#EEF2F8" }}>{u.name || "—"}</div>
                  <span style={{ display:"inline-block", marginTop:4, fontSize:9, fontWeight:800, color: u.role === "admin" ? "#F59E0B" : "#6366F1", letterSpacing:2, textTransform:"uppercase", background: u.role === "admin" ? "rgba(245,158,11,0.1)" : "rgba(99,102,241,0.1)", padding:"3px 9px", borderRadius:5, border:`1px solid ${u.role === "admin" ? "rgba(245,158,11,0.2)" : "rgba(99,102,241,0.2)"}` }}>{u.role}</span>
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
  const accent = ck.includes("bc") ? "#F59E0B" : ck.includes("call") || ck.includes("comp") || ck.includes("onboard") ? "#6366F1" : "#DC2626";
  const accentBg = ck.includes("bc") ? "rgba(245,158,11,0.08)" : ck.includes("call") || ck.includes("comp") || ck.includes("onboard") ? "rgba(99,102,241,0.08)" : "rgba(220,38,38,0.08)";

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
            Back to Academy
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

        {/* Video */}
        {c.vid && (
          <a href={c.vid} target="_blank" rel="noreferrer" className="vid-card"
            style={{ display:"flex", alignItems:"center", gap:18, background:"linear-gradient(135deg,rgba(20,14,16,0.9),rgba(16,12,20,0.9))", border:"1px solid rgba(220,38,38,0.18)", borderRadius:18, padding:"20px 24px", textDecoration:"none", marginBottom:28, animation:"fadeUp 0.55s ease 0.1s both", boxShadow:"0 4px 24px rgba(0,0,0,0.3)" }}>
            <div className="play-pulse" style={{ width:54, height:54, borderRadius:16, background:"linear-gradient(135deg,#E5222B,#991B1B)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 6px 24px rgba(220,38,38,0.4)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#F2F4F8", marginBottom:3 }}>Watch Training Video</div>
              <div style={{ fontSize:12, color:"#7E8595" }}>Complete before continuing with this module</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        )}

        {/* Sections */}
        <div style={{ paddingBottom:90 }}>
          {c.s.map((s, i) => {
            const open = oi === i;
            return (
              <div key={i} style={{ marginBottom:5, animation:`fadeUp 0.4s ease ${0.04*i}s both` }}>
                <button className="acc-btn" onClick={() => setOi(open ? null : i)}
                  style={{
                    width:"100%", textAlign:"left",
                    background: open ? "linear-gradient(135deg,rgba(18,20,26,0.99),rgba(14,16,22,0.99))" : "rgba(10,11,15,0.8)",
                    border: `1px solid ${open ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                    borderRadius: open ? "16px 16px 0 0" : 16,
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
                    background:"linear-gradient(180deg,rgba(12,13,18,0.98) 0%,rgba(9,10,14,0.98) 100%)",
                    border:"1px solid rgba(255,255,255,0.06)", borderTop:"none",
                    borderRadius:"0 0 16px 16px", padding:dk?"28px 26px 30px":"22px 20px 26px",
                    animation:"fadeIn 0.25s ease",
                    boxShadow:"inset 0 4px 24px rgba(0,0,0,0.3)"
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
            Back to Academy
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
            <div style={{ height:"100%", width:`${pct}%`, background: done ? `linear-gradient(90deg,${gc},${gc}90)` : "linear-gradient(90deg,#DC2626,#F59E0B,#10B981)", borderRadius:6, transition:"width 0.55s cubic-bezier(0.4,0,0.2,1)" }} />
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
              <button onClick={onBack} style={{ padding:"14px 32px", background:"linear-gradient(135deg,#E5222B,#991B1B)", border:"none", borderRadius:14, color:"#FFF", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 24px rgba(220,38,38,0.28)", letterSpacing:0.5 }}>Back to Academy</button>
            </div>
          </div>
        ) : (
          <div style={{ paddingBottom:90, animation:"fadeUp 0.3s ease" }}>
            <div style={{ background:"linear-gradient(135deg,rgba(18,20,26,0.98),rgba(12,14,18,0.98))", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, padding:dk?"28px":"22px 18px", marginBottom:20, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
              <h3 style={{ fontSize:dk?18:16, fontWeight:700, color:"#F2F4F8", margin:0, lineHeight:1.5 }}>{cur.q}</h3>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {cur.o.map((opt, idx) => {
                const isSel = sel === idx, isCor = idx === cur.a, showG = locked && isCor, showR = locked && isSel && !isCor;
                let bg = "rgba(12,14,18,0.9)", bd = "rgba(255,255,255,0.05)", tc = "#8892A0";
                if (showG) { bg = "rgba(34,197,94,0.08)"; bd = "rgba(34,197,94,0.35)"; tc = "#22C55E"; }
                if (showR) { bg = "rgba(220,38,38,0.08)"; bd = "rgba(220,38,38,0.35)"; tc = "#DC2626"; }
                if (!locked && isSel) { bg = "rgba(255,255,255,0.04)"; bd = "rgba(220,38,38,0.5)"; tc = "#F2F4F8"; }
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
              <button onClick={nxt} style={{ width:"100%", padding:"16px", background:"linear-gradient(135deg,#E5222B,#991B1B)", color:"#FFF", border:"none", borderRadius:14, fontSize:12, fontWeight:800, letterSpacing:2.5, cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase", marginTop:18, boxShadow:"0 6px 24px rgba(220,38,38,0.28)", animation:"fadeUp 0.3s ease" }}>
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
  MODULE:    "linear-gradient(135deg,#DC2626,#7F1D1D)",
  BOOTCAMP:  "linear-gradient(135deg,#F59E0B,#92400E)",
  REFERENCE: "linear-gradient(135deg,#6366F1,#3730A3)",
  QUIZ:      "linear-gradient(135deg,#10B981,#065F46)",
};
const IC_SHADOW = {
  MODULE:    "0 4px 16px rgba(220,38,38,0.35)",
  BOOTCAMP:  "0 4px 16px rgba(245,158,11,0.35)",
  REFERENCE: "0 4px 16px rgba(99,102,241,0.35)",
  QUIZ:      "0 4px 16px rgba(16,185,129,0.35)",
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

  const [tab, setTab] = useState("training");
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState("");

  const saveName = async () => {
    const trimmed = nameEdit.trim();
    if (!trimmed) return;
    await supabase.from("profiles").update({ name: trimmed }).eq("id", session.user.id);
    setProfile(prev => ({ ...prev, name: trimmed }));
    setShowNameEdit(false);
  };

  const signOut = async () => { await supabase.auth.signOut(); setView(null); };

  const FONT_LINK = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap";
  const baseStyle = { minHeight:"100dvh", background:"#15171E", color:"#FFF" };

  const bc = { MODULE:"#DC2626", BOOTCAMP:"#F59E0B", REFERENCE:"#6366F1", QUIZ:"#10B981" };
  const trainingGroups = [
    { label:null, color:"#DC2626", items:CATS.filter(x=>x.t==="MODULE") },
    { label:"BOOTCAMPS", color:"#F59E0B", items:CATS.filter(x=>x.t==="BOOTCAMP") },
  ];
  const referenceItems = CATS.filter(x=>x.t==="REFERENCE");
  const quizItems = CATS.filter(x=>x.t==="QUIZ");
  const TABS = [
    { key:"crm", label:"CRM", color:"#8B5CF6" },
    { key:"scheduling", label:"Scheduling", color:"#F59E0B" },
    { key:"training", label:"Training", color:"#DC2626" },
    { key:"reference", label:"Reference", color:"#6366F1" },
    { key:"quizzes", label:"Quizzes", color:"#10B981" },
  ];

  if (loading) return (
    <div style={{ ...baseStyle, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ textAlign:"center", animation:"fadeUp 0.6s ease" }}>
        <div style={{ width:60, height:60, borderRadius:18, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 6px 28px rgba(220,38,38,0.35)", animation:"glow 3s ease-in-out infinite" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:12, color:"#DC2626" }}>REDLINE</div>
        <div style={{ fontSize:10, color:"#444856", letterSpacing:3, textTransform:"uppercase", marginTop:8, fontWeight:700 }}>Loading…</div>
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
    <div ref={ref} style={baseStyle}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <AdminPanel profile={profile} onBack={() => setView(null)} w={w} onSignOut={signOut} />
    </div>
  );

  if (view && QUIZZES[view]) return (
    <div ref={ref} style={baseStyle}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Quiz quizKey={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={(sc, tot) => saveScore(view, sc, tot)} />
    </div>
  );

  if (view) return (
    <div ref={ref} style={baseStyle}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />
      <Viewer ck={view} onBack={() => { setView(null); setTimeout(top, 50); }} w={w} onComplete={markComplete} />
    </div>
  );

  return (
    <div ref={ref} className="dotgrid" style={{ ...baseStyle, position:"relative" }}>
      <style>{GLOBAL_CSS}</style>
      <link href={FONT_LINK} rel="stylesheet" />

      <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:1000, height:600, background:"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(220,38,38,0.07) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      {/* Header */}
      <div style={{ position:"relative", zIndex:1, borderBottom:"1px solid rgba(255,255,255,0.05)", padding:wd?"52px 56px 40px":dk?"44px 36px 34px":"32px 20px 26px" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:dk?20:18 }}>
            <div style={{ animation:"fadeUp 0.55s ease" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?32:26, letterSpacing:12, color:"#DC2626", lineHeight:1, textShadow:"0 0 50px rgba(220,38,38,0.25)" }}>REDLINE</div>
              <div style={{ fontSize:dk?11:10, fontWeight:700, color:"#444856", margin:"7px 0 0", letterSpacing:dk?5:4, textTransform:"uppercase" }}>Rep Portal</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, animation:"fadeUp 0.55s ease 0.08s both" }}>
              {profile?.role === "admin" && (
                <button onClick={() => setView("__admin")} style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.2)", color:"#F59E0B", fontSize:9.5, fontWeight:800, cursor:"pointer", padding:"9px 14px", borderRadius:10, fontFamily:"inherit", letterSpacing:2, textTransform:"uppercase", transition:"all 0.2s" }}>Admin</button>
              )}
              <div style={{ width:dk?50:44, height:dk?50:44, borderRadius:14, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?20:16, color:"#FFF", letterSpacing:2, boxShadow:"0 6px 28px rgba(220,38,38,0.3)", animation:"glow 3.5s ease-in-out infinite" }}>
                {profile?.name?.[0]?.toUpperCase() ?? "R"}
              </div>
              <div style={{ position:"relative" }}>
                <button onClick={() => { setShowNameEdit(v => !v); setNameEdit(profile?.name ?? ""); }} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"#9CA3AF", fontSize:10, fontWeight:700, cursor:"pointer", padding:"9px 14px", borderRadius:10, fontFamily:"inherit", letterSpacing:1.5, textTransform:"uppercase", transition:"all 0.2s" }}>Edit Name</button>
                {showNameEdit && (
                  <div style={{ position:"absolute", top:"calc(100% + 10px)", right:0, background:"#1F2229", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:16, width:220, zIndex:100, boxShadow:"0 12px 40px rgba(0,0,0,0.6)" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#666C7E", letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Display Name</div>
                    <input
                      autoFocus
                      value={nameEdit}
                      onChange={e => setNameEdit(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setShowNameEdit(false); }}
                      placeholder="Your name…"
                      style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#F2F4F8", fontSize:13, fontWeight:500, padding:"9px 12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
                    />
                    <div style={{ display:"flex", gap:8, marginTop:10 }}>
                      <button onClick={saveName} style={{ flex:1, background:"#DC2626", border:"none", borderRadius:10, color:"#FFF", fontSize:13, fontWeight:800, letterSpacing:1, padding:"13px 0", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" }}>Save</button>
                      <button onClick={() => setShowNameEdit(false)} style={{ flex:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#9CA3AF", fontSize:13, fontWeight:700, letterSpacing:1, padding:"13px 0", cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={signOut} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"#666C7E", fontSize:10, fontWeight:700, cursor:"pointer", padding:"9px 14px", borderRadius:10, fontFamily:"inherit", letterSpacing:1.5, textTransform:"uppercase", transition:"all 0.2s" }}>Sign Out</button>
            </div>
          </div>

          <p style={{ fontSize:dk?14:13, color:"#666C7E", margin:"0 0 28px", maxWidth:500, lineHeight:1.6, fontWeight:500, animation:"fadeUp 0.55s ease 0.12s both" }}>
            {profile?.name ? `Welcome back, ${profile.name}. ` : ""}Your complete training system. Master every module, close more deals.
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:dk?10:7, animation:"fadeUp 0.55s ease 0.18s both" }}>
            {[
              [completedModules.size, "Completed", "#22C55E", "linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.04))"],
              ["13", "Modules", "#DC2626", "linear-gradient(135deg,rgba(220,38,38,0.12),rgba(220,38,38,0.04))"],
              ["2", "Bootcamps", "#F59E0B", "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))"],
              ["6", "Quizzes", "#10B981", "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.04))"],
            ].map(([n, l, col, grad]) => (
              <div key={l} className="stat-card" style={{ background:grad, border:`1px solid ${col}22`, borderRadius:14, padding:dk?"16px 22px":"12px 14px", textAlign:"center", minWidth:dk?110:0, flex:dk?"none":1, boxShadow:`0 4px 20px ${col}10` }}>
                <div style={{ fontSize:dk?30:22, fontWeight:900, color:col, lineHeight:1, letterSpacing:"-0.02em" }}>{n}</div>
                <div style={{ fontSize:9, color:col+"80", textTransform:"uppercase", letterSpacing:2, fontWeight:700, marginTop:6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{ position:"relative", zIndex:1, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:1300, margin:"0 auto", padding:wd?"0 56px":dk?"0 36px":"0 20px", display:"flex", gap:0 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ background:"none", border:"none", borderBottom: tab===t.key ? `2px solid ${t.color}` : "2px solid transparent", color: tab===t.key ? "#F2F4F8" : "#666C7E", fontSize:11, fontWeight:800, letterSpacing:2.5, cursor:"pointer", padding:"15px 22px", fontFamily:"inherit", textTransform:"uppercase", transition:"all 0.2s", marginBottom:-1, boxShadow: tab===t.key ? `0 1px 0 ${t.color}` : "none" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1300, margin:"0 auto", padding:wd?"28px 56px 90px":dk?"24px 36px 90px":"18px 20px 90px" }}>

        {/* CRM TAB */}
        {tab === "crm" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
              <a href={CRM_URL + "/edit"} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#8B5CF6", fontSize:11, fontWeight:700, padding:"8px 16px", borderRadius:10, textDecoration:"none", letterSpacing:1 }}>
                Open in Sheets ↗
              </a>
            </div>
            <iframe src={CRM_URL + "/preview"} title="Redline CRM"
              style={{ width:"100%", height:"calc(100dvh - 280px)", minHeight:500, border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, background:"#181A21" }} />
          </div>
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
                        style={{ background:"linear-gradient(135deg,rgba(16,18,24,0.98),rgba(11,12,16,0.98))", border:`1px solid ${done ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.055)"}`, borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.04*(gi*4+i)}s both`, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
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
          </div>
        )}

        {/* REFERENCE TAB */}
        {tab === "reference" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <a href="https://www.redlinewebservices.net/" target="_blank" rel="noreferrer" className="card-hover"
              style={{ display:"flex", alignItems:"center", gap:14, background:"linear-gradient(135deg,rgba(16,18,24,0.98),rgba(11,12,17,0.98))", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"18px":"15px 14px", textDecoration:"none", marginBottom:10, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
              <div style={{ width:46, height:46, borderRadius:13, background:"linear-gradient(135deg,#6366F1,#3730A3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:22, boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>🌐</div>
              <div style={{ flex:1, minWidth:0 }}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#EEF2F8", margin:"0 0 2px" }}>Redline Homepage</h3>
                <p style={{ fontSize:11.5, color:"#4A5060", margin:0, fontWeight:500 }}>redlinewebservices.net</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E6376" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8 }}>
              {referenceItems.map((x, i) => (
                <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                  style={{ background:"linear-gradient(135deg,rgba(16,18,24,0.98),rgba(11,12,16,0.98))", border:"1px solid rgba(255,255,255,0.055)", borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.05*i}s both`, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:IC_GRAD.REFERENCE, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:IC_SHADOW.REFERENCE }}>{x.ic}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, fontWeight:800, color:"#6366F1", letterSpacing:2.5, marginBottom:4, textTransform:"uppercase" }}>REFERENCE</div>
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

        {/* QUIZZES TAB */}
        {tab === "quizzes" && (
          <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8, animation:"fadeUp 0.35s ease" }}>
            {quizItems.map((x, i) => {
              const qs = quizScores[x.k];
              return (
                <div key={x.id} className="card-hover" onClick={() => { setView(x.k); setTimeout(top, 50); }}
                  style={{ background:"linear-gradient(135deg,rgba(16,18,24,0.98),rgba(11,12,16,0.98))", border:`1px solid ${qs ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.055)"}`, borderRadius:16, padding:dk?"20px 18px":"17px 15px", cursor:"pointer", animation:`fadeUp 0.38s ease ${0.05*i}s both`, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
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
        )}

      </div>
    </div>
  );
}

function SectionLabel({ color, label, delay = 0 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"28px 0 13px", animation:`fadeUp 0.5s ease ${delay}s both` }}>
      <div style={{ width:6, height:6, borderRadius:3, background:color, boxShadow:`0 0 8px ${color}60` }} />
      <div style={{ fontSize:9.5, fontWeight:800, color:color, letterSpacing:3.5, textTransform:"uppercase" }}>{label}</div>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,0.05),transparent)" }} />
    </div>
  );
}
