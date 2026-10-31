import type { MetadataRoute } from "next";
import { archiveProjects } from "@/content/projects";
import { siteContent } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteContent.url }, ...archiveProjects.map(project => ({ url: `${siteContent.url}/projects/${project.id}` }))];
}
