import { archiveProjects, type ArchiveProject } from "../../content/projects.ts";
import { contactContent } from "../../content/contact.ts";
import { notebookIntro, journeyEntries, toolboxCategories, personalNotes } from "../../content/notebook.ts";
import { parseCommand } from "./parser.ts";

export type TerminalBlock =
  | { kind: "heading" | "text" | "status" | "error"; text: string }
  | { kind: "divider" }
  | { kind: "rows"; rows: readonly { label: string; value: string }[] }
  | { kind: "group"; title: string; items: readonly string[] }
  | { kind: "project"; project: ArchiveProject; expanded?: boolean }
  | { kind: "timeline"; title: string; date: string; text: string }
  | { kind: "link"; label: string; href: string; projectId?: string };
export type TerminalAction = { type: "resume" | "clear" | "exit" } | { type: "navigate" | "external"; href: string };
export type CommandResult = { blocks: TerminalBlock[]; action?: TerminalAction; cwd?: string; theme?: "charcoal" | "paper" };
export type CommandContext = { cwd: string; history: readonly string[]; theme: "charcoal" | "paper"; now?: Date };
const text = (value: string): TerminalBlock => ({ kind: "text", text: value });
const heading = (value: string): TerminalBlock => ({ kind: "heading", text: value });
const error = (value: string): CommandResult => ({ blocks: [{ kind: "error", text: value }] });
const link = (label: string, href: string): TerminalBlock => ({ kind: "link", label, href });
const profile = () => [heading("About"), text(notebookIntro), link("Open the Engineer’s Notebook ↗", "#engineers-notebook")];
const skills = (): TerminalBlock[] => [heading("Skills"), ...toolboxCategories.map(group => ({ kind: "group" as const, title: group.label, items: group.tools.map(tool => tool.name) }))];
const education = (): TerminalBlock[] => [heading("Education"), { kind:"rows", rows:[{label:"Degree",value:"B.Tech in Computer Science (Data Science)"},{label:"Institution",value:"Ajeenkya DY Patil University, Pune, India"},{label:"Duration",value:journeyEntries[0].date}] }];
const experience = (): TerminalBlock[] => [heading("Experience"), ...[journeyEntries[2],journeyEntries[1]].map(entry=>({ kind:"timeline" as const,title:entry.title,date:entry.date,text:entry.description }))];
const achievements = (): TerminalBlock[] => [heading("Achievements"),text(journeyEntries[3].title),text("Top 500 teams out of 70,000+ participants."),{kind:"divider"},text(personalNotes[0].text)];
const contact = (): TerminalBlock[] => [heading("Contact"),link("Write a postcard ↗","#send-a-postcard"),link(contactContent.email,`mailto:${contactContent.email}`),link("GitHub ↗",contactContent.github),link("LinkedIn ↗",contactContent.linkedin)];

