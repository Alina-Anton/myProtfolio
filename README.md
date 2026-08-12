# Alina Portfolio

Professional Next.js portfolio for demoing projects in one place — responsive, animated, themeable, and ready for Firebase Hosting + Firestore.

## Projects included

- CodeQuest
- moodMap
- LuckPick
- Jen's Collective
- recipeHub
- NestCare

Each project page supports a logo, demo video, screenshots, and description.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion animations
- Light / Dark / System mode + accent color picker
- Mobile vibration (`navigator.vibrate`) on key interactions
- Firebase Hosting, Firestore, and Storage

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replace media

For each project under `public/projects/<slug>/`:

1. Replace `logo.svg` with your real logo
2. Add `demo.mp4` (short demo reel)
3. Replace `shot-1.svg` … `shot-3.svg` with real screenshots (`.png` / `.jpg` / `.webp`)
4. If you change filenames, update paths in `src/lib/projects.ts`

## Theme controls

Header **Theme** panel:

- Light / Dark / Auto
- Accent hue slider + presets (persisted in `localStorage`)

## Firebase setup

1. Create a Firebase project
2. Enable **Hosting**, **Firestore**, and **Storage**
3. Copy `.env.example` → `.env.local` and paste your web app config
4. Update `.firebaserc` with your project id
5. Deploy rules + site:

```bash
npm run build
npx firebase login
npx firebase deploy
```

Optional: seed project documents to Firestore:

```bash
npx tsx scripts/seed-firestore.ts
```

> Until Firebase env vars are set, the site uses local project data in `src/lib/projects.ts`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Static export to `out/` |
| `npm run start` | Not used with static export; prefer `npx serve out` |
| `npm run deploy` | Build + Firebase Hosting deploy |

## Customize

- Brand name / contact: `src/lib/site.ts`
- Project content: `src/lib/projects.ts`
- Visual system: `src/app/globals.css`
