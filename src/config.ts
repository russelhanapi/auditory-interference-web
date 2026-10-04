/**
 * Site configuration, injected at build time from VITE_ACCESS_PIN and VITE_SPOTIFY_URL.
 * accessPin must contain exactly four digits.
 */
export const CONFIG = {
  accessPin: import.meta.env.VITE_ACCESS_PIN ?? "",
  spotifyUrl: import.meta.env.VITE_SPOTIFY_URL ?? "",
};
