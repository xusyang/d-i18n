/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_LOWCODE_ENTRY: string
  readonly VITE_BUILD_COMPRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
