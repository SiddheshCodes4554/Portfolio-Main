// Resume-backed facts only. No screenshot, live URL or external case study was supplied.
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
};

// Public project content verified against reference/resume.pdf. Demonstrations are not product captures.
export const archiveProjects: readonly ArchiveProject[] = [
  { id: "campusos", number: "01", name: projects.campus.name, subtitle: "An AI-powered student command center", category: "AI / ACADEMIC WORKSPACE",
    description: projects.campus.description, technologies: projects.campus.technologies, technologyLabel: "Built with", notes: projects.campus.notes,
    assetNote: "Interactive study, not a product screenshot. Actual screenshots have not been supplied." },
  { id: "aeris", number: "02", name: projects.aeris.name, subtitle: "Autonomous Edge Rescue & Intelligence System", category: "VISION / DISASTER RESPONSE",
    description: projects.aeris.description, technologies: projects.aeris.technologies, technologyLabel: "Built with",
    notes: [
      { title: "Seeing the scene", text: "A FastAPI and OpenCV video pipeline integrates live camera streaming and computer-vision inference." },
      { title: "Operating the system", text: "A React/Vite operations dashboard supports AI overlays, disaster-zone monitoring, telemetry, and autonomous mission workflows." },
      { title: "Handling interruptions", text: "The project includes failover handling and autonomous backtracking simulation." },
    ], assetNote: "The radar is an illustrative simulation. No live telemetry or actual deployment results are shown." },
  { id: "ingress-within", number: "03", name: "Ingress Within", subtitle: "AI-powered journaling & product work", category: "PRODUCT / MENTAL WELLNESS",
    description: "Product Associate Intern work on a mental wellness platform, translating founder ideas and evolving requirements into end-to-end features.",
    technologies: ["Frontend", "Backend", "Database", "Authentication", "AI integrations"], technologyLabel: "Across the product",
    notes: [
      { title: "Problem", text: "Take a mental wellness platform from an early-stage concept into a functional product, working with evolving requirements." },
      { title: "What I worked on", text: "AI-powered journaling, reflections, emotional scoring, pattern detection, interventions, and personalized learning modules, with work across frontend, backend, database, authentication, and AI integrations." },
      { title: "What I learned", text: "Learning through the work: translating ambiguous founder ideas into features, then continuously refining the architecture and user experience as requirements evolved." },
    ], assetNote: "Public résumé scope only. No private journal entries, internal screens, or confidential implementation details are included." },
];
