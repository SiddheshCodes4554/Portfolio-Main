import { EngineersNotebook } from "@/components/notebook/engineers-notebook";
import { ProjectArchive } from "@/components/archive/project-archive";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui/scrapbook";
import { ScrapbookDesk } from "@/components/hero/scrapbook-desk";
import { heroContent as copy } from "@/content/hero";
import "./hero.css";
import "./inventor.css";

export default function HomePage() {
 return <><section className="hero page-width" aria-labelledby="hero-title">
  <div className="hero-copy">
   <SectionLabel>The Internet Scrapbook / A personal collection</SectionLabel>
   <h1 id="hero-title"><span className="hero-greeting">{copy.greeting}</span><span>I make things<br />for the <span className="internet-word">internet<svg viewBox="0 0 300 16" aria-hidden="true"><path d="M3 10Q130 0 296 7M20 15Q150 6 276 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>.</span></h1>
   <p className="hero-introduction">{copy.introduction}</p>
   <nav className="hero-links" aria-label="Discover Siddhesh"><a className="scrapbook-button" href={copy.workUrl}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a><a className="hero-about" href={copy.aboutUrl}>A little about me <ArrowUpRight size={17} aria-hidden="true" /></a></nav>
   <p className="hero-location"><MapPin size={14} aria-hidden="true" />{copy.location}<span aria-hidden="true"> · </span>A little corner of the web.</p>
   <div className="personal-detail"><svg viewBox="0 0 130 76" fill="none" aria-hidden="true"><path d="m20 12 80 3-3 43-76-2Zm-9 51 97 1 10 8-114-2Z M42 29l-9 7 9 6m30-13 9 7-9 6m-12-17-7 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><span>ideas → a few lines of code<br />→ something that works.</span></div>
  </div>
  <ScrapbookDesk />
 </section><ProjectArchive /><EngineersNotebook /></>;
}
