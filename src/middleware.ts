import { defineMiddleware } from "astro:middleware";
import { languages, defaultLang } from "./i18n/config";

const supportedLangs = Object.keys(languages);

export const onRequest = defineMiddleware((context, next) => {
    const { url, redirect } = context;

    // Redirect root to default language
    if (url.pathname === "/") {
        return redirect(`/${defaultLang}`, 302);
    }

    const lang = url.pathname.split("/")[1];

    // Keep the language code in context for other pages to use
    if (supportedLangs.includes(lang)) {
        context.locals.lang = lang;
    } else {
        // If language is not in URL, assume default
        context.locals.lang = defaultLang;
    }

    return next();
});