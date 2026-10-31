"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Download, Eraser, RotateCcw } from "lucide-react";
import { pixelPalette } from "@/content/lab";
import { PIXEL_SIZE, pixelLine, starterPixels, type Pixel } from "@/lib/lab";

export function PixelPlayground() {
  const [pixels, setPixels] = useState<Pixel[]>(starterPixels);
  const [ink, setInk] = useState<Pixel>(pixelPalette[0].color);
  const [cursor, setCursor] = useState(0);
  const [status, setStatus] = useState("A tiny canvas. A lot of possibilities.");
  const last = useRef<number | null>(null);
  const pen = useRef<number | null>(null);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  function paint(index: number) {
    const line = pixelLine(last.current ?? index, index);
    setPixels(current => { const next = [...current]; line.forEach(cell => { next[cell] = ink; }); return next; });
    last.current = index;
  }
  function point(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(15, Math.floor((event.clientX - rect.left) / rect.width * PIXEL_SIZE)));
    const y = Math.max(0, Math.min(15, Math.floor((event.clientY - rect.top) / rect.height * PIXEL_SIZE)));
    return y * PIXEL_SIZE + x;
  }
  function down(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    pen.current = event.pointerId; last.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    const index = point(event); setCursor(index); cells.current[index]?.focus({ preventScroll: true }); paint(index);
  }
  function stop() { pen.current = null; last.current = null; }
  function keydown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = index % 16 < 15 ? index + 1 : index;
    else if (event.key === "ArrowLeft") next = index % 16 > 0 ? index - 1 : index;
    else if (event.key === "ArrowDown") next = Math.min(255, index + 16);
    else if (event.key === "ArrowUp") next = Math.max(0, index - 16);
    else if (event.key === "Home") next = index - index % 16;
    else if (event.key === "End") next = index - index % 16 + 15;
    else return; // Native Space / Enter click paints the focused cell.
    event.preventDefault(); setCursor(next); cells.current[next]?.focus();
  }
  function exportPng() {
    try {
      const canvas = document.createElement("canvas"); canvas.width = canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      pixels.forEach((color, index) => { context.fillStyle = color ?? "#F6F2E9"; context.fillRect(index % 16 * 32, Math.floor(index / 16) * 32, 32, 32); });
      const link = document.createElement("a"); link.download = "little-lab-pixels.png"; link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link); link.click(); link.remove();
      setStatus("PNG exported. A little piece of the lab, yours to keep.");
    } catch { setStatus("PNG export is unavailable in this browser. Your drawing is still here."); }
  }
  return <article className="pixel-toy lab-gadget" aria-labelledby="pixel-title">
    <div className="toy-screws" aria-hidden="true"><i/><i/></div>
    <header className="gadget-header"><span className="lab-label">01 / POCKET GRAPHICS</span><span className="toy-model">PX–16</span></header>
    <h3 id="pixel-title">Pixel playground<span aria-hidden="true">.</span></h3>
    <p className="gadget-intro">Draw something that doesn’t need to be useful.</p>
    <div className="pixel-bezel"><div className="pixel-board" role="grid" aria-label="16 by 16 pixel drawing board" aria-rowcount={16} aria-colcount={16} aria-describedby="pixel-instructions" onPointerDown={down} onPointerMove={event => { if (pen.current === event.pointerId) paint(point(event)); }} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}>
      {Array.from({ length: 16 }, (_, row) => <div role="row" key={row}>{pixels.slice(row * 16, row * 16 + 16).map((color, col) => { const index = row * 16 + col; return <button type="button" role="gridcell" key={index} ref={element => { cells.current[index] = element; }} tabIndex={cursor === index ? 0 : -1} aria-label={`Row ${row + 1}, column ${col + 1}, ${pixelPalette.find(item => item.color === color)?.name ?? "blank"}`} style={{ backgroundColor: color ?? "var(--color-paper)" }} onFocus={() => setCursor(index)} onKeyDown={event => keydown(event, index)} onClick={event => { if (event.detail === 0) { last.current = null; paint(index); last.current = null; } }} />; })}</div>)}
    </div><div className="screen-caption"><span>16 × 16</span><span>256 little decisions</span></div></div>
    <div className="pixel-palette" role="group" aria-label="Drawing colors">{pixelPalette.map(item => <button key={item.name} type="button" aria-label={`${item.name} ink`} aria-pressed={ink === item.color} onClick={() => setInk(item.color)} style={{ "--swatch": item.color } as React.CSSProperties}><span aria-hidden="true"/>{item.name}</button>)}<button type="button" aria-pressed={ink === null} onClick={() => setInk(null)}><Eraser size={16} aria-hidden="true"/>Erase</button></div>
    <div className="pixel-actions"><button className="lab-button" type="button" onClick={() => { setPixels(Array(256).fill(null)); setStatus("Clean slate. Make your mark."); }}><RotateCcw size={15} aria-hidden="true"/>Clear</button><button type="button" className="lab-button lab-button-ink" onClick={exportPng}><Download size={15} aria-hidden="true"/>Save PNG</button></div>
    <p id="pixel-instructions" className="lab-help">Drag to draw. Keyboard: arrows to move, Space to paint.</p><p className="lab-status" role="status">{status}</p>
    <div className="toy-bottom" aria-hidden="true"><span>THE LITTLE LAB / ORIGINAL EDITION</span><div className="toy-speaker">▥ ▥ ▥</div></div>
  </article>;
}
