import { NotFoundArt } from '../components/artwork';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <span className="inline-block h-[1.5px] w-10 bg-brass" aria-hidden="true" />
            <p className="eyebrow">404 · Page not found</p>
          </div>
          <h1 className="title-page mt-6 text-ink">
            You&apos;ve lost the line.
          </h1>
          <p className="mt-5 max-w-md text-[1.04rem] text-muted">
            The page you were looking for isn&apos;t here. Return to the studio home page, check this week&apos;s classes, or read our guide to your first session.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SiteLink href="/" className="button">
              Go home
            </SiteLink>
            <SiteLink href="/classes/" className="button button-quiet">
              Classes
            </SiteLink>
            <SiteLink href="/first-class/" className="text-link font-mono text-xs uppercase tracking-[0.12em]">
              First class guide
            </SiteLink>
          </div>
        </div>

        <div className="md:col-span-6">
          <NotFoundArt className="w-full text-ink" />
        </div>
      </div>
    </section>
  );
}
