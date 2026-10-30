"use client";
import { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { notebookIntro, storyPages, personalNotes } from "@/content/notebook";
import { PaperTape, HandwrittenNote, SectionLabel } from "@/components/ui/scrapbook";
import { NotebookTabs } from "./notebook-tabs";
import { EngineeringToolbox } from "./engineering-toolbox";
import { JourneyCircuit } from "./journey-circuit";
import "./notebook.css";

const pageSides=[{id:"story",label:"My story"},{id:"toolbox",label:"My toolbox"}];
const mediaQuery="(max-width: 650px)";
function subscribe(onChange:()=>void) { const query=window.matchMedia(mediaQuery); query.addEventListener("change",onChange); return ()=>query.removeEventListener("change",onChange); }
const getSnapshot=()=>window.matchMedia(mediaQuery).matches;
const getServerSnapshot=()=>false;
export function EngineersNotebook() {
 const [story,setStory]=useState(storyPages[0].id);
 const [side,setSide]=useState("story");
 const mobile=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot);
 const reduce=useReducedMotion();
 return <section id="engineers-notebook" className="engineers-notebook" aria-labelledby="notebook-title"><div className="page-width">
  <header className="engineers-heading"><SectionLabel>The Engineer’s Notebook — Vol. 03</SectionLabel><h2 id="notebook-title">A little about the person<br /> behind the <span>projects.</span></h2><HandwrittenNote>still figuring things out, one build at a time.</HandwrittenNote></header>
  <div className="notebook-cover"><span className="cover-edge-label" aria-hidden="true">GAWADE / ENGINEERING NOTES</span><div className="notebook-mobile-controls" hidden={!mobile}><NotebookTabs items={pageSides} selected={side} onSelect={setSide} prefix="book-side" label="Notebook facing pages" /></div>
   <div className="notebook-spread"><div className="notebook-seam" aria-hidden="true"><i/><i/><i/></div>
    <section id="book-side-panel-story" className="notebook-page story-leaf" hidden={mobile&&side!=="story"} role={mobile?"tabpanel":undefined} aria-labelledby={mobile?"book-side-tab-story":"story-leaf-title"} tabIndex={mobile?0:undefined}>
     <div className="notebook-page-meta"><span>FIELD NOTES / THE PERSON</span><span>01 — LEFT PAGE</span></div>
     <div className="story-identity"><span className="notebook-monogram" aria-hidden="true">sg.</span><div><h3 id="story-leaf-title">Siddhesh Gawade</h3><span className="notebook-micro">PUNE, INDIA / BUILDING THINGS</span></div></div><p className="notebook-intro">{notebookIntro}</p>
     <NotebookTabs items={storyPages} selected={story} onSelect={setStory} prefix="story" label="Story chapters" className="story-chapter-tabs" />
     <div className="story-page-area">{storyPages.map((page,index)=><motion.div key={page.id} id={`story-panel-${page.id}`} role="tabpanel" aria-labelledby={`story-tab-${page.id}`} tabIndex={0} hidden={story!==page.id} initial={false} animate={{opacity:story===page.id?1:0,rotateY:story===page.id?0:-3}} transition={{duration:reduce?0:.2}} className="story-chapter"><span className="notebook-micro">ENTRY 0{index+1}</span><h4>{page.title}</h4>{page.paragraphs.map(text=><p key={text}>{text}</p>)}{page.placeholder&&<p className="editable-note">{page.placeholder}</p>}<HandwrittenNote>{page.margin}</HandwrittenNote></motion.div>)}</div>
     <div className="journey-heading"><h3>Connect the dots.</h3><span className="notebook-micro">TOUCH A CONNECTION ↗</span></div><JourneyCircuit />
     <div className="page-folio"><span>THE STORY SO FAR</span><span>03 / 01</span></div>
    </section>
    <section id="book-side-panel-toolbox" className="notebook-page tools-leaf" hidden={mobile&&side!=="toolbox"} role={mobile?"tabpanel":undefined} aria-labelledby={mobile?"book-side-tab-toolbox":"tools-leaf-title"} tabIndex={mobile?0:undefined}>
     <div className="notebook-page-meta"><span>FIELD NOTES / THE PRACTICE</span><span>02 — RIGHT PAGE</span></div>
     <div className="toolbox-page-title"><h3 id="tools-leaf-title">Things I reach for.</h3><svg viewBox="0 0 90 65" fill="none" aria-hidden="true"><path d="m18 11 48 3-3 33-48-2Zm-8 39 65 2 9 8-80-3Z M29 25l-6 5 6 5m20-8 5 5-6 4m-9-16-5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div><p className="toolbox-intro">A working kit of languages, frameworks, and ideas. Open it, pick something up, and see where it fits.</p><EngineeringToolbox />
     <div className="margin-notes-heading"><h3>Loose thoughts, tucked in.</h3><span className="notebook-micro">UNFOLD A NOTE ↗</span></div>
     <div className="personal-note-stack">{personalNotes.map(note=><details key={note.title} className={`foldable-note note-${note.tone}`}><summary><span>{note.title}</span><span className="fold-symbol" aria-hidden="true">+</span></summary><div><span className="notebook-micro">{note.label}</span><p>{note.text}</p></div></details>)}</div>
     <HandwrittenNote className="toolbox-margin">A little code.<br />A lot of connections.</HandwrittenNote><PaperTape tone="blue" className="notebook-corner-tape"/>
     <div className="page-folio"><span>ALWAYS ROOM FOR ANOTHER NOTE</span><span>03 / 02</span></div>
    </section>
   </div>
  </div><p className="notebook-closing-line">The pages are connected. The next one is still blank.</p>
  <noscript><div className="notebook-static-notes"><h3>More notebook entries</h3>{storyPages.slice(1).map(page=><div key={page.id}><h4>{page.label}</h4>{page.paragraphs.map(text=><p key={text}>{text}</p>)}</div>)}<p>Hackathon: Google Cloud Agentic AI Hackathon finalist — Top 500 teams out of 70,000+ participants.</p><p>Languages: JavaScript, TypeScript, Python, C++, PHP. Frameworks: React, Next.js, Node.js, Express.js, FastAPI, Tailwind CSS. AI and data tools: OpenCV, Gemini AI, Claude/Groq APIs, PostgreSQL, MySQL, Supabase, Git, GitHub, REST APIs, Vercel.</p></div></noscript>
 </div></section>;
}
