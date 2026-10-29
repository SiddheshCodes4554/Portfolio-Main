import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { siteContent } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header page-width">
      <a className="wordmark" href="/" aria-label={`${siteContent.title} — home`}>
        <span className="wordmark-stamp" aria-hidden="true">sg.</span>
        <span>{siteContent.name}<span className="wordmark-caption">a personal collection</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a className="text-link" href={siteConfig.repository}>On GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
