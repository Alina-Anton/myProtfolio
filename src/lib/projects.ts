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
  liveUrl?: string;
  repoUrl?: string;
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "codequest",
    name: "CodeQuest",
    tagline: "Learn to code through quests and challenges.",
    description:
      "An interactive learning adventure that turns programming concepts into quests, levels, and rewards — built for curious beginners and weekend warriors.",
    longDescription:
      "CodeQuest gamifies the path from first variable to working apps. Learners unlock chapters, complete bite-sized challenges, and track progress with a clean quest map. The experience prioritizes momentum: short loops, clear feedback, and demos you can open in one tap.",
    category: "Education",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    year: "2025",
    accent: "#0F766E",
    logo: "/projects/codequest/logo.svg",
    demoVideo: "/projects/codequest/demo.mp4",
    screenshots: [
      "/projects/codequest/shot-1.svg",
      "/projects/codequest/shot-2.svg",
      "/projects/codequest/shot-3.svg",
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
      "A calm journal that maps moods onto color, place, and time — helping you spot patterns without the noise of a heavy wellness app.",
    longDescription:
      "moodMap turns daily check-ins into a living atlas of emotion. Soft interactions, private by default, and designed for glanceable reflection. Filter by week, place, or energy level and watch your personal weather become visible.",
    category: "Wellness",
    stack: ["React", "Firebase", "Charts", "PWA"],
    year: "2025",
    accent: "#0369A1",
    logo: "/projects/moodmap/logo.svg",
    demoVideo: "/projects/moodmap/demo.mp4",
    screenshots: [
      "/projects/moodmap/shot-1.svg",
      "/projects/moodmap/shot-2.svg",
      "/projects/moodmap/shot-3.svg",
    ],
    features: [
      "Color-coded mood atlas",
      "Private encrypted notes",
      "Pattern insights",
      "Offline-friendly PWA",
    ],
  },
  {
    slug: "luckpick",
    name: "LuckPick",
    tagline: "Fair picks, fun spins, zero stress.",
    description:
      "A decision helper for groups and solo moments — randomize, weight options, and settle choices with delightful motion.",
    longDescription:
      "LuckPick is a lightweight picker for teams, friends, and indecisive nights. Create lists, set weights, spin with haptic feedback, and share results. Built to feel playful without looking gimmicky.",
    category: "Lifestyle",
    stack: ["Next.js", "Framer Motion", "Firestore"],
    year: "2024",
    accent: "#B45309",
    logo: "/projects/luckpick/logo.svg",
    demoVideo: "/projects/luckpick/demo.mp4",
    screenshots: [
      "/projects/luckpick/shot-1.svg",
      "/projects/luckpick/shot-2.svg",
      "/projects/luckpick/shot-3.svg",
    ],
    features: [
      "Weighted random picks",
      "Shareable result links",
      "Haptic spin feedback",
      "Group session mode",
    ],
  },
  {
    slug: "jens-collective",
    name: "Jen's Collective",
    tagline: "A boutique collective for makers and makerspaces.",
    description:
      "Brand site and member hub for Jen's Collective — showcasing craft, events, and a warm community storefront experience.",
    longDescription:
      "Jen's Collective needed a presence that feels handmade yet polished. The site highlights artisans, upcoming gatherings, and featured drops with editorial pacing and easy mobile browsing.",
    category: "Wellness",
    stack: ["Next.js", "CMS", "Stripe", "Firebase"],
    year: "2024",
    accent: "#9F1239",
    logo: "/projects/jens-collective/logo.svg",
    demoVideo: "/projects/jens-collective/demo.mp4",
    screenshots: [
      "/projects/jens-collective/shot-1.svg",
      "/projects/jens-collective/shot-2.svg",
      "/projects/jens-collective/shot-3.svg",
    ],
    features: [
      "Member & maker profiles",
      "Event calendar",
      "Featured drops gallery",
      "Responsive storefront",
    ],
  },
  {
    slug: "recipehub",
    name: "recipeHub",
    tagline: "Cook better with shared kitchens.",
    description:
      "A collaborative recipe library with step timing, shopping lists, and kitchen-mode UI that stays readable from arm’s length.",
    longDescription:
      "recipeHub helps home cooks collect, remix, and share recipes without the clutter. Kitchen mode boosts contrast and type size; shopping lists sync across devices via Firebase.",
    category: "Lifestyle",
    stack: ["React", "Firebase", "Auth", "Storage"],
    year: "2025",
    accent: "#15803D",
    logo: "/projects/recipehub/logo.svg",
    demoVideo: "/projects/recipehub/demo.mp4",
    screenshots: [
      "/projects/recipehub/shot-1.svg",
      "/projects/recipehub/shot-2.svg",
      "/projects/recipehub/shot-3.svg",
    ],
    features: [
      "Shared recipe collections",
      "Kitchen display mode",
      "Smart shopping lists",
      "Step timers & notes",
    ],
  },
  {
    slug: "nestcare",
    name: "NestCare",
    tagline: "Care coordination for modern households.",
    description:
      "Schedules, reminders, and shared care notes for families and caregivers — calm UI, clear urgency, zero clutter.",
    longDescription:
      "NestCare keeps households aligned on medications, appointments, and daily care tasks. Role-aware views, gentle reminders, and a trustworthy visual language designed for stressed moments.",
    category: "Wellness",
    stack: ["Next.js", "Firebase", "Notifications", "Auth"],
    year: "2025",
    accent: "#1D4ED8",
    logo: "/projects/nestcare/logo.svg",
    demoVideo: "/projects/nestcare/demo.mp4",
    screenshots: [
      "/projects/nestcare/shot-1.svg",
      "/projects/nestcare/shot-2.svg",
      "/projects/nestcare/shot-3.svg",
    ],
    features: [
      "Shared care calendar",
      "Role-based access",
      "Gentle reminder system",
      "Secure notes & history",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
