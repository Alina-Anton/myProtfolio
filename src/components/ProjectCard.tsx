"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { haptic } from "@/lib/haptics";

export function ProjectCard({
  project,
  index,
  arrowActive = false,
  onArrowIntent,
}: {
  project: Project;
  index: number;
  arrowActive?: boolean;
  onArrowIntent?: (slug: string | null) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={arrowActive ? "project-item is-arrow-active" : "project-item"}
      data-project-slug={project.slug}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ ["--project-accent" as string]: project.accent }}
      onPointerEnter={() => onArrowIntent?.(project.slug)}
      onPointerLeave={() => onArrowIntent?.(null)}
      onFocusCapture={() => onArrowIntent?.(project.slug)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onArrowIntent?.(null);
        }
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-link"
        onClick={() => haptic.open()}
      >
        <Image
          src={project.logo}
          alt={`${project.name} logo`}
          width={72}
          height={72}
          className="project-logo"
        />
        <div className="project-heading-main">
          <div className="project-heading-text">
            <p className="project-category">{project.category}</p>
            <h3 className="project-name">{project.name}</h3>
          </div>
          <span className="project-heading-arrow" aria-hidden>
            &gt;
          </span>
        </div>
        <p className="project-desc">{project.description}</p>
      </Link>
    </motion.article>
  );
}
