"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperTape } from "@/components/ui/scrapbook";
import { marbleRoute, marbleScores } from "@/lib/lab";

export function MarbleDrop() {
  const [lane, setLane] = useState(3), [drop, setDrop] = useState<ReturnType<typeof marbleRoute> | null>(null);
  const [dropping, setDropping] = useState(false), [total, setTotal] = useState(0), [count, setCount] = useState(0);
  const [last, setLast] = useState<number | null>(null);
  const active = useRef(false);
  const [sequence, setSequence] = useState(0);
  const reduce = useReducedMotion();
  function release() {
    if (active.current) return;
    active.current = true; setSequence(value => value + 1);
    setLast(null); setDropping(true); setDrop(marbleRoute(lane));
  }
  function landed() {
    if (!active.current || !drop) return;
    active.current = false; setDropping(false); setLast(drop.score);
    setTotal(value => value + drop.score); setCount(value => value + 1);
  }
  return <article className="marble-paper lab-gadget" aria-labelledby="marble-title"><PaperTape/>
    <header className="gadget-header"><span className="lab-label">02 / A HAPPY CHAIN REACTION</span><span aria-hidden="true" className="marble-dots">● ● ●</span></header>
    <h3 id="marble-title">Marble mischief</h3><p className="gadget-intro">Pick a starting point. Let a little chaos do the rest.</p>
    <div className="marble-board"><svg viewBox="0 0 320 292" role="img" aria-label={`Peg board with seven pockets. ${dropping ? "Marble is bouncing." : last !== null ? `Landed for ${last} points.` : "Ready to drop."}`}>
      <path d="M15 12V280H305V12" fill="none" stroke="var(--color-rule)" strokeWidth="2"/>
      {Array.from({length:8},(_,row)=>Array.from({length:row%2 ? 7:6},(_,col)=><circle key={`${row}-${col}`} cx={row%2 ? 40+col*40:60+col*40} cy={42+row*25} r="3.2" fill="var(--color-cobalt)" opacity=".55"/>))}
      {marbleScores.map((score,index)=><g key={index}><path d={`M${20+index*40} 248v33h40v-33`} fill={last!==null&&drop?.slot===index ? "var(--color-butter)":"var(--color-paper)"} stroke="var(--color-rule)"/><text x={40+index*40} y="284" textAnchor="middle">{score}</text></g>)}
      {drop ? <motion.circle key={sequence} className="marble-ball" r="7" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="1.5" initial={{cx:drop.xs[0],cy:15}} animate={{cx:drop.xs,cy:drop.ys}} transition={{duration:reduce?0:1.25,ease:"linear"}} onAnimationComplete={landed}/> : <circle cx={40+lane*40} cy="15" r="7" fill="var(--color-tomato)" stroke="var(--color-ink)" strokeWidth="1.5"/>}
    </svg></div>
    <label className="lab-field marble-launch">Launch position <output>{lane+1} / 7</output><input type="range" aria-label="Marble launch position" min="0" max="6" step="1" value={lane} onChange={event=>{setLane(Number(event.target.value));if(!dropping)setDrop(null);}} disabled={dropping}/></label>
    <button type="button" className="lab-button lab-button-ink marble-release" onClick={release} aria-disabled={dropping}>{dropping ? "Taking the scenic route…" : "Drop a marble ↓"}</button>
    <div className="marble-tally"><span>{count} {count===1?"drop":"drops"}</span><strong>{total} pts</strong></div>
    <p className="lab-status" role="status">{dropping ? "Bounce, bounce… where will it land?" : last!==null ? `+${last} points. ${last===100 ? "Right down the middle!":"One more for science?"}` : "Aim for the 100. Or just enjoy the journey."}</p><p className="lab-help">Illustrated chance, not a physics simulation. Points stay on this page.</p>
  </article>;
}
