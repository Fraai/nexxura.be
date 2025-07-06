import type { ImageMetadata } from 'astro';

interface SiteConfig {
    id: 'nexxura' | 'leys';
    name: string;
    brandName: string;
    vat: string;
    address: {
        street: string;
        postalCode: string;
        city: string;
    };
    phone: string;
    email: string;
    theme: 'nexxura' | 'leys'; // Used for CSS theming
    logo: ImageMetadata;
}

import nexxuraLogo from '../assets/logo-nexxura.png';
import leysLogo from '../assets/logo-leys.png';

export const sites: Record<string, SiteConfig> = {
    nexxura: {
        id: 'nexxura',
        name: 'Nexxura',
        vat: 'BE 0123.456.789',
        address: {
            street: 'Ouden Heirweg 73',
            postalCode: '9340',
            city: 'Lede',
        },
        phone: '+32 12 345 67 89',
        email: 'info@nexxura.be',
        theme: 'nexxura',
        logo: nexxuraLogo,
    },
    leys: {
        id: 'leys',
        name: 'Leys',
        vat: 'BE 0987.654.321',
        address: {
            street: 'Industriezone Zuid-III',
            postalCode: '9320',
            city: 'Erembodegem',
        },
        phone: '+32 98 765 43 21',
        email: 'info@leys.be',
        theme: 'leys',
        logo: leysLogo,
    },
};

const SITE_ID = process.env.SITE_ID || 'nexxura';

export const currentSite = sites[SITE_ID];

if (!currentSite) {
    throw new Error(`Invalid SITE_ID: "${SITE_ID}"`);
}