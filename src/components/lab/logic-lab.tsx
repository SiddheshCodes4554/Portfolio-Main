"use client";
import { useState } from "react";
import { PaperTape } from "@/components/ui/scrapbook";
import { evaluateGate, gates, type Gate } from "@/lib/lab";

export function LogicLab() {
  const [a, setA] = useState(true), [b, setB] = useState(false);
  const [gate, setGate] = useState<Gate>("XOR");
  const output = evaluateGate(gate, a, b);
  return <article className="logic-paper lab-gadget" aria-labelledby="logic-title"><PaperTape/>
    <header className="gadget-header"><span className="lab-label">02 / BITS OF REASON</span><span className="lab-pencil" aria-hidden="true">test → understand</span></header>
    <h3 id="logic-title">Logic lab</h3><p className="gadget-intro">Two inputs. One small moment of logic.</p>
    <div className="logic-gates" role="group" aria-label="Logic gate">{gates.map(item => <button type="button" key={item} aria-pressed={gate === item} onClick={() => setGate(item)}>{item}</button>)}</div>
    <div className="logic-circuit"><div className="logic-inputs"><button type="button" aria-pressed={a} onClick={() => setA(!a)} aria-label={`Input A, ${a ? "1" : "0"}`}><span>A</span><i aria-hidden="true"/>{Number(a)}</button><button type="button" aria-pressed={b} onClick={() => setB(!b)} aria-label={`Input B, ${b ? "1" : "0"}`}><span>B</span><i aria-hidden="true"/>{Number(b)}</button></div>
      <svg viewBox="0 0 260 130" fill="none" aria-hidden="true"><path d="M0 32H66V48H100" className={a ? "wire powered" : "wire"}/><path d="M0 100H66V82H100" className={b ? "wire powered" : "wire"}/><path d="M164 65H260" className={output ? "wire powered" : "wire"}/><path d={gate === "AND" ? "M90 22H120C180 22 180 108 120 108H90Z" : "M87 22Q113 65 87 108Q145 108 175 65Q145 22 87 22Z"} fill="var(--color-sheet)" stroke="var(--color-cobalt)" strokeWidth="2"/>{gate === "XOR" && <path d="M78 22Q104 65 78 108" stroke="var(--color-cobalt)" strokeWidth="2"/>}<text x="125" y="70" textAnchor="middle">{gate}</text><circle cx="218" cy="65" r="16" className={output ? "logic-led lit" : "logic-led"}/><text x="218" y="115" textAnchor="middle">{output ? "ON · 1" : "OFF · 0"}</text></svg>
    </div>
    <p className="logic-equation" role="status">{Number(a)} {gate} {Number(b)} = <strong>{Number(output)}</strong><span>{gate === "AND" ? "Both inputs must be on." : gate === "OR" ? "At least one input must be on." : "Exactly one input must be on."}</span></p>
    <table className="truth-table"><caption>Truth table · arrow marks your inputs</caption><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">OUT</th><th scope="col"><span className="sr-only">Current row</span></th></tr></thead><tbody>{[0, 1, 2, 3].map(value => { const va = !!(value & 2), vb = !!(value & 1), current = a === va && b === vb; return <tr key={value} data-current={current}><td>{Number(va)}</td><td>{Number(vb)}</td><td>{Number(evaluateGate(gate, va, vb))}</td><td>{current ? <span aria-label="Current inputs">←</span> : ""}</td></tr>; })}</tbody></table>
  </article>;
}
