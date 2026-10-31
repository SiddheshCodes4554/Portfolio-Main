import { WorkbenchPower } from "./workbench-power";
import Image from "next/image";
import Link from "next/link";
import { DeskLamp, MiniCircuit, MiniTerminal } from "./workbench";
import { ArrowUpRight } from "lucide-react";
import { PaperCard, PolaroidCard, PaperTape, HandwrittenNote, SectionLabel } from "@/components/ui/scrapbook";
import { ArtifactPreview } from "./artifact-preview";
import { HackathonTicket } from "./paper-interactions";
import { projects, archiveProjects } from "@/content/projects";

function CampusCapture() {
  const capture = archiveProjects[0].screenshot;
  return <Image className="hero-project-capture" src={capture.src} width={capture.width} height={capture.height} alt={capture.alt} sizes="(max-width: 540px) 90vw, (max-width: 1099px) 350px, 460px" loading="eager" />;
}

function ArchitectureSketch() {
  return <svg viewBox="0 0 300 130" fill="none" aria-hidden="true" className="architecture-sketch">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="m6 20 76-2 2 46-77 2ZM112 17l77 3-2 45-76-2ZM219 20l75-1-2 47-75-2Z"/><path d="m85 41 22-1-5-4m5 4-5 5m88-3 24-1-5-4m5 4-5 5M148 67v24h100v-20m-4 5 4-5 4 5"/><path d="m28 99 80 2m-80 7 56 2" strokeOpacity=".4"/></g>
    <g fill="currentColor" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle"><text x="44" y="39">CAMERA</text><text x="44" y="52">FEED</text><text x="150" y="39">VISION</text><text x="150" y="52">PIPELINE</text><text x="255" y="39">OPS</text><text x="255" y="52">VIEW</text><text x="202" y="116">telemetry + missions</text></g>
  </svg>;
}

function CampusPreview() {
  return <>
    <p className="preview-lede">{projects.campus.description}</p>
    <ul className="technology-list" aria-label="CampusOS technologies">{projects.campus.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
    <Link className="case-study-link" href="/projects/campusos">Read the full case study <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <CampusCapture />
    <section id="campus-case-study" tabIndex={-1} className="case-study-notes"><SectionLabel>Inside the build</SectionLabel><h3>CampusOS / case-study notes</h3>
      {projects.campus.notes.map(note => <div key={note.title}><h4>{note.title}</h4><p>{note.text}</p></div>)}
      <p className="source-note">Technical notes from my résumé, alongside the owner-supplied product capture.</p>
    </section>
  </>;
}

function AerisPreview() {
  return <><p className="preview-lede">{projects.aeris.description}</p>
    <SectionLabel>Architecture / conceptual overview</SectionLabel>
    <ol className="architecture-flow">
      <li><span>01 / INPUT</span><h3>Live camera stream</h3><p>Camera streaming and telemetry provide a view of the disaster zone.</p></li>
      <li><span>02 / PROCESS</span><h3>FastAPI + OpenCV</h3><p>A Python video pipeline supports computer-vision inference.</p></li>
      <li><span>03 / OPERATE</span><h3>React / Vite dashboard</h3><p>AI overlays and disaster-zone monitoring support mission workflows.</p></li>
    </ol>
    <PaperCard surface="grid" className="architecture-note"><h3>Keeping the mission in view</h3><p>Failover handling and autonomous backtracking simulation accompany the monitoring and mission workflows.</p></PaperCard>
    <ul className="technology-list" aria-label="AERIS technologies">{projects.aeris.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
    <p className="source-note">A readable summary of the résumé-described system, not a deployment diagram.</p>
  </>;
}

export function ScrapbookDesk() {
  return <WorkbenchPower>
    <DeskLamp />
    <HandwrittenNote className="desk-discovery">switch it on. open it up. try a command. ↗</HandwrittenNote>
    <ArtifactPreview title="CampusOS" action="Open CampusOS project preview" className="campus-artifact" preview={<CampusPreview />}>
      <PolaroidCard tilt="left" className="campus-print" caption={<><strong>CampusOS</strong><span>A student command center. <span aria-hidden="true">↗</span></span></>}><CampusCapture /></PolaroidCard><PaperTape />
    </ArtifactPreview>
    <ArtifactPreview title="AERIS / unfold the system" action="Unfold AERIS architecture sketch" className="aeris-artifact" preview={<AerisPreview />}>
      <PaperCard surface="grid" tilt="casual" className="aeris-paper"><SectionLabel>Field sketch / 02</SectionLabel><h2>AERIS</h2><p>Rescue. Observe. Respond.</p><ArchitectureSketch /><span className="open-me">open me ↗</span></PaperCard>
    </ArtifactPreview>
    <MiniCircuit />
    <MiniTerminal />

    <HackathonTicket />
  </WorkbenchPower>;
}
