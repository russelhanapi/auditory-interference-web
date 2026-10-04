/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_PIN?: string;
  readonly VITE_SPOTIFY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
