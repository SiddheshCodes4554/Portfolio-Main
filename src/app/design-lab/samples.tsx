"use client";
import { useState } from "react";
import { ScrapbookButton } from "@/components/ui/scrapbook";
export function InteractionSamples() {
 const [saved,setSaved] = useState(false);
 return <><div className="button-samples"><ScrapbookButton aria-pressed={saved} onClick={()=>setSaved(!saved)}>{saved ? "Page bookmarked" : "Bookmark this page"}</ScrapbookButton><ScrapbookButton variant="secondary" onClick={()=>setSaved(false)}>Reset bookmark</ScrapbookButton><ScrapbookButton variant="quiet" disabled>Next chapter · soon</ScrapbookButton><ScrapbookButton className="focus-preview" onClick={()=>setSaved(!saved)}>Focus ring specimen</ScrapbookButton></div><p role="status" className="sample-status">{saved ? "A bookmark is tucked into this page." : "No bookmark yet. Try the controls above."}</p></>;
}
