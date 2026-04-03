import { useState, useEffect, useRef, useCallback } from "react";

const PW = "redline2026";
const C = {
  "m1": { t: "Module 1 — Onboarding & Training", st: "Your foundation for closing deals and driving revenue.", vid: "https://youtu.be/Xfhpyj7Fhdw", s: [
    { h: "🏢  WHAT WE DO", b: "We deliver a premium experience for service-based small businesses — HVAC, plumbing, electrical, roofing, landscaping, and more.\n\n⚡ End-to-End Execution\nWe don't just \"help with a website.\" We handle strategy, design, development, optimization, and launch. The client's only job is to fill out a 5-minute form and keep answering their phone.\n\n⚡ Streamlined Process\nEvery project follows the same proven system: Onboarding Form → Discovery → Design → Build → Optimize → Launch. No scope creep. No surprises.\n\n⚡ Business Growth Focus\nWe don't sell pixels. We sell leads, calls, and revenue. If a site looks beautiful but doesn't convert, it's a liability. Every design choice we make is tied to a business outcome." },
    { h: "🔴  THE REDLINE DIFFERENCE", b: "Most agencies sell design. We sell outcomes.\n\nWhat clients actually get:\n→ Custom site built for their specific market and audience\n→ SEO baked in from day one (not bolted on later)\n→ Mobile-first design (60%+ of their traffic is on a phone)\n→ Conversion-optimized CTAs, forms, and trust signals\n→ AI chatbot capturing leads 24/7 while they sleep\n→ Ongoing maintenance so the site never degrades\n\nOur service tiers:\n• Starter — $1,497 → Conversion-focused site, fast turnaround\n• Pro — $2,497 → Advanced design + lead gen features\n• Elite — $4,497 → Premium design, full CRO, maximum conversion\n• Custom/Enterprise — $5,000+ → Fully scoped to the business\n\nFirm deadlines. No scope creep. We don't deliver and disappear — ongoing monitoring and revisions are standard." },
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
    { h: "🔴  THE REDLINE TRIGGER", b: "Take 90 seconds before every dial to find one clear trigger.\n\nLOOK FOR:\n→ Outdated look / 2010 design\n→ Broken mobile layout\n→ No clear Call-to-Action\n→ Zero \"Request a Quote\" buttons\n→ Slow load time\n→ No reviews or social proof on the site\n\nTHE BRIDGE:\nConnect the observation to a fix.\n\"We help businesses in [Niche] fix exactly that.\"\nNo tech jargon. No feature lists. Just the problem and the solution." },
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
    { h: "📈  THE LEVERAGE PLAY", b: "A conversion fix has a 10x impact on the bottom line.\n\n🔥 THE OUTSIZED IMPACT RULE:\n→ A better site amplifies the traffic and reputation they already have\n→ If they're getting 500 visitors/month and converting at 1%, that's 5 leads\n→ We take them to 5-10% — that's 25-50 leads from the same traffic\n→ No extra ad spend. No extra work. Just a better machine.\n\n⚠️ THE REDLINE STANDARD:\n→ Never promise specific numbers\n→ Always anchor to the leverage the asset provides\n→ \"We can't guarantee 50 leads, but we can guarantee your site will be built to convert every visitor possible.\"" },
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
    { h: "💳  PAYMENT LINKS", b: "Use the correct Stripe link for their package:\n\n▶ Starter Build ($1,497)\nhttps://buy.stripe.com/dRmfZa5ucdSC9uDfAQ3ks08\n\n▶ Pro Build ($2,497)\nhttps://buy.stripe.com/aFaaEQ09Sg0K22bdsI3ks0c\n\n▶ Elite Build ($4,497)\nhttps://buy.stripe.com/aFabIUf4MaGq7mvgEU3ks09\n\n▶ Custom Build ($5,000+)\nredlinewebservices.net/copy-of-yearly-maintenance-plan\n\n▶ Monthly Maintenance ($99/mo)\nhttps://buy.stripe.com/00w00c6yg4i2ayHfAQ3ks0a\n\n▶ Yearly Maintenance ($599/yr)\nhttps://buy.stripe.com/3cI4gs8Go29UfT19cs3ks0b\n\n⚠️ Only include the link(s) that match what the client purchased." },
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
  "call-script": { t: "Call Script & Objection Playbook", st: "Handle Every Objection. Control Every Call. Close the Audit.", s: [
    { h: "📌  CALL PRINCIPLES", b: "Every call has ONE objective: book the video audit.\n\n→ Mirror Their Energy — match their tempo\n→ Acknowledge Before Redirect — \"I totally get that\" before pivoting\n→ Silence Is Your Weapon — shut up after your pitch\n→ Use Their Name — 2–3 times max\n→ Student Card — \"I'm a finance student at Bentley — I started this because contractors were getting ripped off.\"" },
    { h: "📞  SCRIPT 1: DISCOVERY CALL", b: "\"Hey {{First Name}}, this is {{Your Name}} from Redline. I took a look at your site and had some thoughts. Mind if I share what I found?\"\n\nDIAGNOSIS:\n→ \"How are jobs coming in — referrals, Google, ads?\"\n→ \"Happy with leads from the site, or could it do more?\"\n→ \"Ever had someone call a competitor because their site looked more professional?\"\n\nBRIDGE:\n\"I'll put together a short video walkthrough showing where you're losing leads. No cost, no obligation. Fair enough?\"" },
    { h: "📞  SCRIPT 2: COLD CALL", b: "\"Hey {{First Name}}, I promise I'm not selling you a warranty. I run a web company for {{Industry}} contractors. Had a quick question — 30 seconds?\"\n\n✅ YES → \"Your site doesn't have a clear way to request a quote. That's probably costing you 2-3 leads a week. Open to a 2-min video showing what I'd fix?\"\n\n⏰ BUSY → \"Can I call back at a better time?\"\n\n🚫 NOT INTERESTED → \"Is it because you're happy with performance, or timing?\"" },
    { h: "🛡️  OBJECTIONS 1–4", b: "\"I have a website\" → \"I know — I was on it. Is it generating leads or just sitting there?\"\n\n\"Referrals only\" → \"Great until they slow down. Your site backs them up. First thing people do is Google you.\"\n\n\"How much?\" → \"Depends on your situation. That's why I do the audit first.\" ⚠️ Never price first call.\n\n\"Bad experience\" → \"I hear that a lot — it's why I started this. You see the work before spending a dollar.\"" },
    { h: "🛡️  OBJECTIONS 5–8", b: "\"Let me think\" → \"Is it timing, budget, or not sold the site costs you leads?\"\n\n\"Nephew does it\" → \"Big difference between a website and a lead generation system.\"\n\n\"Too busy\" → \"Best time. Site should stack leads while you're on jobs.\"\n\n\"Send info\" → \"A brochure won't help. A video of YOUR site showing lost leads — that's valuable.\"" },
    { h: "🎯  CLOSING THE CALL", b: "✅ THEY'RE IN:\n\"Perfect. I'll have the audit by {{Day}}. What's the best email?\"\n\n⏸️ NOT READY:\n\"I'll send a one-line email with my info. No spam. Appreciate your time.\"" },
  ]},
  "comp-plan": { t: "Compensation Plan", st: "Commission-Only · Performance-Driven · Unlimited Upside", s: [
    { h: "💰  COMMISSIONS", b: "                     Client Price    T1 (25%)    T2 (30%)    T3 (35%)\nStarter            $1,497         $374         $449         $524\nPro                  $2,497         $624         $749         $874\nElite                $4,497        $1,124      $1,349      $1,574\nCustom             $5K–$10K+   $1,250+    $1,500+    $1,750+" },
    { h: "🔄  MAINTENANCE + BONUSES", b: "Monthly: $99/mo → $25/mo recurring to you\nAnnual: $599/yr → $150/yr recurring to you\n\n🎯 Deal Bonus: $100 per website deal at month-end\n1 = $100 · 3 = $300 · 5 = $500 · 10 = $1,000" },
    { h: "📈  TIER ESCALATION", b: "Day 1 → 25%\n20 deals / 6 months → 30%\n50 deals / 6 months → 35%\n\nOnce unlocked, all future deals earn at that rate." },
    { h: "📊  REAL EXAMPLES", b: "❌ POOR (Jordan): 8 deals → 25% → ~$791/mo\n⚡ BASELINE (Taylor): 23 deals → 30% → ~$2,489/mo + $300 recurring\n🔥 HIGH (Alex): 53 deals → 35% → ~$8,038/mo + $625 recurring\n\n🏆 Year 1 high performer: ~$104,210+" },
  ]},
  "onboard-email": { t: "Client Onboarding Email Template", st: "The email your client receives after signing. Make it count.", s: [
    { h: "📋  HOW TO USE THIS TEMPLATE", b: "This is the first thing the client sees after they commit. It sets the tone for the entire relationship.\n\n→ Copy the email template below into Gmail or your email client\n→ Replace every [BRACKET] with the client's actual info\n→ Include ONLY the Stripe link for the package they purchased — delete all others\n→ The onboarding form link stays in every email. No exceptions.\n→ Send within 1 hour of verbal close. Speed = professionalism.\n→ Double-check every link before hitting send. Broken links destroy credibility." },
    { h: "✉️  SUBJECT LINE", b: "Redline Web Services — Next Steps & Onboarding | [CLIENT COMPANY NAME]\n\n💡 Keep the company name in the subject. It makes it easy for them to search their inbox later and signals this is specific to them, not a mass email." },
    { h: "📧  FULL EMAIL — COPY & SEND", b: "Hi [CLIENT FIRST NAME],\n\nThank you for choosing Redline Web Services — we're looking forward to building something that drives real results for [CLIENT COMPANY NAME].\n\nTo get started, we need two things from you:\n\n—\n\n1. COMPLETE YOUR ONBOARDING FORM\nThis gives our team everything we need to begin — your brand details, preferences, and project specifics. Takes about 5 minutes.\n\nhttps://forms.gle/EGaHjGUffqdGBH8v9\n\n—\n\n2. FINALIZE YOUR PAYMENT\nClick the secure link below to complete payment for your [PACKAGE NAME] package:\n\n[INSERT CORRECT STRIPE LINK HERE]\n\n—\n\nOnce we receive both the form and payment, our team gets to work immediately. You'll receive your first project update within [TURNAROUND TIME — e.g. 5-7 business days].\n\nIf you have any questions at all, reply directly to this email or text me at [YOUR PHONE NUMBER]. I'm here to make this as smooth as possible.\n\nLooking forward to it,\n\n[YOUR FULL NAME]\nRedline Web Services\nwww.redlinewebservices.net" },
    { h: "💳  STRIPE PAYMENT LINKS", b: "Copy the correct link for their package. Only include one.\n\n→ Starter Build ($1,497)\nhttps://buy.stripe.com/dRmfZa5ucdSC9uDfAQ3ks08\n\n→ Pro Build ($2,497)\nhttps://buy.stripe.com/aFaaEQ09Sg0K22bdsI3ks0c\n\n→ Elite Build ($4,497)\nhttps://buy.stripe.com/aFabIUf4MaGq7mvgEU3ks09\n\n→ Custom Build ($5,000+) — priced after onboarding form\nhttps://www.redlinewebservices.net/copy-of-yearly-maintenance-plan\n\n→ Monthly Maintenance ($99/mo)\nhttps://buy.stripe.com/00w00c6yg4i2ayHfAQ3ks0a\n\n→ Yearly Maintenance ($599/yr)\nhttps://buy.stripe.com/3cI4gs8Go29UfT19cs3ks0b" },
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
  { id: "d1", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Technical Knowledge", d: "Deep-dive on what you sell", ic: "🔧", k: "tech-bc" },
  { id: "d2", t: "BOOTCAMP", n: "BOOTCAMP", sub: "Sales Crash Course", d: "The system that closes deals", ic: "💪", k: "sales-bc" },
  { id: "d3", t: "REFERENCE", n: "REFERENCE", sub: "Call Script & Objections", d: "Scripts and objection playbook", ic: "📞", k: "call-script" },
  { id: "d4", t: "REFERENCE", n: "REFERENCE", sub: "Compensation Plan", d: "Full commission breakdown", ic: "💰", k: "comp-plan" },
  { id: "d5", t: "REFERENCE", n: "REFERENCE", sub: "Onboarding Email Template", d: "Payment links and forms", ic: "📧", k: "onboard-email" },
];

/* ═══════════════════════════════════════════
   GLOBAL STYLES — injected once
   ═══════════════════════════════════════════ */
const GLOBAL_CSS = `
@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@keyframes slideDown { from { opacity:0; max-height:0; padding-top:0; padding-bottom:0 } to { opacity:1; max-height:2000px } }
@keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(220,38,38,0.08) } 50% { box-shadow:0 0 30px rgba(220,38,38,0.15) } }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

*{margin:0;padding:0;box-sizing:border-box}
html,body,#root{min-height:100dvh;background:#101114}
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
::selection{background:rgba(220,38,38,0.2);color:#fff}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#101114}
::-webkit-scrollbar-thumb{background:#2A2D35;border-radius:10px}
::-webkit-scrollbar-thumb:hover{background:#3A3D45}
input::placeholder{color:#2a2a2e}

.dotgrid {
  background-image: radial-gradient(circle, #ffffff08 1px, transparent 1px);
  background-size: 24px 24px;
}
.card-hover { transition: all 0.3s cubic-bezier(0.4,0,0.2,1) }
.card-hover:hover { transform:translateY(-3px); border-color:#222 !important; box-shadow:0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(220,38,38,0.08) }
.acc-btn { transition: all 0.25s ease }
.acc-btn:hover { background:#101014 !important }
.back-btn { transition: all 0.2s }
.back-btn:hover { opacity:0.7; transform:translateX(-2px) }
.vid-card { transition: all 0.3s ease }
.vid-card:hover { border-color:#DC2626 !important; box-shadow:0 0 24px rgba(220,38,38,0.15) }
.play-pulse { animation: pulse 2s ease-in-out infinite }
`;

/* ═══════════════════════════════════════════
   RICH TEXT RENDERER
   ═══════════════════════════════════════════ */
function RichText({ text }) {
  const lines = text.split("\n");
  return (
    <div style={{ fontSize:13.5, color:"#C4C8D0", lineHeight:1.85 }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height:12 }} />;

        if (t === "—" || t === "---" || t === "———") return (
          <div key={i} style={{ padding:"8px 0" }}>
            <div style={{ height:1, background:"linear-gradient(90deg,transparent,#282B33,transparent)" }} />
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
              <span style={{ color:"#6A6E78" }}>—</span>
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
          <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#8A8E98", padding:"2px 0", whiteSpace:"pre", background:"#181B20", borderRadius:6, padding:"8px 12px", margin:"4px 0", border:"1px solid #282B33" }}>{line}</div>
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
function Login({ onLogin, err }) {
  const [p, setP] = useState("");
  const [ld, setLd] = useState(false);
  const go = () => { setLd(true); setTimeout(() => { onLogin(p); setLd(false); }, 500); };

  return (
    <div className="dotgrid" style={{ minHeight:"100dvh", background:"#101114", display:"flex", alignItems:"center", justifyContent:"center", padding:20, position:"relative" }}>
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, background:"radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:400, textAlign:"center", animation:"fadeUp 0.8s cubic-bezier(0.4,0,0.2,1)", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:14, color:"#DC2626", marginBottom:4 }}>REDLINE</div>
          <div style={{ fontSize:13, fontWeight:500, color:"#5A5E68", letterSpacing:6, textTransform:"uppercase" }}>Sales Academy</div>
          <div style={{ width:48, height:2, background:"linear-gradient(90deg,transparent,#DC2626,transparent)", margin:"16px auto 0" }} />
        </div>

        <div style={{ background:"#181B20", border:"1px solid #2A2D35", borderRadius:20, padding:"40px 32px", boxShadow:"0 16px 64px rgba(0,0,0,0.5)" }}>
          <label style={{ display:"block", textAlign:"left", fontSize:10, fontWeight:600, color:"#5A5E68", letterSpacing:2.5, marginBottom:10, textTransform:"uppercase" }}>Access Code</label>
          <input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}
            placeholder="Enter code" autoFocus
            style={{ width:"100%", padding:"16px 20px", background:"#101114", border:err?"1.5px solid #DC2626":"1.5px solid #1a1a1e", borderRadius:14, color:"#FFF", fontSize:15, outline:"none", boxSizing:"border-box", transition:"all 0.3s", fontFamily:"inherit", letterSpacing:2 }}
            onFocus={e=>{if(!err){e.target.style.borderColor="#DC2626";e.target.style.boxShadow="0 0 0 4px rgba(220,38,38,0.08)"}}}
            onBlur={e=>{e.target.style.borderColor=err?"#DC2626":"#1a1a1e";e.target.style.boxShadow="none"}} />
          {err && <p style={{ color:"#DC2626", fontSize:12, margin:"12px 0 0", fontWeight:500, textAlign:"left" }}>Invalid code. Try again.</p>}
          <button onClick={go} disabled={ld}
            style={{ width:"100%", padding:"16px", background:ld?"#7f1d1d":"linear-gradient(135deg,#DC2626,#991B1B)", color:"#FFF", border:"none", borderRadius:14, fontSize:12, fontWeight:700, letterSpacing:4, cursor:ld?"wait":"pointer", marginTop:18, textTransform:"uppercase", transition:"all 0.3s", boxShadow:"0 4px 24px rgba(220,38,38,0.2)" }}>
            {ld ? "Verifying..." : "Enter Academy"}
          </button>
        </div>

        <p style={{ color:"#252830", fontSize:9, marginTop:36, letterSpacing:2, textTransform:"uppercase" }}>© 2026 Redline Web Services LLC</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTENT VIEWER
   ═══════════════════════════════════════════ */
function Viewer({ ck, onBack, w }) {
  const [oi, setOi] = useState(0);
  const ref = useRef(null);
  const c = C[ck];
  const dk = w >= 768;
  const accent = ck.includes("bc")?"#F59E0B":ck.includes("call")||ck.includes("comp")||ck.includes("onboard")?"#3B82F6":"#DC2626";

  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth"}); setOi(0); }, [ck]);

  return (
    <div ref={ref}>
      {/* Sticky nav */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(5,5,7,0.88)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid #252830", padding:dk?"12px 0":"12px 0" }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:dk?"0 40px":"0 20px" }}>
          <button className="back-btn" onClick={onBack} style={{ background:"none", border:"none", color:"#DC2626", fontSize:13, fontWeight:600, cursor:"pointer", padding:"6px 0", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
            <span style={{ fontSize:18, lineHeight:1 }}>‹</span> Back to Academy
          </button>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:dk?"0 40px":"0 20px" }}>
        {/* Hero */}
        <div style={{ padding:"36px 0 28px", animation:"fadeUp 0.5s ease", position:"relative" }}>
          <div style={{ width:40, height:3, background:accent, borderRadius:2, marginBottom:20 }} />
          <h2 style={{ fontSize:dk?30:24, fontWeight:800, color:"#FFF", margin:"0 0 8px", letterSpacing:"-0.04em", lineHeight:1.15 }}>{c.t}</h2>
          <p style={{ fontSize:14, color:"#6A6E78", margin:0, lineHeight:1.5 }}>{c.st}</p>
        </div>

        {/* Video */}
        {c.vid && (
          <a href={c.vid} target="_blank" rel="noreferrer" className="vid-card"
            style={{ display:"flex", alignItems:"center", gap:16, background:"linear-gradient(135deg,#1A1518,#181B20)", border:"1px solid #2E2530", borderRadius:16, padding:"20px 22px", textDecoration:"none", marginBottom:24, animation:"fadeUp 0.6s ease" }}>
            <div className="play-pulse" style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#DC2626,#991B1B)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, boxShadow:"0 4px 20px rgba(220,38,38,0.3)", color:"#fff" }}>▶</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#FFF", marginBottom:3 }}>Watch Training Video</div>
              <div style={{ fontSize:11, color:"#6A6E78" }}>Complete before continuing with this module</div>
            </div>
          </a>
        )}

        {/* Sections */}
        <div style={{ paddingBottom:80 }}>
          {c.s.map((s, i) => {
            const open = oi === i;
            return (
              <div key={i} style={{ marginBottom:6, animation:`fadeUp 0.4s ease ${0.05*i}s both` }}>
                <button className="acc-btn" onClick={() => setOi(open ? null : i)}
                  style={{
                    width:"100%", textAlign:"left",
                    background: open ? "#1A1D24" : "#08080a",
                    border: "1px solid " + (open ? "#1e1e22" : "#111114"),
                    borderRadius: open ? "16px 16px 0 0" : 16,
                    padding: dk ? "20px 24px" : "18px 20px",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between",
                    fontFamily:"inherit", minHeight:56
                  }}>
                  <span style={{ fontSize:dk?15:14, fontWeight:700, color:open?"#FFF":"#c0c0c4", lineHeight:1.35, paddingRight:16 }}>{s.h}</span>
                  <div style={{ width:28, height:28, borderRadius:8, background:open?accent+"18":"#ffffff08", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.3s" }}>
                    <span style={{ color:open?accent:"#333", fontSize:11, transform:open?"rotate(180deg)":"none", transition:"transform 0.3s ease", display:"block" }}>▾</span>
                  </div>
                </button>
                {open && (
                  <div style={{
                    background:"#131317", border:"1px solid #32353D", borderTop:"none",
                    borderRadius:"0 0 16px 16px", padding:dk?"28px 24px":"22px 20px",
                    animation:"fadeIn 0.3s ease"
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
export default function App() {
  const [auth, setAuth] = useState(false);
  const [err, setErr] = useState(false);
  const [view, setView] = useState(null);
  const ref = useRef(null);
  const w = useW();
  const dk = w >= 768;
  const wd = w >= 1100;

  const top = useCallback(() => { ref.current?.scrollIntoView({behavior:"smooth"}); }, []);

  const bc = { MODULE:"#DC2626", BOOTCAMP:"#F59E0B", REFERENCE:"#3B82F6" };
  const groups = [
    { label:null, color:"#DC2626", items:CATS.filter(x=>x.t==="MODULE") },
    { label:"BOOTCAMPS", color:"#F59E0B", items:CATS.filter(x=>x.t==="BOOTCAMP") },
    { label:"QUICK REFERENCE", color:"#3B82F6", items:CATS.filter(x=>x.t==="REFERENCE") },
  ];

  if (!auth) return (
    <>
      <style>{GLOBAL_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{fontFamily:"'Outfit',system-ui,sans-serif"}}><Login onLogin={p=>p===PW?(setAuth(true),setErr(false)):setErr(true)} err={err} /></div>
    </>
  );

  if (view) return (
    <div ref={ref} style={{ minHeight:"100dvh", background:"#101114", fontFamily:"'Outfit',system-ui,sans-serif", color:"#FFF" }}>
      <style>{GLOBAL_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Viewer ck={view} onBack={()=>{setView(null);setTimeout(top,50)}} w={w} />
    </div>
  );

  return (
    <div ref={ref} className="dotgrid" style={{ minHeight:"100dvh", background:"#101114", fontFamily:"'Outfit',system-ui,sans-serif", color:"#FFF", position:"relative" }}>
      <style>{GLOBAL_CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:800, height:500, background:"radial-gradient(ellipse, rgba(220,38,38,0.05) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      {/* Header */}
      <div style={{ position:"relative", zIndex:1, borderBottom:"1px solid #1E2128", padding:wd?"52px 56px 36px":dk?"44px 36px 32px":"36px 20px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:dk?24:20 }}>
            <div style={{ animation:"fadeUp 0.6s ease" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?30:24, letterSpacing:12, color:"#DC2626", lineHeight:1 }}>REDLINE</div>
              <h1 style={{ fontSize:dk?14:12, fontWeight:600, color:"#5A5E68", margin:"6px 0 0", letterSpacing:dk?6:4, textTransform:"uppercase" }}>Sales Academy</h1>
            </div>
            <div style={{ animation:"fadeUp 0.6s ease 0.1s both" }}>
              <div style={{ width:dk?52:44, height:dk?52:44, borderRadius:14, background:"linear-gradient(135deg,#DC2626,#7f1d1d)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:dk?20:16, color:"#FFF", letterSpacing:2, boxShadow:"0 4px 24px rgba(220,38,38,0.2)", animation:"glow 3s ease-in-out infinite" }}>R</div>
            </div>
          </div>

          <p style={{ fontSize:dk?14:13, color:"#5A5E68", margin:"0 0 24px", maxWidth:500, lineHeight:1.5, animation:"fadeUp 0.6s ease 0.15s both" }}>
            Your complete training system. Master every module, close more deals.
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:dk?12:8, animation:"fadeUp 0.6s ease 0.2s both" }}>
            {[["12","Modules","#DC2626"],["2","Bootcamps","#F59E0B"],["3","Reference","#3B82F6"]].map(([n,l,col]) => (
              <div key={l} style={{ background:"#181B20", border:"1px solid #252830", borderRadius:14, padding:dk?"16px 24px":"14px 16px", textAlign:"center", minWidth:dk?120:0, flex:dk?"none":1 }}>
                <div style={{ fontSize:dk?28:22, fontWeight:800, color:col, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:9, color:"#5A5E68", textTransform:"uppercase", letterSpacing:2, fontWeight:600, marginTop:6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto", padding:wd?"24px 56px 80px":dk?"20px 36px 80px":"16px 20px 80px" }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.label && (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"32px 0 14px", animation:`fadeUp 0.5s ease ${0.3+gi*0.1}s both` }}>
                <div style={{ width:8, height:8, borderRadius:4, background:g.color }} />
                <div style={{ fontSize:10, fontWeight:700, color:g.color, letterSpacing:3, textTransform:"uppercase" }}>{g.label}</div>
                <div style={{ flex:1, height:1, background:"#111114" }} />
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:wd?"1fr 1fr 1fr":dk?"1fr 1fr":"1fr", gap:dk?10:8 }}>
              {g.items.map((x, i) => (
                <div key={x.id} className="card-hover" onClick={()=>{setView(x.k);setTimeout(top,50)}}
                  style={{
                    background:"#141519", border:"1px solid #252830",
                    borderRadius:16, padding:dk?"22px 20px":"18px 16px", cursor:"pointer",
                    animation:`fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) ${0.05*(gi*4+i)}s both`,
                    position:"relative", overflow:"hidden"
                  }}>
                  {/* Accent strip */}
                  <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:bc[x.t], borderRadius:"3px 0 0 3px" }} />

                  <div style={{ display:"flex", alignItems:"center", gap:14, paddingLeft:8 }}>
                    <div style={{ fontSize:24, width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", background:"#1C1F25", borderRadius:14, flexShrink:0, border:"1px solid #282B33" }}>{x.ic}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:9, fontWeight:700, color:bc[x.t], letterSpacing:2, marginBottom:4, textTransform:"uppercase" }}>{x.n||x.t}</div>
                      <h3 style={{ fontSize:14.5, fontWeight:700, color:"#EEF0F4", margin:"0 0 3px", lineHeight:1.3 }}>{x.sub}</h3>
                      <p style={{ fontSize:11.5, color:"#5A5E68", margin:0, lineHeight:1.35 }}>{x.d}</p>
                    </div>
                    <div style={{ width:32, height:32, borderRadius:10, background:"#1C1F25", border:"1px solid #282B33", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#3A3E48", fontSize:14 }}>›</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
