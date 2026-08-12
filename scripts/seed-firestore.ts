import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { projects } from "../src/lib/projects";

/**
 * Seeds the Firestore `projects` collection from local data.
 * Run: npx tsx scripts/seed-firestore.ts
 * Requires .env.local with Firebase web config + a service that allows writes,
 * or temporarily open write rules during seeding.
 */
async function main() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!config.apiKey || !config.projectId) {
    throw new Error("Missing Firebase env vars. Copy .env.example to .env.local first.");
  }

  const app = initializeApp(config);
  const db = getFirestore(app);

  for (const project of projects) {
    await setDoc(doc(db, "projects", project.slug), project, { merge: true });
    console.log(`Seeded ${project.slug}`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
