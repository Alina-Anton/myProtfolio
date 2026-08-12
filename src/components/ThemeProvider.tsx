"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: "light" | "dark";
  accentHue: number;
  setMode: (mode: ThemeMode) => void;
  setAccentHue: (hue: number) => void;
  cycleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MODE_KEY = "portfolio-theme-mode";
const HUE_KEY = "portfolio-accent-hue";

type ThemeStore = {
  mode: ThemeMode;
  accentHue: number;
};

let store: ThemeStore = { mode: "system", accentHue: 168 };
const SERVER_STORE_SNAPSHOT: ThemeStore = { mode: "system", accentHue: 168 };
let didHydrateStore = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribeStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readStoredTheme(): ThemeStore {
  try {
    const storedMode = localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const storedHue = Number(localStorage.getItem(HUE_KEY));
    return {
      mode:
        storedMode === "light" ||
        storedMode === "dark" ||
        storedMode === "system"
          ? storedMode
          : "system",
      accentHue: Number.isFinite(storedHue) ? storedHue : 168,
    };
  } catch {
    return { mode: "system", accentHue: 168 };
  }
}

function getStoreSnapshot(): ThemeStore {
  if (!didHydrateStore) {
    store = readStoredTheme();
    didHydrateStore = true;
  }
  return store;
}

function getServerSnapshot(): ThemeStore {
  return SERVER_STORE_SNAPSHOT;
}

function writeStore(partial: Partial<ThemeStore>) {
  store = { ...store, ...partial };
  try {
    localStorage.setItem(MODE_KEY, store.mode);
    localStorage.setItem(HUE_KEY, String(store.accentHue));
  } catch {
    // ignore storage failures
  }
  emit();
}

function subscribeSystem(listener: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

function getSystemSnapshot(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSystemServerSnapshot(): "light" | "dark" {
  return "light";
}

function applyTheme(resolved: "light" | "dark", hue: number) {
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.style.setProperty("--accent-hue", String(hue));
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(
    subscribeStore,
    getStoreSnapshot,
    getServerSnapshot,
  );
  const systemTheme = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getSystemServerSnapshot,
  );

  const resolved =
    preference.mode === "system" ? systemTheme : preference.mode;

  useEffect(() => {
    applyTheme(resolved, preference.accentHue);
  }, [resolved, preference.accentHue]);

  const setMode = useCallback((mode: ThemeMode) => {
    writeStore({ mode });
  }, []);

  const setAccentHue = useCallback((hue: number) => {
    writeStore({
      accentHue: Math.min(360, Math.max(0, Math.round(hue))),
    });
  }, []);

  const cycleMode = useCallback(() => {
    const order: ThemeMode[] = ["light", "dark", "system"];
    const index = order.indexOf(store.mode);
    writeStore({ mode: order[(index + 1) % order.length] });
  }, []);

  const value = useMemo(
    () => ({
      mode: preference.mode,
      resolved,
      accentHue: preference.accentHue,
      setMode,
      setAccentHue,
      cycleMode,
    }),
    [
      preference.mode,
      preference.accentHue,
      resolved,
      setMode,
      setAccentHue,
      cycleMode,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
