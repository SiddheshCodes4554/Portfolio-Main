"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { archiveProjects } from "@/content/projects";
import { PaperTape, SectionLabel, HandwrittenNote } from "@/components/ui/scrapbook";
import { ProjectCapture } from "./project-capture";
import { KnowledgeGraph, RadarDemo, PaperJournal } from "./project-demos";
import "./archive.css";

export function ProjectArchive() {
 const [active,setActive]=useState(0);
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const reduce=useReducedMotion();
 function navigate(event:KeyboardEvent<HTMLButtonElement>,index:number) {
  let next=index;
  if(event.key==="ArrowRight"||event.key==="ArrowDown") next=(index+1)%archiveProjects.length;
  else if(event.key==="ArrowLeft"||event.key==="ArrowUp") next=(index+archiveProjects.length-1)%archiveProjects.length;
  else if(event.key==="Home") next=0;
  else if(event.key==="End") next=archiveProjects.length-1;
  else return;
  event.preventDefault(); setActive(next); tabs.current[next]?.focus();
 }
 return <section id="project-archive" className="project-archive" aria-labelledby="archive-title">
  <div className="page-width"><div className="archive-transition"><span>FROM THE WORKBENCH</span><span aria-hidden="true">↓</span><span>INTO THE NOTEBOOKS</span></div>
   <header className="archive-heading"><div><SectionLabel>The Project Archive — Vol. 02</SectionLabel><h2 id="archive-title">A few things<br />I’ve <span>made.</span></h2></div><HandwrittenNote>Some ideas escaped<br />the notebook.</HandwrittenNote></header>
   <div className="archive-stage"><div className="archive-backing backing-one" aria-hidden="true"/><div className="archive-backing backing-two" aria-hidden="true"/>
    <div className="archive-tabs" role="tablist" aria-label="Project notebooks">{archiveProjects.map((project,index)=><button key={project.id} type="button" role="tab" id={`archive-tab-${project.id}`} aria-selected={active===index} aria-controls={`archive-panel-${project.id}`} tabIndex={active===index?0:-1} ref={element=>{tabs.current[index]=element;}} onClick={()=>setActive(index)} onKeyDown={event=>navigate(event,index)} className={`archive-tab tab-${project.id}`}><span>FILE / {project.number}</span><strong>{project.name}</strong><small>{index===active ? "OPEN NOTEBOOK" : "OPEN THIS FILE ↗"}</small></button>)}</div>
    {archiveProjects.map((project,index)=><motion.article key={project.id} id={`archive-panel-${project.id}`} role="tabpanel" aria-labelledby={`archive-tab-${project.id}`} tabIndex={0} hidden={index!==active} className={`archive-notebook notebook-${project.id}`} initial={false} animate={{opacity:index===active?1:0,y:index===active?0:5}} transition={{duration:reduce?0:.2}}>
     <PaperTape /><div className="notebook-topline"><span>SIDDHESH’S FIELD NOTES <span aria-hidden="true">/</span> {project.number}</span><span>{project.category}</span></div>
     <div className="notebook-content"><div className="archive-demo"><ProjectCapture project={project} />{project.id==="campusos" ? <KnowledgeGraph/> : project.id==="aeris" ? <RadarDemo active={index===active}/> : <PaperJournal pages={project.notes}/>}</div><div className="project-story"><SectionLabel>PROJECT / {project.number}</SectionLabel><h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><h4>{project.technologyLabel}</h4><ul className="archive-technologies">{project.technologies.map(technology=><li key={technology}>{technology}</li>)}</ul><div className="project-links"><Link className="archive-case-link" href={`/projects/${project.id}`}>Open the full case study <ArrowUpRight size={18} aria-hidden="true"/></Link><a className="project-repository" href={project.repository}>View on GitHub <ArrowUpRight size={16} aria-hidden="true"/></a></div></div></div>
     <div className="notebook-footer"><span>REAL WORK. STILL CURIOUS.</span><span>VOL. 02 / FILE {project.number}</span></div>
    </motion.article>)}
   </div><noscript><nav aria-label="All project case studies"><p>Read the project notebooks:</p>{archiveProjects.map(project=><p key={project.id}><Link href={`/projects/${project.id}`}>{project.name} — case study</Link></p>)}</nav></noscript><p className="archive-bottom-note">Three different problems. The same instinct to build.</p>
  </div>
 </section>;
}
