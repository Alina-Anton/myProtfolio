"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { Project } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { haptic } from "@/lib/haptics";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const ratiosRef = useRef(new Map<string, number>());
  const [scrollActive, setScrollActive] = useState<string | null>(null);
  const [pointerActive, setPointerActive] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const arrowActive = pointerActive ?? scrollActive;

  useEffect(() => {
    ratiosRef.current.clear();
    setScrollActive(null);

    const root = gridRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-project-slug]");
    if (!cards.length) return;

    const pickBest = () => {
      let bestSlug: string | null = null;
      let bestRatio = 0.4;
      for (const [slug, ratio] of ratiosRef.current) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestSlug = slug;
        }
      }
      setScrollActive(bestSlug);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.getAttribute("data-project-slug");
          if (!slug) continue;
          ratiosRef.current.set(
            slug,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        pickBest();
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-35% 0px -35% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section id="work" className="work-section" aria-label="Projects">
      <motion.div
        className="work-intro"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="work-intro-top">
          <h1>Welcome to {siteConfig.name}&apos;s portfolio</h1>
          <ThemeSwitcher />
        </div>
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

      <div className="project-grid" ref={gridRef}>
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            arrowActive={arrowActive === project.slug}
            onArrowIntent={setPointerActive}
          />
        ))}
      </div>
    </section>
  );
}
