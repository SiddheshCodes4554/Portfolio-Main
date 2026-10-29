"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

type ArtifactPreviewProps = {
  title: string;
  action: string;
  className?: string;
  children: ReactNode;
  preview: ReactNode;
};

/** Native modal supplies focus containment, background inertness and Escape. */
export function ArtifactPreview({ title, action, className = "", children, preview }: ArtifactPreviewProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector<HTMLButtonElement>(".preview-close")?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function close() { dialog.current?.close(); }

  return <div className={`interactive-artifact ${className}`}>
    {children}
    <button ref={trigger} className="artifact-trigger" type="button" aria-label={action}
      aria-haspopup="dialog" aria-controls={dialogId}
      onClick={() => { dialog.current?.showModal(); setOpen(true); }} />
    <dialog ref={dialog} id={dialogId} aria-labelledby={titleId} className="artifact-dialog"
      onClose={() => { setOpen(false); trigger.current?.focus(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {open && <motion.div className="expanded-paper" initial={reduce ? false : { opacity: 0, y: 8, rotateX: -3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: .22 }}>
        <header className="preview-header"><h2 id={titleId}>{title}</h2>
          <button type="button" className="preview-close" onClick={close}><X size={18} aria-hidden="true" /> Close</button>
        </header>
        {preview}
      </motion.div>}
    </dialog>
  </div>;
}
