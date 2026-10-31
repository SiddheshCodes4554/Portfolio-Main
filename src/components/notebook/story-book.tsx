"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { storyPages, type StoryPage } from "@/content/notebook";
import { HandwrittenNote } from "@/components/ui/scrapbook";
import { NotebookTabs } from "./notebook-tabs";

type Turn = { from: string; direction: number; sequence: number };
function StoryContent({ page, index }: { page: StoryPage; index: number }) {
 return <><span className="notebook-micro">ENTRY 0{index+1}</span><h4>{page.title}</h4>{page.paragraphs.map(text=><p key={text}>{text}</p>)}{page.placeholder&&<p className="editable-note">{page.placeholder}</p>}<HandwrittenNote>{page.margin}</HandwrittenNote></>;
}

/** Real content stays accessible under a temporary, non-interactive turning leaf. */
export function StoryBook() {
 const [story,setStory]=useState(storyPages[0].id);
 const [turn,setTurn]=useState<Turn|null>(null);
 const sequence=useRef(0);
 const reduce=useReducedMotion();
 const index=storyPages.findIndex(page=>page.id===story);
 function select(next:string) {
  if(next===story) return;
  const nextIndex=storyPages.findIndex(page=>page.id===next);
  if(nextIndex<0) return;
  setTurn(reduce ? null : {from:story,direction:nextIndex>index ? 1 : -1,sequence:++sequence.current});
  setStory(next);
 }
 const previousIndex=turn ? storyPages.findIndex(page=>page.id===turn.from) : 0;
 return <div className="story-book">
  <NotebookTabs items={storyPages} selected={story} onSelect={select} prefix="story" label="Story chapters" className="story-chapter-tabs" />
  <div className="story-page-area physical-story-pages" data-turning={!!turn&&!reduce}>
   {storyPages.map((page,pageIndex)=><div key={page.id} id={`story-panel-${page.id}`} role="tabpanel" aria-labelledby={`story-tab-${page.id}`} tabIndex={story===page.id?0:-1} aria-hidden={story!==page.id} inert={story!==page.id} data-active={story===page.id} className="story-chapter"><StoryContent page={page} index={pageIndex}/></div>)}
   {turn&&!reduce&&<div className="page-turn-viewport" aria-hidden="true"><motion.div key={turn.sequence} className="page-turn-sheet"
     style={{transformOrigin:turn.direction>0?"0% 50%":"100% 50%"}}
     initial={{rotateY:0}}
     animate={{rotateY:[0,-48*turn.direction,-130*turn.direction,-178*turn.direction]}}
     transition={{duration:.56,times:[0,.32,.78,1],ease:[.4,0,.2,1]}}
     onAnimationComplete={()=>setTurn(current=>current?.sequence===turn.sequence ? null:current)}>
     <div className="page-turn-front story-chapter"><StoryContent page={storyPages[previousIndex]} index={previousIndex}/></div>
     <div className="page-turn-back"><span className="notebook-micro">FIELD NOTES / VOL. 03</span><span>one build<br />at a time.</span></div>
     <motion.div className="page-turn-shade" initial={{opacity:0}} animate={{opacity:[0,.12,.06,0]}} transition={{duration:.56}} />
   </motion.div></div>}
  </div>
  <nav className="story-turn-controls" aria-label="Turn story pages">
   <button type="button" aria-label="Turn to previous story page" aria-disabled={index===0} onClick={()=>{if(index>0) select(storyPages[index-1].id);}}><span aria-hidden="true">↶</span> Previous</button>
   <span className="story-page-count" aria-live="polite">0{index+1} / 03</span>
   <button type="button" className="next-story-page" aria-label="Turn to next story page" aria-disabled={index===storyPages.length-1} onClick={()=>{if(index<storyPages.length-1) select(storyPages[index+1].id);}}>Next <span aria-hidden="true">↷</span></button>
  </nav>
 </div>;
}
