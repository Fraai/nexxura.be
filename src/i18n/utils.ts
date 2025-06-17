import { languages, defaultLang } from './config';
import nl from './ui/nl.json';
import en from './ui/en.json';

const translations = {
    nl,
    en,
};

type TranslationPaths<T> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${TranslationPaths<T[K]>}`}`
}[keyof T] : never;

export function useTranslations(lang: keyof typeof languages) {
    return function t(key: TranslationPaths<typeof nl>): any {
        const langTranslations = translations[lang] || translations[defaultLang];

        const value = key.split('.').reduce((obj, k) => {
            if (obj && typeof obj === 'object' && k in obj) {
                return obj[k];
            }
            return undefined;
        }, langTranslations);

        // If a key is not found, return the key itself.
        // This makes it easy to spot missing translations on your page.
        if (value === undefined) {
            console.warn(`Translation key not found: "${key}" for language "${lang}"`);
            return key;
        }

        return value;
    }
}