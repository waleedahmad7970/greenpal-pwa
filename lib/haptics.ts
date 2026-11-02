export const HAPTICS_KEY = "greenpal-haptics";

export function hapticsEnabled() {
  try {
    return localStorage.getItem(HAPTICS_KEY) !== "off";
  } catch {
    return true;
  }
}

export function tap(ms = 8) {
  if (typeof navigator !== "undefined" && hapticsEnabled()) navigator.vibrate?.(ms);
}
