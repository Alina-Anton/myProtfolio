"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { haptic } from "@/lib/haptics";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="project-item"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ ["--project-accent" as string]: project.accent }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-link"
        onClick={() => haptic.open()}
      >
        <div className="project-media">
          <Image
            src={project.logo}
            alt={`${project.name} logo`}
            width={72}
            height={72}
            className="project-logo"
          />
          <span className="project-year">{project.year}</span>
        </div>
        <div className="project-body">
          <p className="project-category">{project.category}</p>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-desc">{project.description}</p>
          <span className="project-cta">
            View demo
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
