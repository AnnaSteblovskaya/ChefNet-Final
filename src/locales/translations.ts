import { Language } from "@/contexts/LanguageContext";

type TranslationKeys = {
  // Navigation
  features: string;
  aboutUs: string;
  forPartners: string;
  referralProgramme: string;
  stagesOfDevelopment: string;
  whyChefNet: string;
  roadmap: string;
  faq: string;
  team: string;
  contacts: string;
  logIn: string;
  signIn: string;

  // Hero Section
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroTitle4: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBenefit1: string;
  heroBenefit2: string;
  heroBenefit3: string;
  heroCta: string;
  getStarted: string;

  // About/Opportunities Section
  opportunitiesTitle: string;
  opportunity1Title: string;
  opportunity1Desc: string;
  opportunity2Title: string;
  opportunity2Desc: string;
  opportunity3Title: string;
  opportunity3Desc: string;
  believeTitle: string;
  believeSubtitle: string;
  believeDesc1: string;
  believeDesc2: string;
  believeDesc3: string;

  // ChefNet App Opportunities Section
  chefnetAppTitle1: string;
  chefnetAppTitle2: string;
  chefnetAppTitle3: string;
  chefnetAppOpportunity1Title: string;
  chefnetAppOpportunity1Subtitle: string;
  chefnetAppOpportunity1Desc: string;
  chefnetAppOpportunity1DescPart1: string;
  chefnetAppOpportunity1DescPart2: string;
  chefnetAppOpportunity1DescPart3: string;
  chefnetAppOpportunity2Title: string;
  chefnetAppOpportunity2Subtitle: string;
  chefnetAppOpportunity2Desc: string;
  chefnetAppOpportunity2DescPart1: string;
  chefnetAppOpportunity2DescPart2: string;
  chefnetAppOpportunity2DescPart3: string;
  chefnetAppOpportunity3Title: string;
  chefnetAppOpportunity3Subtitle: string;
  chefnetAppOpportunity3Desc: string;
  chefnetAppOpportunity3DescPart1: string;
  chefnetAppOpportunity3DescPart2: string;
  chefnetAppOpportunity3DescPart3: string;

  // Unique Features Section
  uniqueFeaturesTitle: string;
  uniqueFeaturesChefNet: string;
  feature1Title: string;
  feature1Subtitle?: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Subtitle?: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Subtitle?: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Subtitle?: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Subtitle?: string;
  feature5Desc: string;
  feature6Title: string;
  feature6Subtitle?: string;
  feature6Desc: string;
  feature7Title: string;
  feature7Subtitle?: string;
  feature7Desc: string;
  feature8Title: string;
  feature8Subtitle?: string;
  feature8Desc: string;
  feature9Title: string;
  feature9Subtitle?: string;
  feature9Desc: string;

  // Advantages Section
  advantagesTitle: string;
  advantagesSubtitle: string;
  advantage1Title: string;
  advantage1Desc: string;
  advantage2Title: string;
  advantage2Desc: string;
  advantage3Title: string;
  advantage3Desc: string;
  advantage4Title: string;
  advantage4Desc: string;
  competitiveTitle: string;
  traditional: string;
  competitors: string;
  chefnet: string;
  avgReturn: string;

  // Partnership Section
  partnershipTitle: string;
  partnershipSubtitle: string;
  partnershipCard1Title: string;
  partnershipCard1Desc: string;
  partnershipCard2Title: string;
  partnershipCard2Desc1: string;
  partnershipCard2Desc2: string;
  partnershipCard3Title: string;
  partnershipCard3Desc: string;
  you: string;
  startNetwork: string;
  level: string;
  level1Reward: string;
  level1Desc: string;
  level2Reward: string;
  level2Desc: string;
  level3Reward: string;
  level3Desc: string;
  howItWorks: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Roadmap Section
  roadmapTitle: string;
  roadmapSubtitle: string;
  period1Title: string;
  period1Desc: string;
  period1KPI: string;
  period2Title: string;
  period2Desc: string;
  period2KPI: string;
  period3Title: string;
  period3Desc: string;
  period3KPI: string;
  period4Title: string;
  period4Desc: string;
  period4KPI: string;
  period5Title: string;
  period5Desc: string;
  period5KPI: string;
  period6Title: string;
  period6Desc: string;
  period6KPI: string;
  period7Title: string;
  period7Desc: string;
  period7KPI: string;
  period8Title: string;
  period8Desc: string;
  period8KPI: string;
  period9Title: string;
  period9Desc: string;
  period9KPI: string;
  completed: string;
  active: string;
  upcoming: string;

  // Investments Section
  investmentsTitle: string;
  seedRound: string;
  seriesA: string;
  seriesB: string;
  seriesC: string;
  pricePerShare: string;
  minInvestment: string;
  soldOut: string;
  activeRound: string;
  comingSoon: string;
  shares: string;
  investNow: string;

  // Investment Stages Back Side
  seedBackTitle: string;
  seedBackDesc: string;
  privateBackTitle: string;
  privateBackDesc: string;
  marketingBackTitle: string;
  marketingBackDesc: string;
  publicBackTitle: string;
  publicBackDesc: string;

  // CTA Banner
  ctaBannerTitle: string;
  ctaBannerHighlight: string;
  ctaBannerHighlightBrand: string;
  ctaBannerSuffix: string;

  // FAQ Section
  faqTitle: string;
  faqSubtitle: string;
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
  faq4Question: string;
  faq4Answer: string;
  faq5Question: string;
  faq5Answer: string;
  faq6Question: string;
  faq6Answer: string;
  faq7Question: string;
  faq7Answer: string;
  faq8Question: string;
  faq8Answer: string;
  faq9Question: string;
  faq9Answer: string;
  faq10Question: string;
  faq10Answer: string;
  contactTitle: string;
  contactSubtitle: string;
  contactButton: string;

  // Footer
  footerMainTitle: string;
  footerTagline: string;
  footerContacts: string;
  footerEmail: string;
  footerPhone: string;
  footerAddress: string;
  footerNewsletter: string;
  footerNewsletterDesc: string;
  footerNewsletterPlaceholder: string;
  footerNewsletterButton: string;
  footerPrivacyPolicy: string;
  footerCopyright: string;

  // Partners Opportunities Section
  partnersOpportunitiesTitle: string;
  opportunityCard1Title: string;
  opportunityCard1Desc: string;
  opportunityCard2Title: string;
  opportunityCard2Desc: string;
  opportunityCard3Title: string;
  opportunityCard3Desc: string;
  opportunityCard4Title: string;
  opportunityCard4Desc: string;
  opportunityCard5Title: string;
  opportunityCard5Desc: string;
  opportunityCard6Title: string;
  opportunityCard6Desc: string;

  // Partners Section
  partnersTitle: string;
  partner1Title: string;
  partner1Desc: string;
  partner2Title: string;
  partner2Desc: string;
  partner3Title: string;
  partner3Desc: string;
  partner4Title: string;
  partner4Desc: string;
  partner5Title: string;
  partner5Desc: string;
  partner6Title: string;
  partner6Desc: string;
  partner7Title: string;
  partner7Desc: string;
  partner8Title: string;
  partner8Desc: string;

  // Why ChefNet Section
  whyChefNetTitle: string;
  whyCard1Title: string;
  whyCard1Desc: string;
  whyCard2Title: string;
  whyCard2Desc: string;
  whyCard3Title: string;
  whyCard3Desc: string;
  whyCard4Title: string;
  whyCard4Line1: string;
  whyCard4Line2: string;
  whyCard4Line3: string;
  whyCard5Title: string;
  whyCard5Line1: string;
  whyCard5Line2: string;
  whyCard6Title: string;
  whyCard6Line1: string;
  whyCard6Line2: string;
  whyCard6Line3: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation
    features: "Highlights",
    aboutUs: "Opportunities",
    forPartners: "For partners",
    referralProgramme: "Growth stages",
    stagesOfDevelopment: "Growth stages",
    whyChefNet: "Why ChefNet?",
    roadmap: "Roadmap",
    faq: "FAQ",
    team: "Team",
    contacts: "Contacts",
    logIn: "Log in",
    signIn: "Sign in",

    // Hero Section
    heroTitle1: "Intelligence that turns choice",
    heroTitle2: "into value.",
    heroTitle3: "Intelligence",
    heroTitle4: "that turns choice into value.",
    heroSubtitle: "ChefNet is an AI-powered technology",
    heroDescription:
      "that learns your rhythm, remembers your taste, and saves you time and money every day.",
    heroBenefit1: "Restaurants gain new guests.",
    heroBenefit2:
      "Guests receive precise, personalized recommendations.",
    heroBenefit3:
      "Partners benefit from transparent growth and a dynamic market.",
    heroCta: "Now is your opportunity to join this movement.",
    getStarted: "Get Started",

    opportunitiesTitle: "Opportunities",
    opportunity1Title: "ChefNet",
    opportunity1Desc: "Your chance",
    opportunity2Title: "ChefNet",
    opportunity2Desc: "Our turn",
    opportunity3Title: "ChefNet",
    opportunity3Desc: "Revolution",
    believeTitle: "Our philosophy",
    believeSubtitle:
      "Simplicity in a single touch. Precision — ChefNet style.",
    believeDesc1:
      "We're building a service that makes choosing a place as simple as ordering a taxi.\nOur goal is to save time for millions of people and give them the best experience.",
    believeDesc2:
      "Advanced technology works for people: fast, precise, and without unnecessary steps.\nChefNet reveals not the most advertised, but the truly best spots — through honest, authentic, and verified reviews.",
    believeDesc3: "",
    chefnetAppTitle1: "Opportunities with ChefNet ",
    chefnetAppTitle2: "Invest",
    chefnetAppTitle3: "",
    chefnetAppOpportunity1Title: "ChefNet",
    chefnetAppOpportunity1Subtitle:
      " — your entry into a new trend.",
    chefnetAppOpportunity1Desc:
      "ChefNet Invest - is your chance to join the birth of a global trend and a tech giant unlike any that exists today.",
    chefnetAppOpportunity1DescPart1: "ChefNet ",
    chefnetAppOpportunity1DescPart2: "Invest",
    chefnetAppOpportunity1DescPart3:
      " - is your chance to join the birth of a global trend and a tech giant unlike any that exists today.",
    chefnetAppOpportunity2Title: "ChefNet",
    chefnetAppOpportunity2Subtitle: " — now it's our turn.",
    chefnetAppOpportunity2Desc:
      "Booking, Uber, Airbnb, Amazon didn't exist once either. Today, the whole world knows them. The next name on this list - ChefNet!!!",
    chefnetAppOpportunity2DescPart1:
      "Booking, Uber, Airbnb, Amazon didn't exist once either. Today, the whole world knows them. The next name on this list - ",
    chefnetAppOpportunity2DescPart2: "ChefNet",
    chefnetAppOpportunity2DescPart3: "!!!",
    chefnetAppOpportunity3Title: "ChefNet",
    chefnetAppOpportunity3Subtitle:
      " — the new standard in FoodTech.",
    chefnetAppOpportunity3Desc:
      "ChefNet is a revolution in the world of food apps—an idea whose time has come.",
    chefnetAppOpportunity3DescPart1: "",
    chefnetAppOpportunity3DescPart2: "ChefNet",
    chefnetAppOpportunity3DescPart3:
      " is a revolution in the world of food apps—an idea whose time has come.",
    uniqueFeaturesTitle: "unique features",
    uniqueFeaturesChefNet: "ChefNet",
    feature1Title: "Your Personal AI companion",
    feature1Desc:
      "Powered by Super-intelligence: it understands your tastes, curates the best options, and guides you seamlessly from choice to payment. Your AI companion knows what you love, books your table in advance, and saves you time every day.",
    feature2Title: "Intuitive search",
    feature2Desc:
      "Search restaurants, dishes, and cuisines — fast and precise. Interactive map with smart filters: cuisine, rating, price. Always up-to-date results in real time.",
    feature3Title: "Flexibility of use",
    feature3Desc:
      "The system works in two modes: visual selection by images or voice control via your AI companion. You choose — the intelligence handles the rest.",
    feature4Title: "Clarity and details",
    feature4Desc:
      "Interactive menu in photo and video format, with ingredients and calorie info. Pre-order your meal and have it ready the moment you arrive — perfect when you're in a hurry.",
    feature5Title: "Unique customer review system",
    feature5Desc:
      "ChefNet redefines reviews: not just ⭐ ratings, but real emotions. Audio and video format make feedback personal, while ratings for dishes, service, and atmosphere make it genuinely reliable.",
    feature6Title: "Earn by being active",
    feature6Desc:
      "Earn not just points — but real money for your activity.",
    feature7Title: "All-in-one app",
    feature7Desc:
      "A unified global platform: from cafes and bars to premium restaurants and private chefs.",
    feature8Title:
      "An AI - companion that makes your culinary experience simple and seamless",
    feature8Desc:
      "Your companion finds the perfect spot, reserves your table, maps your route, and reminds you when it's time to go. Visited a restaurant with friends? It'll invite them and reach out to each of them personally!",
    feature9Title: "Restaurant support and development",
    feature9Desc:
      "ChefNet helps venues grow — from early ideas to full-scale expansion. AI analyzes performance metrics and delivers actionable optimization strategies. Access to funding from private investors and culinary funds, as well as participation in investment programs backed by the ChefNet community.",
    advantagesTitle: "Advantages",
    advantagesSubtitle: "Why invest",
    advantage1Title: "Innovation",
    advantage1Desc: "Advanced",
    advantage2Title: "Growth",
    advantage2Desc: "Rapid",
    advantage3Title: "Team",
    advantage3Desc: "Expert",
    advantage4Title: "Returns",
    advantage4Desc: "High",
    competitiveTitle: "Advantage",
    traditional: "Traditional",
    competitors: "Competitors",
    chefnet: "ChefNet",
    avgReturn: "Returns",
    partnershipTitle: "Partnership",
    partnershipSubtitle: "Rewards",
    partnershipCard1Title: "Partner",
    partnershipCard1Desc: "Become partner",
    partnershipCard2Title: "Program",
    partnershipCard2Desc1: "Classic model",
    partnershipCard2Desc2: "More shares",
    partnershipCard3Title: "Rounds",
    partnershipCard3Desc: "Value grows",
    you: "You",
    startNetwork: "Start network",
    level: "Level",
    level1Reward: "5%",
    level1Desc: "5% reward",
    level2Reward: "2%",
    level2Desc: "2% reward",
    level3Reward: "1%",
    level3Desc: "1% reward",
    howItWorks: "How it works",
    step1Title: "Share",
    step1Desc: "Unique link",
    step2Title: "Friends invest",
    step2Desc: "Earn commission",
    step3Title: "Grow",
    step3Desc: "Build network",
    roadmapTitle: "Roadmap",
    roadmapSubtitle:
      "Follow our journey from startup to industry leader",
    period1Title: "Q1 2026",
    period1Desc: "MVP",
    period1KPI: "",
    period2Title: "Q2 2026",
    period2Desc: "Launch",
    period2KPI: "",
    period3Title: "Q3 2026",
    period3Desc: "Product",
    period3KPI: "",
    period4Title: "Q4 2026",
    period4Desc: "Preparation",
    period4KPI: "",
    period5Title: "Q1 2027",
    period5Desc: "Ecosystem",
    period5KPI: "",
    period6Title: "Q2 2027",
    period6Desc: "Marketing",
    period6KPI: "",
    period7Title: "Q3 2027",
    period7Desc: "Growth",
    period7KPI: "",
    period8Title: "Q4 2027",
    period8Desc: "Social",
    period8KPI: "",
    period9Title: "2028+",
    period9Desc: "AI & FinTech",
    period9KPI: "",
    completed: "Completed",
    active: "Active",
    upcoming: "Upcoming",
    investmentsTitle: "Growth stages",
    seedRound: "Seed",
    seriesA: "Series A",
    seriesB: "Series B",
    seriesC: "Series C",
    pricePerShare: "Price",
    minInvestment: "Minimum",
    soldOut: "Sold Out",
    activeRound: "Active",
    comingSoon: "Coming Soon",
    shares: "shares",
    investNow: "Invest Now",
    seedBackTitle: "Development of the app MVP",
    seedBackDesc:
      "• User acquisition\n• Negotiations with restaurants\n• Hiring country managers\n• KPI: 10K users",
    privateBackTitle: "MVP Testing",
    privateBackDesc:
      "• Testing the MVP in key cities across the US and Europe\n• Partnerships with restaurant associations and local chains\n• Improving personalization algorithms and AI recommendations\n• KPI: 100K users, 500 restaurants",
    marketingBackTitle:
      "Integration with ride-sharing services",
    marketingBackDesc:
      "• Integration with ride-sharing services (Uber, Lyft, Bolt)\n• Launch of the fully featured ChefNet app\n• Expansion of the fintech module (payments, cashback, ChefNet Token)\n• Large-scale collaborations with creators and media in the US and EU\n• KPI: 1M users, 5K restaurants, $1M profit",
    publicBackTitle:
      "Expansion into Asia, Latin America, and the Middle East",
    publicBackDesc:
      "• Scaling to a global SuperApp\n• Launch of a DAO community and NFT programs for restaurants\n• Preparation for an IPO with a $3–5B valuation\n• KPI: 30M users, 50K restaurants, $100M+ profit",
    ctaBannerTitle: "The future of restaurants starts here.",
    ctaBannerHighlight: "Join ",
    ctaBannerHighlightBrand: "ChefNet",
    ctaBannerSuffix: ".",
    faqTitle: "Frequently asked questions",
    faqSubtitle: "Questions",
    faq1Question:
      "What is ChefNet, and what problem does the project solve?",
    faq1Answer:
      "ChefNet - is a global FoodTech platform that unifies discovery, booking, payments, and engagement with restaurants and private chefs.\n\nIt addresses the fragmentation of the food services ecosystem by establishing a single, seamless standard.",
    faq2Question: "What is ChefNet's business model?",
    faq2Answer:
      "We operate a hybrid Marketplace + SaaS + Fintech model, diversifying revenue across four channels:\n\n• **Transaction Fees:** A percentage from bookings, food pre-orders, and event ticket sales.\n\n• **Subscriptions (B2B SaaS):** Monthly fees paid by restaurants for access to CRM, AI-driven analytics, and marketing tools.\n\n• **Fintech (Payments):** Transaction fees from in-app payments and bill-splitting features.\n\n• **Advertising:** Paid promotion of restaurants within the app's discovery and search results.",
    faq3Question:
      "At what stage of development is the project currently?",
    faq3Answer:
      "The project has successfully closed its pre-seed round. We are currently in an active fundraising phase to finance the development and launch of the MVP.",
    faq4Question:
      "Where is the company registered, and what is its legal structure?",
    faq4Answer:
      "ChefNet LLC is registered in the state of Delaware, USA — the premier U.S. jurisdiction for international investment.",
    faq5Question:
      "Funding round structure and participation terms?",
    faq5Answer:
      "To execute ChefNet's global strategy, we have planned a step-by-step fundraising process with a total target of $2,000,000. The financing is structured into four key rounds (tranches). This approach allows investors to mitigate risk, while enabling the company to increase its valuation at each subsequent stage.\n\nCurrent focus: Round 1 (Pre-Seed).\nFundraising Breakdown:\n\n🟢 Round 1: MVP Development (Pre-Seed)\nAmount: $150,000\nObjective: Build the technical foundation of the product.\nUse of funds: Application architecture, UI/UX design, backend development, and release of the first functional version (MVP) for iOS and Android.\nOutcome: A production-ready product available to early users.\n\n🟡 Round 2: Market Fit & Validation (Seed 1)\nAmount: $350,000\nObjective: Validate core hypotheses in the live market and generate initial metrics.\nUse of funds: Soft launch, onboarding the first 50 restaurant partners, initial marketing efforts, and core team operating expenses.\nOutcome: Proven product-market fit, first transactions, and active users.\n\n🔵 Round 3: Ecosystem & Integrations (Seed 2 / Bridge)\nAmount: $500,000\nObjective: Evolve the app into a full-scale platform.\nUse of funds: Technical integrations with ride-hailing services, restaurant POS systems, and further development of AI-driven personalization algorithms.\nOutcome: A fully functional platform ready to support mass adoption.\n\n🟣 Round 4: Launch & Scaling (Growth)\nAmount: $1,000,000\nObjective: Aggressive market penetration and monetization.\nUse of funds: Large-scale marketing campaigns (influencers, performance marketing), launch of the fintech module, and expansion into new regions (U.S. and Europe).\nOutcome: User base growth to KPI levels (hundreds of thousands of users) and achievement of stable recurring revenue.\n\nStatus Update: We are currently open to proposals for Round 1 ($150,000) to initiate MVP development.",
    faq6Question: "What guarantees are provided to investors?",
    faq6Answer:
      "We build investor relationships on the principles of full transparency and adherence to internationally recognized legal standards.\n\nYour investment is protected by the following mechanisms:\n\n**1. Legal Protection (US Law)**\n\nThe company is structured under U.S. jurisdiction as a Delaware C-Corp — the gold standard for venture capital investments. Investor rights, including equity ownership and rights under convertible instruments (SAFE), are protected by U.S. law. All arrangements are formalized through legally binding agreements.\n\n**2. Intellectual Property Ownership (IP Ownership)**\n\nAll technology, source code, brand assets, and the customer base are legally owned by the company, not by individual founders or contributors. This ensures that the core asset you are investing in is fully protected within the corporate structure.\n\n**3. Transparency and Reporting**\n\nInvestors receive regular updates on the company's performance, including financial statements (P&L), product metrics, development roadmap status, and use of funds. You will always have clear visibility into how your capital is being deployed.\n\n**4. Founder Incentives (Vesting)**\n\nFounder equity is subject to a standard vesting schedule. This aligns the founders' interests with the company's long-term success and prevents early departures while retaining ownership at an early stage.",
    faq7Question:
      "What level of potential return can be expected?",
    faq7Answer:
      "Investing in ChefNet at an early stage (Pre-Seed/Seed) means gaining exposure to exponential growth in the company's valuation. Our objective goes beyond operating profit — we are focused on scaling enterprise value.\n\nThe return potential is driven by three key factors:\n\n**1. Company Valuation Growth (X-multiple potential)**\n\nAt the current stage, investors acquire equity at the lowest valuation. With each subsequent round — driven by product integrations and global scaling — the company's valuation increases.\n\nTarget: a 10–20x increase in company value by the Series A/B round or a strategic acquisition.\n\n**2. Projected Revenue Growth**\n\nAccording to our financial model, by 2028 — following global market expansion and full fintech integration — we project Annual Recurring Revenue (ARR) exceeding $100M. This underpins strong asset profitability and long-term value.\n\n**3. Exit Strategy**\n\nInvestor returns are primarily realized at exit. We consider two liquidity scenarios for early investors within a 3–5 year horizon:\n\n• **Mergers & Acquisitions (M&A):** Sale of the company to a major industry player (e.g., Uber, DoorDash, Booking, or fintech-banking ecosystems).\n\n• **Secondary Market:** The opportunity to sell equity to new investors in later funding rounds at a significant premium.",
    faq8Question: "When is the IPO planned?",
    faq8Answer:
      "We view an IPO as one of the possible long-term development scenarios, with a projected horizon of approximately 5–7 years.\n\nHowever, our primary objective is to maximize the company's valuation and ensure liquidity for investors. Accordingly, we are developing the business with two exit strategies in mind:\n\n**Mergers & Acquisitions (Strategic Acquisition):**\n\nThe sale of the company to a global strategic player (for example, ecosystems such as Uber, Booking, DoorDash, or major fintech groups) within a 3–5 year horizon. This is the most likely scenario for a rapid exit, offering high returns with an attractive valuation multiple.\n\n**IPO (Initial Public Offering):**\n\nA public listing upon reaching a valuation exceeding $1 billion and achieving stable international revenue, enabling the creation of an independent, global-scale company.",
    faq9Question: "What technologies does ChefNet use?",
    faq9Answer:
      "ChefNet is built on a modern cloud-native microservices architecture, ensuring flexibility, secure financial transactions, and rapid deployment of AI-driven features.\n\nOur technology stack:\n\n1. Mobile & Frontend (Cross-platform)\n\nWe use Flutter or React Native.\n\nWhy:\n\nThis enables a single codebase for both iOS and Android, accelerating development by up to 40% and reducing maintenance costs while preserving high performance and a true native user experience.\n\n2. Backend & API (Server-side)\n\nPrimary languages: Python (FastAPI / Django) or Node.js.\n\nWhy:\n\nPython is ideal for AI integration and data processing. A microservices architecture allows us to seamlessly add new verticals—such as fintech modules or events—without re-engineering the entire platform.\n\n3. Artificial Intelligence (AI & Data)\n\nLLM Integration:\n\nIntegration with leading large language models (OpenAI GPT-4 / Anthropic) to power the AI concierge.\n\nRecommendation Engine:\n\nProprietary machine-learning algorithms that personalize restaurant discovery based on user behavior and order history.\n\n4. Fintech & Security\n\nPayments:\n\nIntegration via Stripe Connect or Adyen, the industry standard for marketplaces.\n\nSecurity:\n\nFull compliance with PCI DSS for payment data protection and end-to-end SSL/TLS encryption for all transmitted data.\n\n5. Infrastructure\n\nCloud:\n\nHosting on AWS (Amazon Web Services) or Google Cloud.\n\nScalability:\n\nUse of Docker and Kubernetes to enable automatic scaling during traffic spikes.",
    faq10Question:
      "What sets ChefNet apart from competitors like Yelp, OpenTable, and Grubhub?",
    faq10Answer:
      'Existing players each solve only a single, narrow problem: Yelp is essentially a directory, OpenTable is a reservation utility, and Grubhub is a delivery service. ChefNet unifies the entire guest journey — from the initial "where should we go?" moment to paying the bill — eliminating friction and gaps in the user experience.\n\nOur 5 key advantages:\n\n1. AI Concierge instead of filter-based search (vs. Yelp / TripAdvisor)\n\nThem: Users spend hours scrolling through reviews and tweaking filters to find the right place.\n\nUs: Hyper-personalization. The AI assistant understands the user\'s tastes and delivers the perfect match in seconds — like asking a foodie friend for advice — factoring in mood, budget, and visit history.\n\n2. Seamless fintech: payment and bill splitting (vs. OpenTable)\n\nThem: The app is useful only up to the reservation. At the end of the meal, guests still wait for the server, the terminal, and struggle to split the bill.\n\nUs: Pay-at-Table. A full in-app flow: reserve → order → pay → split the bill with friends in one tap. No waiting for the check means higher table turnover for restaurants.\n\n3. Social mechanics (vs. Grubhub / Uber Eats)\n\nThem: A solitary consumption experience focused on food delivery.\n\nUs: Social Dining. Tools for shared planning: inviting friends, voting on a restaurant, and purchasing tickets to culinary events. We restore the social dimension of food.\n\n4. A fair monetization model for restaurants\n\nThem: Predatory commissions (up to 30% on delivery) or fees for every referred guest, even returning regulars.\n\nUs: SaaS + Fintech. We provide restaurants with CRM and analytics tools via subscription, while generating core margin from financial transactions — not by squeezing businesses with commissions.\n\n5. A social culinary network and "live" reviews (vs. TripAdvisor)\n\nThem: Boring text-heavy reviews, often written by bots or anonymous users. Food photos are frequently outdated or over-edited, misrepresenting reality.\n\nUs: Video content and trust. We embed short-form video reviews (Stories/Reels) directly into restaurant profiles. Guests share the real atmosphere and authentic dishes — no filters. Users can follow friends or food bloggers to see their recommendation feeds, turning restaurant discovery from a chore into entertainment.',
    contactTitle: "Questions?",
    contactSubtitle: "Here to help",
    contactButton: "Contact",
    footerMainTitle:
      "The future of restaurants starts here. Join ChefNet.",
    footerTagline:
      "Your guide to the world of restaurant innovation",
    footerContacts: "Contacts",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "News",
    footerNewsletterDesc:
      "Stay up to date with the latest news and offers.",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Subscribe",
    footerPrivacyPolicy: "Privacy Policy",
    footerCopyright: "© 2026 ChefNet LLC All rights reserved.",
    partnersOpportunitiesTitle: "Opportunities",
    opportunityCard1Title: "Dashboard",
    opportunityCard1Desc: "Track shares",
    opportunityCard2Title: "AI Companion",
    opportunityCard2Desc: "Publishes news",
    opportunityCard3Title: "Referral",
    opportunityCard3Desc: "Increase stake",
    opportunityCard4Title: "Extended",
    opportunityCard4Desc: "Additional opportunities",
    opportunityCard5Title: "Fundraising",
    opportunityCard5Desc: "Early rounds",
    opportunityCard6Title: "Legal",
    opportunityCard6Desc: "Delaware, USA",

    // Partners Section
    partnersTitle: "Opportunities for partners",
    partner1Title: "Become a partner of the company",
    partner1Desc:
      "Join us at the founding stage to have your ChefNet shares convert into company stock upon IPO.",
    partner2Title: "Partner program",
    partner2Desc:
      "A classic model that lets you increase your stake by inviting new partners during the fundraising phase.\nThe more you contribute — the larger your share. Transparent and straightforward.",
    partner3Title: "Funding rounds",
    partner3Desc:
      "With every stage of ChefNet's growth, the value of your shares increases.",
    partner4Title: "Partner dashboard",
    partner4Desc:
      "Tracking of purchased and earned shares under the Referral Program.",
    partner5Title: "AI Companion",
    partner5Desc:
      "publishes company news and global trends in the restaurant industry, answers your questions and executes your requests.",
    partner6Title: "Extended referral program",
    partner6Desc:
      "After the launch of the Application, you will have additional opportunities to\nmonetize your existing network, as well as be rewarded for referring new users and\nrestaurants, and your efforts in developing the ecosystem.",
    partner7Title: "Fundraising",
    partner7Desc:
      "Participating in early funding rounds offers more opportunities to acquire equity at the most favorable prices and to receive more shares after the company goes public.",
    partner8Title: "Robust legal framework",
    partner8Desc:
      "Company registration in USA, Delaware, ensures serious intent and transparent legal and financial reporting in compliance with U.S. standards.",

    // Why ChefNet Section
    whyChefNetTitle: "Why ChefNet?",
    whyCard1Title: "ChefNet is a next-generation ecosystem",
    whyCard1Desc:
      "We connect users and businesses through AI, making gastronomy smart and convenient.",
    whyCard2Title: "Culinary social network",
    whyCard2Desc:
      "Content from users and chefs: photos, videos, reviews, recipes.\nLive streams and masterclasses from the top chefs.",
    whyCard3Title: "ChefNet platform",
    whyCard3Desc:
      "A platform where passion for cooking meets technology.",
    whyCard4Title: "Technology that works for restaurants",
    whyCard4Line1: "Smart interfaces increase average check.",
    whyCard4Line2: "AI reduces costs and improves forecasting.",
    whyCard4Line3:
      "ChefNet helps restaurants earn more — effortlessly.",
    whyCard5Title:
      "Helping restaurants is part of ChefNet's mission",
    whyCard5Line1:
      "We provide access to resources for financing for renovation, modernization, or new openings, plus marketing support to ensure the right people find your place.",
    whyCard5Line2:
      "ChefNet is an service that not only supports but helps your business grow and thrive.",
    whyCard6Title: "Personalization through your AI companion",
    whyCard6Line1:
      "Recommendations based on your tastes, mood, and context.\nInstant booking and a ready route.",
    whyCard6Line2:
      "Dynamic menus, voice scenarios, and adaptive suggestions — everything to make your choice truly easy.",
  },

  ru: {
    // Navigation
    features: "Фишки",
    aboutUs: "Возможности",
    forPartners: "Для партнёров",
    referralProgramme: "Этапы развития",
    stagesOfDevelopment: "Этапы развития",
    whyChefNet: "Почему ChefNet?",
    roadmap: "Дорожная карта",
    faq: "FAQ",
    team: "Команда",
    contacts: "Контакты",
    logIn: "Войти",
    signIn: "Регистрация",

    // Hero Section
    heroTitle1: "Интеллект, превращающий выбор",
    heroTitle2: "в ценность.",
    heroTitle3: "Интеллект",
    heroTitle4: "превращающий выбор в ценность.",
    heroSubtitle: "ChefNet - это технология основанная на AI,",
    heroDescription:
      "которая изучает ваш ритм, запоминает ваш вкус и сохраняет вам время и деньги каждый день.",
    heroBenefit1: "Здесь рестораны получают новых гостей.",
    heroBenefit2: "Гости — точные рекомендации.",
    heroBenefit3:
      "Партнеры — прозрачный рост и динамичный рынок.",
    heroCta: "Пришло ваше время стать частью этого движения.",
    getStarted: "Get Started",

    opportunitiesTitle: "Opportunities",
    opportunity1Title: "ChefNet",
    opportunity1Desc: "Your chance",
    opportunity2Title: "ChefNet",
    opportunity2Desc: "Our turn",
    opportunity3Title: "ChefNet",
    opportunity3Desc: "Revolution",
    believeTitle: "Наша философия",
    believeSubtitle:
      "Простота в одном касании. Точность — в стиле ChefNet.",
    believeDesc1:
      "Мы создаём сервис, который делает выбор места таким же простым, как заказ такси.\nНаша цель — экономить время миллионов людей и давать им лучший опыт.",
    believeDesc2:
      "Передовые технологии работают на человека: быстро, точно и без лишних шагов.\nChefNet показывает не самые разрекламированные, а действительно лучшие места — через честные, аутентичные и проверенные отзывы.",
    believeDesc3: "",
    chefnetAppTitle1: "Возможности с ChefNet ",
    chefnetAppTitle2: "Invest",
    chefnetAppTitle3: "",
    chefnetAppOpportunity1Title: "ChefNet",
    chefnetAppOpportunity1Subtitle:
      " — ваш вход в новый тренд.",
    chefnetAppOpportunity1Desc:
      "ChefNet Invest - это ваш шанс присоединиться к рождению глобального тренда и технологического гиганта, которого еще не существует.",
    chefnetAppOpportunity1DescPart1: "ChefNet ",
    chefnetAppOpportunity1DescPart2: "Invest",
    chefnetAppOpportunity1DescPart3:
      " - это ваш шанс присоединиться к рождению глобального тренда и технологического гиганта, которого еще не существует.",
    chefnetAppOpportunity2Title: "ChefNet",
    chefnetAppOpportunity2Subtitle: " — теперь наша очередь.",
    chefnetAppOpportunity2Desc:
      "Booking, Uber, Airbnb, Amazon когда-то тоже не существовали. Сегодня их знает весь мир. Следующее имя в этом списке - ChefNet!!!",
    chefnetAppOpportunity2DescPart1:
      "Booking, Uber, Airbnb, Amazon когда-то тоже не существовали. Сегодня их знает весь мир. Следующее имя в этом списке - ",
    chefnetAppOpportunity2DescPart2: "ChefNet",
    chefnetAppOpportunity2DescPart3: "!!!",
    chefnetAppOpportunity3Title: "ChefNet",
    chefnetAppOpportunity3Subtitle:
      " — новый стандарт в FoodTech.",
    chefnetAppOpportunity3Desc:
      "ChefNet - это революция в мире Food-App. Идея, время которой пришло.",
    chefnetAppOpportunity3DescPart1: "",
    chefnetAppOpportunity3DescPart2: "ChefNet",
    chefnetAppOpportunity3DescPart3:
      " - это революция в мире Food-App. Идея, время которой пришло.",
    uniqueFeaturesTitle: "Уникальные фишки",
    uniqueFeaturesChefNet: "ChefNet",
    feature1Title: "Личный AI компаньон",
    feature1Desc:
      "Основано на Супер-интеллекте: он понимает ваши вкусы, подбирает лучшие варианты и ведет вас от выбора до оплаты. Ваш AI-компаньон знает, что вы любите, заранее бронирует столик и экономит вам время каждый день.",
    feature2Title: "Интуитивный поиск",
    feature2Desc:
      "Поиск по ресторанам, блюдам и стилям — быстро и точно. Интерактивная карта с умными фильтрами: кухня, рейтинг, цена. Всегда только актуальные результаты — в реальном времени.",
    feature3Title: "Гибкость использования",
    feature3Desc:
      "Система работает в двух режимах: визуальный выбор по картинкам или голосовое управление через вашего AI компаньона. Вы выбираете — интеллект делает остальное.",
    feature4Title: "Наглядность и детальность",
    feature4Desc:
      "Интерактивное меню в формате фото и видео, с составом и калорийностью блюд. Возможность предзаказа и подачи к вашему приходу — идеально, когда вы спешите.",
    feature5Title: "Уникальная система клиентских отзывов",
    feature5Desc:
      "ChefNet переосмысливает представление об отзывах: вместо ⭐ — живые эмоции. Аудио- и видео-формат делают обратную связь личной, а рейтинги блюд, сервиса и атмосферы — по-настоящему достоверными.",
    feature6Title: "Зарабатывайте за активность",
    feature6Desc:
      "Зарабатывайте не только баллы — но и реальные деньги за свою активность.",
    feature7Title: "Всё в одном приложении",
    feature7Desc:
      "Единая глобальная платформа: от кофеен и баров до премиум-ресторанов и частных шефов.",
    feature8Title:
      "AI-компаньон, который делает гастрономический опыт простым и удобным",
    feature8Desc:
      "Ваш компаньон найдет идеальное место, забронирует столик, проложит маршрут и напомнит, когда пора выходить. Идёте с друзьями? Он пригласит их и свяжется с каждым лично!",
    feature9Title: "Поддержка и развитие ресторанов",
    feature9Desc:
      "ChefNet помогает заведениям расти — от идей до масштабирования. AI анализирует метрики и предлагает пути оптимизации. Доступ к финансированию от частных инвесторов и кулинарных фондов, а также участие в программах инвестиций от сообщества ChefNet.",
    advantagesTitle: "Advantages",
    advantagesSubtitle: "Why invest",
    advantage1Title: "Innovation",
    advantage1Desc: "Advanced",
    advantage2Title: "Growth",
    advantage2Desc: "Rapid",
    advantage3Title: "Team",
    advantage3Desc: "Expert",
    advantage4Title: "Returns",
    advantage4Desc: "High",
    competitiveTitle: "Advantage",
    traditional: "Traditional",
    competitors: "Competitors",
    chefnet: "ChefNet",
    avgReturn: "Returns",
    partnershipTitle: "Partnership",
    partnershipSubtitle: "Rewards",
    partnershipCard1Title: "Partner",
    partnershipCard1Desc: "Become partner",
    partnershipCard2Title: "Program",
    partnershipCard2Desc1: "Classic model",
    partnershipCard2Desc2: "More shares",
    partnershipCard3Title: "Rounds",
    partnershipCard3Desc: "Value grows",
    you: "You",
    startNetwork: "Start network",
    level: "Level",
    level1Reward: "5%",
    level1Desc: "5% reward",
    level2Reward: "2%",
    level2Desc: "2% reward",
    level3Reward: "1%",
    level3Desc: "1% reward",
    howItWorks: "How it works",
    step1Title: "Share",
    step1Desc: "Unique link",
    step2Title: "Friends invest",
    step2Desc: "Earn commission",
    step3Title: "Grow",
    step3Desc: "Build network",
    roadmapTitle: "Roadmap",
    roadmapSubtitle:
      "Следите за нашим путем от стартапа до лидера индустрии",
    period1Title: "Q1 2026",
    period1Desc: "MVP",
    period1KPI: "",
    period2Title: "Q2 2026",
    period2Desc: "Launch",
    period2KPI: "",
    period3Title: "Q3 2026",
    period3Desc: "Product",
    period3KPI: "",
    period4Title: "Q4 2026",
    period4Desc: "Preparation",
    period4KPI: "",
    period5Title: "Q1 2027",
    period5Desc: "Ecosystem",
    period5KPI: "",
    period6Title: "Q2 2027",
    period6Desc: "Marketing",
    period6KPI: "",
    period7Title: "Q3 2027",
    period7Desc: "Growth",
    period7KPI: "",
    period8Title: "Q4 2027",
    period8Desc: "Social",
    period8KPI: "",
    period9Title: "2028+",
    period9Desc: "AI & FinTech",
    period9KPI: "",
    completed: "Завершено",
    active: "Активно",
    upcoming: "Предстоит",
    investmentsTitle: "Этапы развития",
    seedRound: "Seed",
    seriesA: "Series A",
    seriesB: "Series B",
    seriesC: "Series C",
    pricePerShare: "Price",
    minInvestment: "Minimum",
    soldOut: "Sold Out",
    activeRound: "Active",
    comingSoon: "Coming Soon",
    shares: "shares",
    investNow: "Invest Now",
    seedBackTitle: "Разработка MVP приложения",
    seedBackDesc:
      "• Набор пользователей\n• Переговоры с ресторанами\n• Набор менеджеров по странам\n• KPI: 10K пользователей",
    privateBackTitle: "Тестирование MVP",
    privateBackDesc:
      "• Тестирование MVP в ключевых городах США и Европы\n• Партнерство с ресторанными ассоциациями и локальными сетями\n• Улучшение алгоритмов персонализации и AI рекомендаций\n• KPI: 100K пользователей, 500 ресторанов",
    marketingBackTitle: "Интеграция с сервисами такси",
    marketingBackDesc:
      "• Интеграция с сервисами такси (Uber, Lyft, Bolt)\n• Запуск полнофункционального приложения ChefNet\n• Развитие финтех-модуля (оплата, кэшбэк, ChefNet Token)\n• Массовые коллаборации с блогерами и медиа в США и ЕС\n• KPI: 1M пользователей, 5K ресторанов, $1M прибыли",
    publicBackTitle:
      "Выход на рынки Азии, Латинской Америки и Ближнего Востока",
    publicBackDesc:
      "• Масштабирование до статуса глобального SuperApp\n• Запуск DAO-комьюнити и NFT-программ для ресторанов\n• Подготовка к IPO с капитализацией $3–5B\n• KPI: 30M пользователей, 50K ресторанов, $100M+ прибыли",
    ctaBannerTitle: "Будущее ресторанов начинается здесь.",
    ctaBannerHighlight: "Присоединяйся к ",
    ctaBannerHighlightBrand: "ChefNet",
    ctaBannerSuffix: ".",
    faqTitle: "Часто задаваемые вопросы",
    faqSubtitle: "Questions",
    faq1Question:
      "Что такое ChefNet и какую проблему решает проект?",
    faq1Answer:
      "ChefNet — это глобальная FoodTech-платформа, объединяющая поиск, бронирование, оплату и взаимодействие с ресторанами и частными шефами.\n\nОна решает проблему фрагментации гастросервиса, создавая единый стандарт.",
    faq2Question: "Какова бизнес-модель ChefNet?",
    faq2Answer:
      "Мы используем гибридную модель Marketplace + SaaS + Fintech, диверсифицируя доходы через 4 канала:\n\n• **Комиссия (Transactional):** % с бронирований, предзаказов еды и продажи билетов на мероприятия.\n\n• **Подписка (B2B SaaS):** Ежемесячная плата ресторанов за доступ к CRM, AI-аналитике и маркетинговым инструментам.\n\n• **Финтех (Payments):** Комиссия за транзакции при оплате и разделении счета внутри приложения.\n\n• **Реклама:** Платное продвижение ресторанов в выдаче приложения.",
    faq3Question:
      "На какой стадии развития сейчас находится проект?",
    faq3Answer:
      "Проект успешно закрыл Pre-seed раунд. В данный момент мы находимся в стадии активного фандрайзинга (привлечения инвестиций), чтобы профинансировать разработку и запуск MVP",
    faq4Question:
      "Где зарегистрирована компания и какова её юридическая форма?",
    faq4Answer:
      "ChefNet LLC зарегистрирована в штате Делавэр, США — лучшая  юрисдикция США для международных инвестиций.",
    faq5Question:
      "Структура раундов финансирования и условия участия?",
    faq5Answer:
      "Для реализации глобальной стратегии ChefNet мы запланировали поэтапное привлечение капитала (Step-by-step fundraising) с общей целью $2,000,000. Финансирование разбито на 4 ключевых раунда (транша). Такой подход позволяет инвесторам снижать риски, а компании — повышать оценку (valuation) при переходе к каждому следующему этапу.\n\nТекущий фокус — Раунд 1 (Pre-Seed).\n\nДетализация раундов:\n🟢 Раунд 1: Разработка MVP (Pre-Seed)\n\nСумма: $150,000\n\nЦель: Техническая реализация фундамента продукта.\n\nНа что пойдут средства: Архитектура приложения, дизайн интерфейсов, backend-разработка и выпуск первой рабочей версии (MVP) для iOS/Android.\n\nРезультат: Готовый продукт, готовый к установке первыми пользователями.\n\n🟡 Раунд 2: Market Fit и Тестирование (Seed 1)\n\nСумма: $350,000\n\nЦель: Проверка гипотез на реальном рынке и первые метрики.\n\nНа что пойдут средства: Soft-launch (мягкий запуск), привлечение первых 50 ресторанов, первичный маркетинг, операционные расходы команды.\n\nРезультат: Подтвержденный Product-Market Fit, первые транзакции и активные пользователи.\n\n🔵 Раунд 3: Экосистема и Интеграции (Seed 2 / Bridge)\n\nСумма: $500,000\n\nЦель: Превращение приложения в полноценную платформу.\n\nНа что пойдут средства: Техническая интеграция с сервисами такси, POS-системами ресторанов, доработка AI-алгоритмов персонализации.\n\nРезультат: Полнофункциональный продукт, готовый к массовой нагрузке.\n\n🟣 Раунд 4: Запуск и Масштабирование (Growth)\n\nСумма: $1,000,000\n\nЦель: Агрессивный захват доли рынка и монетизация.\n\nНа что пойдут средства: Масштабные маркетинговые кампании (блогеры, performance), запуск финтех-модуля, выход в новые регионы (США/Европа).\n\nРезультат: Рост базы до KPI (сотни тысяч пользователей), выход на стабильную выручку.\n\nStatus Update: В данный момент мы открыты для предложений по Раунду 1 ($150k) для старта разработки MVP.",
    faq6Question: "Какие гарантии есть у инвесторов?",
    faq6Answer:
      "Мы строим отношения с инвесторами на принципах полной прозрачности и использования международных юридических стандартов.\n\nВаши вложения защищены следующими механизмами:\n\n**1. Юридическая защита (US Law)**\n\nКомпания структурирована в юрисдикции США (Delaware C-Corp) — это золотой стандарт для венчурных инвестиций. Права инвесторов, включая право собственности на доли (Equity) или права по конвертируемым займам (SAFE), защищены законодательством США. Все договоренности фиксируются юридически обязывающими документами.\n\n**2. Интеллектуальная собственность (IP Ownership)**\n\nВсе технологии, код, бренд и клиентская база юридически принадлежат компании, а не отдельным физическим лицам. Это гарантирует, что главный актив, в который вы инвестируете, находится под защитой корпоративной структуры.\n\n**3. Прозрачность и отчетность (Reporting)**\n\nИнвесторы получают регулярные отчеты (Investor Updates) о состоянии бизнеса: финансовые показатели (P&L), продуктовые метрики, статус разработки (Roadmap) и использование средств. Вы всегда будете знать, как работают ваши деньги.\n\n**4. Мотивация основателей (Vesting)**\n\nАкции основателей подчиняются стандартному графику вестинга (Vesting Schedule). Это означает, что фаундеры заинтересованы в долгосрочном развитии проекта и не могут покинуть компанию, сохранив свои доли, на раннем этапе.",
    faq7Question: "Какую потенциальную прибыль можно ожидать?",
    faq7Answer:
      "Инвестируя в ChefNet на ранней стадии (Pre-Seed/Seed), вы получаете доступ к экспоненциальному росту капитализации компании. Наша цель выходит за рамки операционной прибыли: мы фокусируемся на масштабировании стоимости бизнеса.\n\nПотенциал дохода формируется из трех ключевых факторов:\n\n**1. Рост оценки компании (потенциал роста в X раз)**\n\nНа текущем этапе вы приобретаете долю по минимальной оценке. С каждым следующим раундом — за счет интеграций продукта и глобального масштабирования — оценка компании растет.\n\nЦель: Увеличение стоимости компании в 10–20 раз к моменту раунда Series A/B или стратегической сделки.\n\n**2. Прогнозируемый рост доходов**\n\nСогласно нашей финансовой модели, к 2028 году — после глобальной экспансии и полной интеграции финтеха — мы прогнозируем Annual Recurring Revenue (ARR) свыше $100M. Это обеспечивает высокую рентабельность активов и долгосрочную стоимость.\n\n**3. Стратегия выхода**\n\nОсновная прибыль инвестора реализуется при выходе. Мы рассматриваем два сценария ликвидности для ранних инвесторов в горизонте 3–5 лет:\n\n• **Слияния и поглощения (M&A):** Продажа компании крупному игроку индустрии (напр., Uber, DoorDash, Booking или финтех-банковские экосистемы).\n\n• **Вторичный рынок:** Возможность продать свою долю новым инвесторам на последующих раундах финансирования со значительной премией.",
    faq8Question: "Когда планируется выход на IPO?",
    faq8Answer:
      "IPO рассматривается нами как один из возможных сценариев долгосрочного развития, с прогнозируемым горизонтом примерно 5–7 лет.\n\nОднако наша первичная цель — максимизация стоимости компании и обеспечение ликвидности для инвесторов. Поэтому мы развиваем бизнес с учетом двух стратегий выхода:\n\n**Слияния и Поглощения (Стратегическая Сделка):**\n\nПродажа компании глобальному стратегическому игроку (например, экосистемам вроде Uber, Booking, DoorDash или крупным финтех-группам) на горизонте 3–5 лет. Это наиболее вероятный сценарий быстрого выхода, обеспечивающий высокую доходность инвестиций с привлекательным мультипликатором оценки.\n\n**IPO (Публичное Размещение):**\n\nВыход на биржу при достижении оценки свыше $1 млрд и стабильных международных доходов, что позволит создать независимую компанию глобального масштаба.",
    faq9Question: "Какие технологии используются в ChefNet?",
    faq9Answer:
      "ChefNet строится на базе современной микросервисной архитектуры (Cloud-Native), что обеспечивает гибкость, безопасность финансовых транзакций и возможность быстрого внедрения AI-функций.\n\nНаш технологический стек:\n\n1. Mobile & Frontend (Кроссплатформенность)\n\nМы используем Flutter или React Native.\n\nЗачем:\n\nЭто позволяет иметь единую кодовую базу для iOS и Android. Это ускоряет разработку на 40% и снижает затраты на поддержку, сохраняя высокую производительность и нативный пользовательский опыт.\n\n2. Backend & API (Серверная часть)\n\nОсновной язык: Python (FastAPI / Django) или Node.js.\n\nЗачем:\n\nPython идеален для интеграции AI-модулей и обработки данных. Микросервисная архитектура позволяет легко подключать новые вертикали (например, финтех-модуль или ивенты), не переписывая все приложение.\n\n3. Artificial Intelligence (AI & Data)\n\nLLM Integration:\n\nИнтеграция с передовыми моделями (OpenAI GPT-4 / Anthropic) для работы AI-консьержа.\n\nRecommendation Engine:\n\nСобственные алгоритмы машинного обучения для персонализации выдачи ресторанов на основе истории заказов.\n\n4. Fintech & Security (Безопасность)\n\nПлатежи:\n\nИнтеграция через Stripe Connect или Adyen (стандарт для маркетплейсов).\n\nБезопасность:\n\nСоответствие стандарту PCI DSS (защита платежных данных) и использование шифрования SSL/TLS для всех передаваемых данных.\n\n5. Infrastructure (Инфраструктура)\n\nCloud:\n\nХостинг на AWS (Amazon Web Services) или Google Cloud.\n\nScalability:\n\nИспользование Docker и Kubernetes для автоматического масштабирования при резком росте трафика.",
    faq10Question:
      "Чем ChefNet отличается от конкурентов вроде Yelp, OpenTable, Grubhub?",
    faq10Answer:
      "Существующие игроки решают только одну узкую задачу: Yelp — это просто справочник, OpenTable — утилита для брони, Grubhub — курьерская служба. ChefNet объединяет весь путь гостя (Customer Journey) — от идеи «куда пойти» до оплаты счета, устраняя разрывы в пользовательском опыте.\n\nНаши 5 ключевых преимуществ:\n\n1. AI-Консьерж вместо поиска по фильтрам (vs Yelp/TripAdvisor)\n\nУ них: Пользователь тратит часы, листая списки отзывов и настраивая фильтры, чтобы найти подходящее место.\n\nУ нас: Hyper-personalization. AI-ассистент знает вкусы пользователя и предлагает идеальный вариант за секунды (как если бы вы спросили друга-гурмана), учитывая настроение, бюджет и историю посещений.\n\n2. Бесшовный финтех: Оплата и разделение счета (vs OpenTable)\n\nУ них: Приложение полезно только до момента бронирования. В конце ужина гость все равно ждет официанта, терминал и мучается с разделением чека.\n\nУ нас: Pay-at-Table. Полный цикл внутри приложения: забронировал — заказал — оплатил — разделил счет с друзьями в один клик. Нет ожидания счета = выше оборачиваемость столов для ресторана.\n\n3. Социальная механика (vs Grubhub/UberEats)\n\nУ них: Одиночный опыт потребления (доставка еды).\n\nУ нас: Social Dining. Инструменты для совместного планирования: приглашение друзей, голосование за ресторан и покупка билетов на гастро-ивенты. Мы возвращаем еде социальный статус.\n\n4. Честная модель монетизации для ресторанов\n\nУ них: Хищнические комиссии (до 30% за доставку) или плата за каждого приведенного гостя, даже если он постоянный.\n\nУ нас: SaaS + Fintech. Мы даем ресторанам инструменты CRM и аналитики по подписке, зарабатывая основную маржу на финансовых транзакциях, а не «душим» бизнес комиссиями.\n\n5. Социальная кулинарная сеть и «Живые» отзывы (vs TripAdvisor)\n\nУ них: Скучные текстовые «простыни», часто написанные ботами или анонимами. Фотографии еды часто старые или слишком «отфотошопленные», не отражающие реальность.\n\nУ нас: Видео-контент и Доверие. Мы внедрили формат видео-отзывов (Stories/Reels) прямо в карточки ресторанов. Гости делятся реальной атмосферой и видом блюд без фильтров. Вы можете подписаться на друзей или фуд-блогеров, чтобы видеть их ленту рекомендаций, превращая выбор ресторана из рутины в развлечение.",
    contactTitle: "Questions?",
    contactSubtitle: "Here to help",
    contactButton: "Contact",
    footerTagline: "Ваш проводник в мир ресторанных инноваций",
    footerContacts: "Контакты",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Новости",
    footerNewsletterDesc:
      "Будьте в курсе последних новостей и предложений",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Подписаться",
    footerPrivacyPolicy: "Политика конфиденциальности",
    footerCopyright: "© 2026 ChefNet LLC Все права защищены",
    partnersOpportunitiesTitle: "Opportunities",
    opportunityCard1Title: "Dashboard",
    opportunityCard1Desc: "Track shares",
    opportunityCard2Title: "AI Companion",
    opportunityCard2Desc: "Publishes news",
    opportunityCard3Title: "Referral",
    opportunityCard3Desc: "Increase stake",
    opportunityCard4Title: "Extended",
    opportunityCard4Desc: "Additional opportunities",
    opportunityCard5Title: "Fundraising",
    opportunityCard5Desc: "Early rounds",
    opportunityCard6Title: "Legal",
    opportunityCard6Desc: "Delaware, USA",

    // Partners Section
    partnersTitle: "Возможности для партнеров",
    partner1Title: "Станьте совладельцем компании",
    partner1Desc:
      "Присоединяйтесь на этапе становления — доли ChefNet конвертируются в акции компании при выходе на IPO.",
    partner2Title: "Партнёрская программа",
    partner2Desc:
      "Классическая модель, которая позволяет увеличить долю, приглашая новых партнеров на этапе сбора средств.\nБольше участия — больше долей. Всё прозрачно и просто.",
    partner3Title: "Раунды финансирования",
    partner3Desc:
      "С каждым этапом развития ChefNet ценность долей увеличивается.",
    partner4Title: "Персональный кабинет партнера",
    partner4Desc:
      "Учёт купленных и начисленных в рамках партнёрской программы долей.",
    partner5Title: "AI - Компаньон",
    partner5Desc:
      "публикует новости компании и мировых трендов ресторанного бизнеса, а также отвечает на ваши вопросы и выполняет заявки.",
    partner6Title: "Расширенная реферальная программа",
    partner6Desc:
      "После запуска приложения у вас появятся дополнительные возможности для монетизации вашей существующей сети, а также вознаграждения за привлечение новых пользователей и ресторанов,\nи за ваш вклад в развитие экосистемы.",
    partner7Title: "Фандрайзинг",
    partner7Desc:
      "Участие в ранних раундах финансирования даёт больше возможностей приобрести долю по наиболее выгодной цене и получить акции выше после выхода компании на IPO.",
    partner8Title: "Строгая законодательная база",
    partner8Desc:
      "Регистрация компании в США, штат Делавэр, подтверждает серьёзность намерений и обеспечивает прозрачную, юридическую и финансовую отчётность в соответствии с американскими стандартами.",

    // Why ChefNet Section
    whyChefNetTitle: "Почему ChefNet?",
    whyCard1Title: "ChefNet — экосистема нового поколения",
    whyCard1Desc:
      "Мы соединяем пользователей и бизнес на базе AI, делая гастрономию умной и удобной.",
    whyCard2Title: "Кулинарная социальная сеть",
    whyCard2Desc:
      "Контент от пользователей и шефов: фото, видео, обзоры, рецепты.\nПрямые эфиры и мастер-классы от лучших шефов.",
    whyCard3Title: "Платформа ChefNet",
    whyCard3Desc:
      "Платформа, где страсть к кулинарии соединяется с технологиями.",
    whyCard4Title: "Технологии, которые работают на рестораны",
    whyCard4Line1: "Умные интерфейсы увеличивают средний чек.",
    whyCard4Line2:
      "AI сокращает затраты и улучшает прогнозирование.",
    whyCard4Line3:
      "ChefNet помогает ресторанам зарабатывать больше без лишних усилий.",
    whyCard5Title: "Помощь ресторанам — часть миссии ChefNet",
    whyCard5Line1:
      "От привлечения гостей до привлечения финансирования при обновлении, модернизации или открытии нового заведения, а также маркетинговая поддержка, чтобы о заведении узнали те, кому оно понравится.",
    whyCard5Line2:
      "ChefNet — сервис, который помогает ресторанам не просто работать, но расти и развиваться.",
    whyCard6Title: "Персонализация через AI-компаньона",
    whyCard6Line1:
      "Рекомендации под ваши вкусы, настроение и обстоятельства.\nМгновенное бронирование и готовый маршрут.",
    whyCard6Line2:
      "Динамические меню, голосовые сценарии и адаптивные рекомендации — всё, чтобы выбор был действительно легким.",
  },

  de: {
    // Navigation
    features: "Besonderheit",
    aboutUs: "Möglichkeiten",
    forPartners: "Für partner",
    referralProgramme: "Entwicklungsphasen",
    stagesOfDevelopment: "Entwicklungsphasen",
    whyChefNet: "Warum ChefNet?",
    roadmap: "Roadmap",
    faq: "FAQ",
    team: "Team",
    contacts: "Kontakte",
    logIn: "Anmelden",
    signIn: "Registrieren",

    // Hero Section
    heroTitle1: "Intelligenz, die Auswahl in Wert",
    heroTitle2: "verwandelt.",
    heroTitle3: "Intelligenz,",
    heroTitle4: "die Auswahl in Wert verwandelt.",
    heroSubtitle: "ChefNet ist eine KI-basierte Technologie,",
    heroDescription:
      "die Ihren Rhythmus erfasst, Ihren Geschmack speichert und Ihnen täglich Zeit und Geld spart - jeden Tag.",
    heroBenefit1: "Restaurants gewinnen neue Gäste.",
    heroBenefit2:
      "Gäste erhalten präzise, personalisierte Empfehlungen.",
    heroBenefit3:
      "Partner profitieren von transparentem Wachstum und einem dynamischen Markt.",
    heroCta:
      "Jetzt ist Ihre Chance, Teil dieser Bewegung zu werden.",
    getStarted: "Get Started",

    opportunitiesTitle: "Opportunities",
    opportunity1Title: "ChefNet",
    opportunity1Desc: "Your chance",
    opportunity2Title: "ChefNet",
    opportunity2Desc: "Our turn",
    opportunity3Title: "ChefNet",
    opportunity3Desc: "Revolution",
    believeTitle: "Unsere Philosophie",
    believeSubtitle:
      "Einfachheit mit einem Fingertipp. Präzision – ganz im Stil von ChefNet.",
    believeDesc1:
      "Wir entwickeln einen Service, der die Wahl einer Lokation so einfach macht wie die Bestellung eines Taxis.\nUnser Ziel ist es, Millionen Menschen Zeit zu sparen und ihnen ein bestmögliches Erlebnis zu bieten.",
    believeDesc2:
      "Hochmoderne Technologie arbeitet für den Menschen — schnell, präzise und ohne unnötige Schritte.\nChefNet zeigt nicht die am stärksten beworbenen, sondern die wirklich besten Orte —\ndank ehrlicher, authentischer und verifizierter Bewertungen.",
    believeDesc3: "",
    chefnetAppTitle1: "Möglichkeiten mit ChefNet ",
    chefnetAppTitle2: "Invest",
    chefnetAppTitle3: "",
    chefnetAppOpportunity1Title: "ChefNet",
    chefnetAppOpportunity1Subtitle:
      " — Ihr Einstieg in einen neuen Trend.",
    chefnetAppOpportunity1Desc:
      "ChefNet Invest - ist Ihre Chance, an der Entstehung eines globalen Trends und Technologie-Giganten teilzuhaben, wie es ihn heute noch nicht gibt.",
    chefnetAppOpportunity1DescPart1: "ChefNet ",
    chefnetAppOpportunity1DescPart2: "Invest",
    chefnetAppOpportunity1DescPart3:
      " - ist Ihre Chance, an der Entstehung eines globalen Trends und Technologie-Giganten teilzuhaben, wie es ihn heute noch nicht gibt.",
    chefnetAppOpportunity2Title: "ChefNet",
    chefnetAppOpportunity2Subtitle:
      " — jetzt sind wir an der Reihe.",
    chefnetAppOpportunity2Desc:
      "Booking, Uber, Airbnb, Amazon gab es früher auch nicht. Heute kennt sie die ganze Welt. Der nächste Name auf dieser Liste - ChefNet!!!",
    chefnetAppOpportunity2DescPart1:
      "Booking, Uber, Airbnb, Amazon gab es früher auch nicht. Heute kennt sie die ganze Welt. Der nächste Name auf dieser Liste - ",
    chefnetAppOpportunity2DescPart2: "ChefNet",
    chefnetAppOpportunity2DescPart3: "!!!",
    chefnetAppOpportunity3Title: "ChefNet",
    chefnetAppOpportunity3Subtitle:
      " — der neue Standard in FoodTech.",
    chefnetAppOpportunity3Desc:
      "ChefNet ist eine Revolution in der Welt der Food-Apps – eine Idee, deren Zeit gekommen ist.",
    chefnetAppOpportunity3DescPart1: "",
    chefnetAppOpportunity3DescPart2: "ChefNet",
    chefnetAppOpportunity3DescPart3:
      " ist eine Revolution in der Welt der Food-Apps – eine Idee, deren Zeit gekommen ist.",
    uniqueFeaturesTitle: "Die einzigartigen funktionen von",
    uniqueFeaturesChefNet: "ChefNet",
    feature1Title: "Ihr persönlicher KI-Begleiter",
    feature1Desc:
      "Angetrieben von Super-Intelligenz: Sie versteht Ihren Geschmack, wählt die besten Optionen aus und begleitet Sie nahtlos vom Auswahl bis zur Zahlung. Ihr KI-Begleiter weiß, was Sie lieben, reserviert Ihren Tisch im Voraus und spart Ihnen täglich Zeit.",
    feature2Title: "Intuitive Suche",
    feature2Desc:
      "Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen – schnell und präzise. Interaktive Karte mit intelligenten Filtern: Küche, Bewertung, Preis. Immer aktuelle Ergebnisse – in Echtzeit.",
    feature3Title: "Flexibilität in der Nutzung",
    feature3Desc:
      "Das System funktioniert in zwei Modi: visuelle Auswahl anhand von Bildern oder Sprachsteuerung über Ihren KI-Begleiter. Sie wählen – die KI erledigt den Rest.",
    feature4Title: "Klarheit und Details",
    feature4Desc:
      "Interaktives Menü in Foto- und Videoformat mit Zutaten und Kalorieninformationen. Bestellen Sie Ihr Mahlzeit im Voraus und haben Sie sie bereit, sobald Sie es sofort bei Ankunft serviert – ideal, wenn Sie es eilig haben.",
    feature5Title: "Einzigartiges Kundenbewertungssystem",
    feature5Desc:
      "ChefNet definiert Bewertungen neu: nicht nur ⭐-Sterne, sondern echte Emotionen. Audio und Video Format machen das Feedback persönlich, während Bewertungen zu Speisen, Service und Atmosphäre echte Verlässlichkeit schaffen.",
    feature6Title: "Verdienen Sie mit Ihrer Aktivität",
    feature6Desc:
      "Verdienen Sie nicht nur Punkte – sondern echtes Geld für Ihre Aktivität.",
    feature7Title: "Alles-in-einer-App",
    feature7Desc:
      "Eine einheitliche globale Plattform: von Cafés und Bars bis zu Premium-Restaurants und privaten Köchen.",
    feature8Title:
      "Ein KI-Begleiter - der Ihr kulinarisches Erlebnis einfach und nahtlos gestaltet",
    feature8Desc:
      "Ihr Begleiter findet den perfekten Ort, reserviert Ihren Tisch, plant Ihre Route und erinnert Sie, wenn es Zeit zu gehen. Restaurant mit Freunden besucht? Er wird sie einladen und sich persönlich bei jedem von ihnen melden!",
    feature9Title:
      "Unterstützung und Entwicklung von Restaurants",
    feature9Desc:
      "ChefNet begleitet gastronomische Betriebe beim Wachstum – von der Idee bis zur Skalierung. KI-gestützte Analysen bewerten Kennzahlen und liefern konkrete Optimierungsvorschläge. Zugang zu Kapital privater Investoren sowie kulinarisch ausgerichteter Fonds und Teilnahme an den Investmentprogrammen der ChefNet-Community.",
    advantagesTitle: "Advantages",
    advantagesSubtitle: "Why invest",
    advantage1Title: "Innovation",
    advantage1Desc: "Advanced",
    advantage2Title: "Growth",
    advantage2Desc: "Rapid",
    advantage3Title: "Team",
    advantage3Desc: "Expert",
    advantage4Title: "Returns",
    advantage4Desc: "High",
    competitiveTitle: "Advantage",
    traditional: "Traditional",
    competitors: "Competitors",
    chefnet: "ChefNet",
    avgReturn: "Returns",
    partnershipTitle: "Partnership",
    partnershipSubtitle: "Rewards",
    partnershipCard1Title: "Partner",
    partnershipCard1Desc: "Become partner",
    partnershipCard2Title: "Program",
    partnershipCard2Desc1: "Classic model",
    partnershipCard2Desc2: "More shares",
    partnershipCard3Title: "Rounds",
    partnershipCard3Desc: "Value grows",
    you: "You",
    startNetwork: "Start network",
    level: "Level",
    level1Reward: "5%",
    level1Desc: "5% reward",
    level2Reward: "2%",
    level2Desc: "2% reward",
    level3Reward: "1%",
    level3Desc: "1% reward",
    howItWorks: "How it works",
    step1Title: "Share",
    step1Desc: "Unique link",
    step2Title: "Friends invest",
    step2Desc: "Earn commission",
    step3Title: "Grow",
    step3Desc: "Build network",
    roadmapTitle: "Roadmap",
    roadmapSubtitle:
      "Verfolgen Sie unseren Aufstieg vom Startup zum Branchenführer",
    period1Title: "Q1 2026",
    period1Desc: "MVP",
    period1KPI: "",
    period2Title: "Q2 2026",
    period2Desc: "Launch",
    period2KPI: "",
    period3Title: "Q3 2026",
    period3Desc: "Product",
    period3KPI: "",
    period4Title: "Q4 2026",
    period4Desc: "Preparation",
    period4KPI: "",
    period5Title: "Q1 2027",
    period5Desc: "Ecosystem",
    period5KPI: "",
    period6Title: "Q2 2027",
    period6Desc: "Marketing",
    period6KPI: "",
    period7Title: "Q3 2027",
    period7Desc: "Growth",
    period7KPI: "",
    period8Title: "Q4 2027",
    period8Desc: "Social",
    period8KPI: "",
    period9Title: "2028+",
    period9Desc: "AI & FinTech",
    period9KPI: "",
    completed: "Abgeschlossen",
    active: "Aktiv",
    upcoming: "Bevorstehend",
    investmentsTitle: "Entwicklungsphasen",
    seedRound: "Seed",
    seriesA: "Series A",
    seriesB: "Series B",
    seriesC: "Series C",
    pricePerShare: "Price",
    minInvestment: "Minimum",
    soldOut: "Sold Out",
    activeRound: "Active",
    comingSoon: "Coming Soon",
    shares: "shares",
    investNow: "Invest Now",
    seedBackTitle: "Entwicklung der App MVP",
    seedBackDesc:
      "Werben von Nutzern\nVerhandlungen mit Restaurants\nEinstellung von Ländermanagern\nKPI: 10K Nutzer",
    privateBackTitle: "Test des MVP",
    privateBackDesc:
      "Test des MVP in Schlüsselstädten in den USA und Europa\nPartnerschaften mit Gastronomieveränden und lokalen Restaurantketten\nVerbesserung der Personalisierungsalgorithmen und KI-basierten Empfehlungen\nKPI: 100.000 Nutzer, 500 Restaurants",
    marketingBackTitle: "Integration mit Ride-Sharing-Diensten",
    marketingBackDesc:
      "Integration mit Ride-Sharing-Diensten (Uber, Lyft, Bolt)\nLaunch der voll ausgestatteten ChefNet-App\nAusbau des Fintech-Moduls (Zahlungen, Cashback, ChefNet Token)\nUmfangreiche Kooperationen mit Kreatoren und Medienpartnern in den USA und der EU\nKPI: 1 Mio. Nutzer, 5.000 Restaurants, 1 Mio. USD Gewinn",
    publicBackTitle:
      "Expansion nach Asien, Lateinamerika und in den Nahen Osten",
    publicBackDesc:
      "Skalierung zu einer globalen SuperApp\nGründung einer DAO-Community und Einführung von NFT-Programmen für Restaurants\nVorbereitung auf einen Börsengang mit einer Bewertung von 3–5 Mrd. USD\nKPI: 30 Mio. Nutzer, 50.000 Restaurants, über 100 Mio. USD Gewinn",
    ctaBannerTitle: "Die Zukunft der Restaurants beginnt hier.",
    ctaBannerHighlight: "Tritt ",
    ctaBannerHighlightBrand: "ChefNet",
    ctaBannerSuffix: " bei.",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: "Questions",
    faq1Question:
      "Was ist ChefNet und welches Problem löst das Projekt?",
    faq1Answer:
      "ChefNet ist eine globale FoodTech-Plattform, die Entdeckung, Buchung, Zahlungsabwicklung und Interaktion mit Restaurants sowie privaten Köchen in einem einheitlichen Ökosystem vereint.\n\nSie löst die Zersplitterung des Gastronomie-Ökosystems durch die Etablierung eines durchgängigen, nahtlosen Standards.",
    faq2Question:
      "Wie funktioniert das Geschäftsmodell von ChefNet?",
    faq2Answer:
      "Wir betreiben ein hybrides Geschäftsmodell aus Marketplace, SaaS und Fintech – mit diversifizierten Einnahmequellen über vier Kanäle:\n\n• **Transaktionsgebühren:** Prozentuale Beteiligung an Buchungen, Vorbestellungen von Speisen sowie Event-Ticketverkäufen.\n\n• **Abonnements (B2B SaaS):** Monatliche Gebühren, die von Restaurants für den Zugriff auf CRM-Systeme, KI-gestützte Analysen und Marketingtools gezahlt werden.\n\n• **Fintech (Zahlungsabwicklung):** Transaktionsgebühren aus In-App-Zahlungen und Funktionen zur Rechnungsteilung.\n\n• **Werbung:** Bezahlte Promotion von Restaurants innerhalb der App – sowohl in der Entdeckungsansicht als auch in den Suchergebnissen.",
    faq3Question:
      "In welcher Entwicklungsphase befindet sich das Projekt aktuell?",
    faq3Answer:
      "Das Projekt hat seine Pre-Seed-Runde erfolgreich abgeschlossen. Derzeit befinden wir uns in einer aktiven Fundraising-Phase, um die Entwicklung und den Launch des MVP zu finanzieren.",
    faq4Question:
      "Wo ist das Unternehmen registriert und welche Rechtsform hat es?",
    faq4Answer:
      "Die ChefNet LLC ist im US-Bundesstaat Delaware registriert — dem führenden Rechtsstandort der Vereinigten Staaten für internationale Investitionen.",
    faq5Question:
      "Struktur der Investitionsrunde und Beteiligungsbedingungen?",
    faq5Answer:
      "Um ChefNets globale Strategie umzusetzen, haben wir einen schrittweisen Fundraising-Prozess mit einem Gesamtziel von 2.000.000 USD geplant. Die Finanzierung ist in vier Schlüsselrunden (Tranchen) strukturiert. Dieser Ansatz ermöglicht Investoren eine Risikominimierung, während das Unternehmen in jeder nachfolgenden Phase seine Bewertung steigern kann.\n\nAktueller Fokus — Runde 1 (Pre-Seed).\n\nDetaillierte Rundenbeschreibung:\n🟢 Runde 1: MVP-Entwicklung (Pre-Seed)\n\nBetrag: 150.000 USD\n\nZiel: Technische Grundlage des Produkts aufbauen.\n\nMittelverwendung: Anwendungsarchitektur, UI/UX-Design, Backend-Entwicklung sowie Veröffentlichung der ersten funktionalen Version (MVP) für iOS und Android.\n\nErgebnis: Ein produktionsreifes Produkt für Early-User verfügbar.\n\n🟡 Runde 2: Marktvalidierung (Seed 1)\n\nBetrag: 350.000 USD\n\nZiel: Validierung der Kernhypothesen im Live-Markt und Generierung erster Kennzahlen.\n\nMittelverwendung: Soft Launch, Onboarding der ersten 50 Restaurant-Partner, initiale Marketingmaßnahmen sowie Betriebskosten des Kern-Teams.\n\nErgebnis: Nachgewiesene Produkt-Markt-Passung, erste Transaktionen und aktive Nutzer.\n\n🔵 Runde 3: Ökosystem & Integrationen (Seed 2 / Bridge)\n\nBetrag: 500.000 USD\n\nZiel: Weiterentwicklung der App zu einer vollständigen Plattform.\n\nMittelverwendung: Technische Integrationen mit Ride-Hailing-Diensten, Restaurant-POS-Systemen sowie Weiterentwicklung KI-gestützter Personalisierungsalgorithmen.\n\nErgebnis: Eine voll funktionsfähige Plattform zur Unterstützung massiver Adaption.\n\n🟣 Runde 4: Launch & Skalierung (Growth)\n\nBetrag: 1.000.000 USD\n\nZiel: Aggressive Marktdurchdringung und Monetarisierung.\n\nMittelverwendung: Großflächige Marketingkampagnen (Influencer, Performance-Marketing), Launch des Fintech-Moduls sowie Expansion in neue Regionen (USA und Europa).\n\nErgebnis: Nutzerbasis auf KPI-Niveau (hunderttausende Nutzer) und Erreichung stabiler wiederkehrender Einnahmen.\n\nStatus Update: Wir sind aktuell offen für Angebote zur Runde 1 (150.000 USD) zur Initiierung der MVP-Entwicklung.",
    faq6Question:
      "Welche Sicherheiten werden Investoren gewährt?",
    faq6Answer:
      "Wir gestalten Investorenbeziehungen auf Basis absoluter Transparenz und strikter Einhaltung international anerkannter Rechtsstandards.\n\nIhre Investition wird durch folgende Schutzmechanismen gesichert:\n\n**1. Rechtlicher Schutz (US-Recht)**\n\nDas Unternehmen ist unter US-Gerichtsbarkeit als Delaware C-Corporation strukturiert – der international anerkannte Goldstandard für Venture-Capital-Investitionen. Investorenrechte, einschließlich Eigenkapitalbeteiligungen und Ansprüche aus wandelbaren Instrumenten (SAFE), werden durch US-Recht geschützt. Alle Vereinbarungen werden in rechtsverbindlichen Verträgen fixiert.\n\n**2. Schutz des geistigen Eigentums (IP-Eigentum)**\n\nSämtliche Technologien, Quellcodes, Markenassets und die Kundenbasis sind rechtlich im Besitz der Gesellschaft – nicht einzelner Gründer oder Mitwirkender. Dies gewährleistet, dass der Kernwert Ihrer Investition vollständig innerhalb der Unternehmensstruktur geschützt ist.\n\n**3. Transparenz und Berichterstattung**\n\nInvestoren erhalten regelmäßige Updates zur Unternehmensperformance, einschließlich Finanzberichten (GuV), Produktkennzahlen, Entwicklungsroadmap-Status und Mittelverwendung. Sie behalten stets vollständige Transparenz darüber, wie Ihr Kapital eingesetzt wird.\n\n**4. Gründeranreize (Vesting)**\n\nGründerbeteiligungen unterliegen einem standardisierten Vesting-Zeitplan. Dies aligniert die Interessen der Gründer mit dem langfristigen Unternehmenserfolg und verhindert vorzeitiges Ausscheiden bei gleichzeitiger Sicherung der frühen Eigentumsposition.",
    faq7Question:
      "Mit welcher Höhe der potenziellen Rendite ist zu rechnen?",
    faq7Answer:
      "Eine Investition in ChefNet in der Frühphase (Pre-Seed/Seed) ermöglicht Beteiligung am exponentiellen Wachstum der Unternehmensbewertung. Unser Ziel geht über operativen Gewinn hinaus – wir fokussieren uns auf die Skalierung des Unternehmenswerts.\n\nDie Renditechancen werden durch drei Schlüsselfaktoren getrieben:\n\n**1. Unternehmensbewertungs-Wachstum (X-faches Wertsteigerungspotenzial)**\n\nIn der aktuellen Phase erwerben Investoren Eigenkapital zum niedrigsten Bewertungsniveau. Mit jeder Folgerunde – getrieben durch Produktintegrationen und globale Skalierung – steigt die Unternehmensbewertung.\n\nZiel: 10–20-fache Steigerung des Unternehmenswerts bis zur Series A/B-Runde oder einer strategischen Übernahme.\n\n**2. Projiziertes Umsatzwachstum**\n\nLaut unserem Finanzmodell erwarten wir bis 2028 – nach globaler Markterschließung und vollständiger Fintech-Integration – einen Jährlich Wiederkehrenden Umsatz (ARR) von über 100 Mio. USD. Dies bildet die Grundlage für starke Vermögensrentabilität und langfristigen Wert.\n\n**3. Exit-Strategie**\n\nInvestorenrenditen realisieren sich primär beim Exit. Für Early-Stage-Investoren sehen wir innerhalb eines 3–5-Jahres-Horizonts zwei Liquiditätsszenarien vor:\n\n• **Fusionen & Übernahmen (M&A):** Verkauf des Unternehmens an einen globalen Branchenplayer (z.B. Uber, DoorDash, Booking oder Fintech-Banking-Ökosysteme).\n\n• **Sekundärmarkt:** Möglichkeit, Anteile in späteren Finanzierungsrunden mit erheblichem Aufschlag an neue Investoren zu veräußern.",
    faq8Question: "Wann ist der Börsengang geplant?",
    faq8Answer:
      "Wir betrachten einen Börsengang (IPO) als eines der möglichen langfristigen Entwicklungsszenarien, mit einem prognostizierten Zeithorizont von etwa 5–7 Jahren.\n\nUnser primäres Ziel ist jedoch die Maximierung der Unternehmensbewertung und die Sicherstellung der Liquidität für Investoren. Entsprechend entwickeln wir das Geschäftsmodell mit zwei Exit-Strategien:\n\n**Fusionen & Übernahmen (Strategische Übernahme):**\n\nVerkauf des Unternehmens an einen globalen strategischen Player (z.B. Ökosysteme wie Uber, Booking, DoorDash oder führende Fintech-Konzerne) innerhalb eines 3–5-jährigen Horizonts. Dies ist das wahrscheinlichste Szenario für einen schnellen Exit, das eine hohe Kapitalrendite bei einem attraktiven Bewertungsmultiplikator bietet.\n\n**IPO (Börsengang):**\n\nÖffentliche Notierung nach Erreichen einer Bewertung von über 1 Mrd. USD und stabiler internationaler Umsätze, um ein unabhängiges, global agierendes Unternehmen zu etablieren.",
    faq9Question: "Welche Technologien setzt ChefNet ein?",
    faq9Answer:
      "ChefNet basiert auf einer modernen, cloud-nativen Microservices-Architektur – für maximale Flexibilität, sichere Finanztransaktionen und die schnelle Bereitstellung KI-gestützter Funktionen.\n\nUnser Technologiestack:\n\n1. Mobile & Frontend (Plattformübergreifend)\n\nEinsatz von Flutter oder React Native.\n\nWarum:\n\nEinheitlicher Codebase für iOS und Android ermöglicht eine bis zu 40 % schnellere Entwicklung, reduziert Wartungskosten und gewährleistet gleichzeitig hohe Performance und ein authentisches nativ-App-Erlebnis.\n\n2. Backend & API (Server-seitig)\n\nPrimärsprachen: Python (FastAPI / Django) oder Node.js.\n\nWarum:\n\nPython ist ideal für KI-Integration und Datenverarbeitung. Eine Microservices-Architektur ermöglicht die nahtlose Ergänzung neuer Geschäftsbereiche – wie Fintech-Module oder Event-Management – ohne die komplette Plattform neu zu entwickeln.\n\n3. Künstliche Intelligenz (KI & Daten)\n\nLLM-Integration:\n\nAnbindung an führende Large Language Models (OpenAI GPT-4 / Anthropic) für den KI-Concierge.\n\nEmpfehlungssystem:\n\nProprietäre Machine-Learning-Algorithmen personalisieren die Restaurantempfehlungen basierend auf Nutzerverhalten und Bestellhistorie.\n\n4. Fintech & Sicherheit\n\nZahlungsabwicklung:\n\nIntegration via Stripe Connect oder Adyen (Branchenstandard für Marktplätze).\n\nSicherheit:\n\nVollständige PCI DSS-Konformität zum Schutz von Zahlungsdaten sowie Ende-zu-Ende-SSL/TLS-Verschlüsselung sämtlicher übertragener Daten.\n\n5. Infrastruktur\n\nCloud:\n\nHosting auf AWS (Amazon Web Services) oder Google Cloud.\n\nSkalierbarkeit:\n\nEinsatz von Docker und Kubernetes zur automatischen Lastverteilung bei Traffic-Spitzen.",
    faq10Question:
      "Was unterscheidet ChefNet grundlegend von Wettbewerbern wie Yelp, OpenTable und Grubhub?",
    faq10Answer:
      'ChefNet vereint das gesamte Gästerlebnis – von der ersten Idee bis zur Zahlung.\n\nBestehende Anbieter lösen jeweils nur ein eng begrenztes Problem: Yelp ist ein Verzeichnis, OpenTable ein Reservierungstool, Grubhub ein Lieferservice. ChefNet beseitigt Reibungsverluste entlang der gesamten Gästereise – vom "Wohin gehen?" zum Bezahlen – und schließt Lücken im Nutzererlebnis.\n\nUnsere 5 Kernvorteile:\n\n1. KI-Concierge statt Filter-Suche (vs. Yelp/TripAdvisor)\n\nKonkurrenz: Nutzer stundenlanges Scrollen durch Bewertungen und Filter-Tuning.\n\nWir: Hyperpersonalisierung. Der KI-Assistent erkennt Vorlieben, Stimmung und Budget – liefert in Sekunden die perfekte Empfehlung, als frage man einen Feinschmecker-Freund.\n\n2. Nahtloses Fintech: Bezahlen & Rechnungsteilung (vs. OpenTable)\n\nKonkurrenz: App-Nutzen endet bei der Reservierung; am Tisch warten Gäste auf Kellner und Karte.\n\nWir: Pay-at-Table. Durchgängiger Flow: Reservieren → Bestellen → Bezahlen → Rechnung per Fingertipp teilen. Höhere Tischumsätze durch kürzere Verweildauer.\n\n3. Sozialer Dining-Ansatz (vs. Grubhub/Uber Eats)\n\nKonkurrenz: Isoliertes Lieferservice-Erlebnis.\n\nWir: Gemeinschaft statt Einsamkeit. Tools zum gemeinsamen Planen: Restaurant-Voting, Event-Tickets kaufen, Freunde einladen – wir beleben das gesellschaftliche Essen neu.\n\n4. Faires Monetarisierungsmodell\n\nKonkurrenz: Wucherprovisionen (bis 30% bei Lieferungen), Gebühren selbst für Stammgäste.\n\nWir: SaaS + Fintech. CRM/Analytics-Tools per Abonnement; Margen aus Transaktionen – nicht durch Auspressen von Partnern.\n\n5. Lebendige Bewertungskultur (vs. TripAdvisor)\n\nKonkurrenz: Textlastige, oft manipulierte Bewertungen; überbearbeitete Fotos.\n\nWir: Echtheit durch Video. Kurzvideos (Stories/Reels) zeigen authentische Atmosphäre und Gerichte – ohne Filter. Empfehlungs-Feeds von Freunden oder Food-Bloggern machen die Suche zum Entertainment.',
    contactTitle: "Questions?",
    contactSubtitle: "Here to help",
    contactButton: "Contact",
    footerTagline:
      "Ihr Wegweiser in die Welt der gastronomischen Innovation",
    footerContacts: "Kontakte",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Nachrichten",
    footerNewsletterDesc:
      "Bleiben Sie mit den neuesten Nachrichten und Angeboten stets bestens informiert.",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Abonnieren",
    footerPrivacyPolicy: "Datenschutzrichtlinie",
    footerCopyright:
      "© 2026 ChefNet LLC. Alle Rechte vorbehalten.",
    partnersOpportunitiesTitle: "Opportunities",
    opportunityCard1Title: "Dashboard",
    opportunityCard1Desc: "Track shares",
    opportunityCard2Title: "AI Companion",
    opportunityCard2Desc: "Publishes news",
    opportunityCard3Title: "Referral",
    opportunityCard3Desc: "Increase stake",
    opportunityCard4Title: "Extended",
    opportunityCard4Desc: "Additional opportunities",
    opportunityCard5Title: "Fundraising",
    opportunityCard5Desc: "Early rounds",
    opportunityCard6Title: "Legal",
    opportunityCard6Desc: "Delaware, USA",

    // Partners Section
    partnersTitle: "Möglichkeiten  für Partner",
    partner1Title: "Werden Sie Mitinhaber des Unternehmens",
    partner1Desc:
      "Steigen Sie in der Gründungsphase ein, damit Ihre ChefNet-Anteile beim Börsengang in Unternehmensaktien umgewandelt werden.",
    partner2Title: "Partnerprogramm",
    partner2Desc:
      "Ein klassisches Modell, mit dem Sie Ihren Anteil erhöhen können, indem Sie während der Fundraising-Phase neue Partner werben.\\nJe mehr Sie investieren – desto größer Ihr Anteil. Alles transparent und einfach.",
    partner3Title: "Finanzierungsrunden",
    partner3Desc:
      "Mit jeder Wachstumsphase von ChefNet steigt der Wert Ihrer Anteile.",
    partner4Title: "Partner-Dashboard",
    partner4Desc:
      "Verfolgen Sie erworbene und verdiente Anteile innerhalb des Partnerprogramms.",
    partner5Title: "KI-Begleiter",
    partner5Desc:
      "veröffentlicht Unternehmensnachrichten und globale Trends der Gastronomiebranche, beantwortet Ihre Fragen und führt Ihre Anfragen aus.",
    partner6Title: "Erweitertes Empfehlungsprogramm",
    partner6Desc:
      "Nach dem Launch der App erhalten Sie zusätzliche Möglichkeiten, Ihr bestehendes Netzwerk zu monetarisieren. Zudem werden Sie für die Vermittlung neuer Nutzer und Restaurants sowie für Ihren Beitrag zur Entwicklung des Ökosystems belohnt.",
    partner7Title: "Fundraising",
    partner7Desc:
      "Die Teilnahme an frühen Finanzierungsrunden bietet mehr Möglichkeiten, Anteile zu den günstigsten Konditionen zu erwerben und nach dem Börsengang der Gesellschaft eine höhere Anzahl an Aktien zu erhalten.",
    partner8Title: "Solider rechtlicher Rahmen",
    partner8Desc:
      "Die Unternehmensregistrierung in den USA, Bundesstaat Delaware, belegt ernsthafte Absichten und garantiert eine transparente rechtliche und finanzielle Berichterstattung gemäß US-amerikanischen Standards.",

    // Why ChefNet Section
    whyChefNetTitle: "Warum ChefNet?",
    whyCard1Title:
      "ChefNet ist ein Ökosystem der nächsten Generation",
    whyCard1Desc:
      "Wir verbinden Nutzer und Unternehmen durch KI und machen Gastronomie smart und bequem.",
    whyCard2Title: "Kulinarisches soziales Netzwerk",
    whyCard2Desc:
      "Inhalte von Nutzern und Köchen: Fotos, Videos, Rezensionen und Rezepte.\\nLive-Streams und Meisterkurse von den besten Köchen der Welt.",
    whyCard3Title: "ChefNet-Platform",
    whyCard3Desc:
      "Eine Plattform, auf der Leidenschaft für Kulinarik auf Technologie trifft.",
    whyCard4Title: "Technologie, die für Restaurants arbeitet",
    whyCard4Line1:
      "Intelligente Interfaces erhöhen den durchschnittlichen Umsatz pro Gast.",
    whyCard4Line2:
      "KI senkt Kosten und verbessert die Prognosegenauigkeit.",
    whyCard4Line3:
      "ChefNet hilft Restaurants, mehr zu verdienen – mühelos.",
    whyCard5Title:
      "Die Unterstützung von Restaurants steht im Herzen der ChefNet-Mission",
    whyCard5Line1:
      "Wir bieten Zugang zu Ressourcen für die Beschaffung von Finanzmitteln für Renovierungen, Modernisierungen oder Neueröffnungen bis hin zur Marketingunterstützung, damit die richtigen Gäste Ihr Lokal entdecken.",
    whyCard5Line2:
      "ChefNet ist der Service, der Restaurants nicht nur beim Betrieb hilft, sondern dabei, zu wachsen und erfolgreich zu sein.",
    whyCard6Title: "Personalisierung durch Ihren KI-Begleiter",
    whyCard6Line1:
      "Passende Empfehlungen basierend auf Ihrem Geschmack, Ihrer Stimmung und dem Kontext.\\nSofortbuchen und eine fertige Route.",
    whyCard6Line2:
      "Dynamische Menüs, sprachbasierte Szenarien und adaptive Vorschläge – all das macht Ihre Entscheidung dem Kirklich unkompliziert.",
  },

  es: {
    // Navigation
    features: "Ventajas",
    aboutUs: "Oportunidades",
    forPartners: "Para socios",
    referralProgramme: "Etapas de desarrollo",
    stagesOfDevelopment: "Etapas de desarrollo",
    whyChefNet: "¿Por qué ChefNet?",
    roadmap: "Hoja de ruta",
    faq: "FAQ",
    team: "Equipo",
    contacts: "Contactos",
    logIn: "Acceder",
    signIn: "Registrarse",

    // Hero Section
    heroTitle1: "Inteligencia que convierte la elección",
    heroTitle2: "en valor.",
    heroTitle3: "Inteligencia",
    heroTitle4: "que convierte la elección en valor.",
    heroSubtitle:
      "ChefNet es una tecnología basada en inteligencia artificial",
    heroDescription:
      "que aprende tu ritmo, recuerda tus preferencias y te ahorra tiempo y dinero cada día.",
    heroBenefit1: "Los restaurantes ganan nuevos comensales.",
    heroBenefit2:
      "Los comensales reciben recomendaciones precisas y personalizadas.",
    heroBenefit3:
      "Los socios se benefician de un crecimiento transparente y un mercado dinámico.",
    heroCta:
      "Ha llegado el momento de unirse a este movimiento.",
    getStarted: "Get Started",

    opportunitiesTitle: "Opportunities",
    opportunity1Title: "ChefNet",
    opportunity1Desc: "Your chance",
    opportunity2Title: "ChefNet",
    opportunity2Desc: "Our turn",
    opportunity3Title: "ChefNet",
    opportunity3Desc: "Revolution",
    believeTitle: "Lo que nos guía",
    believeSubtitle:
      "Sencillez en un solo toque. Precisión al estilo ChefNet.",
    believeDesc1:
      "Estamos creando un servicio que hace elegir un lugar tan sencillo como pedir un taxi.\nNuestro objetivo es ahorrar tiempo a millones de personas y ofrecerles la mejor experiencia posible.",
    believeDesc2:
      "La tecnología más avanzada trabaja para las personas: rápida, precisa y sin pasos innecesarios.\nChefNet no muestra los lugares más publicitados, sino los verdaderamente mejores,\ngracias a reseñas honestas, auténticas y verificadas.",
    believeDesc3: "",
    chefnetAppTitle1: "Oportunidades con ChefNet ",
    chefnetAppTitle2: "Invest",
    chefnetAppTitle3: "",
    chefnetAppOpportunity1Title: "ChefNet",
    chefnetAppOpportunity1Subtitle:
      " — tu entrada a una nueva tendencia.",
    chefnetAppOpportunity1Desc:
      "ChefNet Invest – tu oportunidad de formar parte del nacimiento de una tendencia global y un gigante tecnológico sin precedentes en la actualidad.",
    chefnetAppOpportunity1DescPart1: "ChefNet ",
    chefnetAppOpportunity1DescPart2: "Invest",
    chefnetAppOpportunity1DescPart3:
      " – tu oportunidad de formar parte del nacimiento de una tendencia global y un gigante tecnológico sin precedentes en la actualidad.",
    chefnetAppOpportunity2Title: "ChefNet",
    chefnetAppOpportunity2Subtitle:
      " — Ahora nos toca a nosotros.",
    chefnetAppOpportunity2Desc:
      "Booking, Uber, Airbnb y Amazon tampoco existían en su momento. Hoy, todo el mundo los conoce. El próximo nombre en esta lista - !!!ChefNet!!!",
    chefnetAppOpportunity2DescPart1:
      "Booking, Uber, Airbnb y Amazon tampoco existían en su momento. Hoy, todo el mundo los conoce. El próximo nombre en esta lista - !!!",
    chefnetAppOpportunity2DescPart2: "ChefNet",
    chefnetAppOpportunity2DescPart3: "!!!",
    chefnetAppOpportunity3Title: "ChefNet",
    chefnetAppOpportunity3Subtitle:
      " — el nuevo estándar en FoodTech.",
    chefnetAppOpportunity3Desc:
      "ChefNet es una revolución en el mundo de las aplicaciones gastronómicas — una idea cuyo momento ha llegado.",
    chefnetAppOpportunity3DescPart1: "",
    chefnetAppOpportunity3DescPart2: "ChefNet",
    chefnetAppOpportunity3DescPart3:
      " es una revolución en el mundo de las aplicaciones gastronómicas — una idea cuyo momento ha llegado.",
    uniqueFeaturesTitle: "Las características únicas de",
    uniqueFeaturesChefNet: "ChefNet",
    feature1Title: "Tu compañero de IA personal",
    feature1Desc:
      "Impulsado por una Superinteligencia: entiende tus gustos, selecciona las mejores opciones y te guía sin esfuerzo desde la elección hasta el pago. Tu compañero de IA sabe lo que te gusta, reserva tu mesa con anticipación y te ahorra tiempo cada día.",
    feature2Title: "Búsqueda intuitiva",
    feature2Desc:
      "Búsqueda por restaurantes, platos y tipos de cocina: rápida y precisa. Mapa interactivo con filtros inteligentes: tipo de cocina, valoración, precio. Resultados siempre actualizados — en tiempo real.",
    feature3Title: "Flexibilidad de uso",
    feature3Desc:
      "El sistema funciona en dos modos: selección visual mediante imágenes o control por voz a través de tu compañero de IA. Tú eliges — la inteligencia se encarga del resto.",
    feature4Title: "Claridad y detalles",
    feature4Desc:
      "Menú interactivo en formato de fotos y vídeos, con información sobre ingredientes y calorías. Pide tu comida por adelantado y tenla lista en el momento en que llegues: perfecto cuando vas con prisas.",
    feature5Title: "Sistema único de reseñas de clientes",
    feature5Desc:
      "ChefNet redefine las reseñas: no solo valoraciones con ⭐, sino emociones reales. Los comentarios en audio y vídeo hacen la retroalimentación personal, mientras que las puntuaciones por platos, servicio y ambiente la hacen genuinamente confiable.",
    feature6Title: "Gana por tu actividad",
    feature6Desc:
      "Gana no solo puntos, sino dinero real por tu actividad.",
    feature7Title: "Todo en una sola app",
    feature7Desc:
      "Una plataforma global unificada: desde cafeterías y bares hasta restaurantes premium y chefs privados.",
    feature8Title:
      "Un compañero de IA que hace tu experiencia gastronómica sencilla y fluida",
    feature8Desc:
      "Tu compañero encuentra el lugar ideal, reserva mesa, traza tu ruta y te avisa cuando sea hora de irte. ¿Sales con amigos? Los invitará y se pondrá en contacto con cada uno de forma personalizada.",
    feature9Title: "Apoyo y desarrollo de restaurantes",
    feature9Desc:
      "ChefNet impulsa el crecimiento de establecimientos gastronómicos: desde la fase conceptual inicial hasta la expansión a gran escala. La inteligencia artificial analiza métricas de rendimiento y proporciona estrategias de optimización ejecutables. Acceso a financiación procedente de inversores privados y fondos especializados en gastronomía, además de participación en programas de inversión respaldados por la comunidad ChefNet.",
    advantagesTitle: "Advantages",
    advantagesSubtitle: "Why invest",
    advantage1Title: "Innovation",
    advantage1Desc: "Advanced",
    advantage2Title: "Growth",
    advantage2Desc: "Rapid",
    advantage3Title: "Team",
    advantage3Desc: "Expert",
    advantage4Title: "Returns",
    advantage4Desc: "High",
    competitiveTitle: "Advantage",
    traditional: "Traditional",
    competitors: "Competitors",
    chefnet: "ChefNet",
    avgReturn: "Returns",
    partnershipTitle: "Partnership",
    partnershipSubtitle: "Rewards",
    partnershipCard1Title: "Partner",
    partnershipCard1Desc: "Become partner",
    partnershipCard2Title: "Program",
    partnershipCard2Desc1: "Classic model",
    partnershipCard2Desc2: "More shares",
    partnershipCard3Title: "Rounds",
    partnershipCard3Desc: "Value grows",
    you: "You",
    startNetwork: "Start network",
    level: "Level",
    level1Reward: "5%",
    level1Desc: "5% reward",
    level2Reward: "2%",
    level2Desc: "2% reward",
    level3Reward: "1%",
    level3Desc: "1% reward",
    howItWorks: "How it works",
    step1Title: "Share",
    step1Desc: "Unique link",
    step2Title: "Friends invest",
    step2Desc: "Earn commission",
    step3Title: "Grow",
    step3Desc: "Build network",
    roadmapTitle: "Hoja de ruta",
    roadmapSubtitle:
      "Siga nuestra trayectoria: de startup a referente indiscutible del sector",
    period1Title: "Q1 2026",
    period1Desc: "MVP",
    period1KPI: "",
    period2Title: "Q2 2026",
    period2Desc: "Launch",
    period2KPI: "",
    period3Title: "Q3 2026",
    period3Desc: "Product",
    period3KPI: "",
    period4Title: "Q4 2026",
    period4Desc: "Preparation",
    period4KPI: "",
    period5Title: "Q1 2027",
    period5Desc: "Ecosystem",
    period5KPI: "",
    period6Title: "Q2 2027",
    period6Desc: "Marketing",
    period6KPI: "",
    period7Title: "Q3 2027",
    period7Desc: "Growth",
    period7KPI: "",
    period8Title: "Q4 2027",
    period8Desc: "Social",
    period8KPI: "",
    period9Title: "2028+",
    period9Desc: "AI & FinTech",
    period9KPI: "",
    completed: "Completado",
    active: "Activo",
    upcoming: "Próximo",
    investmentsTitle: "Etapas de desarrollo",
    seedRound: "Seed",
    seriesA: "Series A",
    seriesB: "Series B",
    seriesC: "Series C",
    pricePerShare: "Price",
    minInvestment: "Minimum",
    soldOut: "Sold Out",
    activeRound: "Active",
    comingSoon: "Coming Soon",
    shares: "shares",
    investNow: "Invest Now",
    seedBackTitle: "Desarrollo del MVP de la aplicación",
    seedBackDesc:
      "• Adquisición de usuarios\n• Negociaciones con restaurantes\n• Contratación de gerentes por país\n• KPI: 10.000 usuarios",
    privateBackTitle: "Pruebas del MVP",
    privateBackDesc:
      "• Pruebas del MVP en ciudades clave de EE. UU. y Europa\n• Alianzas con asociaciones de restaurantes y cadenas locales\n• Mejora de los algoritmos de personalización y recomendaciones basadas en IA\n• KPI: 100.000 usuarios, 500 restaurantes",
    marketingBackTitle:
      "Integración con servicios de movilidad compartida",
    marketingBackDesc:
      "• Integración con servicios de movilidad compartida (Uber, Lyft, Bolt)\n• Lanzamiento de la aplicación ChefNet con todas sus funcionalidades\n• Ampliación del módulo fintech (pagos, cashback, Token ChefNet)\n• Colaboraciones a gran escala con creadores y medios en EE. UU. y la UE\n• KPI: 1 millón de usuarios, 5.000 restaurantes, 1 millón de dólares de beneficio",
    publicBackTitle:
      "Expansión a Asia, América Latina y Oriente Medio",
    publicBackDesc:
      "• Escalado a una SuperApp global\n• Lanzamiento de una comunidad DAO y programas NFT para restaurantes\n• Preparación para una salida a bolsa con una valoración de 3.000 a 5.000 millones de dólares\n• KPI: 30 millones de usuarios, 50.000 restaurantes, más de 100 millones de dólares de beneficio",
    ctaBannerTitle:
      "El futuro de los restaurantes comienza aquí.",
    ctaBannerHighlight: "Únete a ",
    ctaBannerHighlightBrand: "ChefNet",
    ctaBannerSuffix: ".",
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Questions",
    faq1Question:
      "¿Qué es ChefNet y qué problema resuelve esta iniciativa?",
    faq1Answer:
      "ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados.\n\nAborda la fragmentación del ecosistema de servicios de alimentación mediante el establecimiento de un único estándar integrado y sin fricciones.",
    faq2Question: "¿Cuál es el modelo de negocio de ChefNet?",
    faq2Answer:
      "Operamos un modelo híbrido de Marketplace + SaaS + Fintech, diversificando ingresos a través de cuatro canales:\n\n• **Comisiones por transacción:** Porcentaje aplicado a reservas, pedidos anticipados de comida y venta de entradas para eventos.\n\n• **Suscripciones (SaaS B2B):** Tarifas mensuales que pagan los restaurantes por acceso a sistemas CRM, análisis impulsados por inteligencia artificial y herramientas de marketing.\n\n• **Fintech (Pagos):** Comisiones por transacciones provenientes de pagos dentro de la aplicación y funciones de división de cuentas.\n\n• **Publicidad:** Promoción pagada de restaurantes dentro de la aplicación, tanto en la sección de descubrimiento como en los resultados de búsqueda.",
    faq3Question:
      "¿En qué fase de desarrollo se encuentra actualmente el proyecto?",
    faq3Answer:
      "El proyecto ha cerrado con éxito su ronda pre-semilla. Actualmente nos encontramos en una fase activa de captación de fondos para financiar el desarrollo y lanzamiento del Producto Mínimo Viable (MVP).",
    faq4Question:
      "¿En qué registro mercantil está inscrita la empresa y cuál es su forma jurídica?",
    faq4Answer:
      "ChefNet LLC está registrada en el estado de Delaware, EE.UU. — la jurisdicción líder de Estados Unidos para inversiones internacionales.",
    faq5Question:
      "¿Estructura de la ronda de financiación y condiciones de participación?",
    faq5Answer:
      "Para ejecutar la estrategia global de ChefNet, hemos planificado un proceso de captación de fondos escalonado con un objetivo total de 2.000.000 USD. La financiación se estructura en cuatro rondas clave (tramos). Este enfoque permite a los inversores mitigar riesgos, mientras que la empresa incrementa su valoración en cada etapa sucesiva.\n\nEnfoque actual: 1. Ronda (Pre-Seed).\nDesglose de Captación de Fondos\n\n🟢 1. Ronda: Desarrollo MVP (Pre-Seed)\nMonto: 150.000 USD\nObjetivo: Construir la base técnica del producto.\nUso de fondos: Arquitectura de aplicación, diseño UI/UX, desarrollo backend y lanzamiento de la primera versión funcional (MVP) para iOS y Android.\nResultado: Un producto listo para producción disponible para usuarios tempranos.\n\n🟡 2. Ronda: Ajuste de Mercado y Validación (Seed 1)\nMonto: 350.000 USD\nObjetivo: Validar hipótesis clave en el mercado real y generar métricas iniciales.\nUso de fondos: Lanzamiento suave, incorporación de los primeros 50 socios restaurantes, esfuerzos iniciales de marketing y gastos operativos del equipo central.\nResultado: Ajuste probado producto-mercado, primeras transacciones y usuarios activos.\n\n🔵 3. Ronda: Ecosistema e Integraciones (Seed 2 / Puente)\nMonto: 500.000 USD\nObjetivo: Evolucionar la app a una plataforma completa.\nUso de fondos: Integraciones técnicas con servicios de movilidad, sistemas POS de restaurantes y desarrollo avanzado de algoritmos de personalización con IA.\nResultado: Una plataforma totalmente funcional lista para soportar adopción masiva.\n\n🟣 4. Ronda: Lanzamiento y Escalada (Crecimiento)\nMonto: 1.000.000 USD\nObjetivo: Penetración agresiva en el mercado y monetización.\nUso de fondos: Campañas de marketing a gran escala (influencers, marketing de rendimiento), lanzamiento del módulo fintech y expansión a nuevas regiones (EE.UU. y Europa).\nResultado: Crecimiento de la base de usuarios a niveles KPI (cientos de miles de usuarios) y logro de ingresos recurrentes estables.\n\nActualización de Estado: Actualmente estamos abiertos a propuestas para la 1. Ronda (150.000 USD) para iniciar el desarrollo del MVP.",
    faq6Question: "¿Qué garantías se ofrecen a los inversores?",
    faq6Answer:
      "Construimos relaciones con inversores basadas en los principios de transparencia absoluta y cumplimiento de estándares legales reconocidos internacionalmente.\n\nSu inversión está protegida por los siguientes mecanismos:\n\n**1. Protección Jurídica (Derecho de EE.UU.)**\n\nLa empresa está estructurada bajo jurisdicción estadounidense como una Delaware C-Corporation — el estándar oro para inversiones de capital riesgo. Los derechos de los inversores, incluyendo propiedad accionarial y derechos bajo instrumentos convertibles (SAFE), están protegidos por la ley estadounidense. Todos los acuerdos se formalizan mediante contratos legalmente vinculantes.\n\n**2. Propiedad Intelectual (Titularidad de IP)**\n\nToda la tecnología, código fuente, activos de marca y base de clientes son propiedad legal de la empresa, no de fundadores individuales o colaboradores. Esto garantiza que el activo central en el que invierte esté plenamente protegido dentro de la estructura corporativa.\n\n**3. Transparencia e Informes**\n\nLos inversores reciben actualizaciones periódicas sobre el desempeño de la empresa, incluyendo estados financieros (Cuenta de Resultados), métricas de producto, estado de la hoja de ruta de desarrollo y uso de fondos. Siempre tendrá visibilidad clara sobre cómo se despliega su capital.\n\n**4. Incentivos para Fundadores (Vesting)**\n\nLas participaciones de los fundadores están sujetas a un cronograma de vesting estándar. Esto alinea los intereses de los fundadores con el éxito a largo plazo de la empresa y previene salidas anticipadas mientras se mantiene la propiedad en etapas tempranas.",
    faq7Question:
      "¿Qué nivel de rentabilidad potencial puede esperarse?",
    faq7Answer:
      "Invertir en ChefNet en fase temprana (Pre-Seed/Seed) significa obtener exposición al crecimiento exponencial de la valoración de la empresa. Nuestro objetivo va más allá del beneficio operativo: nos enfocamos en escalar el valor empresarial.\n\nEl potencial de retorno está impulsado por tres factores clave:\n\n**1. Crecimiento de la Valoración Empresarial (potencial de multiplicación X)**\n\nEn la fase actual, los inversores adquieren participación a la valoración más baja. Con cada ronda posterior – impulsada por integraciones de producto y escalabilidad global – la valoración de la empresa aumenta.\n\nObjetivo: incremento de 10–20x en el valor de la empresa para la ronda Serie A/B o una adquisición estratégica.\n\n**2. Crecimiento Proyectado de Ingresos**\n\nSegún nuestro modelo financiero, para 2028 – tras la expansión global y la integración completa de fintech – proyectamos Ingresos Recurrentes Anuales (ARR) superiores a los 100 M USD. Esto sustenta una sólida rentabilidad de activos y valor a largo plazo.\n\n**3. Estrategia de Salida**\n\nLos retornos para inversores se materializan principalmente en la salida. Consideramos dos escenarios de liquidez para inversores tempranos dentro de un horizonte de 3–5 años:\n\n• **Fusiones y Adquisiciones (M&A):** Venta de la empresa a un gran actor del sector (p. ej., Uber, DoorDash, Booking o ecosistemas fintech-bancarios).\n\n• **Mercado Secundario:** Posibilidad de vender participación a nuevos inversores en rondas de financiación posteriores con una prima significativa.",
    faq8Question: "¿Cuándo está prevista la salida a bolsa?",
    faq8Answer:
      "Consideramos una salida a bolsa (IPO) como uno de los posibles escenarios de desarrollo a largo plazo, con un horizonte proyectado de aproximadamente 5–7 años.\n\nSin embargo, nuestro objetivo primordial es maximizar la valoración de la empresa y garantizar liquidez para los inversores. En consecuencia, estamos desarrollando el negocio con dos estrategias de salida en mente:\n\n**Fusiones y Adquisiciones (Adquisición Estratégica):**\n\nLa venta de la empresa a un actor estratégico global (por ejemplo, ecosistemas como Uber, Booking, DoorDash o grandes grupos fintech) dentro de un horizonte de 3–5 años. Este es el escenario más probable para una salida rápida, ofreciendo un alto retorno de la inversión con un múltiplo de valoración atractivo.\n\n**IPO (Oferta Pública):**\n\nUna cotización en bolsa al alcanzar una valoración superior a $1.000 millones y lograr ingresos internacionales estables, permitiendo la creación de una empresa independiente de escala global.",
    faq9Question: "¿Qué tecnologías utiliza ChefNet?",
    faq9Answer:
      "ChefNet se basa en una arquitectura moderna de microservicios nativos en la nube, garantizando flexibilidad, transacciones financieras seguras y una rápida implementación de funciones impulsadas por inteligencia artificial.\n\nNuestro stack tecnológico:\n\n**1. Móvil y Frontend (Multiplataforma)**\n\nUtilizamos Flutter o React Native.\n\n**Razón:**\n\nPermite una única base de código para iOS y Android, acelerando el desarrollo hasta un 40% y reduciendo costos de mantenimiento, manteniendo alto rendimiento y una experiencia de usuario nativa auténtica.\n\n**2. Backend y API (Lado del servidor)**\n\nLenguajes principales: Python (FastAPI / Django) o Node.js.\n\n**Razón:**\n\nPython es ideal para integración de IA y procesamiento de datos. Una arquitectura de microservicios nos permite añadir nuevas verticales—como módulos fintech o gestión de eventos—sin reingeniería completa de la plataforma.\n\n**3. Inteligencia Artificial (IA y Datos)**\n\n**Integración de LLM:**\n\nConexión con modelos líderes de lenguaje (OpenAI GPT-4 / Anthropic) para alimentar el concierge de IA.\n\n**Motor de Recomendación:**\n\nAlgoritmos propietarios de machine learning que personalizan el descubrimiento de restaurantes según el comportamiento del usuario e historial de pedidos.\n\n**4. Fintech y Seguridad**\n\n**Pagos:**\n\nIntegración mediante Stripe Connect o Adyen, estándar del sector para marketplaces.\n\n**Seguridad:**\n\nCumplimiento total con PCI DSS para protección de datos de pagos y cifrado SSL/TLS de extremo a extremo para todos los datos transmitidos.\n\n**5. Infraestructura**\n\n**Nube:**\n\nAlojamiento en AWS (Amazon Web Services) o Google Cloud.\n\n**Escalabilidad:**\n\nUso de Docker y Kubernetes para habilitar escalado automático durante picos de tráfico.",
    faq10Question:
      "¿Qué ventajas diferenciales posicionan a ChefNet frente a competidores como Yelp, OpenTable y Grubhub?",
    faq10Answer:
      "ChefNet integra todo el viaje del comensal: desde la primera idea hasta pagar la cuenta. Plataformas actuales resuelven problemas aislados: Yelp es un directorio, OpenTable gestiona reservas, Grubhub entrega comida. ChefNet elimina fricciones en toda la experiencia – desde el «¿dónde comemos?» hasta el pago – cerrando brechas en la usabilidad.\n\n**Cinco ventajas clave:**\n\n**1. Conserje con IA vs. búsquedas con filtros (vs. Yelp/TripAdvisor)**\n\n**Ellos:** Horas navegando reseñas y ajustando filtros.\n\n**Nosotros:** Hiperpersonalización. La IA entiende gustos, presupuesto e historial – sugiere el lugar ideal en segundos, como un consejo de un amigo foodie.\n\n**2. Fintech integrado: pago y división de cuentas (vs. OpenTable)**\n\n**Ellos:** La app solo sirve para reservar; al final, se espera al camarero y se pelea por la cuenta.\n\n**Nosotros:** Pago en mesa. Flujo completo: reservar → pedir → pagar → dividir en un toque. Mayor rotación de mesas sin esperas.\n\n**3. Experiencia social (vs. Grubhub/Uber Eats)**\n\n**Ellos:** Consumo solitario centrado en entregas.\n\n**Nosotros:** Comer conectados. Planificación colectiva: votar restaurantes, comprar entradas para eventos, invitar amigos – recuperamos la esencia social de la gastronomía.\n\n**4. Modelo de ingresos justo para restaurantes**\n\n**Ellos:** Comisiones abusivas (hasta 30% en entregas), cobros por cada cliente referido.\n\n**Nosotros:** SaaS + Fintech. Herramientas de CRM/analytics por suscripción; márgenes de transacciones financieras – sin exprimir a los socios.\n\n**5. Red social culinaria con reseñas en vivo (vs. TripAdvisor)**\n\n**Ellos:** Reseñas genéricas escritas por bots; fotos editadas que distorsionan la realidad.\n\n**Nosotros:** Autenticidad en video. Perfiles con Stories/Reels que muestran ambiente real y platos sin filtros. Feeds de recomendaciones de contactos o influencers convierten la búsqueda en entretenimiento.",
    contactTitle: "Questions?",
    contactSubtitle: "Here to help",
    contactButton: "Contact",
    footerTagline: "Tu guía en el mundo de la innovación gastronómica",
    footerContacts: "Contacto",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Noticias",
    footerNewsletterDesc: "Manténgase al día con las últimas noticias y ofertas exclusivas.",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Suscribirse",
    footerPrivacyPolicy: "Política de privacidad",
    footerCopyright: "© 2026 ChefNet LLC. Todos los derechos reservados.",
    partnersOpportunitiesTitle: "Opportunities",
    opportunityCard1Title: "Dashboard",
    opportunityCard1Desc: "Track shares",
    opportunityCard2Title: "AI Companion",
    opportunityCard2Desc: "Publishes news",
    opportunityCard3Title: "Referral",
    opportunityCard3Desc: "Increase stake",
    opportunityCard4Title: "Extended",
    opportunityCard4Desc: "Additional opportunities",
    opportunityCard5Title: "Fundraising",
    opportunityCard5Desc: "Early rounds",
    opportunityCard6Title: "Legal",
    opportunityCard6Desc: "Delaware, USA",

    // Partners Section
    partnersTitle: "Oportunidades para socios",
    partner1Title: "Conviértase en copropietario de la empresa",
    partner1Desc:
      "Únase en la etapa fundacional para que sus participaciones en ChefNet se conviertan en acciones de la empresa al salir a bolsa.",
    partner2Title: "Programa de socios",
    partner2Desc:
      "Un modelo clásico que te permite aumentar tu participación invitando a nuevos socios durante la fase de Oportunidad en fases iniciales. Más participación — más acciones. Todo es transparente y sencillo.",
    partner3Title: "Rondas de financiación",
    partner3Desc:
      "Con cada etapa de crecimiento de ChefNet, el valor de tus participaciones aumenta.",
    partner4Title: "Panel del socio",
    partner4Desc:
      "Seguimiento de las participaciones compradas y obtenidas en el marco del Programa de Socios.",
    partner5Title: "El compañero de IA",
    partner5Desc:
      "publica noticias de la empresa y tendencias globales en la industria restaurantera, responde a tus preguntas y ejecuta tus solicitudes.",
    partner6Title: "Programa de referidos ampliado",
    partner6Desc:
      "Tras el lanzamiento de la aplicación, dispondrá de nuevas oportunidades para monetizar su red existente, además de recibir recompensas por referir nuevos usuarios y restaurantes, y por su aporte al desarrollo del ecosistema.",
    partner7Title: "Rondas de financiación",
    partner7Desc:
      "Participar en rondas iniciales de financiación ofrece mayores oportunidades de adquirir participación a los precios más favorables y de recibir más acciones tras la salida a bolsa de la empresa.",
    partner8Title: "Marco legal sólido",
    partner8Desc:
      "El registro de la empresa en EE. UU., estado de Delaware, demuestra seriedad de intención y garantiza una transparencia legal y financiera conforme a los estándares estadounidenses.",

    // Why ChefNet Section
    whyChefNetTitle: "¿Por qué ChefNet?",
    whyCard1Title:
      "ChefNet — un ecosistema de nueva generación",
    whyCard1Desc:
      "Conectamos usuarios y empresas mediante inteligencia artificial, haciendo que la gastronomía sea inteligente y fluida.",
    whyCard2Title: "Una red social gastronómica",
    whyCard2Desc:
      "Contenido de usuarios y chefs: fotos, videos, reseñas y recetas.\nTransmisiones en directo y clases magistrales de los mejores chefs del mundo.",
    whyCard3Title: "Plataforma ChefNet",
    whyCard3Desc:
      "Una plataforma donde la pasión por la gastronomía se encuentra con la tecnología.",
    whyCard4Title:
      "Tecnología que trabaja para los restaurantes",
    whyCard4Line1:
      "Las interfaces inteligentes aumentan el ticket promedio.",
    whyCard4Line2:
      "La IA reduce costos y mejora la precisión de las previsiones.",
    whyCard4Line3:
      "ChefNet ayuda a los restaurantes a ganar más — sin esfuerzo.",
    whyCard5Title:
      "Apoyar a los restaurantes está en el corazón de la misión de ChefNet",
    whyCard5Line1:
      "Proporcionamos acceso a recursos para conseguir financiación para renovaciones, mejoras o nuevas lanzamientos, y brindar apoyo de marketing para que las personas adecuadas descubran tu establecimiento.",
    whyCard5Line2:
      "ChefNet es el servicio que ayuda a los restaurantes no solo a funcionar, sino a crecer y prosperar.",
    whyCard6Title: "Personalización con tu compañero de IA",
    whyCard6Line1:
      "Recomendaciones precisas según tu gusto, estado de ánimo y contexto.\nReserva instantánea y ruta lista para ir.",
    whyCard6Line2:
      "Menús dinámicos, escenarios por voz y sugerencias adaptativas: todo ello hace que tu elección sea verdaderamente sencilla.",
  },

  tr: {
    // Navigation
    features: "Avantajlar",
    aboutUs: "Fırsatlar",
    forPartners: "Ortaklar için",
    referralProgramme: "Gelişim aşamaları",
    stagesOfDevelopment: "Gelişim aşamaları",
    whyChefNet: "Neden ChefNet?",
    roadmap: "Yol Haritası",
    faq: "FAQ",
    team: "Ekip",
    contacts: "İletişim",
    logIn: "Giriş yap",
    signIn: "Kayıt ol",

    // Hero Section
    heroTitle1: "Seçimi değere çeviren",
    heroTitle2: "zekâ.",
    heroTitle3: "Seçimi",
    heroTitle4: "değere çeviren zekâ.",
    heroSubtitle:
      "ChefNet, ritminizi öğrenen, tercihinizi hatırlayan",
    heroDescription:
      "ve size her gün zaman ile para kazandıran yapay zekâ tabanlı bir teknolojidir.",
    heroBenefit1: "Restoranlar yeni misafirler edinir.",
    heroBenefit2:
      "Misafirler — kişiselleştirilmiş ve isabetli öneriler alır.",
    heroBenefit3:
      "Ortaklar şeffaf büyüme ve dinamik bir pazar fırsatı elde eder.",
    heroCta: "Bu harekete katılmak için doğru zaman geldi.",
    getStarted: "Get Started",

    opportunitiesTitle: "Opportunities",
    opportunity1Title: "ChefNet",
    opportunity1Desc: "Your chance",
    opportunity2Title: "ChefNet",
    opportunity2Desc: "Our turn",
    opportunity3Title: "ChefNet",
    opportunity3Desc: "Revolution",
    believeTitle: "Bizim için önemli olanlar",
    believeSubtitle:
      "Basitlik, tek bir dokunuşta. ChefNet tarzında kesinlik.",
    believeDesc1:
      "Bir yer seçmeyi, takside sipariş vermek kadar kolaylaştıran bir hizmet geliştiriyoruz.\nAmacımız milyonlarca insanın zamanını kazanmasını sağlamak ve onlara en iyi deneyimi sunmaktır.",
    believeDesc2:
      "En gelişmiş teknoloji insana hizmet ediyor: hızlı, doğru ve gereksiz adımlar olmadan.\nChefNet, en çok reklamı yapılan değil, gerçekten en iyi mekanları ortaya çıkarıyor —\nsamimi, özgün ve Gerçek ve doğrulanmış yorumlar sayesinde.",
    believeDesc3: "",
    chefnetAppTitle1: "ChefNet ",
    chefnetAppTitle2: "Invest",
    chefnetAppTitle3: " ile fırsatlar",
    chefnetAppOpportunity1Title: "ChefNet",
    chefnetAppOpportunity1Subtitle:
      " — yeni bir trende giriş kapınız.",
    chefnetAppOpportunity1Desc:
      "ChefNet Invest – bugün piyasada benzeri olmayan küresel bir trendin ve teknoloji devinin doğuşuna ortak olma fırsatıdır.",
    chefnetAppOpportunity1DescPart1: "ChefNet ",
    chefnetAppOpportunity1DescPart2: "Invest",
    chefnetAppOpportunity1DescPart3:
      " – bugün piyasada benzeri olmayan küresel bir trendin ve teknoloji devinin doğuşuna ortak olma fırsatıdır.",
    chefnetAppOpportunity2Title: "ChefNet",
    chefnetAppOpportunity2Subtitle: " — Şimdi sıra bizde.",
    chefnetAppOpportunity2Desc:
      "Booking, Uber, Airbnb ve Amazon da bir zamanlar yoktu. Bugün onları tüm dünya tanıyor. Bu listedeki bir sonraki isim - ChefNet!!!",
    chefnetAppOpportunity2DescPart1:
      "Booking, Uber, Airbnb ve Amazon da bir zamanlar yoktu. Bugün onları tüm dünya tanıyor. Bu listedeki bir sonraki isim - ",
    chefnetAppOpportunity2DescPart2: "ChefNet",
    chefnetAppOpportunity2DescPart3: "!!!",
    chefnetAppOpportunity3Title: "ChefNet",
    chefnetAppOpportunity3Subtitle:
      " — FoodTech'te yeni standart.",
    chefnetAppOpportunity3Desc:
      "ChefNet, yemek uygulamaları dünyasında bir devrimdir — zamanı gelmiş bir fikirdir.",
    chefnetAppOpportunity3DescPart1: "",
    chefnetAppOpportunity3DescPart2: "ChefNet",
    chefnetAppOpportunity3DescPart3:
      ", yemek uygulamaları dünyasında bir devrimdir — zamanı gelmiş bir fikirdir.",
    uniqueFeaturesTitle: "benzersiz Özellikleri",
    uniqueFeaturesChefNet: "ChefNet",
    feature1Title: "Kişisel Yapay Zekâ Arkadaşınız",
    feature1Desc:
      "Süper-Intellekt teknolojisiyle çalışır: Damak zevkinizi anlar, en iyi seçenekleri sunar ve sizi seçimden ödemeye kadar her adımda sorunsuzca yönlendirir. Yapay zekâ arkadaşınız sizin neyi sevdiğinizi bilir, masanızı önceden ayırtır ve size her gün zaman kazandırır.",
    feature2Title: "Sezgisel arama",
    feature2Desc:
      "Restoran, yemek ve mutfak türlerinde arama – hızlı ve kesin. Akıllı filtreli interaktif harita: mutfak türü, puan, fiyat. Sonuçlar her zaman güncel – gerçek zamanlı.",
    feature3Title: "Kullanım esnekliği",
    feature3Desc:
      "Sistem iki modda çalışıyor: Görseller üzerinden seçim yapma ya da yapay zekâ yardımcınız aracılığıyla sesli komutlar. Siz seçin – gerisini zekâ halleder.",
    feature4Title: "Netlik ve detaylar",
    feature4Desc:
      "Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü. Yemeğinizi önceden sipariş edin ve restorana girdiğiniz anda hazır olsun – acele ettiğinizde mükemmel bir çözüm.",
    feature5Title: "Benzersiz müşteri değerlendirme sistemi",
    feature5Desc:
      "ChefNet, yorum kavramını yeniden tanımlıyor: sadece ⭐ puanlar değil, samimi duygular. Sesli ve video geri bildirımler, incelemeleri kişiselleştiriyor; yemek, hizmet ve atmosfer için ayrı puanlar ise onları gerçekten güvenilir kılıyor.",
    feature6Title: "Aktivite Karşılığı Kazanç",
    feature6Desc:
      "Sadece puan değil, aktiviteniz karşılığında gerçek para kazanın.",
    feature7Title: "Her şey tek uygulamada",
    feature7Desc:
      "Kahve dükkanlarından ve barlardan premium restoranlara ve özel şeflere kadar tek bir küresel platform.",
    feature8Title:
      "Yemek deneyiminizi basit ve kesintisiz hale getiren bir yapay zekâ yardımcısı",
    feature8Desc:
      "Yapay zekâ arkadaşınız size en uygun mekanı bulur, masayı rezerve eder, rotanızı çizer ve gitme vaktinizde sizi uyarır. Arkadaşlarınızla mı gidiyorsunuz? Hepsini davet eder ve onlarla bireysel olarak iletişime geçer.",
    feature9Title: "Restoran Desteği ve Gelişimi",
    feature9Desc:
      "ChefNet, işletmelerin büyüme journey'ini destekler — ilk fikirlerden tam ölçekli genişlemeye kadar. Yapay zekâ, performans metriklerini analiz eder ve uygulanabilir optimizasyon stratejileri sunar. Özel yatırımcılardan ve mutfak sektörüne odaklı fonlardan finansman imkânı; ayrıca ChefNet topluluğunun desteklediği yatırım programlarına katılım fırsatı.",
    advantagesTitle: "Advantages",
    advantagesSubtitle: "Why invest",
    advantage1Title: "Innovation",
    advantage1Desc: "Advanced",
    advantage2Title: "Growth",
    advantage2Desc: "Rapid",
    advantage3Title: "Team",
    advantage3Desc: "Expert",
    advantage4Title: "Returns",
    advantage4Desc: "High",
    competitiveTitle: "Advantage",
    traditional: "Traditional",
    competitors: "Competitors",
    chefnet: "ChefNet",
    avgReturn: "Returns",
    partnershipTitle: "Partnership",
    partnershipSubtitle: "Rewards",
    partnershipCard1Title: "Partner",
    partnershipCard1Desc: "Become partner",
    partnershipCard2Title: "Program",
    partnershipCard2Desc1: "Classic model",
    partnershipCard2Desc2: "More shares",
    partnershipCard3Title: "Rounds",
    partnershipCard3Desc: "Value grows",
    you: "You",
    startNetwork: "Start network",
    level: "Level",
    level1Reward: "5%",
    level1Desc: "5% reward",
    level2Reward: "2%",
    level2Desc: "2% reward",
    level3Reward: "1%",
    level3Desc: "1% reward",
    howItWorks: "How it works",
    step1Title: "Share",
    step1Desc: "Unique link",
    step2Title: "Friends invest",
    step2Desc: "Earn commission",
    step3Title: "Grow",
    step3Desc: "Build network",
    roadmapTitle: "Yol Haritası",
    roadmapSubtitle:
      "Girişimden sektör liderine yolculuğumuzu takip edin",
    period1Title: "Q1 2026",
    period1Desc: "MVP",
    period1KPI: "",
    period2Title: "Q2 2026",
    period2Desc: "Launch",
    period2KPI: "",
    period3Title: "Q3 2026",
    period3Desc: "Product",
    period3KPI: "",
    period4Title: "Q4 2026",
    period4Desc: "Preparation",
    period4KPI: "",
    period5Title: "Q1 2027",
    period5Desc: "Ecosystem",
    period5KPI: "",
    period6Title: "Q2 2027",
    period6Desc: "Marketing",
    period6KPI: "",
    period7Title: "Q3 2027",
    period7Desc: "Growth",
    period7KPI: "",
    period8Title: "Q4 2027",
    period8Desc: "Social",
    period8KPI: "",
    period9Title: "2028+",
    period9Desc: "AI & FinTech",
    period9KPI: "",
    completed: "Tamamlandı",
    active: "Aktif",
    upcoming: "Yakında",
    investmentsTitle: "Gelişim Aşamaları",
    seedRound: "Seed",
    seriesA: "Series A",
    seriesB: "Series B",
    seriesC: "Series C",
    pricePerShare: "Price",
    minInvestment: "Minimum",
    soldOut: "Sold Out",
    activeRound: "Active",
    comingSoon: "Coming Soon",
    shares: "shares",
    investNow: "Invest Now",
    seedBackTitle: "Uygulama MVP'sinin geliştirilmesi",
    seedBackDesc:
      "Kullanıcı edinimi\nRestoranlarla görüşmeler\nÜlke müdürlerinin işe alınması\nKPI: 10.000 kullanıcı",
    privateBackTitle:
      "ABD ve Avrupa'daki kilit şehirlerde MVP testleri",
    privateBackDesc:
      "Restoran dernekleri ve yerel zincirlerle ortaklıklar\nKişiselleştirme algoritmalarını ve yapay zekâ önerilerinin iyileştirilmesi\nKPI: 100.000 kullanıcı, 500 restoran",
    marketingBackTitle:
      "Sürüş paylaşımı hizmetleriyle entegrasyon",
    marketingBackDesc:
      "Sürüş paylaşımı hizmetleriyle entegrasyon (Uber, Lyft, Bolt)\nTüm özellikleriye ChefNet uygulamasının piyasaya sürülmesi\nFintech modülünün genişletilmesi (ödemeler, nakit iade, ChefNet Token)\nABD ve AB'de içerik üreticileri ve medya ile büyük çaplı iş birlikleri\nKPI: 1 milyon kullanıcı, 5.000 restoran, 1 milyon dolar kâr",
    publicBackTitle:
      "Hedef: Asya, Latin Amerika ve Orta Doğu pazarlarına açılma",
    publicBackDesc:
      "Küresel bir Süper Uygulama'ya dönüşme\nRestoranlar için bir DAO topluluğu ve NFT programlarının başlatılması\nHalka arz için 3–5 milyar dolar değerleme ile hazırlık\nKPI: 30 milyon kullanıcı, 50.000 restoran, 100 milyon doların üzerinde kâr",
    ctaBannerTitle: "Restoranların geleceği burada başlıyor.",
    ctaBannerHighlight: "",
    ctaBannerHighlightBrand: "ChefNet",
    ctaBannerSuffix: "'e katılın.",
    faqTitle: "Sıkça Sorulan Sorular",
    faqSubtitle: "Questions",
    faq1Question:
      "ChefNet nedir ve bu proje hangi sorunları çözüyor?",
    faq1Answer:
      "ChefNet, restoranlar ve özel şefler ile keşfetme, rezervasyon, ödeme ve etkileşimi birleştiren küresel bir FoodTech platformudur.\n\nGıda hizmetleri ekosisteminin parçalanmış yapısını, tek ve kesintisiz bir standart oluşturarak çözüme kavuşturur.",
    faq2Question: "ChefNet'in iş modeli nasıl işliyor?",
    faq2Answer:
      "Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:\n\n• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.\n\n• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.\n\n• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.\n\n• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.",
    faq3Question:
      "Proje şu anda hangi geliştirme aşamasındadır?",
    faq3Answer:
      "Proje, ön sermaye turunu başarıyla tamamladı. Şu anda MVP'nin (Minimum Uygulanabilir Ürün) geliştirilmesi ve piyasaya sürülmesini finanse etmek amacıyla aktif bir fon toplama aşamasındayız.",
    faq4Question:
      "Şirket hangi yargı alanında tescil edilmiştir ve hukuki organizasyonu (kurumsal yapısı) nedir?",
    faq4Answer:
      "ChefNet LLC, uluslararası yatırımlar açısından ABD'nin en önemli hukuki yargı alanına sahip olan Delaware eyaletinde resmi olarak kayıtlıdır.",
    faq5Question: "Yatırım turu yapısı ve katılım koşulları?",
    faq5Answer:
      "ChefNet'in küresel stratejisini hayata geçirmek için toplam hedefi 2.000.000 USD olan adım adım bir fon toplama süreci planladık. Finansman dört temel turda (tranche) yapılandırılmıştır. Bu yaklaşım, yatırımcıların riski minimize etmesine olanak tanırken, şirketin her aşamada değerlemesini artırmasını sağlar.\n\nMevcut odak: 1. Tur (Pre-Seed).\nFon Dağılımı\n\n🟢 1. Tur: MVP Geliştirme (Pre-Seed)\nTutar: 150.000 USD\nAmaç: Ürünün teknik altyapısını oluşturmak.\nKullanım: Uygulama mimarisi, UI/UX tasarımı, arka uç geliştirme ve iOS ile Android için ilk fonksiyonel sürümün (MVP) yayınlanması.\nSonuç: Erken kullanıcılar için kullanıma hazır, üretim kalitesinde bir ürün.\n\n🟡 2. Tur: Piyasa Uyumu ve Doğrulama (Seed 1)\nTutar: 350.000 USD\nAmaç: Temel hipotezlerin canlı piyasada doğrulanması ve ilk metriklerin üretilmesi.\nKullanım: Yatışık başlatım, ilk 50 restoran ortağının entegrasyonu, başlangıç pazarlama faaliyetleri ve çekirdek ekibin operasyonel giderleri.\nSonuç: Kanıtlanmış ürün-piyasa uyumu, ilk işlemler ve aktif kullanıcılar.\n\n🔵 3. Tur: Ekosistem ve Entegrasyonlar (Seed 2 / Köprü)\nTutar: 500.000 USD\nAmaç: Uygulamayı tam ölçekli bir platforma dönüştürmek.\nKullanım: Sürüş hizmetleriyle teknik entegrasyonlar, restoran POS sistemleri ve yapay zeka destekli kişiselleştirme algoritmalarının ileri geliştirilmesi.\nSonuç: Kitlesel benimseme için hazır tam fonksiyonlu bir platform.\n\n🟣 4. Tur: Lansman ve Ölçeklendirme (Büyüme)\nTutar: 1.000.000 USD\nAmaç: Agresif pazar penetrasyonu ve gelir elde etme.\nKullanım: Çapraz pazarlama kampanyaları (influencer'lar, performans pazarlaması), fintech modülünün piyasaya sürülmesi ve yeni bölgelere (ABD ve Avrupa) açılma.\nSonuç: Kullanıcı kitlesinin KPI seviyelerine ulaşması (yüz binlerce kullanıcı) ve istikrarlı tekrarlayan gelir elde edilmesi.\n\nDurum Güncellemesi: MVP geliştirme sürecini başlatmak üzere 1. Tur (150.000 USD) için tekliflere açığız.",
    faq6Question:
      "Yatırımcılara hangi güvenceler sağlanmaktadır?",
    faq6Answer:
      "Yatırımcı ilişkilerimizi tam şeffaflık ilkesi ve uluslararası kabul görmüş hukuki standartlara uyum temelinde inşa ediyoruz.\n\nYatırımınız aşağıdaki mekanizmalarla korunmaktadır:\n\n**1. Hukuki Koruma (ABD Hukuku)**\n\nŞirket, ABD yargı alanında Delaware C-Corporation yapısıyla kurulmuştur – bu, sermaye yatırımları için uluslararası altın standarttır. Yatırımcı hakları (hisse sahipliği ve dönüştürülebilir enstrümanlar/SAFE kapsamındaki haklar dahil) ABD hukuku tarafından korunmaktadır. Tüm düzenlemeler hukuki olarak bağlayıcı sözleşmelerle resmileştirilir.\n\n**2. Fikri Mülkiyet Sahipliği (IP Sahipliği)**\n\nTüm teknolojiler, kaynak kodlar, marka varlıkları ve müşteri tabanı yasal olarak şirketin malıdır – bireysel kurucular veya katkı sağlayanların değil. Bu, yatırımda bulunduğunuz temel varlığın kurumsal yapı içinde tamamen korunduğunu garanti eder.\n\n**3. Şeffaflık ve Raporlama**\n\nYatırımcılar, finansal tablolar (Gelir Tablosu), ürün metrikleri, geliştirme yol haritası durumu ve fon kullanımına ilişkin periyodik performans raporları alır. Sermayenizin nasıl kullanıldığı konusunda her zaman net bir görünüme sahip olacaksınız.\n\n**4. Kurucu Teşvikleri (Vesting)**\n\nKurucu hisseleri standart vesting takvimine tabidir. Bu, kurucuların çıkarlarını şirketin uzun vadeli başarısıyla uyumlu hale getirir ve erken aşamada sahiplik korunurken erken ayrılıkları engeller.",
    faq7Question: "Beklenen potansiyel getiri seviyesi nedir?",
    faq7Answer:
      "ChefNet'e erken aşama (Pre-Seed/Seed) yatırım yapmak, şirket değerlemesindeki üstel büyümeye maruz kalma anlamına gelir. Hedefimiz faaliyet kârının ötesine geçer: kurumsal değerin ölçeklendirilmesine odaklanıyoruz.\n\nGetiri potansiyeli üç temel faktörle şekillenir:\n\n**1. Şirket Değerleme Büyümesi (X katı çarpan potansiyeli)**\n\nMevcut aşamada yatırımcılar, en düşük değerleme seviyesinden hisse alır. Ürün entegrasyonları ve küresel ölçeklendirmeyle desteklenen her sonraki turda şirket değerlemesi artar.\n\nHedef: Series A/B turuna veya stratejik bir satın almaya kadar şirket değerinin 10–20 kat artması.\n\n**2. Öngörülen Gelir Büyümesi**\n\nFinansal modelimize göre, 2028 yılına kadar — küresel pazar genişlemesi ve tam fintech entegrasyonu sonrasında — Yıllık Tekrarlanan Gelir'in (ARR) 100 milyon USD'yi aşmasını öngörüyoruz. Bu, güçlü varlık kârlılığını ve uzun vadeli değeri destekler.\n\n**3. Çıkış Stratejisi**\n\nYatırımcı getirileri öncelikle çıkışta gerçekleşir. Erken dönem yatırımcılar için 3–5 yıllık bir zaman diliminde iki likidite senaryosu değerlendiriyoruz:\n\n• **Birleşme ve Devirler (M&A):** Şirketin sektörün büyük oyuncularından birine (örn. Uber, DoorDash, Booking veya fintech-bankacılık ekosistemleri) satışı.\n\n• **İkincil Piyasa:** Sonraki finansman turlarında hisseleri önemli bir primle yeni yatırımcılara satma imkanı.",
    faq8Question: "Halka arz ne zaman planlanıyor?",
    faq8Answer:
      "Bir halka arzı (IPO), yaklaşık 5–7 yıllık bir öngörülen zaman dilimiyle olası uzun vadeli gelişim senaryolarından biri olarak görüyoruz.\n\nBununla birlikte, birincil hedefimiz şirket değerlemesini maksimize etmek ve yatırımcılar için likidite sağlamak. Bu doğrultuda, iş iki çıkış stratejisi göz önünde bulundurularak geliştirilmektedir:\n\n**Birleşme & Devirler (Stratejik Satın Alma):**\n\nŞirketin küresel bir stratejik oyuncuya (örneğin, Uber, Booking, DoorDash gibi ekosistemler veya büyük fintech grupları) 3–5 yıllık bir zaman diliminde satılması. Bu, cazip bir değerleme çarpanıyla yüksek getiri sunan hızlı çıkış için en olası senaryodur.\n\n**IPO (Halka Arz):**\n\n1 milyar USD'nin üzerinde değerlemeye ve istikrarlı uluslararası gelire ulaşıldığında halka arz, bağımsız, küresel ölçekli bir şirket yaratmayı mümkün kılar.",
    faq9Question: "ChefNet hangi teknolojileri kullanmaktadır?",
    faq9Answer:
      "ChefNet, esneklik, güvenli finansal işlemler ve yapay zekâ destekli özelliklerin hızlı devreye alınmasını sağlayan modern bir bulut tabanlı mikroservis mimarisine dayanmaktadır.\n\nTeknoloji altyapımız:\n\n**1. Mobil & Frontend (Çapraz Platform)**\n\nFlutter veya React Native kullanılmaktadır.\n\n**Neden:**\n\nHem iOS hem Android için tek kod tabanı, geliştirme süreçlerini %40'a varan oranda hızlandırırken, bakım maliyetlerini düşürür ve yüksek performans ile gerçek yerel kullanıcı deneyimini korur.\n\n**2. Backend & API (Sunucu Tarafı)**\n\nTemel diller: Python (FastAPI / Django) veya Node.js.\n\n**Neden:**\n\nPython, yapay zekâ entegrasyonu ve veri işleme için idealdir. Mikroservis mimarisi, tüm platformu yeniden tasarlamaya gerek kalmadan fintech modülleri veya etkinlik yönetimi gibi yeni dikeylerin sorunsuzca eklenmesini sağlar.\n\n**3. Yapay Zekâ (YZ & Veri)**\n\n**Büyük Dil Modelleri Entegrasyonu:**\n\nYZ konseyini güçlendirmek üzere lider büyük dil modelleriyle (OpenAI GPT-4 / Anthropic) entegrasyon.\n\n**Öneri Motoru:**\n\nKullanıcı davranışları ve sipariş geçmişi temel alınarak restoran keşfini kişiselleştiren patentli makine öğrenmesi algoritmaları.\n\n**4. Fintech & Güvenlik**\n\n**Ödemeler:**\n\nStripe Connect veya Adyen aracılığıyla entegrasyon (pazar yerleri için sektör standardı).\n\n**Güvenlik:**\n\nÖdeme verilerinin korunması için PCI DSS uyumluluğu ve iletilen tüm verilerin uçtan uca SSL/TLS şifrelemesi.\n\n**5. Altyapı**\n\n**Bulut:**\n\nAWS (Amazon Web Services) veya Google Cloud üzerinde barındırma.\n\n**Ölçeklenebilirlik:**\n\nTrafik yoğunluklarında otomatik ölçeklendirmeyi sağlayan Docker ve Kubernetes kullanımı.",
    faq10Question:
      "ChefNet'i Yelp, OpenTable ve Grubhub gibi rakip platformlardan ayıran temel farklar nelerdir?",
    faq10Answer:
      "ChefNet, misafir yolculuğunu baştan sona birleştirir: ilk fikirden ödemeye kadar.\n\nMevcut platformlar tek sorun çözer: Yelp bir rehber, OpenTable rezervasyon aracı, Grubhub teslimatçıdır. ChefNet, «nereye gidelim?» anından ödemeye kadar tüm adımlarda sürtüşmeleri ortadan kaldırarak eksiksiz bir deneyim sunar.\n\nBeş temel avantajımız:\n\n**1. Filtre yerine Yapay Zeka Konserjesi (vs. Yelp/TripAdvisor)**\n\n**Diğerleri:** Kullanıcılar saatlerce yorum okur, filtre ayarlar.\n\n**Biz:** Aşırı kişiselleştirme. YA asistanı, ruh halinizi, bütçenizi ve geçmişinizi anlar – saniyelerde lezzet tutkunu bir arkadaş tavsiyesi gibi mükemmel mekanı gösterir.\n\n**2. Sorunsuz ödeme çözümleri (vs. OpenTable)**\n\n**Diğerleri:** Uygulama rezervasyonda biter; hesap için garson beklenir.\n\n**Biz:** Masada Ödeme. Tümleşik akış: rezervasyon → sipariş → ödeme → tek dokunuşla böl. Restoranlar daha fazla konuk ağırlar.\n\n**3. Sosyal yemek deneyimi (vs. Grubhub/Uber Eats)**\n\n**Diğerleri:** Yalnızlık içinde teslimat odaklı tüketim.\n\n**Biz:** Paylaşımlı mutluluk. Ortak planlama: restoran oylaması, gastronomi etkinlikleri için bilet alma, davet gönderme – yemeğin toplumsal boyutunu diriltiyoruz.\n\n**4. Adil gelir modeli**\n\n**Diğerleri:** Aşırı komisyonlar (%30'a varan teslimat payları), her ziyaret için ücret.\n\n**Biz:** SaaS + FinTech. CRM/analytics araçları abonelikle; gelir temeli finansal işlemlerden – ortaklarımızı zorlamadan.\n\n**5. Canlı içeriklerle güven (vs. TripAdvisor)**\n\n**Diğerleri:** Botlar tarafından yazılan metinler; abartılı fotoğraflar.\n\n**Biz:** Gerçeklik videoda. Profillerdeki kısa videolar (Stories/Reels) filtresiz atmosfer ve lezzetleri gösterir. Arkadaşlarınızı veya food blogcularını takip ederek keşfi eğlenceye dönüştürün.",
    contactTitle: "Questions?",
    contactSubtitle: "Here to help",
    contactButton: "Contact",
    footerTagline:
      "Restoran yeniliklerinin dünyasında rehberiniz",
    footerContacts: "İletişim",
    footerEmail: "support@chefnet.ai",
    footerPhone: "+1 (917) 332-8053",
    footerAddress:
      "ChefNet LLC\nThe Green STE B\nDover, DE 19901",
    footerNewsletter: "Haberler",
    footerNewsletterDesc:
      "En son haberler ve fırsatlardan haberdar olmak için takipte kalın.",
    footerNewsletterPlaceholder: "Email",
    footerNewsletterButton: "Abone Ol",
    footerPrivacyPolicy: "Gizlilik Politikası",
    footerCopyright:
      "© 2026 ChefNet LLC. Tüm hakları saklıdır.",
    partnersOpportunitiesTitle: "Opportunities",
    opportunityCard1Title: "Dashboard",
    opportunityCard1Desc: "Track shares",
    opportunityCard2Title: "AI Companion",
    opportunityCard2Desc: "Publishes news",
    opportunityCard3Title: "Referral",
    opportunityCard3Desc: "Increase stake",
    opportunityCard4Title: "Extended",
    opportunityCard4Desc: "Additional opportunities",
    opportunityCard5Title: "Fundraising",
    opportunityCard5Desc: "Early rounds",
    opportunityCard6Title: "Legal",
    opportunityCard6Desc: "Delaware, USA",

    // Partners Section
    partnersTitle: "Ortaklar İçin Fırsatlar",
    partner1Title: "Şirketin ortaklarından biri olun",
    partner1Desc:
      "Kuruluş aşamasında bize katılın, böylece ChefNet paylarınız halka arzda şirket hissesine dönüştürülsün.",
    partner2Title: "Ortaklık Programı",
    partner2Desc:
      "Yatırım toplama aşamasında yeni ortaklar davet ederek payınızı artırabileceğiniz klasik bir model. Ne kadar çok katkıda bulunursanız, o kadar büyük pay sahibi olursunuz. Tamamen şeffaf ve basit.",
    partner3Title: "Finansman Döngüleri",
    partner3Desc:
      "ChefNet'in her gelişim aşamasıyla birlikte paylarınızın değeri artar.",
    partner4Title: "Ortak Paneli",
    partner4Desc:
      "Ortaklık Programı kapsamında satın alınan ve kazanılan payların takibi.",
    partner5Title: "Yapay zekâ arkadaşınız,",
    partner5Desc:
      "şirket haberlerini ve restoran sektöründeki küresel trendleri yayınlar, sorularınızı yanıtlar ve isteklerinizi yerine getirir.",
    partner6Title: "Genişletilmiş Yönlendirme Programı",
    partner6Desc:
      "Uygulama yayınlandıktan sonra mevcut ağınızı monetize etme fırsatı elde edersiniz. Ayrıca yeni kullanıcılar ve restoranlar yönlendirerek ve ekosistemi geliştirerek ödüllendirilirsiniz.",
    partner7Title: "Yatırım toplama",
    partner7Desc:
      "Erken yatırım turlarına katılmak, en uygun fiyatlarla hisse edinme ve şirket halka arz olduktan sonra Detayları gör hisse alma fırsatı sunar.",
    partner8Title: "Sağlam ve sıkı bir yasal çerçeve",
    partner8Desc:
      "Şirketin ABD'nin Delaware eyaletinde kayıtlı olması, ciddi niyetleri kanıtlar ve Amerikan standartlarına uygun şeffaf hukuki ve finansal raporlamayı sağlar.",

    // Why ChefNet Section
    whyChefNetTitle: "Neden ChefNet?",
    whyCard1Title: "ChefNet — yeni nesil bir ekosistem",
    whyCard1Desc:
      "Yapay zekâ aracılığıyla kullanıcıları ve işletmeleri birleştiriyor, mutfak kültürünü akıllıca ve kolaylaştırıcı kılıyoruz.",
    whyCard2Title: "Bir Mutfak Sosyal Ağı",
    whyCard2Desc:
      "Kullanıcılardan ve şeflerden içerik: fotoğraf, video, yorumlar ve tarifler.\nDünyanın önde gelen şeflerinden canlı yayınlar ve mutfak dersleri.",
    whyCard3Title: "ChefNet Platformu",
    whyCard3Desc:
      "Mutfak kültürüne olan tutkuunu teknolojiye buluştuğu bir platform.",
    whyCard4Title: "Restoranlar için çalışan teknoloji",
    whyCard4Line1:
      "Akıllı arayüzler ortalama müşteri harcamasını artırır.",
    whyCard4Line2:
      "Yapay zekâ maliyetleri düşürür ve tahminleri iyileştirir.",
    whyCard4Line3:
      "ChefNet, restoranların Detayları gör kazanmasına - çekeve değil - yardımcı olur.",
    whyCard5Title:
      "Restoranlara destek vermek, ChefNet'in misyonunun bir parçası",
    whyCard5Line1:
      "Yenileme, modernizasyon veya yeni açılışlar için finansman sağlamaya kadar, ayrıca doğru insanların mekanınızı keşfetmesini sağlamak için pazarlama desteği sunar.",
    whyCard5Line2:
      "ChefNet, restoranların sadece işlemesine değil, büyümelerine ve gelişmelerine do yardımcı olan bir hizmettir.",
    whyCard6Title: "Yapay zekâ arkadaşınızla kişiselleştirme",
    whyCard6Line1:
      "Damak zevkinize, ruh halinize ve durumunuza göre kesin öneriler.\nAnında rezervasyon ve hazır rota.",
    whyCard6Line2:
      "Dinamik menüler, sesli senaryolar ve uyarlanabilir öneriler — hepsi seçiminizi gerçekten kolay kılarsınız.",
  },
};

export const getTranslation = (
  lang: Language,
  key: keyof TranslationKeys,
): string => {
  return translations[lang][key] || translations.en[key];
};