"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { haptic } from "@/lib/haptics";

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const reduce = useReducedMotion();
  const [activeShot, setActiveShot] = useState(0);
  const [videoError, setVideoError] = useState(false);

  return (
    <article
      className="project-detail"
      style={{ ["--project-accent" as string]: project.accent }}
    >
      <div className="project-detail-hero">
        <motion.div
          className="project-detail-intro"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/#work" className="back-link" onClick={() => haptic.tap()}>
            ← All projects
          </Link>
          <div className="detail-brand-row">
            <Image
              src={project.logo}
              alt=""
              width={64}
              height={64}
              className="detail-logo"
            />
            <div>
              <p className="project-category">{project.category}</p>
              <h1>{project.name}</h1>
            </div>
          </div>
          <p className="detail-tagline">{project.tagline}</p>
          <p className="detail-desc">{project.longDescription}</p>
          <ul className="stack-list">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="demo-panel"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="panel-label">Demo</p>
          {!videoError ? (
            <video
              className="demo-video"
              controls
              playsInline
              preload="metadata"
              poster={project.screenshots[0]}
              onError={() => setVideoError(true)}
              onPlay={() => haptic.tap()}
            >
              <source src={project.demoVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="demo-fallback">
              <Image
                src={project.screenshots[0]}
                alt={`${project.name} preview`}
                fill
                className="object-cover"
              />
              <p>
                Drop a short MP4 at{" "}
                <code>{project.demoVideo}</code> to enable the demo reel.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <section className="shots-section" aria-labelledby="shots-heading">
        <div className="section-head compact">
          <h2 id="shots-heading">Screenshots</h2>
          <p>Swipe or tap through key frames from the product.</p>
        </div>

        <div className="shot-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShot}
              className="shot-frame"
              initial={reduce ? false : { opacity: 0.4, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.screenshots[activeShot]}
                alt={`${project.name} screenshot ${activeShot + 1}`}
                width={1280}
                height={800}
                className="shot-image"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="shot-thumbs" role="tablist" aria-label="Screenshots">
          {project.screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={activeShot === i}
              className={activeShot === i ? "shot-thumb is-active" : "shot-thumb"}
              onClick={() => {
                haptic.select();
                setActiveShot(i);
              }}
            >
              <Image src={src} alt="" width={220} height={140} />
            </button>
          ))}
        </div>
      </section>

      <section className="features-section" aria-labelledby="features-heading">
        <div className="section-head compact">
          <h2 id="features-heading">Highlights</h2>
          <p>What this build is designed to do well.</p>
        </div>
        <ul className="feature-list">
          {project.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </section>

      <nav className="project-pager" aria-label="Adjacent projects">
        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="pager-link"
            onClick={() => haptic.open()}
          >
            <span>Previous</span>
            <strong>{prev.name}</strong>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="pager-link next"
            onClick={() => haptic.open()}
          >
            <span>Next</span>
            <strong>{next.name}</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}
