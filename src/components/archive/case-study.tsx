import Link from "next/link";
import type { ArchiveProject } from "@/content/projects";
import { SectionLabel } from "@/components/ui/scrapbook";
import "./case-study.css";
export function CaseStudy({ project }: { project: ArchiveProject }) {
 return <article className="case-study page-width"><Link className="case-back" href="/#project-archive">← Back to the project archive</Link><SectionLabel>Vol. 02 / Engineering file {project.number}</SectionLabel><h1>{project.name}</h1><p className="case-subtitle">{project.subtitle}</p><p className="case-lede">{project.description}</p><div className="case-study-body"><div><h2>Inside the work</h2>{project.notes.map(note=><section key={note.title}><h3>{note.title}</h3><p>{note.text}</p></section>)}</div><aside><h2>{project.technologyLabel}</h2><ul>{project.technologies.map(tech=><li key={tech}>{tech}</li>)}</ul><p className="case-asset-note">{project.assetNote}</p><p className="case-asset-note">This case study documents the scope described in my résumé. No additional results or metrics are claimed.</p></aside></div></article>;
}
