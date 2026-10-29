"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { PointerEvent } from "react";

export function EngineeringSticker() {
  const reduce = useReducedMotion();
  const angle = useMotionValue(0);
  const rotate = useSpring(angle, { stiffness: 160, damping: 22 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce !== false || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    angle.set(((event.clientX - bounds.left) / bounds.width - .5) * 6);
  }
  return <div className="engineering-sticker" onPointerMove={move} onPointerLeave={()=>angle.set(0)} aria-hidden="true"><motion.div style={{ rotate: reduce ? 0 : rotate }}><span className="sticker-code">&lt;/&gt;</span><span>BUILT WITH<br />CURIOSITY</span><span className="sticker-star">✳</span></motion.div></div>;
}
