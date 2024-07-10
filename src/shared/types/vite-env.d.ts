/// <reference types="vite/client" />
declare module "*?base64" {
  const content: string;
  export default content;
}

declare module "*&imagetools" {
  /**
   * actual types
   * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
   * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
   */
  const out;
  export default out;
}
