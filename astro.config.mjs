// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { currentSite } from "./src/data/sites.ts";

// https://astro.build/config
export default defineConfig({
    site: `https://www.${currentSite.id}.be`,
    outDir: `dist/${currentSite.id}`,

  vite: {
      plugins: [tailwindcss()],
      define: {
          'import.meta.env.SITE_CONFIG': JSON.stringify(currentSite),
      }
  },

    i18n: {
        defaultLocale: "nl",
        locales: ["nl", "en"],
        routing: {
            prefixDefaultLocale: true
        }
    },

  integrations: [icon()]
});