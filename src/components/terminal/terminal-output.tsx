import type { TerminalBlock } from "@/lib/terminal/registry";

export function openArchive(projectId: string) {
  document.getElementById(`archive-tab-${projectId}`)?.click();
  document.getElementById("project-archive")?.scrollIntoView({ block:"start" });
  document.getElementById(`archive-tab-${projectId}`)?.focus({preventScroll:true});
}
export function TerminalOutput({ blocks }: { blocks: readonly TerminalBlock[] }) {
  return <div className="console-result">{blocks.map((block,index)=>{
    switch(block.kind) {
      case "heading":return <h3 className="console-heading" key={index}>{block.text}</h3>;
      case "divider":return <hr className="console-divider" key={index}/>;
      case "text":case "status":case "error":return <p key={index} className={`console-${block.kind}`}>{block.text}</p>;
      case "rows":return <dl className="console-rows" key={index}>{block.rows.map((row,i)=><div key={i}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>;
      case "group":return <div className="console-group" key={index}><h4>{block.title}</h4><p>{block.items.join(" · ")}</p></div>;
      case "timeline":return <section className="console-timeline" key={index}><span>{block.date}</span><h4>{block.title}</h4><p>{block.text}</p></section>;
      case "link":return <a key={index} href={block.href} target={block.href.startsWith("https:")?"_blank":undefined} rel={block.href.startsWith("https:")?"noopener noreferrer":undefined}>{block.label}</a>;
      case "project":return <section className="console-project" key={index}><h4>{block.project.name}</h4><p>{block.expanded?block.project.description:block.project.subtitle}</p><p className="console-tech">{block.project.technologies.join(" · ")}</p>{block.expanded&&block.project.notes.map(note=><div className="console-group" key={note.title}><h4>{note.title}</h4><p>{note.text}</p></div>)}<a href="#project-archive" onClick={event=>{event.preventDefault();openArchive(block.project.id);}}>Open {block.project.name} in the archive ↗</a><a href={`/projects/${block.project.id}`}>Read case study ↗</a></section>;
    }
  })}</div>;
}
