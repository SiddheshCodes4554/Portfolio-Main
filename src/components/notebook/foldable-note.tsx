"use client";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { personalNotes } from "@/content/notebook";

type PersonalNote = (typeof personalNotes)[number];
export function FoldableNote({ note }: { note: PersonalNote }) {
 const [open,setOpen]=useState(false);
 const reduce=useReducedMotion();
 const id=useId();
 return <div className={`foldable-note physical-fold-note note-${note.tone}`} data-open={open}>
  <motion.button type="button" className="fold-note-cover" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}
   initial={false} animate={{rotateX:0}} transition={{duration:reduce?0:.25}}>
   <span>{note.title}</span><span className="fold-symbol" aria-hidden="true">{open ? "−":"+"}</span>
  </motion.button>
  <motion.div initial={false} animate={{height:open?"auto":0,opacity:open?1:0}} transition={{duration:reduce?0:.28,ease:[.22,1,.36,1]}} className="fold-note-reveal" inert={!open} aria-hidden={!open}>
   <motion.div id={id} className="fold-note-body" initial={false} animate={{rotateX:open?0:-12,y:open?0:-4}} transition={{duration:reduce?0:.28,ease:[.22,1,.36,1]}}>
    <span className="notebook-micro">{note.label}</span><p>{note.text}</p>
   </motion.div>
  </motion.div>
  <noscript><p>{note.label}: {note.text}</p></noscript>
 </div>;
}
