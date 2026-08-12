"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getCategoryAccent, type Project } from "@/lib/projects";
import { haptic } from "@/lib/haptics";

export function ProjectDetail({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [scrollMetrics, setScrollMetrics] = useState({
    progress: 0,
    thumbRatio: 1,
    canScroll: false,
  });
  const shotGridRef = useRef<HTMLDivElement>(null);
  const draggingThumb = useRef(false);
  const hasWalkthroughVideo = /^https?:\/\//.test(project.demoVideo);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % project.screenshots.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null
            ? null
            : (i - 1 + project.screenshots.length) % project.screenshots.length,
        );
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, project.screenshots.length]);

  useEffect(() => {
    const grid = shotGridRef.current;
    if (!grid) return;

    let frame = 0;

    const updateCenter = () => {
      const tiles = grid.querySelectorAll<HTMLElement>(".shot-tile");
      if (!tiles.length) return;

      const mid = grid.getBoundingClientRect().left + grid.clientWidth / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      tiles.forEach((tile, index) => {
        const rect = tile.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });

      setCenterIndex((current) => (current === best ? current : best));
    };

    const updateScrollbar = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      const canScroll = maxScroll > 1;
      const thumbRatio = canScroll
        ? Math.min(1, grid.clientWidth / grid.scrollWidth)
        : 1;
      const progress = canScroll ? grid.scrollLeft / maxScroll : 0;

      setScrollMetrics({
        progress,
        thumbRatio: Math.max(0.18, thumbRatio),
        canScroll,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        updateCenter();
        updateScrollbar();
      });
    };

    updateCenter();
    updateScrollbar();
    grid.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      grid.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [project.screenshots]);

  const scrollFromThumbPosition = (clientX: number, track: HTMLElement) => {
    const grid = shotGridRef.current;
    if (!grid) return;

    const rect = track.getBoundingClientRect();
    const thumbWidth = rect.width * scrollMetrics.thumbRatio;
    const usable = Math.max(1, rect.width - thumbWidth);
    const x = Math.min(
      Math.max(clientX - rect.left - thumbWidth / 2, 0),
      usable,
    );
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    grid.scrollLeft = (x / usable) * maxScroll;
  };

  return (
    <article
      className="project-detail"
      style={{
        ["--project-accent" as string]: getCategoryAccent(project.category),
      }}
    >
      <div className="project-detail-hero">
        <Link
          href="/#work"
          className="back-link"
          onClick={() => haptic.tap()}
        >
          ← All projects
        </Link>

        <motion.div
          className="project-detail-intro"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="detail-copy">
            <h1>{project.name}</h1>
            <p className="detail-tagline">{project.tagline}</p>
            <p className="detail-desc">{project.longDescription}</p>
            <p className="detail-stack">
              Stack: {project.stack.join(", ")}
            </p>
          </div>
          <div className="detail-actions">
            <a
              href={project.liveUrl}
              className="detail-action-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic.tap()}
            >
              Try it live
            </a>
            {hasWalkthroughVideo ? (
              <a
                href={project.demoVideo}
                className="detail-action-link is-secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.tap()}
              >
                Watch preview
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>

      <section className="shots-section" aria-labelledby="shots-heading">
        <div className="section-head compact">
          <h2 id="shots-heading">In the product</h2>
          <p>Scroll sideways — the center frame expands. Tap to enlarge.</p>
        </div>

        <div className="shot-scroller">
          <div className="shot-grid" ref={shotGridRef}>
            {project.screenshots.map((src, i) => (
              <button
                key={src}
                type="button"
                className={
                  centerIndex === i ? "shot-tile is-center" : "shot-tile"
                }
                aria-current={centerIndex === i ? "true" : undefined}
                aria-label={`View ${project.name} screenshot ${i + 1}`}
                onClick={() => {
                  haptic.select();
                  setLightboxIndex(i);
                }}
              >
                <Image
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  width={360}
                  height={640}
                />
              </button>
            ))}
          </div>

          {scrollMetrics.canScroll ? (
            <div
              className="shot-scrollbar"
              role="scrollbar"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(scrollMetrics.progress * 100)}
              aria-label="Screenshot gallery"
              onPointerDown={(event) => {
                const track = event.currentTarget;
                draggingThumb.current = true;
                track.setPointerCapture(event.pointerId);
                scrollFromThumbPosition(event.clientX, track);
              }}
              onPointerMove={(event) => {
                if (!draggingThumb.current) return;
                scrollFromThumbPosition(event.clientX, event.currentTarget);
              }}
              onPointerUp={(event) => {
                draggingThumb.current = false;
                event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => {
                draggingThumb.current = false;
              }}
            >
              <div
                className="shot-scrollbar-thumb"
                style={{
                  width: `${scrollMetrics.thumbRatio * 100}%`,
                  left: `${scrollMetrics.progress * (1 - scrollMetrics.thumbRatio) * 100}%`,
                }}
              />
            </div>
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            key="shot-lightbox"
            className="shot-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} screenshot ${lightboxIndex + 1}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="shot-lightbox-close"
              aria-label="Close screenshot"
              onClick={() => {
                haptic.tap();
                setLightboxIndex(null);
              }}
            >
              ×
            </button>
            <motion.div
              className="shot-lightbox-frame"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={project.screenshots[lightboxIndex]}
                alt={`${project.name} screenshot ${lightboxIndex + 1}`}
                width={1080}
                height={1920}
                className="shot-lightbox-image"
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
