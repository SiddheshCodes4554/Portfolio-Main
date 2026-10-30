"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { journeyEntries } from "@/content/notebook";
export function JourneyCircuit() {
 const [selected,setSelected]=useState(journeyEntries[0].id);
 const reduce=useReducedMotion(); const entry=journeyEntries.find(item=>item.id===selected)!;
 return <div className="journey-circuit"><div className="journey-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M48 48V25H18M48 48V25h30M48 48v28H18M48 48v28h30" className="journey-traces"/><motion.path d={`M48 48V${entry.y}H${entry.x}`} className="journey-selected-path" initial={false} animate={{pathLength:1,d:`M48 48V${entry.y}H${entry.x}`}} transition={{duration:reduce?0:.18}}/><circle cx="48" cy="48" r="3" fill="var(--color-cobalt)"/></svg>{journeyEntries.map(item=><button key={item.id} type="button" style={{left:`${item.x}%`,top:`${item.y}%`}} aria-pressed={selected===item.id} onClick={()=>setSelected(item.id)} className="journey-node"><span aria-hidden="true" />{item.label}</button>)}</div><p className="journey-map-caption">Connections, not a chronological scale.</p><div className="journey-detail" role="status"><span className="notebook-micro">{entry.date}</span><h4>{entry.title}</h4><p>{entry.description}</p></div></div>;
}
