'use client';

import { useEffect, useRef, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/classes/', label: 'Classes' },
  { href: '/packs/', label: 'Packs' },
  { href: '/first-class/', label: 'First class' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-[2px]">
      <div className="wrap flex min-h-20 items-center justify-between gap-4">
        {/* Wordmark: Long Line in Italiana + PILATES in small tracked mono */}
        <SiteLink
          href="/"
          className="group inline-flex flex-col py-2 leading-none no-underline"
        >
          <span className="font-display text-[1.65rem] tracking-[-0.01em] text-ink sm:text-[1.85rem]">
            Long Line
          </span>
          <span className="mt-1 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-muted">
            <span className="inline-block h-[1.5px] w-4 bg-brass transition-[width] duration-200 group-hover:w-7" aria-hidden="true" />
            Pilates
          </span>
        </SiteLink>

        {/* Primary navigation (desktop inline) + mobile menu disclosure trigger */}
        <div className="flex items-center gap-3 lg:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            <ul className="m-0 flex list-none items-center gap-6 p-0">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="page" className="nav-link">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <SiteLink
            href="/first-class/"
            className="button hidden md:inline-flex"
          >
            Plan your first class
          </SiteLink>

          <div className="no-print flex items-center gap-2">
            <DarkModeToggle />
            <button
              ref={triggerRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-2 border border-line bg-raised px-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-sheet"
              onClick={() => setMenuOpen(true)}
            >
              <svg viewBox="0 0 20 14" className="h-3.5 w-4" fill="none" aria-hidden="true">
                <line x1="0" y1="2" x2="20" y2="2" stroke="currentColor" strokeWidth="1.4" />
                <line x1="0" y1="7" x2="14" y2="7" stroke="var(--brass)" strokeWidth="1.5" />
                <line x1="0" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-height plaster sheet for mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg px-6 py-6 md:hidden"
        >
          <div>
            <div className="flex items-center justify-between border-b border-line pb-5">
              <SiteLink
                href="/"
                onClick={() => setMenuOpen(false)}
                className="inline-flex flex-col leading-none no-underline"
              >
                <span className="font-display text-[1.75rem] text-ink">Long Line</span>
                <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-muted">
                  Pilates · Primrose Hill
                </span>
              </SiteLink>
              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center gap-2 border border-line bg-raised px-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink"
              >
                <span>Close</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8">
              <ul className="m-0 flex list-none flex-col border-l-[1.5px] border-brass pl-5 p-0">
                <li className="border-b border-line py-4">
                  <SiteLink
                    href="/"
                    markCurrent="page"
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-3xl text-ink no-underline"
                  >
                    Home
                  </SiteLink>
                </li>
                {NAV_ITEMS.map(item => (
                  <li key={item.href} className="border-b border-line py-4">
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      onClick={() => setMenuOpen(false)}
                      className="block font-display text-3xl text-ink no-underline"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <SiteLink
                href="/first-class/"
                onClick={() => setMenuOpen(false)}
                className="button w-full"
              >
                Plan your first class
              </SiteLink>
            </div>
          </div>

          <div className="border-t border-line pt-5 text-sm text-muted">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink">
              {business.address.streetAddress}
            </p>
            <p className="mt-1">{business.address.landmark}</p>
            <p className="mt-2 font-mono text-xs">{business.phone} · {business.email}</p>
          </div>
        </div>
      )}
    </header>
  );
}
