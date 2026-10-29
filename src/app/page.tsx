import { ArrowUpRight, MapPin } from "lucide-react";
import { PolaroidCard, StickyNote, PaperTape, HandwrittenNote, DoodleArrow, SectionLabel } from "@/components/ui/scrapbook";
import { EngineeringSticker } from "@/components/hero/engineering-sticker";
import { heroContent as copy } from "@/content/hero";
import "./hero.css";

export default function HomePage() {
 return <section className="hero page-width" aria-labelledby="hero-title">
  <div className="hero-copy">
   <SectionLabel>The Internet Scrapbook / A personal collection</SectionLabel>
   <h1 id="hero-title"><span className="hero-greeting">{copy.greeting}</span><span>I make things<br />for the <span className="internet-word">internet<svg viewBox="0 0 300 16" aria-hidden="true"><path d="M3 10Q130 0 296 7M20 15Q150 6 276 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>.</span></h1>
   <p className="hero-introduction">{copy.introduction}</p>
   <nav className="hero-links" aria-label="Discover Siddhesh"><a className="scrapbook-button" href={copy.workUrl}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a><a className="hero-about" href={copy.aboutUrl}>About me <ArrowUpRight size={17} aria-hidden="true" /></a></nav>
   <p className="hero-location"><MapPin size={14} aria-hidden="true" />{copy.location}<span aria-hidden="true"> · </span>A little corner of the web.</p>
  </div>
  <div className="hero-desk" aria-label="A few things from my desk">
   <div className="desk-back-sheet" aria-hidden="true"><span>IDEAS / EXPERIMENTS / THINGS THAT WORK</span></div>
   <div className="project-object"><PolaroidCard tilt="left" className="hero-polaroid" caption={<><strong>{copy.project}</strong><span>{copy.projectDescription}</span></>}>
    <div className="campus-art" role="img" aria-label="CampusOS editorial artwork: connected notes orbiting a student workspace. Not a product screenshot."><span className="art-eyebrow">A PLACE FOR EVERY POSSIBILITY</span><span className="art-title">Campus<span>OS</span><sup>↗</sup></span><svg className="campus-orbit" viewBox="0 0 360 220" fill="none" aria-hidden="true"><ellipse cx="180" cy="112" rx="135" ry="75" stroke="#F6F2E9" strokeOpacity=".45" strokeDasharray="3 6" transform="rotate(-18 180 112)"/><path d="m80 110 105-40 85 65-130 33Z" fill="#F5D77E"/><path d="m140 168 45-98v76" stroke="#252520" strokeWidth="2"/><path d="m80 110 60 58 45-22 85-11" stroke="#252520" strokeWidth="2"/><rect x="48" y="44" width="51" height="38" rx="2" fill="#F6F2E9" transform="rotate(-10 48 44)"/><path d="m58 54 28-5m-27 13 20-4" stroke="#315BD9" strokeWidth="2"/><circle cx="282" cy="168" r="23" fill="#C9DCCB"/><path d="m272 168 7 7 13-14" stroke="#252520" strokeWidth="2"/></svg><span className="art-footer">LEARN. CONNECT. FIND YOUR NEXT.</span></div>
   </PolaroidCard><PaperTape /></div>
   <div className="desk-annotation"><HandwrittenNote>from “what if”<br />to something real.</HandwrittenNote><DoodleArrow /></div>
   <StickyNote className="hero-sticky" tilt="right"><SectionLabel>Note to self</SectionLabel><p>Make it useful.<br />Make it human.<br /><strong>Then make it better.</strong></p><svg className="tiny-doodle" viewBox="0 0 100 60" fill="none" aria-hidden="true"><path d="m15 9 63 2-3 35-60-2Zm-8 40 78 2 7 6-92-2Z M31 22l-7 6 7 5m25-11 7 6-7 5m-10-15-7 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></StickyNote>
   <EngineeringSticker />
   <p className="hero-achievement"><span className="paperclip" aria-hidden="true" /><span className="achievement-spark" aria-hidden="true">✳</span><span>A small win, a big smile.<strong>{copy.achievement}</strong></span></p>
  </div>
 </section>;
}
