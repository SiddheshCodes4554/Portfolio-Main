import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer page-width">
      <span>{siteContent.name} / The Internet Scrapbook</span>
      <span className="footer-note">An ongoing collection.</span>
    </footer>
  );
}
