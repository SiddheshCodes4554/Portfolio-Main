"use client";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUpRight, Maximize2, Minus, Terminal, CornerDownLeft, X } from "lucide-react";
import { completeCommand, executeCommand, type TerminalBlock } from "@/lib/terminal/registry";
import { useDeskPower } from "@/components/hero/workbench-power";
import { TerminalOutput } from "./terminal-output";
import { ResumeViewer } from "./resume-viewer";
import "./terminal.css";

type Entry={id:number;command:string;blocks:TerminalBlock[]};
const MAX_HISTORY=50, MAX_OUTPUT=20;
export function PortfolioTerminal() {
  const {powered,setPowered}=useDeskPower();
  const [input,setInput]=useState(""),[entries,setEntries]=useState<Entry[]>([]),[history,setHistory]=useState<string[]>([]);
  const [cwd,setCwd]=useState("/portfolio"),[theme,setTheme]=useState<"charcoal"|"paper">("charcoal");
  const [minimized,setMinimized]=useState(false),[resume,setResume]=useState(false),[suggestions,setSuggestions]=useState<string[]>([]),[unread,setUnread]=useState(false);
  const field=useRef<HTMLInputElement>(null),output=useRef<HTMLDivElement>(null),sequence=useRef(0),historyIndex=useRef(-1),draft=useRef(""),atBottom=useRef(true),forceScroll=useRef(false);
  const [announcement,setAnnouncement]=useState("");
  const [expanded,setExpanded]=useState(false);
  const windowRef=useRef<HTMLDialogElement>(null),savedScroll=useRef(0);
  useLayoutEffect(()=>{if(output.current)output.current.scrollTop=savedScroll.current;},[expanded]);
  useEffect(()=>{
    if(!expanded)return;
    const window=windowRef.current;
    const previousOverflow=document.body.style.overflow;
    window?.showModal();document.body.style.overflow="hidden";
    field.current?.focus({preventScroll:true});
    return ()=>{window?.close();document.body.style.overflow=previousOverflow;document.getElementById("terminal-expand-control")?.focus({preventScroll:true});};
  },[expanded]);
  function resizeTerminal(next:boolean){savedScroll.current=output.current?.scrollTop??0;setExpanded(next);if(next){setMinimized(false);setPowered(true);}}
  function navigateOutside(action:()=>void){if(expanded){resizeTerminal(false);requestAnimationFrame(action);}else action();}
  useEffect(()=>{if(output.current&&forceScroll.current){output.current.scrollTop=output.current.scrollHeight;forceScroll.current=false;setUnread(false);}},[entries]);
  function focusInput(){field.current?.focus({preventScroll:true});}
  function execute(value:string){
    const line=value.trim();if(!line)return;
    const nextHistory=[...history,line].slice(-MAX_HISTORY);
    const result=executeCommand(line,{cwd,history:nextHistory,theme});
    setInput("");setSuggestions([]);historyIndex.current=-1;draft.current="";setHistory(nextHistory);
    if(result.cwd)setCwd(result.cwd);if(result.theme)setTheme(result.theme);
    forceScroll.current=atBottom.current;
    if(result.action?.type==="clear"){setEntries([]);forceScroll.current=true;setUnread(false);}
    else {setEntries(current=>[...current,{id:++sequence.current,command:line,blocks:result.blocks}].slice(-MAX_OUTPUT));if(!atBottom.current)setUnread(true);}
    setAnnouncement(`${line}: ${result.blocks.some(block=>block.kind==="error")?"check the error in the terminal":"result ready"}`);
    const action=result.action;
    if(action?.type==="resume")setResume(true);
    if(action?.type==="exit"){resizeTerminal(false);setMinimized(true);}
    if(action?.type==="navigate")navigateOutside(()=>{document.querySelector<HTMLElement>(action.href)?.scrollIntoView({block:"start"});document.querySelector<HTMLTextAreaElement>(`${action.href} textarea`)?.focus({preventScroll:true});});
    if(action?.type==="external")window.open(action.href,"_blank","noopener,noreferrer");
  }
  function keydown(event:KeyboardEvent<HTMLInputElement>){
    if(event.key==="Enter"&&!event.nativeEvent.isComposing){event.preventDefault();execute(input);}
    else if(event.key==="ArrowUp"||event.key==="ArrowDown"){
      event.preventDefault();if(!history.length)return;if(historyIndex.current===-1)draft.current=input;
      historyIndex.current=event.key==="ArrowUp"?Math.min(historyIndex.current+1,history.length-1):Math.max(-1,historyIndex.current-1);
      setInput(historyIndex.current===-1?draft.current:history[history.length-1-historyIndex.current]);setSuggestions([]);
    } else if(event.key==="Tab"&&!event.shiftKey&&input.trim()&&suggestions.length===0){
      const matches=completeCommand(input);if(!matches.length)return;event.preventDefault();
      if(matches.length===1){setInput(matches[0]+" ");setSuggestions([]);}else {setSuggestions(matches);setAnnouncement(`${matches.length} command suggestions. Shift+Tab to browse suggestions; Escape to dismiss.`);}
    }else if(event.key==="Escape"&&suggestions.length){event.preventDefault();event.stopPropagation();setSuggestions([]);}
    else if(event.ctrlKey&&event.key.toLowerCase()==="l"){event.preventDefault();setEntries([]);setUnread(false);setAnnouncement("Terminal cleared.");}
    else if(event.ctrlKey&&event.key.toLowerCase()==="c"&&!window.getSelection()?.toString()&&event.currentTarget.selectionStart===event.currentTarget.selectionEnd){event.preventDefault();setInput("");setSuggestions([]);setAnnouncement("Input cancelled.");}
  }
  function reopen(){setMinimized(false);setPowered(true);requestAnimationFrame(focusInput);}
  const terminal=<section id="workbench-terminal" className={`mini-terminal portfolio-terminal ${powered?"terminal-powered":""}`} data-theme={theme} aria-label="Interactive portfolio terminal" data-minimized={minimized}>
    <header className="console-title"><span className="console-window-controls" aria-hidden="true"><i/><i/></span><h2 id="terminal-window-title"><Terminal size={13} aria-hidden="true"/>terminal</h2><div className="console-window-actions"><button type="button" onClick={()=>{if(expanded)resizeTerminal(false);setMinimized(!minimized);if(minimized)requestAnimationFrame(focusInput);}} aria-label={minimized?"Restore terminal":"Minimize terminal"} aria-expanded={!minimized}><Minus size={16} aria-hidden="true"/></button><button id="terminal-expand-control" type="button" onClick={()=>resizeTerminal(!expanded)} aria-label={expanded?"Close expanded terminal":"Expand terminal"} title={expanded?"Return to the desk (Escape)":"Open a larger terminal window"} aria-haspopup={expanded?undefined:"dialog"} aria-controls="expanded-terminal-window">{expanded?<X size={19} aria-hidden="true"/>:<Maximize2 size={16} aria-hidden="true"/>}</button></div></header>
    {minimized?<button type="button" className="console-reopen" onClick={reopen}><Terminal size={18} aria-hidden="true"/>Reopen terminal <ArrowUpRight size={16} aria-hidden="true"/></button>:!powered?<div className="console-standby"><p>Welcome to my terminal.</p><span>The circuit powers this console.</span><button type="button" onClick={()=>{setPowered(true);requestAnimationFrame(focusInput);}}>Close the circuit & explore <ArrowUpRight size={15} aria-hidden="true"/></button></div>:<>
      <div ref={output} className="console-scroll" role="region" aria-label="Terminal output" tabIndex={0} onScroll={()=>{const node=output.current;if(node){atBottom.current=node.scrollHeight-node.scrollTop-node.clientHeight<24;if(atBottom.current)setUnread(false);}}}>
        <div className="console-welcome"><p>Welcome to my terminal.</p><span>Type <strong>help</strong> to explore.</span><div className="console-quick" aria-label="Quick commands">{["projects","skills","resume"].map(command=><button key={command} type="button" onClick={()=>execute(command)}>{command}</button>)}</div></div>
        {entries.map(entry=><div className="console-entry" key={entry.id}><p className="console-command"><span aria-hidden="true">›</span> {entry.command}</p><TerminalOutput blocks={entry.blocks} onNavigate={navigateOutside}/></div>)}
      </div>
      {unread&&<button className="console-latest" type="button" onClick={()=>{if(output.current)output.current.scrollTop=output.current.scrollHeight;atBottom.current=true;setUnread(false);}}>Latest result <ArrowDown size={13} aria-hidden="true"/></button>}
      {suggestions.length>0&&<div className="console-suggestions" aria-label="Command suggestions" onKeyDown={event=>{if(event.key==="Escape"){setSuggestions([]);focusInput();}}}>{suggestions.map(command=><button type="button" key={command} onClick={()=>{setInput(command+" ");setSuggestions([]);focusInput();}}>{command}</button>)}</div>}
      <form className="console-input" onSubmit={event=>{event.preventDefault();execute(input);}}><label htmlFor="desk-command"><span aria-hidden="true">›</span><span className="sr-only">Terminal command</span></label><input id="desk-command" ref={field} value={input} onChange={event=>{setInput(event.target.value);setSuggestions([]);historyIndex.current=-1;}} onKeyDown={keydown} autoCapitalize="none" autoCorrect="off" autoComplete="off" spellCheck={false} placeholder="Type a command…" maxLength={256} aria-describedby="console-shortcuts"/><button type="submit" aria-label="Run terminal command"><CornerDownLeft size={17} aria-hidden="true"/></button></form>
      <p className="console-hint" id="console-shortcuts">Tab complete <span>↑↓ history</span><span>{cwd.replace("/portfolio","~")}</span></p>
    </>}
    <span role="status" className="sr-only">{announcement}</span>
  </section>;
  return <>{expanded?<div className="mini-terminal portfolio-terminal terminal-desk-placeholder" aria-hidden="true"/>:terminal}<dialog ref={windowRef} id="expanded-terminal-window" className="terminal-window" aria-labelledby="terminal-window-title" onCancel={event=>{event.preventDefault();resizeTerminal(false);}} onClose={()=>setExpanded(false)}>{expanded&&terminal}</dialog><ResumeViewer key={resume?"open":"closed"} open={resume} onClose={()=>setResume(false)}/></>;
}
