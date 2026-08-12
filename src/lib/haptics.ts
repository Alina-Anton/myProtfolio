/** Light haptic feedback for supported mobile browsers. */
export function vibrate(pattern: number | number[] = 12) {
  if (typeof navigator === "undefined") return;
  if (!("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Silently ignore unsupported / blocked vibration
  }
}

export const haptic = {
  tap: () => vibrate(10),
  select: () => vibrate([8, 30, 12]),
  success: () => vibrate([12, 40, 12, 40, 20]),
  open: () => vibrate([14, 28, 18]),
} as const;
