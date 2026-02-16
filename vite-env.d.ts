/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JUICE_API_URL: string
  readonly VITE_JUICE_API_KEY: string
  readonly VITE_JUICE_CODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
