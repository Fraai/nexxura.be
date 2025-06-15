import nl from './nl.json';

export const defaultLocale = 'nl';
//export const allLocales = ['en', 'nl'];
export const allLocales = ['nl']

//const translations = { en, nl };
const translations = {nl}

export function getLocaleFromUrl(url: URL): string {
    const [, locale] = url.pathname.split('/');
    if (allLocales.includes(locale)) {
        return locale;
    }
    return defaultLocale;
}

export function useTranslations(locale: string) {
    return function t(key: keyof (typeof translations)[typeof defaultLocale]) {
        // Fallback to default language if key not found
        return translations[locale]?.[key] || translations[defaultLocale][key];
    };
}

export function getLocalizedPath(path: string, locale: string): string {
    // Ensure path starts with a slash and doesn't have locale prefix yet
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
}