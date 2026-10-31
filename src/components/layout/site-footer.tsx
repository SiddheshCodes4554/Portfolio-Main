import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer page-width">
      <span>{siteContent.name} / Built with curiosity.</span>
      <span className="footer-note">© {new Date().getFullYear()}</span>
      <a className="footer-back-top" href="#top">Back to top ↑</a>
    </footer>
  );
}
