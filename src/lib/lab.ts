export type Gate = "AND" | "OR" | "XOR";
export const gates: readonly Gate[] = ["AND", "OR", "XOR"];
export function evaluateGate(gate: Gate, a: boolean, b: boolean): boolean {
  return gate === "AND" ? a && b : gate === "OR" ? a || b : a !== b;
}

export const PIXEL_SIZE = 16;
export type Pixel = string | null;
/** Integer line interpolation prevents gaps during fast pen movement. */
export function pixelLine(from: number, to: number): number[] {
  const x0 = from % PIXEL_SIZE, y0 = Math.floor(from / PIXEL_SIZE);
  const x1 = to % PIXEL_SIZE, y1 = Math.floor(to / PIXEL_SIZE);
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  return Array.from({ length: steps + 1 }, (_, step) => {
    const t = steps === 0 ? 0 : step / steps;
    return Math.round(y0 + (y1 - y0) * t) * PIXEL_SIZE + Math.round(x0 + (x1 - x0) * t);
  });
}
export function starterPixels(): Pixel[] {
  // A little cobalt smile, ready to be drawn over.
  const pixels: Pixel[] = Array(PIXEL_SIZE * PIXEL_SIZE).fill(null);
  for (let y = 4; y <= 11; y++) for (let x = 4; x <= 11; x++) {
    if (y === 4 || y === 11 || x === 4 || x === 11) pixels[y * PIXEL_SIZE + x] = "#315BD9";
  }
  for (const [x, y] of [[6, 6], [9, 6], [6, 8], [7, 9], [8, 9], [9, 8]]) pixels[y * PIXEL_SIZE + x] = "#315BD9";
  return pixels;
}
export function randomIndex(length: number, previous: number, random = Math.random): number {
  if (length < 2) return 0;
  const offset = 1 + Math.floor(random() * (length - 1));
  return (previous + offset) % length;
}
