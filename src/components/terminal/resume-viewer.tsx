"use client";
import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { contactContent } from "@/content/contact";

export function ResumeViewer({ open, onClose }: { open:boolean; onClose:()=>void }) {
  const dialog=useRef<HTMLDialogElement>(null);
  const [preview,setPreview]=useState<"checking"|"ready"|"unavailable"|"unsupported">("checking");
  useEffect(()=>{
    if(!open)return;
    const previousFocus=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    const controller=new AbortController();
    const modal=dialog.current;
    modal?.showModal();document.body.style.overflow="hidden";
    fetch(contactContent.resume,{method:"HEAD",signal:controller.signal}).then(response=>{
      if(!response.ok||!response.headers.get("content-type")?.includes("application/pdf"))setPreview("unavailable");
      else setPreview(navigator.pdfViewerEnabled===false?"unsupported":"ready");
    }).catch(()=>{if(!controller.signal.aborted)setPreview("unavailable");});
    return ()=>{controller.abort();modal?.close();document.body.style.overflow=previousOverflow;previousFocus?.focus({preventScroll:true});};
  },[open]);
  return <dialog ref={dialog} className="resume-window" aria-labelledby="resume-window-title" onCancel={event=>{event.preventDefault();onClose();}} onClose={onClose}>
    <header><div><span className="resume-window-label">PERSONAL DOCUMENT</span><h2 id="resume-window-title">Resume</h2></div><button type="button" autoFocus aria-label="Close resume viewer" onClick={onClose}><X size={20} aria-hidden="true"/></button></header>
    <nav aria-label="Resume actions"><a href={contactContent.resume} download="Siddhesh-Gawade-Resume.pdf"><Download size={16} aria-hidden="true"/>Download PDF</a><a href={contactContent.resume} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true"/>Open in new tab</a></nav>
    <div className="resume-preview-area">{open&&preview==="ready"?<iframe title="Siddhesh Gawade resume PDF" src={`${contactContent.resume}#view=FitH&navpanes=0`} onError={()=>setPreview("unavailable")}/>:<p role="status">{preview==="checking"?"Checking the document…":preview==="unsupported"?"This browser does not support an embedded PDF preview. Use Download PDF or Open in new tab above.":"The PDF preview is unavailable. Try opening the document in a new tab or downloading it."}</p>}</div>
    <p className="resume-window-help">Preview not displaying? Use the download or new-tab link. Close this window to return to your terminal session.</p>
  </dialog>;
}
