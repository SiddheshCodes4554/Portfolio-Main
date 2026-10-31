"use client";
import { useState, useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { toolboxCategories } from "@/content/notebook";
import { NotebookTabs } from "./notebook-tabs";

export function EngineeringToolbox() {
 const [open,setOpen]=useState(true);
 const [category,setCategory]=useState(toolboxCategories[0].id);
 const [selections,setSelections]=useState<Record<string,string>>({});
 const reduce=useReducedMotion(); const kitId=useId();
 const group=toolboxCategories.find(item=>item.id===category)!;
 const tool=group.tools.find(item=>item.name===selections[category]) ?? group.tools[0];
 return <div className={`engineering-toolbox ${open ? "toolbox-open" : ""}`}>
  <motion.button initial={false} animate={{rotateX:open&&!reduce?-2:0}} transition={{duration:reduce?0:.25,ease:[.22,1,.36,1]}} className="toolbox-lid" type="button" aria-expanded={open} aria-controls={kitId} onClick={()=>setOpen(!open)}>
   <svg viewBox="0 0 340 112" fill="none" aria-hidden="true"><path d="m124 28 1-18 93 1-1 18M25 30l290 2 3 69-295-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="m24 52 293 1m-252-24-1 70m210-68-1 68" stroke="currentColor" strokeWidth="1.3"/><path d="m57 13 17 14m-11-21 17 15M287 16l-9 13m19-10-12 16" stroke="var(--color-cobalt)" strokeWidth="2"/><path d="m151 49 37 1-1 19-36-1Z" fill="var(--color-butter)" stroke="currentColor"/><circle cx="169" cy="59" r="2" fill="currentColor"/></svg>
   <span><strong>My working kit <span aria-hidden="true">{open?"−":"+"}</span></strong><span>{open ? "Pick a tool to see how I use it." : "Open the toolbox to explore."}</span></span>
  </motion.button>
  <motion.div id={kitId} inert={!open} aria-hidden={!open} initial={false} animate={{height:open?"auto":0,opacity:open?1:0}} transition={{duration:reduce?0:.32,ease:[.22,1,.36,1]}} className="toolbox-foldout"><motion.div className="toolbox-unfolded-sheet" initial={false} animate={{rotateX:open?0:-18}} transition={{duration:reduce?0:.32,ease:[.22,1,.36,1]}}>
   <NotebookTabs items={toolboxCategories} selected={category} onSelect={setCategory} prefix="tools" label="Toolbox categories" className="tool-category-tabs" />
   {toolboxCategories.map(item=><div key={item.id} role="tabpanel" id={`tools-panel-${item.id}`} aria-labelledby={`tools-tab-${item.id}`} hidden={category!==item.id} tabIndex={0} className="toolbox-category">
    <div className="tool-tags">{item.tools.map((entry,index)=><button key={entry.name} type="button" aria-pressed={tool.name===entry.name} onClick={()=>setSelections(current=>({...current,[category]:entry.name}))} className={`tool-tag tag-angle-${index%3}`}>{entry.name}</button>)}</div>
   </div>)}
   <div className="tool-detail" role="status" aria-live="polite"><motion.div key={tool.name} initial={{opacity:reduce?1:0,y:reduce?0:4}} animate={{opacity:1,y:0}} transition={{duration:reduce?0:.2,ease:[.22,1,.36,1]}}><span className="notebook-micro">TOOL IN HAND</span><h4>{tool.name}</h4><p>{tool.use}</p>{tool.projects.length>0 ? <><span className="tool-project-label">Used in</span><ul>{tool.projects.map(project=><li key={project.href}><Link href={project.href}>{project.label} ↗</Link></li>)}</ul></> : <p className="tool-attribution">Listed in my résumé toolkit; a specific project isn’t attributed here.</p>}</motion.div></div>
  </motion.div></motion.div>
 </div>;
}
