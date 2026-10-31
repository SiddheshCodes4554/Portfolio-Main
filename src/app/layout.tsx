import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteContent } from "@/content/site";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/dm-sans/index.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource-variable/caveat/index.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: { default: `${siteContent.title} — ${siteContent.name}`, template: `%s — ${siteContent.title}` },
  description: siteContent.description,
  applicationName: siteContent.title,
  openGraph: { type: "website", locale: "en_IN", siteName: siteContent.title, title: `${siteContent.title} — ${siteContent.name}`, description: siteContent.description },
  twitter: { card: "summary_large_image", title: `${siteContent.title} — ${siteContent.name}`, description: siteContent.description },
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


