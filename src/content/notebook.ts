// Public content verified against reference/resume.pdf. Editorial lines are not biographical claims.
export type StoryPage = { id: string; label: string; title: string; paragraphs: readonly string[]; margin: string; placeholder?: string };
export const notebookIntro = "I’m Siddhesh Gawade, a full-stack developer and Computer Science student in Pune, working across web products, AI, and engineering systems.";
export const storyPages: readonly StoryPage[] = [
 { id: "beginning", label: "The Beginning", title: "A few lines of my story.", paragraphs: ["I’m pursuing a B.Tech in Computer Science with a Data Science focus at Ajeenkya DY Patil University in Pune (2025–2029).", "My experience also includes freelance full-stack development for Sindhudurg Sainik School & Junior College in Amboli, Maharashtra (2021–2023): building and maintaining web applications, implementing custom features, and working with stakeholders."], margin: "Different contexts. The same work of making things work." },
 { id: "built", label: "What I’ve Built", title: "From an idea to a working thing.", paragraphs: ["CampusOS brings document intelligence, knowledge graphs, and personalized study planning into an AI-powered academic workspace. AERIS combines live camera streaming, computer vision, telemetry, and autonomous mission workflows for disaster-response monitoring.", "As a Product Associate Intern at Ingress Within (June 2026–Present), I’ve worked on AI-powered journaling and reflections, emotional scoring, pattern detection, interventions, and personalized learning modules—across frontend, backend, database, authentication, and AI integrations."], margin: "Product thinking meets engineering." },
 { id: "next", label: "What’s Next", title: "This page stays open.", paragraphs: ["My degree runs from 2025–2029. My product work at Ingress Within involves translating evolving founder ideas into features and continuously refining the architecture and user experience.", "That’s the background behind the projects in this scrapbook. The next personal chapter belongs here when it’s ready to be written."], margin: "still figuring things out, one build at a time.", placeholder: "Editable personal note: add what I’m exploring next. No future plans have been filled in yet." },
];
export type JourneyEntry = { id: string; label: string; date: string; title: string; description: string; x: number; y: number };
export const journeyEntries: readonly JourneyEntry[] = [
 { id:"education",label:"University",date:"2025–2029",title:"Computer Science / Data Science",description:"B.Tech in Computer Science (Data Science), Ajeenkya DY Patil University, Pune, India.",x:18,y:25 },
 { id:"freelance",label:"Freelance",date:"2021–2023",title:"Full-stack development",description:"Built and maintained web applications, custom features, and deployment workflows for Sindhudurg Sainik School & Junior College, Amboli, Maharashtra.",x:78,y:25 },
 { id:"internship",label:"Product work",date:"June 2026–Present",title:"Product Associate Intern / Ingress Within",description:"Worked directly with the founder to turn ambiguous ideas into end-to-end features for a mental wellness platform.",x:18,y:76 },
 { id:"hackathon",label:"Hackathon",date:"Date not listed",title:"Google Cloud Agentic AI Hackathon finalist",description:"Top 500 teams out of 70,000+ participants. The résumé does not specify an event date.",x:78,y:76 },
];
export type ToolProject = { label: string; href: string };
export type NotebookTool = { name: string; use: string; projects: readonly ToolProject[] };
export type ToolboxCategory = { id: string; label: string; tools: readonly NotebookTool[] };
const campus = { label:"CampusOS",href:"/projects/campusos" };
const aeris = { label:"AERIS",href:"/projects/aeris" };
export const toolboxCategories: readonly ToolboxCategory[] = [
 {id:"languages",label:"Languages",tools:[
  {name:"JavaScript",use:"Writing application logic and interactions for the web.",projects:[]},
  {name:"TypeScript",use:"Typed application code and safer interfaces between parts of a web application.",projects:[campus]},
  {name:"Python",use:"Building services and processing video and computer-vision data.",projects:[aeris]},
  {name:"C++",use:"Systems programming and performance-sensitive application logic.",projects:[]},
  {name:"PHP",use:"Server-side web application development.",projects:[]},
 ]},
 {id:"frameworks",label:"Frameworks",tools:[
  {name:"React",use:"Building component-based interfaces, including the AERIS operations dashboard.",projects:[aeris]},
  {name:"Next.js",use:"Structuring full-stack React applications and application routes.",projects:[campus]},
  {name:"Node.js",use:"Running JavaScript on the server and supporting web tooling.",projects:[]},
  {name:"Express.js",use:"Defining HTTP routes and APIs in Node.js applications.",projects:[]},
  {name:"FastAPI",use:"Building Python APIs, including AERIS’s video pipeline.",projects:[aeris]},
  {name:"Tailwind CSS",use:"Composing responsive interface styles with utilities.",projects:[campus,aeris]},
 ]},
 {id:"ai",label:"AI / ML",tools:[
  {name:"OpenCV",use:"Processing images and video for computer-vision pipelines.",projects:[aeris]},
  {name:"Gemini AI",use:"Powering AI workflows in the CampusOS academic workspace.",projects:[campus]},
  {name:"RAG / retrieval",use:"Retrieving relevant document content to support AI document intelligence.",projects:[campus]},
  {name:"Claude / Groq APIs",use:"Connecting applications to language-model services.",projects:[]},
 ]},
 {id:"data-tools",label:"Databases & tools",tools:[
  {name:"PostgreSQL",use:"Storing relational data and supporting semantic retrieval with pgvector.",projects:[campus]},
  {name:"Supabase",use:"Providing a PostgreSQL-based application backend and row-level access controls.",projects:[campus]},
  {name:"pgvector",use:"Vector similarity search; CampusOS uses HNSW indexing for semantic retrieval.",projects:[campus]},
  {name:"MySQL",use:"Storing and querying relational application data.",projects:[]},
  {name:"Git / GitHub",use:"Tracking source changes and collaborating through repositories.",projects:[]},
  {name:"REST APIs",use:"Connecting clients and services through HTTP interfaces.",projects:[]},
  {name:"Vercel",use:"Deploying and hosting web applications.",projects:[]},
 ]},
];
export const personalNotes = [
 { title:"A small win",label:"Achievement note",text:"100/100 in Mathematics in the Class 10 Board Examination.",tone:"butter" },
 { title:"In the margins",label:"Editable personal note",text:"A space for a genuine interest, sketch, or small personal detail. To be filled in by Siddhesh.",tone:"sage" },
 { title:"A thought to keep",label:"Editorial note",text:"A work in progress can still be worth opening.",tone:"plain" },
] as const;
