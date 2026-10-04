import { CONFIG } from "./config";

const FIRST_PLAY_KEY = "auditoryInterferenceSpotifyFirstPlay";
const FALLBACK_MS = 1500;
const SPOTIFY_KINDS = ["track", "playlist", "album", "artist", "episode", "show"];

function isHandheld(): boolean {
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return true;
  }
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

function toSpotifyUri(webUrl: string): string | null {
  try {
    const url = new URL(webUrl);
    const host = url.hostname;
    if (host !== "spotify.com" && !host.endsWith(".spotify.com")) {
      return null;
    }
    const parts = url.pathname.split("/").filter(Boolean);
    const index = parts.findIndex((part) => SPOTIFY_KINDS.includes(part));
    const id = index === -1 ? undefined : parts[index + 1];
    if (index === -1 || !id) {
      return null;
    }
    return `spotify:${parts[index]}:${id}`;
  } catch {
    return null;
  }
}

function replaceWeb(): void {
  window.location.replace(CONFIG.spotifyUrl);
}

export function redirectToSpotify(): void {
  if (localStorage.getItem(FIRST_PLAY_KEY) !== null) {
    replaceWeb();
    return;
  }
  localStorage.setItem(FIRST_PLAY_KEY, "1");
  if (!isHandheld()) {
    replaceWeb();
    return;
  }
  const uri = toSpotifyUri(CONFIG.spotifyUrl);
  if (!uri) {
    replaceWeb();
    return;
  }
  const timer = window.setTimeout(() => {
    if (document.visibilityState === "visible") {
      replaceWeb();
    }
  }, FALLBACK_MS);
  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  window.location.href = uri;
}
