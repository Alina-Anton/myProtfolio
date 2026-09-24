export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  stack: string[];
  year: string;
  accent: string;
  logo: string;
  demoVideo: string;
  screenshots: string[];
  landscapeScreenshots?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  status?: string;
  features: string[];
};

export const categoryAccents: Record<string, string> = {
  Simulation: "#0369A1",
  Security: "#64748B",
  Operations: "#EAB308",
  Wellness: "#0F766E",
  Lifestyle: "#B45309",
};

export function getCategoryAccent(category: string): string {
  return categoryAccents[category] ?? "#0369A1";
}

export const projects: Project[] = [
  {
    slug: "vendgo",
    name: "VendGo",
    tagline: "Know what's broken. Fix it faster. Stop losing revenue.",
    description:
      "Operations platform for companies that own and service vending machines, air pumps, vacuum stations, and tire-inflation machines — one place to know what's broken, fix it faster, and stop losing revenue.",
    longDescription:
      "VendGO is the operations control center for machine fleets at gas stations, car washes, and similar sites. It connects work that operators otherwise manage through phone calls, spreadsheets, texts, accounting software, and separate apps.\nA typical workflow: a customer finds a broken machine, scans a QR code or texts, VendGO creates an issue, a technician is notified, repairs and parts are recorded, inventory updates, and refunds or credits can flow into QuickBooks. It also watches sales data—if a normally active machine goes silent, VendGO flags it and prioritizes it by estimated lost revenue. Nayax still handles payments and telemetry; VendGO takes that information and runs the operational side: reports, repairs, refunds, parts, and invoicing.",
    category: "Operations",
    stack: ["Next.js", "TypeScript", "React"],
    year: "2026",
    accent: "#EAB308",
    logo: "/projects/vendgo/logo.png",
    demoVideo: "",
    screenshots: [
      "/projects/vendgo/shot-1.png",
      "/projects/vendgo/shot-2.png",
      "/projects/vendgo/shot-3.png",
    ],
    landscapeScreenshots: true,
    status: "In development",
    features: [
      "Issue intake from QR or text",
      "Technician dispatch and parts logging",
      "Silent-machine revenue alerts",
      "Nayax + QuickBooks operations flow",
    ],
  },
  {
    slug: "greymatter",
    name: "GreyMatter",
    tagline: "Agentic security operations from one place.",
    description:
      "Security Operations Platform that sits across your existing tech stack and processes, making every part of your defense agentic from one place.",
    longDescription:
      "Attackers are using AI to gain speed, scale, and the ability to execute sophisticated attacks without deep expertise. GreyMatter allows defenders to harness the power of AI to receive those same benefits.\nDetect threats, run investigations, hunt proactively, and execute response across the entire tech stack at machine speed, in plain language, without requiring expertise in every tool they own.",
    category: "Security",
    stack: ["TypeScript", "React", "ESLint", "Jest"],
    year: "2026",
    accent: "#64748B",
    logo: "/projects/greymatter/logo.png",
    liveUrl: "https://reliaquest.com/request-a-demo/",
    demoVideo:
      "https://reliaquest.com/campaigns/greymatter/what-is-greymatter-the-agentic-ai-secops-platform",
    screenshots: [
      "/projects/greymatter/shot-4.png",
      "/projects/greymatter/shot-3.png",
      "/projects/greymatter/shot-2.png",
      "/projects/greymatter/shot-1.png",
    ],
    landscapeScreenshots: true,
    features: [
      "AI-powered threat detection",
      "Machine-speed investigations",
      "Proactive threat hunting",
      "Cross-stack response",
    ],
  },
  {
    slug: "codequest",
    name: "CodeQuest",
    tagline: "Interactive Frontend Developer Assessment Platform",
    description:
      "Interactive frontend engineering simulation featuring real-world coding challenges focused on debugging, performance optimization, accessibility, and state management.",
    longDescription:
      "CodeQuest turns traditional coding assessments into a short, game-like engineering simulation where developers make real-world technical and product decisions.\nCandidates progress through challenges covering production debugging, React, performance optimization, accessibility, and product trade-offs, finishing with a scored engineering review.\nUnlike a static coding quiz or portfolio project, CodeQuest simulates how a frontend engineer thinks under realistic constraints.",
    category: "Simulation",
    stack: ["TypeScript", "Firebase", "Tailwind", "Vite", "ESLint", "Jest"],
    year: "2025",
    accent: "#0369A1",
    logo: "/projects/codequest/logo.png",
    demoVideo:
      "https://drive.google.com/file/d/1l55vSfaB6E3wCFfWeVWn8enFnVUW2LYn/view?usp=sharing",
    liveUrl: "https://codequestsimulation.web.app/",
    screenshots: [
      "/projects/codequest/shot-1.png",
      "/projects/codequest/shot-2.png",
      "/projects/codequest/shot-3.png",
      "/projects/codequest/shot-4.png",
      "/projects/codequest/shot-5.png",
      "/projects/codequest/shot-6.png",
      "/projects/codequest/shot-7.png",
    ],
    features: [
      "Quest-based learning paths",
      "Live code challenges",
      "Progress & streak tracking",
      "Mobile-first practice mode",
    ],
  },
  {
    slug: "moodmap",
    name: "moodMap",
    tagline: "Visualize how you feel, day by day.",
    description:
      "Self-awareness tool that helps users understand how their daily behaviors, habits, and environments affect their mood.",
    longDescription:
      "MoodMap is a self-awareness tool that helps users understand how their daily behaviors, habits, and environments affect their mood. Unlike traditional mood trackers, MoodMap focuses on pattern detection, actionable insights, and behavioral recommendations to help users improve their mental well-being. It also works as a searchable diary, where users can return to their notes, relive their days, and reflect on what felt important or special.",
    category: "Wellness",
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Firebase Hosting",
      "FCM",
      "Vite",
      "Cloud Firestore",
      "Authentication",
      "Google Cloud",
      "Google Sign-In",
    ],
    year: "2025",
    accent: "#0F766E",
    logo: "/projects/moodmap/logo.png",
    demoVideo: "/projects/moodmap/demo.mp4",
    liveUrl: "https://moodmap-webapp.web.app/",
    screenshots: [
      "/projects/moodmap/shot-1.png",
      "/projects/moodmap/shot-2.png",
      "/projects/moodmap/shot-3.png",
      "/projects/moodmap/shot-4.png",
      "/projects/moodmap/shot-5.png",
      "/projects/moodmap/shot-6.png",
      "/projects/moodmap/shot-7.png",
      "/projects/moodmap/shot-8.png",
      "/projects/moodmap/shot-9.png",
      "/projects/moodmap/shot-10.png",
      "/projects/moodmap/shot-11.png",
    ],
    features: [
      "Color-coded mood atlas",
      "Private encrypted notes",
      "Pattern insights",
      "Offline-friendly PWA",
    ],
  },
  {
    slug: "jens-collective",
    name: "Jen's Collective",
    tagline: "Private community platform for GL West Jiu-Jitsu & Community.",
    description:
      "A private community platform used by my jiu-jitsu school to keep members connected, informed, and engaged through announcements, events, reservations, and member interactions.",
    longDescription:
      "A welcoming place where members stay connected through announcements, events, reservations, and everyday interactions - all in one shared space built for the school community.\nThe platform provides a simple way to share updates, manage events, and strengthen the community in one place. Always rewarding to create something that solves a real need and brings people together.",
    category: "Lifestyle",
    stack: ["React", "TypeScript", "Firebase"],
    year: "2024",
    accent: "#B45309",
    logo: "/projects/jens-collective/logo.png",
    demoVideo: "/projects/jens-collective/demo.mp4",
    liveUrl: "https://jenscollective-2026.web.app/",
    screenshots: [
      "/projects/jens-collective/shot-1.png",
      "/projects/jens-collective/shot-2.png",
      "/projects/jens-collective/shot-3.png",
      "/projects/jens-collective/shot-4.png",
      "/projects/jens-collective/shot-5.png",
      "/projects/jens-collective/shot-6.png",
      "/projects/jens-collective/shot-7.png",
      "/projects/jens-collective/shot-8.png",
      "/projects/jens-collective/shot-9.png",
    ],
    features: [
      "Member & maker profiles",
      "Event calendar",
      "Featured drops gallery",
      "Responsive storefront",
    ],
  },
  {
    slug: "nestcare",
    name: "NestCare",
    tagline: "Care coordination for modern households.",
    description:
      "A trusted, high-standard babysitting platform where families can book certified nannies instantly or in advance with clear availability and calm, reliable booking.",
    longDescription:
      "NestCare is an on-demand childcare platform that connects parents with trusted, certified, and background-checked nannies for immediate or scheduled care. Designed around safety, convenience, and peace of mind, NestCare combines smart matching, real-time availability, live tracking, and seamless booking to make finding reliable childcare as simple as ordering a ride.",
    category: "Wellness",
    stack: ["React", "TypeScript", "Firebase", "Stripe"],
    year: "2025",
    accent: "#0F766E",
    logo: "/projects/nestcare/logo.png",
    demoVideo:
      "https://drive.google.com/file/d/1FWj0JnuHs-lQ8t7CRFzzQ1HCHFB1hyEO/view?usp=drivesdk",
    screenshots: [
      "/projects/nestcare/shot-1.png",
      "/projects/nestcare/shot-2.png",
      "/projects/nestcare/shot-3.png",
      "/projects/nestcare/shot-4.png",
      "/projects/nestcare/shot-5.png",
      "/projects/nestcare/shot-6.png",
      "/projects/nestcare/shot-7.png",
      "/projects/nestcare/shot-8.png",
    ],
    status: "In development",
    features: [
      "Shared care calendar",
      "Role-based access",
      "Gentle reminder system",
      "Secure notes & history",
    ],
  },
  {
    slug: "recipehub",
    name: "recipeHub",
    tagline: "Cook better with shared kitchens.",
    description:
      "Your digital private recipe book — save your own recipes and family favorites in one place to keep traditional cuisine alive across generations.",
    longDescription:
      "recipeHub is a private digital recipe book for saving your own dishes and family favorites in one place. Add real photos of traditional meals, write detailed step-by-step instructions, and keep the recipes that matter close — so home cooking and heritage cuisine can be passed on across generations.",
    category: "Lifestyle",
    stack: ["React", "TypeScript", "Next.js", "Firebase"],
    year: "2025",
    accent: "#B45309",
    logo: "/projects/recipehub/logo.png",
    demoVideo: "/projects/recipehub/demo.mp4",
    liveUrl: "https://recipehub-web.web.app/",
    screenshots: [
      "/projects/recipehub/shot-1.png",
      "/projects/recipehub/shot-2.png",
    ],
    status: "In development",
    features: [
      "Shared recipe collections",
      "Kitchen display mode",
      "Smart shopping lists",
      "Step timers & notes",
    ],
  },
  {
    slug: "luckpick",
    name: "LuckPick",
    tagline: "Fair picks, fun spins, zero stress.",
    description:
      "A fun decision-making application that helps users overcome choice paralysis through customizable spinning wheels and interactive experiences.",
    longDescription:
      "We all face those small daily dilemmas: What should I do today? Where should I go? What should I try next?\nThat’s where LuckPick comes in — turning decision-making into something fun, engaging, and even inspiring.\nLuckPick is a fun app that helps users make everyday decisions by spinning a customizable wheel. Instead of overthinking, you spin and get inspired with new ideas.\nI focused on building a smooth, interactive experience with dynamic state management and a clean, UX-driven design that keeps things simple but engaging.",
    category: "Lifestyle",
    stack: ["React", "TypeScript", "Firebase"],
    year: "2024",
    accent: "#B45309",
    logo: "/projects/luckpick/logo.png",
    demoVideo: "/projects/luckpick/demo.mp4",
    liveUrl: "https://luckpickapp.web.app/",
    screenshots: [
      "/projects/luckpick/shot-1.png",
      "/projects/luckpick/shot-2.png",
      "/projects/luckpick/shot-3.png",
      "/projects/luckpick/shot-4.png",
      "/projects/luckpick/shot-5.png",
    ],
    features: [
      "Weighted random picks",
      "Shareable result links",
      "Haptic spin feedback",
      "Group session mode",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
