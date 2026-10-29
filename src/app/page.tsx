import { ArrowDown, Asterisk } from "lucide-react";
import { PaperCard } from "@/components/ui/paper-card";
import { Scribble } from "@/components/ui/scribble";
import { siteContent } from "@/content/site";

export default function HomePage() {
  return (
    <div className="cover page-width">
      <section className="cover-intro" aria-labelledby="cover-title">
        <p className="eyebrow"><span className="ink-dot" aria-hidden="true" /> A small corner of the world wide web</p>
        <h1 id="cover-title">The Internet<br /><span className="title-last">Scrapbook<Scribble className="title-underline" /></span><span className="title-period">.</span></h1>
        <div className="intro-bottom">
          <p className="intro-copy">{siteContent.introduction}</p>
          <span className="edition-mark" aria-hidden="true">PERSONAL ARCHIVE<br />VOL. 01 — THE BEGINNING</span>
        </div>
      </section>
      <aside className="cover-aside" aria-label="A note about this collection">
        <span className="handwritten aside-caption">starting with a blank page.</span>
        <PaperCard className="welcome-note">
          <span className="paper-tape" aria-hidden="true" />
          <Asterisk className="note-asterisk" size={44} strokeWidth={1.4} aria-hidden="true" />
          <p className="eyebrow">A note from Siddhesh</p>
          <h2>Always a<br />work in progress.</h2>
          <p>This scrapbook is taking shape. The first page is here; the rest of the collection will follow.</p>
          <div className="note-signature"><span className="handwritten">more soon,</span><span>Siddhesh</span></div>
        </PaperCard>
        <span className="collection-note"><ArrowDown size={16} aria-hidden="true" /> Room for what comes next.</span>
      </aside>
    </div>
  );
}
