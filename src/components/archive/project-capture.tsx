import Image from "next/image";
import type { ArchiveProject } from "@/content/projects";
import "./project-capture.css";

/** Local, uncropped product capture; original remains available for close inspection. */
export function ProjectCapture({ project, full = false }: { project: ArchiveProject; full?: boolean }) {
  return <figure className={`project-capture ${full ? "capture-full" : ""}`}>
    <a href={project.screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size ${project.name} screenshot (opens in a new tab)`}>
      <Image src={project.screenshot.src} width={project.screenshot.width} height={project.screenshot.height}
        alt={project.screenshot.alt} sizes={full ? "(max-width: 1100px) 90vw, 1088px" : "(max-width: 600px) 85vw, (max-width: 1000px) 65vw, 560px"} />
    </a>
    <figcaption><span>PRODUCT CAPTURE / {project.number}</span><span>view full size ↗</span></figcaption>
  </figure>;
}
