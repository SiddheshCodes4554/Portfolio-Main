"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, RefreshCw } from "lucide-react";
import { ideaParts } from "@/content/lab";
import { randomIndex } from "@/lib/lab";

export function IdeaGenerator() {
  const [parts, setParts] = useState([0, 0, 0]), [serial, setSerial] = useState(1), [status, setStatus] = useState("");
  const copyRequest = useRef(0), output = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const idea = `Build ${ideaParts.technology[parts[0]]} to ${ideaParts.problem[parts[1]]}, ${ideaParts.twist[parts[2]]}.`;
  function generate() { copyRequest.current++; setParts(current => [randomIndex(ideaParts.technology.length, current[0]), randomIndex(ideaParts.problem.length, current[1]), randomIndex(ideaParts.twist.length, current[2])]); setSerial(current => current + 1); setStatus(""); }
  async function copy() {
    const request = ++copyRequest.current;
    try { await navigator.clipboard.writeText(idea); if (request === copyRequest.current) setStatus("Copied. Go make a little trouble."); }
    catch { if (request === copyRequest.current) { setStatus("Clipboard unavailable. Select and copy the idea below."); output.current?.focus(); const selection = window.getSelection(), range = document.createRange(); if (output.current && selection) { range.selectNodeContents(output.current); selection.removeAllRanges(); selection.addRange(range); } } }
  }
  return <article className="idea-printer lab-gadget" aria-labelledby="idea-title"><div className="printer-machine"><header className="gadget-header"><span className="lab-label">05 / HAPPY ACCIDENTS</span><span className="printer-light" aria-hidden="true"/></header><h3 id="idea-title">What if…</h3><p className="gadget-intro">One technology. One problem.<br/>One unexpected twist.</p><div className="printer-slot" aria-hidden="true"/><motion.button type="button" className="idea-lever" aria-label="Pull lever to generate an idea" onClick={generate} whileTap={reduce ? undefined : { rotate: 20, y: 5 }} transition={{type:"spring",stiffness:380,damping:28}}><span className="lever-knob" aria-hidden="true"/><span className="lever-rod" aria-hidden="true"/><span className="lever-base" aria-hidden="true"/><span>Pull me ↓</span></motion.button></div>
    <div className="idea-output-track"><motion.div className="idea-slip" key={serial} initial={serial===1?false:{y:reduce?0:-18,opacity:reduce?1:0}} animate={{y:0,opacity:1}} transition={{duration:reduce?0:.35,ease:[.22,1,.36,1]}}><div className="receipt-meta"><span>IDEA NO. {String(serial).padStart(3,"0")}</span><span>KEEP / MAKE / REMIX</span></div><p ref={output} tabIndex={-1} className="generated-idea" role="status">{idea}</p><div className="receipt-footer"><span>NOT A BUSINESS PLAN.<br/>JUST A PLACE TO START.</span><svg viewBox="0 0 75 24" aria-hidden="true"><path d="M1 0v24m4-24v24m6-24v24m3-24v24m8-24v24m6-24v24m3-24v24m5-24v24m6-24v24m3-24v24m7-24v24m4-24v24m3-24v24m6-24v24m3-24v24" stroke="currentColor" strokeWidth="2"/></svg></div></motion.div></div>
    <div className="gadget-actions"><button type="button" className="lab-button" onClick={generate}><RefreshCw size={14} aria-hidden="true"/>Again</button><button type="button" className="lab-button" onClick={copy}><Copy size={14} aria-hidden="true"/>Copy idea</button></div><p className="lab-status" role="status">{status || "Local ingredients. Unexpected combinations."}</p>
  </article>;
}
