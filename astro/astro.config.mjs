import { defineConfig } from "astro/config";

// Phase 1: static output for the marketing/content layer. SSR adapter (Netlify)
// + React islands are added in the phase that ports auth/portal/admin/payments.
export default defineConfig({
  site: "https://tolucalakechamber.com",
});