// This file tree contains public editorial data only. Paths never reach a filesystem API.
const files: Record<string, () => TerminalBlock[]> = {
  "/portfolio/README.txt":()=>[heading("Internet Scrapbook"),text("A small virtual directory of public portfolio notes. Try ls projects, cat about.txt, or help.")],
  "/portfolio/about.txt":profile,"/portfolio/skills.txt":skills,"/portfolio/education.txt":education,
  "/portfolio/experience.txt":experience,"/portfolio/achievements.txt":achievements,"/portfolio/contact.txt":contact,
  ...Object.fromEntries(archiveProjects.map(project=>[`/portfolio/projects/${project.id}.txt`,()=>[{kind:"project",project,expanded:true} as TerminalBlock]])),
};
const directories = ["/portfolio", "/portfolio/projects"];
export function resolveVirtualPath(path: string, cwd: string): string {
  const parts: string[] = [];
  for (const part of (path.startsWith("/") ? path : `${cwd}/${path}`).split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop(); else parts.push(part);
  }
  return "/" + parts.join("/");
}
type Command = { description: string; run: (args: string[], context: CommandContext) => CommandResult };
const simple = (description: string, output: () => TerminalBlock[]): Command => ({ description, run:()=>({blocks:output()}) });
export const commands: Record<string, Command> = {
  help:{description:"Show commands and keyboard shortcuts",run:()=>({blocks:[heading("Commands"),{kind:"rows",rows:Object.entries(commands).map(([label,command])=>({label,value:command.description}))},{kind:"divider"},text("↑ / ↓ history · Tab complete · Esc dismiss · Ctrl+L clear · Ctrl+C cancel input"),text("Try project campusos, cd projects, cat about.txt, or theme paper.")]})},
  whoami:simple("Your host, in a few words",()=>[heading(contactContent.name),{kind:"rows",rows:[{label:"Work",value:"Full-stack developer · AI tinkerer"},{label:"Location",value:"Pune, India"}]}]),
  about:simple("About me + notebook link",profile),
  projects:simple("Browse three project notebooks",()=>[heading("Projects"),...archiveProjects.map(project=>({kind:"project" as const,project}))]),
  project:{description:"project campusos | aeris | ingress",run:args=>{
    const query=args.join(" ").toLowerCase().replace(/[\s-]/g,"");
    const project=archiveProjects.find(p=>p.id.replaceAll("-","")===query || (query==="ingress"&&p.id==="ingress-within"));
    return project?{blocks:[{kind:"project",project,expanded:true}]}:error("Choose project campusos, project aeris, or project ingress.");
  }},
  skills:simple("Grouped languages, frameworks and tools",skills),education:simple("Degree, institution and dates",education),
  experience:simple("Verified work experience",experience),achievements:simple("Hackathon and mathematics achievements",achievements),
  resume:{description:"Open the résumé PDF in this page",run:()=>({blocks:[{kind:"status",text:"Opening the résumé viewer."}],action:{type:"resume"}})},
  contact:{description:"Go to the postcard section",run:()=>({blocks:contact(),action:{type:"navigate",href:"#send-a-postcard"}})},
  github:{description:"Open my GitHub profile",run:()=>({blocks:[link("GitHub ↗",contactContent.github)],action:{type:"external",href:contactContent.github}})},
  linkedin:{description:"Open my LinkedIn profile",run:()=>({blocks:[link("LinkedIn ↗",contactContent.linkedin)],action:{type:"external",href:contactContent.linkedin}})},
  pwd:{description:"Current virtual directory",run:(_,ctx)=>({blocks:[text(ctx.cwd)]})},
  ls:{description:"List a virtual directory",run:(args,ctx)=>{
    const path=resolveVirtualPath(args[0]??".",ctx.cwd);
    if(!directories.includes(path))return error("Directory not found. Try ls /portfolio.");
    const entries=[...directories,...Object.keys(files)].filter(p=>p.startsWith(path+"/")&&!p.slice(path.length+1).includes("/"));
    return {blocks:[heading(path),{kind:"group",title:"Public notes",items:entries.map(p=>p.slice(path.length+1)+(directories.includes(p)?"/":""))}]};
  }},
  cd:{description:"cd projects | .. | /portfolio",run:(args,ctx)=>{const path=resolveVirtualPath(args[0]??"/portfolio",ctx.cwd);return directories.includes(path)?{blocks:[{kind:"status",text:path}],cwd:path}:error("Directory not found. This console contains only /portfolio and /portfolio/projects.");}},
  cat:{description:"Read a virtual .txt file",run:(args,ctx)=>{const file=files[resolveVirtualPath(args[0]??"README.txt",ctx.cwd)];return file?{blocks:file()}:error("File not found. Use ls to see the public notes.");}},
  echo:{description:"Print text; quoted arguments supported",run:args=>({blocks:[text(args.join(" "))]})},
  date:{description:"Your browser’s current date and time",run:(_,ctx)=>({blocks:[text((ctx.now??new Date()).toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"}))]})},
  clear:{description:"Clear console output",run:()=>({blocks:[],action:{type:"clear"}})},
  history:{description:"Recent commands on this page",run:(_,ctx)=>({blocks:[heading("History"),{kind:"rows",rows:ctx.history.map((value,i)=>({label:String(i+1).padStart(2,"0"),value}))}]})},
  theme:{description:"theme charcoal | paper (or toggle)",run:(args,ctx)=>{const theme=args[0]?.toLowerCase()??(ctx.theme==="charcoal"?"paper":"charcoal");return theme==="paper"||theme==="charcoal"?{blocks:[{kind:"status",text:`Terminal theme: ${theme}`}],theme}:error("Try theme charcoal or theme paper.");}},
  coffee:simple("A small coffee break",()=>[heading("A little pause"),text("  ( (\n   ) )\n  [___]o\n   ───"),text("Take a breath. Your ideas will still be here.")]),
  exit:{description:"Minimize; reopen whenever you like",run:()=>({blocks:[{kind:"status",text:"Console minimized. Your session stays on this page."}],action:{type:"exit"}})},
};
export function executeCommand(input: string, context: CommandContext): CommandResult {
  const parsed=parseCommand(input);
  if(parsed.error)return error(parsed.error);
  if(!parsed.name)return {blocks:[]};
  const command=Object.hasOwn(commands,parsed.name)?commands[parsed.name]:undefined;
  return command?command.run(parsed.args,context):error(`Unknown command: ${parsed.name}. Type help to explore.`);
}
export function completeCommand(input: string): string[] {
  const prefix=input.trimStart().toLowerCase();
  if(prefix.startsWith("project "))return ["project campusos","project aeris","project ingress"].filter(value=>value.startsWith(prefix));
  return Object.keys(commands).filter(name=>name.startsWith(prefix));
}
