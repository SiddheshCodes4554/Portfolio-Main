import Link from "next/link";
import { siteContent } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header page-width" id="top">
      <Link className="wordmark" href="/" aria-label={`${siteContent.title} — home`}>
        <span className="wordmark-stamp" aria-hidden="true">sg.</span>
        <span>{siteContent.name}<span className="wordmark-caption">a personal collection</span></span>
      </Link>
      <span className="header-edition" aria-hidden="true">THE INTERNET SCRAPBOOK</span>
    </header>
  );
}

