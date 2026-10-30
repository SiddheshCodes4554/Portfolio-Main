import type { Metadata } from "next";
import { CaseStudy } from "@/components/archive/case-study";
import { archiveProjects } from "@/content/projects";
const project = archiveProjects[0];
export const metadata: Metadata = { title: `${project.name} — Case study`, description: project.description };
export default function ProjectPage() { return <CaseStudy project={project} />; }
