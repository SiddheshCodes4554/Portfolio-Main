"use client";
import { useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

const initialPhrase = "MAKE A LITTLE NOISE";
export function GlitchMachine() {
  const [phrase, setPhrase] = useState(initialPhrase), [intensity, setIntensity] = useState(35), [frozen, setFrozen] = useState(false);
  const [run, setRun] = useState(0);
  return <article className="glitch-machine lab-gadget" aria-labelledby="glitch-title"><header className="gadget-header"><span className="lab-label">03 / TYPE DISTORTER</span><span className="machine-badge">GM–01</span></header>
    <h3 id="glitch-title">The glitch machine</h3>
    <div className="glitch-screen" style={{ "--glitch-offset": `${intensity / 16}px`, "--glitch-tilt": `${intensity / 40}deg` } as CSSProperties}><div className="glitch-scanlines" aria-hidden="true"/><div key={`${phrase}-${intensity}-${run}`} className="glitch-type" data-frozen={frozen} data-active={intensity > 0}><span>{phrase || "YOUR WORDS HERE"}</span><span aria-hidden="true">{phrase || "YOUR WORDS HERE"}</span><span aria-hidden="true">{phrase || "YOUR WORDS HERE"}</span></div><span className="glitch-screen-label">{frozen ? "HOLD / FROZEN" : "SIGNAL / READY"}</span></div>
    <label className="lab-field">Feed it a phrase<input value={phrase} maxLength={32} onChange={event => setPhrase(event.target.value)} spellCheck={false}/></label>
    <div className="glitch-dial-row"><label className="lab-field">Distortion <output>{intensity}%</output><input aria-label="Glitch intensity" type="range" min="0" max="100" value={intensity} onChange={event => setIntensity(Number(event.target.value))}/></label><div className="glitch-dial" style={{ rotate: `${intensity * 2.4 - 120}deg` }} aria-hidden="true"><i/></div></div>
    <div className="gadget-actions"><button type="button" className="lab-button" aria-pressed={frozen} onClick={() => { setFrozen(!frozen); if (frozen) setRun(current => current + 1); }}>{frozen ? <Play size={14} aria-hidden="true"/> : <Pause size={14} aria-hidden="true"/>}{frozen ? "Unfreeze" : "Freeze"}</button><button className="lab-button" type="button" onClick={() => { setPhrase(initialPhrase); setIntensity(35); setFrozen(false); setRun(current => current + 1); }}><RotateCcw size={14} aria-hidden="true"/>Reset</button></div>
    <p className="lab-help">A brief signal wobble per change. No flashing, no endless loop.</p>
  </article>;
}
