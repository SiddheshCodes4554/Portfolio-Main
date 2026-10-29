import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Tilt = "none" | "left" | "right" | "casual";
export type Surface = "plain" | "ruled" | "grid";
export type PaperCardProps = ComponentPropsWithoutRef<"div"> & { surface?: Surface; tilt?: Tilt; elevation?: "flat" | "lifted" };
export function PaperCard({ surface = "plain", tilt = "none", elevation = "flat", className = "", ...props }: PaperCardProps) {
  return <div className={`paper-card surface-${surface} tilt-${tilt} elevation-${elevation} ${className}`} {...props} />;
}
export function PaperTape({ tone = "neutral", className = "" }: { tone?: "neutral" | "blue"; className?: string }) {
  return <span aria-hidden="true" className={`scrap-tape tape-${tone} ${className}`} />;
}
export function PolaroidCard({ children, caption, tilt = "left", className = "", ...props }: ComponentPropsWithoutRef<"figure"> & { caption: ReactNode; tilt?: Tilt }) {
  return <figure className={`polaroid tilt-${tilt} ${className}`} {...props}><div className="polaroid-image">{children}</div><figcaption>{caption}</figcaption></figure>;
}
export function StickyNote({ tone = "butter", tilt = "right", className = "", ...props }: ComponentPropsWithoutRef<"aside"> & { tone?: "butter" | "sage" | "tomato"; tilt?: Tilt }) {
  return <aside className={`sticky-note sticky-${tone} tilt-${tilt} ${className}`} {...props} />;
}
export function DoodleArrow({ direction = "right", className = "" }: { direction?: "right" | "down"; className?: string }) {
  return <svg aria-hidden="true" focusable="false" className={`doodle-arrow arrow-${direction} ${className}`} viewBox="0 0 140 70" fill="none"><path d="M6 18C45 65 88 55 128 24M107 24l23-4-5 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function SectionLabel({ index, children, className = "", ...props }: ComponentPropsWithoutRef<"p"> & { index?: string }) {
  return <p className={`section-label ${className}`} {...props}>{index && <span>{index} / </span>}{children}</p>;
}
type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" | "quiet" };
export function ScrapbookButton({ variant = "primary", type = "button", className = "", ...props }: ButtonProps) {
  return <button type={type} className={`scrapbook-button button-${variant} ${className}`} {...props} />;
}
export function HandwrittenNote({ className = "", ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={`handwritten-note ${className}`} {...props} />;
}
export function ProjectStamp({ children, className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={`project-stamp ${className}`} {...props}>{children}</span>;
}
export function PaperDivider({ variant = "dashed" }: { variant?: "dashed" | "rough" }) {
  return <hr className={`paper-divider divider-${variant}`} />;
}
