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
