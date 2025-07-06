// src/i18n/utils.ts
import { languages, defaultLang } from './config';
import nl from './ui/nl.json';
import en from './ui/en.json';

const translations = { nl, en };

type TranslationPaths<T> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${TranslationPaths<T[K]>}`}`
}[keyof T] : never;

export function useTranslations(lang: keyof typeof languages) {
    // Get the site configuration that is globally available.
    const siteConfig = import.meta.env.SITE_CONFIG;
    console.log('siteConfig in useTranslations:', siteConfig); // Add this line
    console.log('siteConfig.name in useTranslations:', siteConfig?.name); // Add this line

    return function t(key: TranslationPaths<typeof nl>): any {
        const langTranslations = translations[lang] || translations[defaultLang];

        let value = key.split('.').reduce((obj, k) => (obj && typeof obj === 'object' && k in obj) ? obj[k] : undefined, langTranslations);

        if (value === undefined) {
            console.warn(`Translation key not found: "${key}" for language "${lang}"`);
            return key;
        }

        // This is the logic that replaces the {name} placeholder
        // with the correct name ('Nexxura' or 'Leys').
        if (typeof value === 'string') {
            // Ensure siteConfig and siteConfig.name are not null/undefined before replacement
            return value.replace(/{name}/g, siteConfig?.name || '');
        }

        return value;
    }
}