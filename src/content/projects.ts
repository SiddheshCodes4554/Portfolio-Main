// Resume-backed facts. Product screenshots and repository URLs supplied by the owner.
export const projects = {
  campus: {
    name: "CampusOS",
    description: "An AI-native academic workspace with document intelligence, knowledge graphs, personalized study planning, ATS analysis, and internship and placement workflows.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "pgvector", "Gemini AI", "Tailwind CSS"],
    notes: [
      { title: "Retrieval", text: "RAG-based document intelligence uses PostgreSQL pgvector with HNSW indexing for semantic retrieval." },
      { title: "Personalization", text: "Gemini-powered workflows and a persistent student memory system support personalized study planning." },
      { title: "Access & reliability", text: "Secure row-level access controls and API rate limiting support the academic workspace." },
    ],
  },
  aeris: {
    name: "AERIS",
    description: "Autonomous Edge Rescue & Intelligence System. A real-time disaster-response command center combining live camera streaming, computer-vision inference, telemetry, and autonomous mission workflows.",
    technologies: ["Python", "FastAPI", "OpenCV", "React", "Vite", "Tailwind CSS"],
  },
} as const;

export type ArchiveProjectId = "campusos" | "aeris" | "ingress-within";
export type ProjectNote = { title: string; text: string };
export type ArchiveProject = {
  id: ArchiveProjectId; number: string; name: string; subtitle: string; category: string;
  description: string; technologies: readonly string[]; technologyLabel: string;
  notes: readonly ProjectNote[]; assetNote: string;
  repository: string; screenshot: { src: string; width: number; height: number; alt: string };
};

// Public project content verified against reference/resume.pdf. Demonstrations are not product captures.
export const archiveProjects: readonly ArchiveProject[] = [
  { id: "campusos", number: "01", name: projects.campus.name, subtitle: "An AI-powered student command center", category: "AI / ACADEMIC WORKSPACE",
    description: projects.campus.description, technologies: projects.campus.technologies, technologyLabel: "Built with", notes: projects.campus.notes,
    repository: "https://github.com/SiddheshCodes4554/CampusOS", screenshot: { src: "/images/projects/campusos.png", width: 1280, height: 656, alt: "CampusOS dashboard with AI Copilot, academic navigation, learning cards, and a to-do list." },
    assetNote: "Owner-supplied CampusOS dashboard capture. The interactive knowledge graph is a separate illustrative demonstration." },
  { id: "aeris", number: "02", name: projects.aeris.name, subtitle: "Autonomous Edge Rescue & Intelligence System", category: "VISION / DISASTER RESPONSE",
    description: projects.aeris.description, technologies: projects.aeris.technologies, technologyLabel: "Built with",
    notes: [
      { title: "Seeing the scene", text: "A FastAPI and OpenCV video pipeline integrates live camera streaming and computer-vision inference." },
      { title: "Operating the system", text: "A React/Vite operations dashboard supports AI overlays, disaster-zone monitoring, telemetry, and autonomous mission workflows." },
      { title: "Handling interruptions", text: "The project includes failover handling and autonomous backtracking simulation." },
    ], repository: "https://github.com/SiddheshCodes4554/AERIS-SIH", screenshot: { src: "/images/projects/aeris.png", width: 1828, height: 922, alt: "AERIS operations interface with system health, aircraft visualization, a position map, and camera panel." },
    assetNote: "Owner-supplied AERIS interface capture. Values visible in the screenshot are interface content, not claimed deployment results. The interactive radar is illustrative." },
  { id: "ingress-within", number: "03", name: "Ingress Within", subtitle: "AI-powered journaling & product work", category: "PRODUCT / MENTAL WELLNESS",
    description: "Product Associate Intern work on a mental wellness platform, translating founder ideas and evolving requirements into end-to-end features.",
    technologies: ["Frontend", "Backend", "Database", "Authentication", "AI integrations"], technologyLabel: "Across the product",
    notes: [
      { title: "Problem", text: "Take a mental wellness platform from an early-stage concept into a functional product, working with evolving requirements." },
      { title: "What I worked on", text: "AI-powered journaling, reflections, emotional scoring, pattern detection, interventions, and personalized learning modules, with work across frontend, backend, database, authentication, and AI integrations." },
      { title: "What I learned", text: "Learning through the work: translating ambiguous founder ideas into features, then continuously refining the architecture and user experience as requirements evolved." },
    ], repository: "https://github.com/backend-ingress-within/Ingress-Within-Main", screenshot: { src: "/images/projects/ingress-within.png", width: 1917, height: 911, alt: "Ingress Within landing page with a watercolor background and independent and professional journey options." },
    assetNote: "Owner-supplied Ingress Within landing-page capture. Work notes remain limited to public résumé scope, with no private journal entries or internal product material." },
];
