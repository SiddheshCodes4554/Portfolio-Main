"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, RotateCcw, Send } from "lucide-react";
import { contactContent as copy } from "@/content/contact";
import { contactLimits, fieldErrors, stampIds, type ContactFields, type FieldErrors } from "@/lib/contact/schema";
import { PostageStamp } from "./postage-stamp";

const blank:ContactFields={name:"",email:"",message:"",stamp:"star"};
export function PostcardForm() {
  const [fields,setFields]=useState<ContactFields>(blank), [back,setBack]=useState(false);
  const [errors,setErrors]=useState<FieldErrors>({}), [notice,setNotice]=useState("");
  const [phase,setPhase]=useState<"draft"|"sending"|"sent">("draft"), [ready,setReady]=useState<"checking"|"ready"|"unconfigured">("checking");
  const started=useRef(0), requestId=useRef(""), busy=useRef(false), controller=useRef<AbortController|null>(null);
  const form=useRef<HTMLFormElement>(null), success=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  useEffect(()=>{
    started.current=Date.now(); const abort=new AbortController();
    fetch("/api/contact",{signal:abort.signal,cache:"no-store"}).then(async response=>{const result=await response.json().catch(()=>({}));setReady(response.ok&&result.configured===true?"ready":"unconfigured");}).catch(()=>{if(!abort.signal.aborted)setReady("unconfigured");});
    return ()=>{abort.abort();controller.current?.abort();};
  },[]);
  function update<Key extends keyof ContactFields>(key:Key,value:ContactFields[Key]) { setFields(current=>({...current,[key]:value})); setErrors(current=>({...current,[key]:undefined})); setNotice(""); }
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(busy.current||phase==="sent")return;
    const nextErrors=fieldErrors(fields);setErrors(nextErrors);
    if(Object.keys(nextErrors).length){setBack(false);setNotice("A little detail is missing. Please check the marked fields.");requestAnimationFrame(()=>form.current?.querySelector<HTMLInputElement|HTMLTextAreaElement>("[aria-invalid=true]")?.focus());return;}
    if(ready!=="ready"){setNotice(copy.unconfigured);return;}
    busy.current=true;setPhase("sending");setNotice("");
    if(!requestId.current)requestId.current=crypto.randomUUID();
    controller.current=new AbortController();const timeout=setTimeout(()=>controller.current?.abort(),15000);
    try {
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},signal:controller.current.signal,body:JSON.stringify({...fields,website:(new FormData(event.currentTarget).get("website")??""),startedAt:started.current,requestId:requestId.current})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok||result.ok!==true){if(result.errors&&typeof result.errors==="object"){setErrors(result.errors);setBack(false);}if(result.code==="unconfigured")setReady("unconfigured");throw new Error(typeof result.message==="string"?result.message:"The postbox couldn’t confirm your message. Please retry.");}
      setPhase("sent");setTimeout(()=>success.current?.focus(),reduce?0:800);
    } catch(error){setPhase("draft");setNotice(error instanceof Error&&!(error instanceof TypeError)&&error.name!=="AbortError"?error.message:"The postbox took too long to reply. Your draft is safe; please retry.");}
    finally {clearTimeout(timeout);busy.current=false;}
  }
  function reset(){setFields(blank);setErrors({});setNotice("");setBack(false);setPhase("draft");started.current=Date.now();requestId.current="";requestAnimationFrame(()=>form.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus());}
  const sending=phase==="sending", sent=phase==="sent";
  return <div className="post-office">
    <div className="postcard-toolbar"><span className="postcard-micro">PERSONAL CORRESPONDENCE / NO. 05</span><button type="button" className="postcard-flip" onClick={()=>setBack(!back)} aria-pressed={back} disabled={sending||sent} aria-label={back?"Flip to writing side":"Flip to address side"}><RotateCcw size={15} aria-hidden="true"/>{back?"Back to your words":"Flip your postcard"}<span aria-hidden="true">↻</span></button></div>
    <form ref={form} onSubmit={submit} noValidate className="postcard-form" aria-label="Write Siddhesh a postcard">
      <div className="postcard-scene"><motion.div className="postcard-flight" initial={false} animate={sent&&!reduce?{x:[0,0,-18],y:[0,-16,-70],scale:[1,.92,.12],rotate:[0,-3,4],opacity:[1,1,0]}:{x:0,y:0,scale:1,rotate:0,opacity:sent?0:1}} transition={{duration:reduce?0:.75,ease:[.4,0,.2,1]}} aria-hidden={sent} inert={sent}>
        <motion.div className="postcard-turner" initial={false} animate={{rotateY:reduce?0:back?180:0}} transition={{duration:reduce?0:.55,ease:[.4,0,.2,1]}} data-back={back}>
          <div className="postcard-face postcard-writing" aria-hidden={back} inert={back}>
            <div className="postcard-topline"><span className="postcard-micro">A NOTE FROM YOUR CORNER OF THE INTERNET</span><PostageStamp stamp={fields.stamp}/></div>
            <h3>Dear Siddhesh,</h3>
            <fieldset className="postcard-fields" disabled={sending}>
              <label htmlFor="postcard-message">Your message <span>10–4,000 characters</span></label>
              <textarea id="postcard-message" name="message" rows={5} maxLength={contactLimits.message} minLength={10} required placeholder="An idea, a question, a very good hello…" value={fields.message} onChange={event=>update("message",event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message?"postcard-error-message":undefined}/>
              {errors.message&&<p id="postcard-error-message" className="postcard-field-error">{errors.message}</p>}
              <div className="postcard-signature"><div><label htmlFor="postcard-name">With love (or good intentions),</label><input id="postcard-name" name="name" autoComplete="name" maxLength={contactLimits.name} required placeholder="Your name" value={fields.name} onChange={event=>update("name",event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?"postcard-error-name":undefined}/>{errors.name&&<p id="postcard-error-name" className="postcard-field-error">{errors.name}</p>}</div><div><label htmlFor="postcard-email">Where I can write back</label><input id="postcard-email" type="email" name="email" autoComplete="email" maxLength={contactLimits.email} required placeholder="you@your-corner.com" value={fields.email} onChange={event=>update("email",event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email?"postcard-error-email":undefined}/>{errors.email&&<p id="postcard-error-email" className="postcard-field-error">{errors.email}</p>}</div></div>
            </fieldset>
            <div className="postcard-writing-footer"><span aria-hidden="true">PS. The internet feels smaller when we say hello.</span><span className="postcard-count">{fields.message.length} / 4000</span></div>
          </div>
          <div className="postcard-face postcard-address" aria-hidden={!back} inert={!back}>
            <div className="postcard-address-top"><span>POST CARD</span><div className="postmark" aria-hidden="true"><span>THE INTERNET<br/>SCRAPBOOK</span><i/><i/><i/></div><PostageStamp stamp={fields.stamp}/></div>
            <div className="postcard-reverse-content"><div className="postcard-preview"><span className="postcard-micro">YOUR WORDS, READY TO TRAVEL</span><p>{fields.message||"Your message will find its way here. Flip back and write a little something."}</p><span className="postcard-preview-from">From: {fields.name.trim()||"a curious human"}</span></div><div className="postcard-recipient"><span className="postcard-micro">TO</span><h3>{copy.name}</h3><p>A little corner of the internet.</p><div className="decorative-address" aria-hidden="true"><i/><i/><i/></div><span className="postcard-envelope" aria-hidden="true">✉</span><p className="postcard-micro">NO STREET ADDRESS NEEDED.</p></div></div>
          </div>
        </motion.div>
      </motion.div>
      {sent&&<div ref={success} tabIndex={-1} className="postcard-success" role="status"><Mailbox/><motion.div initial={{opacity:0,scale:reduce?1:.9,rotate:-12}} animate={{opacity:1,scale:1}} transition={{delay:reduce?0:.6,duration:reduce?0:.25}} className="delivery-postmark" aria-hidden="true">SENT WITH<br/>CURIOSITY ✓</motion.div><h3>Message delivered!</h3><p>Your postcard was accepted by the mail service.<br/>Inbox delivery may take a moment.</p><button type="button" className="scrapbook-button button-secondary" onClick={reset}>Write another postcard <ArrowRight size={16} aria-hidden="true"/></button></div>}
      </div>
      <div className="postcard-honeypot" aria-hidden="true"><label htmlFor="postcard-website">Leave this blank<input id="postcard-website" name="website" tabIndex={-1} autoComplete="off"/></label></div>
      {!sent&&<><div className="postcard-bottom"><fieldset className="stamp-choices" disabled={sending}><legend>Pick a little personality.</legend>{stampIds.map(stamp=><label key={stamp} className="stamp-choice"><input type="radio" name="stamp" value={stamp} checked={fields.stamp===stamp} onChange={()=>update("stamp",stamp)}/><PostageStamp stamp={stamp}/><span>{stamp==="bolt"?"Lightning":stamp[0].toUpperCase()+stamp.slice(1)}</span></label>)}</fieldset><div className="postcard-send"><span className="postcard-send-note" aria-hidden="true">a small note, a new connection ↗</span><button type="submit" className="scrapbook-button" disabled={sending||ready!=="ready"}>{sending?"Posting your words…":ready==="checking"?"Checking the postbox…":ready==="ready"?"Send my postcard":"Postbox not connected"}<Send size={17} aria-hidden="true"/></button><p>No mailing lists. Just this message.</p></div></div>
      {ready==="unconfigured"&&<p className="postcard-setup-note" role="status">{copy.unconfigured}</p>}{notice&&<p className="postcard-notice" role="alert">{notice}</p>}
      <p className="postcard-privacy">Your name, email, and message are shared with the email provider to send this postcard. Please leave sensitive information out.</p></>}
    </form>
  </div>;
}
function Mailbox(){return <svg className="postcard-mailbox" viewBox="0 0 230 185" fill="none" aria-hidden="true"><path d="M109 122v54h17v-54" fill="var(--color-tape)" stroke="var(--color-ink)" strokeWidth="2"/><path d="M45 125V66c0-54 135-54 135 0v59Z" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="2"/><path d="M45 66c0-54 73-54 73 0v59H45Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2"/><path d="M57 68h48v9H57Z" fill="var(--color-ink)"/><path d="m144 70 0-51h35v20h-35" stroke="var(--color-ink)" strokeWidth="2" fill="var(--color-tomato)"/><path d="m30 177 110 0" stroke="var(--color-ink)" strokeWidth="2"/><path d="m63 61 31 0-3 19-27-2Z" fill="var(--color-butter)" stroke="var(--color-ink)"/><path d="m64 63 14 9 14-9" stroke="var(--color-ink)"/><text x="144" y="102" fill="var(--color-sheet)">SG. POST</text></svg>;}
