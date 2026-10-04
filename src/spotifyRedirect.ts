import { CONFIG } from "./config";

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
  if (!isHandheld()) {
    replaceWeb();
    return;
  }
  const uri = toSpotifyUri(CONFIG.spotifyUrl);
  if (!uri) {
    replaceWeb();
    return;
  }

  let appOpened = false;
  let didRedirect = false;
  let timer = 0;

  const onVisibility = (): void => {
    if (document.visibilityState === "hidden") {
      markOpened();
    }
  };

  const onBlur = (): void => {
    markOpened();
  };

  const onPageHide = (): void => {
    markOpened();
  };

  function cleanup(): void {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("pagehide", onPageHide);
  }

  function markOpened(): void {
    if (appOpened) {
      return;
    }
    appOpened = true;
    window.clearTimeout(timer);
    cleanup();
  }

  timer = window.setTimeout(() => {
    cleanup();
    if (appOpened || didRedirect) {
      return;
    }
    if (document.visibilityState === "hidden" || !document.hasFocus()) {
      return;
    }
    didRedirect = true;
    replaceWeb();
  }, FALLBACK_MS);

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("blur", onBlur);
  window.addEventListener("pagehide", onPageHide);
  window.location.href = uri;
}
