import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/italiana/400.css';
import '@fontsource-variable/albert-sans';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;

/** Adds `.line-draw` before first paint so the Long Line draws in once, then removes it. */
const LINE_DRAW_SCRIPT = `(function(){try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){var d=document.documentElement;d.classList.add('line-draw');setTimeout(function(){d.classList.remove('line-draw')},4600)}}catch(e){}})();`;
const ogImage = asset('/og.png');

export const viewport: Viewport = {
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Long Line Pilates — Reformer and Mat Pilates at the foot of Primrose Hill',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script dangerouslySetInnerHTML={{ __html: LINE_DRAW_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
