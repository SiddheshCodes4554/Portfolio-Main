"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { StickyNote, SectionLabel } from "@/components/ui/scrapbook";

const steps = ["Build", "Break", "Learn", "Make it better", "Repeat"] as const;

export function EngineeringChecklist() {
  const [checked, setChecked] = useState<string[]>(["Build", "Break"]);
  const reduce = useReducedMotion();
  return <StickyNote className="engineering-checklist" tilt="right" aria-label="Interactive engineering checklist">
    <SectionLabel>My engineering loop</SectionLabel>
    <ul>{steps.map(step => <li key={step}>
      <button type="button" aria-pressed={checked.includes(step)} onClick={() => setChecked(current =>
        current.includes(step) ? current.filter(item => item !== step) : [...current, step])}>
        <span className="pencil-box" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none">
          <motion.path d="m4 14 7 8L25 4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"
            initial={false} animate={{ pathLength: checked.includes(step) ? 1 : 0, opacity: checked.includes(step) ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : .18 }} />
        </svg></span>{step}
      </button>
    </li>)}</ul>
    <span className="checklist-footnote">always a work in progress.</span>
  </StickyNote>;
}

export function HackathonTicket() {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  return <button type="button" className="hackathon-ticket" aria-pressed={flipped}
    aria-label={flipped ? "Google Cloud Agentic AI Hackathon Finalist. Top 500 of 70,000+ participants. Flip ticket to front." : "Google Cloud hackathon finalist ticket. Flip to read the result."}
    onClick={() => setFlipped(value => !value)}>
    <motion.span className="ticket-fold" animate={{ rotateX: flipped && !reduce ? 180 : 0 }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 26 }}>
      <span className="ticket-face ticket-front" aria-hidden={flipped} style={reduce ? { visibility: flipped ? "hidden" : "visible" } : undefined}>
        <span className="ticket-stub" aria-hidden="true">ADMIT ONE<br />✳</span>
        <span className="ticket-copy"><span className="ticket-kicker">A small win, a big smile.</span><strong>Google Cloud<br />Agentic AI Hackathon</strong><span className="ticket-bottom">FINALIST <span>flip this ticket ↗</span></span></span>
      </span>
      <span className="ticket-face ticket-back" aria-hidden={!flipped} style={reduce ? { transform: "none", visibility: flipped ? "visible" : "hidden" } : undefined}>
        <span className="ticket-copy"><strong>Google Cloud Agentic AI<br />Hackathon Finalist</strong><span className="ticket-result">Top 500 of 70,000+ participants</span><span className="ticket-bottom">ONE TO REMEMBER <span>↶ flip back</span></span></span>
      </span>
    </motion.span>
  </button>;
}
