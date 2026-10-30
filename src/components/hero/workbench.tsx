"use client";
import { useDeskPower } from "./workbench-power";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperCard } from "@/components/ui/scrapbook";
import { inventorCopy } from "@/content/inventor";

export function DeskLamp() {
 const [on,setOn] = useState(true);
 const reduce = useReducedMotion();
 return <div className={`desk-lamp ${on ? "lamp-on" : ""}`}><svg viewBox="0 0 200 240" fill="none" aria-hidden="true"><path className="lamp-light" d="m68 84 85 12 46 120H10Z" fill="#F5D77E" opacity={on ? .25 : 0}/><g stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round"><path d="M55 220h100l-12-11H69Z" fill="var(--color-cobalt)"/><path d="m100 209-27-68 53-77M83 147l-24-9 51-80"/><circle cx="76" cy="142" r="9" fill="var(--color-paper)"/><path d="m108 47 29 7 22 42-95-17Z" fill="var(--color-cobalt)"/><ellipse cx="111" cy="88" rx="48" ry="9" transform="rotate(10 111 88)" fill={on ? "var(--color-butter)" : "var(--color-paper)"}/><path d="m119 44 3-13 16 4-3 13"/></g></svg><motion.button type="button" aria-pressed={on} onClick={()=>setOn(!on)} whileTap={reduce ? undefined : {scale:.97}} className="lamp-switch" aria-label={on ? "Turn off the desk light" : "Light up the project papers"}>Desk light {on ? "on" : "off"} <span aria-hidden="true">↯</span></motion.button><span className="lamp-caption">a little focus on the work.</span></div>;
}
export function MiniCircuit() {
 const { powered: on, setPowered: setOn } = useDeskPower();
 const reduce=useReducedMotion();
 return <PaperCard surface="grid" className={`mini-circuit ${on ? "circuit-on" : ""}`} tilt="left"><span className="workbench-label">WORKBENCH / POWER</span><h2>Bring ideas to life.</h2><svg viewBox="0 0 240 105" fill="none" aria-hidden="true"><path d="M40 55V20h63m22 0h70v65H40V66" stroke="var(--color-cobalt)" strokeWidth="2"/><motion.path d="M40 55V20h155v65H40V66" stroke="var(--color-tomato)" strokeWidth="3" strokeDasharray="5 9" initial={false} animate={{pathLength:on ? 1 : 0,strokeDashoffset:on && !reduce ? -56 : 0,opacity:on ? 1 : 0}} transition={{duration:reduce ? 0 : .6}}/><path d={on ? "M28 55h24m-18 9h12m56-44h21" : "M28 55h24m-18 9h12m56-44 21-10"} stroke="var(--color-ink)" strokeWidth="2"/><circle cx="195" cy="52" r="14" fill={on ? "var(--color-butter)" : "var(--color-paper)"} stroke="var(--color-ink)" strokeWidth="2"/>{on && <path d="m176 35-6-6m44 6 6-6m-25-1v-8" stroke="var(--color-tomato)" strokeWidth="2"/>}</svg><button type="button" role="switch" aria-checked={on} onClick={()=>setOn(!on)} aria-controls="workbench-terminal" className="circuit-switch"><span aria-hidden="true" />Desk power {on ? "on" : "off"}</button><span className="led-status" role="status">{on ? "Connected → terminal online" : "Close the circuit → wake the terminal"}</span></PaperCard>;
}
export function MiniTerminal() {
 const { powered, setPowered } = useDeskPower();
 const commandInput = useRef<HTMLInputElement>(null);
 const focusOnBoot = useRef(false);
 const output = useRef<HTMLDivElement>(null);
 const [input,setInput]=useState("");
 const [lines,setLines]=useState<string[]>(["A small terminal. Type help to begin."]);
 useEffect(()=> { if(output.current) output.current.scrollTop=output.current.scrollHeight; },[lines]);
 useEffect(()=> { if(powered && focusOnBoot.current) { commandInput.current?.focus(); focusOnBoot.current=false; } },[powered]);
 function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); if(!powered) return; const command=input.trim().toLowerCase(); if(!command) return;
  setInput(""); if(command==="clear") { setLines([]); return; }
  const response=inventorCopy.commands[command as keyof typeof inventorCopy.commands] ?? "Unknown command. Try help.";
  setLines(current=>[...current.slice(-6),`› ${command}`,response]);
 }
 return <div id="workbench-terminal" className={`mini-terminal ${powered ? "terminal-powered" : ""}`}><div className="terminal-title"><span aria-hidden="true">● ● ●</span> siddhesh / {powered ? "online" : "standby"}</div>{powered ? <><div ref={output} className="terminal-history" role="log" aria-label="Terminal output" aria-live="polite" tabIndex={0}>{lines.map((line,index)=><div key={`${index}-${line}`}>{line}</div>)}</div><form onSubmit={submit}><label htmlFor="desk-command">› <span className="sr-only">Terminal command</span></label><input ref={commandInput} id="desk-command" value={input} onChange={event=>setInput(event.target.value)} autoComplete="off" spellCheck={false} placeholder="help, about, projects, clear" maxLength={120}/><button type="submit" aria-label="Run terminal command">↵</button></form></> : <div className="terminal-standby"><p>Every idea needs a little power.</p><button type="button" onClick={()=> { focusOnBoot.current=true; setPowered(true); }}>Close the circuit ↗</button><span>Then ask me about my work.</span></div>}</div>;
}
