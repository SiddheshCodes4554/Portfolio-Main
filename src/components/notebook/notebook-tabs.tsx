"use client";
import { useRef, type KeyboardEvent } from "react";

type TabItem = { id: string; label: string };
export function NotebookTabs({ items, selected, onSelect, prefix, label, className = "" }: {
 items: readonly TabItem[]; selected: string; onSelect: (id:string)=>void; prefix:string; label:string; className?:string;
}) {
 const refs=useRef<(HTMLButtonElement|null)[]>([]);
 function keydown(event:KeyboardEvent<HTMLButtonElement>,index:number) {
  let next=index;
  if(event.key==="ArrowRight"||event.key==="ArrowDown") next=(index+1)%items.length;
  else if(event.key==="ArrowLeft"||event.key==="ArrowUp") next=(index+items.length-1)%items.length;
  else if(event.key==="Home") next=0;
  else if(event.key==="End") next=items.length-1;
  else return;
  event.preventDefault(); onSelect(items[next].id); refs.current[next]?.focus();
 }
 return <div className={`notebook-tabs ${className}`} role="tablist" aria-label={label}>{items.map((item,index)=><button type="button" role="tab" key={item.id} id={`${prefix}-tab-${item.id}`} aria-controls={`${prefix}-panel-${item.id}`} aria-selected={selected===item.id} tabIndex={selected===item.id?0:-1} ref={element=>{refs.current[index]=element;}} onClick={()=>onSelect(item.id)} onKeyDown={event=>keydown(event,index)}>{item.label}</button>)}</div>;
}
