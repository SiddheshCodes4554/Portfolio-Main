import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteContent } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${siteContent.title} — ${siteContent.name}`, template: `%s — ${siteContent.title}` },
  description: siteContent.description,
  applicationName: siteContent.title,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>
          <div className="site-shell">
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
