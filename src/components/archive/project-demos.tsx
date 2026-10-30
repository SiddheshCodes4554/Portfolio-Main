"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ProjectNote } from "@/content/projects";

const topics = [
 {id:"ai",label:"AI",x:50,y:20}, {id:"graphs",label:"Graphs",x:20,y:49},
 {id:"vectors",label:"Vectors",x:80,y:49}, {id:"retrieval",label:"Retrieval",x:35,y:82},
 {id:"planning",label:"Study plans",x:70,y:82},
] as const;
const connections = [["ai","graphs"],["ai","vectors"],["graphs","retrieval"],["vectors","retrieval"],["retrieval","planning"],["ai","planning"]] as const;
export function KnowledgeGraph() {
 const [selected,setSelected]=useState<string>("ai");
 const related=new Set<string>([selected]);
 connections.forEach(([a,b])=> { if(a===selected) related.add(b); if(b===selected) related.add(a); });
 return <div className="knowledge-demo"><div className="demo-topline"><span>KNOWLEDGE MAP</span><span>select a topic ↗</span></div>
  <div className="knowledge-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{connections.map(([a,b])=> { const start=topics.find(t=>t.id===a)!; const end=topics.find(t=>t.id===b)!; const active=a===selected||b===selected; return <line key={`${a}-${b}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={active ? "edge-active" : ""} />; })}</svg>
   {topics.map(topic=><button key={topic.id} type="button" style={{left:`${topic.x}%`,top:`${topic.y}%`}} className={`graph-node ${related.has(topic.id) ? "node-related" : ""}`} aria-pressed={selected===topic.id} onClick={()=>setSelected(topic.id)}>{topic.label}</button>)}
  </div><p className="graph-selection" role="status">{topics.find(t=>t.id===selected)?.label} connects to {topics.filter(t=>t.id!==selected&&related.has(t.id)).map(t=>t.label).join(", ")}.</p>
  <p className="demo-disclaimer">Illustrative topic data · not a CampusOS product capture.</p>
 </div>;
}
export function RadarDemo({ active }: { active: boolean }) {
 const [scanning,setScanning]=useState(false);
 const [angle,setAngle]=useState(0);
 const reduce=useReducedMotion();
 const last=useRef<number|null>(null);
 useEffect(()=> {
  if(!scanning||!active||reduce!==false) return;
  let frame:number;
  const tick=(time:number)=> { if(last.current!==null) { const elapsed=Math.min(time-last.current,80); setAngle(current=>(current+elapsed*.025)%360); } last.current=time; frame=requestAnimationFrame(tick); };
  frame=requestAnimationFrame(tick);
  return ()=> { cancelAnimationFrame(frame); last.current=null; };
 },[scanning,active,reduce]);
 return <div className="radar-demo"><div className="demo-topline"><span>FIELD OBSERVATIONS</span><span>{scanning ? "SCAN ENABLED" : "SCAN PAUSED"}</span></div><svg className="radar-drawing" viewBox="0 0 360 300" role="img" aria-label="Illustrative radar with three simulated detection markers"><g transform="translate(180 150)"><g className="radar-grid" fill="none">{[40,80,120].map(r=><circle r={r} key={r}/>)}<path d="M-130 0h260M0-130v260"/></g><g style={{transform:`rotate(${angle}deg)`}}><path d="M0 0V-120" stroke="currentColor" strokeWidth="2"/><path d="M0 0V-120A120 120 0 0 1 60-104Z" fill="currentColor" opacity=".1"/></g>{[[47,-60],[-72,24],[28,85]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><circle r="7" fill="var(--color-tomato)"/><text x="12" y="4" fontSize="11" fill="var(--color-ink)">0{i+1}</text></g>)}</g></svg><button type="button" className="scrapbook-button button-secondary radar-control" aria-pressed={scanning} onClick={()=>setScanning(!scanning)}>{scanning ? "Pause scanning" : "Start scanning"}</button><p className="demo-disclaimer">Illustrative simulation · 3 fixed markers · not live rescue telemetry.{reduce ? " Reduced motion: static sweep." : ""}</p></div>;
}
export function PaperJournal({ pages }: { pages: readonly ProjectNote[] }) {
 const [page,setPage]=useState(0);
 const reduce=useReducedMotion();
 return <div className="journal-demo"><div className="demo-topline"><span>PRODUCT JOURNAL</span><span>PUBLIC WORK NOTES</span></div><div className="journal-leaf"><span className="journal-binding" aria-hidden="true"/><motion.div key={page} initial={reduce ? false : {opacity:.5,x:7}} animate={{opacity:1,x:0}} transition={{duration:.18}}><span className="journal-page-number">PAGE 0{page+1} / 03</span><p className="journal-title">{pages[page].title}</p><p>{pages[page].text}</p></motion.div></div><div className="journal-controls"><button type="button" aria-disabled={page===0} onClick={()=>setPage(Math.max(0,page-1))} aria-label="Previous journal page">← Previous</button><span aria-live="polite">{pages[page].title}</span><button type="button" aria-disabled={page===pages.length-1} onClick={()=>setPage(Math.min(pages.length-1,page+1))} aria-label="Next journal page">Next →</button></div><p className="demo-disclaimer">Résumé-backed scope · no confidential product material.</p></div>;
}
