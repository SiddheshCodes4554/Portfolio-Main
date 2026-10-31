import { HandwrittenNote, SectionLabel } from "@/components/ui/scrapbook";
import { labCopy } from "@/content/lab";
import { PixelPlayground } from "./pixel-playground";
import { MarbleDrop } from "./marble-drop";
import { GlitchMachine } from "./glitch-machine";
import { TinyArcade } from "./tiny-arcade";
import { IdeaGenerator } from "./idea-generator";
import "./lab.css";

export function LittleLab() {
  return <section className="little-lab" id="little-lab" aria-labelledby="lab-title">
    <div className="page-width">
      <header className="lab-heading">
        <SectionLabel>Curiosity department — Vol. 04</SectionLabel>
        <div className="lab-heading-line"><h2 id="lab-title">{labCopy.title}<span aria-hidden="true">✳</span></h2><p>{labCopy.subtitle}</p></div>
        <HandwrittenNote>{labCopy.annotation}</HandwrittenNote>
      </header>
      <div className="lab-workbench"><PixelPlayground /><MarbleDrop /><GlitchMachine /><TinyArcade /><IdeaGenerator /></div>
      <p className="lab-colophon"><span aria-hidden="true">↳</span> Five small experiments. No instructions manual required. <span>All experiments run in your browser.</span></p>
      <noscript><p className="lab-nojs">These five experiments need JavaScript for drawing, marble drops, timing, and generation. The rest of the scrapbook remains available without it.</p></noscript>
    </div>
  </section>;
}
