import type { Metadata } from "next";
import { CaseStudy } from "@/components/archive/case-study";
import { archiveProjects } from "@/content/projects";
const project = archiveProjects[1];
export const metadata: Metadata = { title: `${project.name} — Case study`, description: project.description, alternates: { canonical: "/projects/aeris" } };
export default function ProjectPage() { return <CaseStudy project={project} />; }
