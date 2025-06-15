// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://nexxura.be",
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        defaultLocale: "nl",
        locales: ["nl"],
        routing: {
            prefixDefaultLocale: true
        }
    }
});