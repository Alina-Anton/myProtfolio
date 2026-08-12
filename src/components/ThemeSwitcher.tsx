"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, type ThemeMode } from "@/components/ThemeProvider";
import { haptic } from "@/lib/haptics";

const modes: { id: ThemeMode; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "Auto" },
];

export function ThemeSwitcher() {
  const { mode, setMode, accentHue, setAccentHue } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target || !rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("touchstart", closeOnOutside, { passive: true });
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("touchstart", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Theme and color controls"
        className="theme-trigger"
        onClick={() => {
          haptic.tap();
          setOpen((v) => !v);
        }}
      >
        <span className="theme-swatch" aria-hidden />
        <span>Theme</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="theme-panel"
            role="dialog"
            aria-label="Appearance"
          >
            <p className="theme-panel-label">Appearance</p>
            <div className="theme-mode-row" role="group" aria-label="Mode">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={mode === item.id ? "is-active" : undefined}
                  onClick={() => {
                    haptic.select();
                    setMode(item.id);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <label className="theme-panel-label" htmlFor="accent-hue">
              Accent color
            </label>
            <div className="hue-row">
              <input
                id="accent-hue"
                type="range"
                min={0}
                max={360}
                value={accentHue}
                onChange={(e) => {
                  haptic.tap();
                  setAccentHue(Number(e.target.value));
                }}
                className="hue-slider"
                aria-valuetext={`Hue ${accentHue}`}
              />
              <span className="hue-value">{accentHue}°</span>
            </div>
            <div className="hue-presets" role="group" aria-label="Accent presets">
              {[168, 200, 28, 340, 145, 255].map((hue) => (
                <button
                  key={hue}
                  type="button"
                  aria-label={`Accent hue ${hue}`}
                  className="hue-preset"
                  style={{ background: `hsl(${hue} 72% 42%)` }}
                  onClick={() => {
                    haptic.select();
                    setAccentHue(hue);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
