"use client";
import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

type Phase = "idle" | "waiting" | "ready" | "early" | "result";
export function TinyArcade() {
  const [phase, setPhase] = useState<Phase>("idle"), [result, setResult] = useState(0);
  const currentPhase = useRef<Phase>("idle"), signalAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signalFrame = useRef<number | null>(null);
  function clearTimers() { if (timer.current !== null) clearTimeout(timer.current); if (signalFrame.current !== null) cancelAnimationFrame(signalFrame.current); timer.current = signalFrame.current = null; }
  function transition(next: Phase) { currentPhase.current = next; setPhase(next); }
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); if (signalFrame.current !== null) cancelAnimationFrame(signalFrame.current); }, []);
  // A background tab invalidates the trial rather than recording a misleading result.
  useEffect(() => { function cancelHiddenTrial() { if (document.hidden && (currentPhase.current === "waiting" || currentPhase.current === "ready")) { clearTimers(); transition("idle"); } } document.addEventListener("visibilitychange", cancelHiddenTrial); return () => document.removeEventListener("visibilitychange", cancelHiddenTrial); }, []);
  function activate() {
    if (currentPhase.current === "waiting") { clearTimers(); transition("early"); return; }
    if (currentPhase.current === "ready") { setResult(Math.max(0, Math.round(performance.now() - signalAt.current))); transition("result"); return; }
    clearTimers(); transition("waiting");
    timer.current = setTimeout(() => {
      signalFrame.current = requestAnimationFrame(() => { signalAt.current = performance.now(); transition("ready"); });
    }, 1400 + Math.random() * 2600);
  }
  const title = phase === "waiting" ? "Steady…" : phase === "ready" ? "GO!" : phase === "early" ? "Too soon!" : phase === "result" ? `${result} ms` : "Got quick hands?";
  return <article className="tiny-arcade lab-gadget" data-phase={phase} aria-labelledby="arcade-title"><div className="arcade-marquee"><span className="lab-label">04 / ONE-BUTTON ARCADE</span><Zap size={16} aria-hidden="true"/></div><h3 id="arcade-title">Tiny arcade</h3><div className="arcade-score" role="status" aria-live="polite"><span className="arcade-signal" aria-hidden="true">{phase === "ready" ? "✳" : phase === "result" ? "↗" : "···"}</span><strong>{title}</strong><span>{phase === "waiting" ? "Wait for GO. Don’t press yet." : phase === "ready" ? "Press the button now." : phase === "early" ? "Wait for the signal next time." : phase === "result" ? "One browser-timed attempt." : "Wait. Watch. Then react."}</span></div><button type="button" className="arcade-button" onClick={activate}>{phase === "waiting" ? "Waiting…" : phase === "ready" ? "HIT IT!" : phase === "idle" ? "Start game" : "Play again"}</button><p className="lab-help">Click or use Enter / Space. Press only after “GO!” appears. Timings include your device and browser delay.</p><div className="arcade-feet" aria-hidden="true"><i/><i/></div></article>;
}
