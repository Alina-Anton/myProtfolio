"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { haptic } from "@/lib/haptics";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="work-section" aria-label="Projects">
      <motion.div
        className="work-intro"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>Welcome to {siteConfig.name}&apos;s portfolio</h1>
        <p>Projects you can open, explore, and experience across all devices</p>
      </motion.div>

      <div className="filter-row" role="toolbar" aria-label="Filter projects">
        {categories.map((cat) => {
          const chipClass = [
            "filter-chip",
            filter === cat ? "is-active" : "",
            cat === "All" ? "filter-chip-all" : "",
            cat === "Education" ? "filter-chip-education" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={cat}
              type="button"
              className={chipClass}
              onClick={() => {
                haptic.select();
                setFilter(cat);
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="project-grid">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
