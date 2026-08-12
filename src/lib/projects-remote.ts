import { collection, getDocs } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { projects as localProjects, type Project } from "@/lib/projects";

/** Prefer Firestore when configured; otherwise use local project data. */
export async function loadProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured()) return localProjects;

  const db = getDb();
  if (!db) return localProjects;

  try {
    const snap = await getDocs(collection(db, "projects"));
    if (snap.empty) return localProjects;

    const remote = snap.docs.map((doc) => {
      const data = doc.data() as Partial<Project>;
      return {
        ...localProjects.find((p) => p.slug === doc.id),
        ...data,
        slug: data.slug ?? doc.id,
      } as Project;
    });

    return remote.length ? remote : localProjects;
  } catch {
    return localProjects;
  }
}
