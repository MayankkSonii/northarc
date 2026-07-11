import { useEffect } from "react";

/**
 * Central SEO helper for the NorthArc SPA.
 *
 * Every page component calls useSEO() at the top of its render to set
 * document title, meta description, canonical URL, Open Graph / Twitter
 * cards, and optional JSON-LD structured data for its route.
 */

export const SITE_URL = "https://northarc.in";
export const SITE_NAME = "NorthArc";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SEOOptions {
  /** Page title. " | NorthArc" is appended automatically unless already present. */
  title: string;
  /** Meta description, ideally 140–160 characters, keyword-rich but human. */
  description: string;
  /** Route path beginning with "/", e.g. "/contact". Used for the canonical URL. */
  path: string;
  /**
   * Comma-separated keyword string for <meta name="keywords">.
   * Include the primary keyword first, then secondary keywords, then long-tail phrases.
   * Google ignores this tag but Bing/other engines still read it.
   * Keep primary keyword density < 2.5%, long-tail < 1.5%.
   */
  keywords?: string;
  /** Open Graph type. Defaults to "website"; use "article" for blog/case-study detail pages. */
  type?: "website" | "article";
  /** Absolute URL of the social share image. Defaults to the site OG image. */
  image?: string;
  /** Optional JSON-LD object (or array of objects) injected as structured data. */
  jsonLd?: object | object[];
  /** Set true to add "noindex" (e.g. the 404 page). */
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(jsonLd?: object | object[]) {
  const existing = document.head.querySelector('script[data-seo-jsonld]');
  if (existing) existing.remove();
  if (!jsonLd) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-jsonld", "true");
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
}

export function useSEO(options: SEOOptions) {
  const { title, description, path, keywords, type = "website", image = DEFAULT_OG_IMAGE, jsonLd, noindex } = options;

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonical = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertCanonical(canonical);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    setJsonLd(jsonLd);
    // Serialize to keep the dependency array stable across renders.
  }, [title, description, path, keywords, type, image, noindex, JSON.stringify(jsonLd ?? null)]);
}

/** Convenience builder for BreadcrumbList JSON-LD. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
