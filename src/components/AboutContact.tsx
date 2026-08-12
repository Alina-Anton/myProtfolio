"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AboutContact() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <motion.div
        className="about-inner"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
      >
        <h2 id="about-heading">About</h2>
        <p>
          This portfolio is built to demonstrate product work the way people
          actually browse it — fast to scan, easy to open, and pleasant on a
          phone in one hand. Theme, accent color, and motion are part of the
          craft, not decoration bolted on later.
        </p>
      </motion.div>
    </section>
  );
}
