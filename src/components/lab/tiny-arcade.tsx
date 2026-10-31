"use client";
import { useEffect, useRef, useState } from "react";
import { Flag, Zap } from "lucide-react";
import { averageReaction } from "@/lib/lab";

type Phase = "idle" | "waiting" | "ready" | "early" | "result" | "complete";
export function TinyArcade() {
  const [phase, setPhase] = useState<Phase>("idle"), [rounds, setRounds] = useState<number[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const currentPhase = useRef<Phase>("idle"), signalAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signalFrame = useRef<number | null>(null);
  function clearTimers() { if (timer.current !== null) clearTimeout(timer.current); if (signalFrame.current !== null) cancelAnimationFrame(signalFrame.current); timer.current = signalFrame.current = null; }
  function transition(next: Phase) { currentPhase.current = next; setPhase(next); }
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); if (signalFrame.current !== null) cancelAnimationFrame(signalFrame.current); }, []);
  useEffect(() => {
    function cancelHiddenTrial() {
      if (document.hidden && (currentPhase.current === "waiting" || currentPhase.current === "ready")) {
        clearTimers(); transition("idle"); setRounds([]);
      }
    }
    document.addEventListener("visibilitychange", cancelHiddenTrial);
    return () => document.removeEventListener("visibilitychange", cancelHiddenTrial);
  }, []);
  function activate() {
    if (currentPhase.current === "waiting") { clearTimers(); transition("early"); return; }
    if (currentPhase.current === "ready") {
      const next = [...rounds, Math.max(0, Math.round(performance.now() - signalAt.current))];
      setRounds(next);
      if (next.length === 3) { const average = averageReaction(next); setBest(previous => previous === null ? average : Math.min(previous, average)); transition("complete"); }
      else transition("result");
      return;
    }
    if (currentPhase.current === "complete" || currentPhase.current === "idle") setRounds([]);
    clearTimers(); transition("waiting");
    timer.current = setTimeout(() => {
      signalFrame.current = requestAnimationFrame(() => { signalAt.current = performance.now(); transition("ready"); });
    }, 1200 + Math.random() * 2200);
  }
  const average = averageReaction(rounds);
  const title = phase === "waiting" ? "Hold your horses…" : phase === "ready" ? "GO!" : phase === "early" ? "Jumped the gun!" : phase === "result" ? `${rounds.at(-1)} ms` : phase === "complete" ? `${average} ms` : "Three sparks. One score.";
  const hint = phase === "waiting" ? "Wait for GO. Don’t press yet." : phase === "ready" ? "Launch! Press the button now." : phase === "early" ? "No round lost. Give that one another go." : phase === "result" ? `Round ${rounds.length} stamped. Keep it going.` : phase === "complete" ? "Your three-round average. Nicely played." : "A three-round reaction challenge.";
  return <article className="tiny-arcade lab-gadget" data-phase={phase} aria-labelledby="arcade-title">
    <div className="arcade-marquee"><span className="lab-label">04 / THE THREE-SPARK CHALLENGE</span><Zap size={16} aria-hidden="true"/></div><h3 id="arcade-title">Tiny arcade</h3>
    <ol className="arcade-rounds" aria-label="Round results">{[0,1,2].map(index=><li key={index} data-done={rounds[index]!==undefined} data-current={index===rounds.length&&phase!=="complete"}><span>{index+1}</span><span>{rounds[index]!==undefined ? `${rounds[index]} ms` : "—"}</span></li>)}</ol>
    <div className="arcade-score" role="status" aria-live="polite"><span className="arcade-signal" aria-hidden="true">{phase === "ready" ? "✳" : phase === "complete" ? "★" : phase === "result" ? "↗" : "···"}</span><strong>{title}</strong><span>{hint}</span></div>
    {phase==="complete"&&<div className="arcade-prize"><div className="arcade-confetti" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{"--piece":i} as React.CSSProperties}/>)}</div><span className="prize-stamp"><Flag size={15} aria-hidden="true"/>RUN COMPLETE</span><span>ONE TINY VICTORY.<br/>KEEP THE CURIOSITY.</span></div>}
    <button type="button" className="arcade-button" onClick={activate} onKeyDown={event=>{if(event.repeat&&(event.key===" "||event.key==="Enter"))event.preventDefault();}}>{phase === "waiting" ? "Waiting…" : phase === "ready" ? "HIT IT!" : phase === "idle" ? "Start a run →" : phase === "complete" ? "Beat your score ↻" : phase === "early" ? "Retry this round ↻" : `Start round ${rounds.length+1} →`}</button>
    <div className="arcade-best"><span>BEST RUN / THIS PAGE</span><strong>{best===null ? "Set the first score" : `${best} ms avg`}</strong></div>
    <p className="lab-help">Click or use Enter / Space after “GO!”. Complete three rounds to earn your ticket. Timing includes device and browser delay.</p><div className="arcade-feet" aria-hidden="true"><i/><i/></div>
  </article>;
}
