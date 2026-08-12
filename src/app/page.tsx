import { AboutContact } from "@/components/AboutContact";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <ProjectGrid projects={projects} />
      <AboutContact />
    </>
  );
}
