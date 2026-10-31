export const marbleScores = [10, 25, 50, 100, 50, 25, 10] as const;
/** A bounded, illustrative peg-board route. No physics engine or background loop. */
export function marbleRoute(lane: number, random = Math.random) {
  let x = 40 + Math.max(0, Math.min(6, Math.round(lane))) * 40;
  const xs = [x], ys = [15];
  for (let row = 0; row < 8; row++) {
    const candidate = x + (random() < .5 ? -20 : 20);
    x = candidate < 20 ? 40 : candidate > 300 ? 280 : candidate;
    xs.push(x); ys.push(42 + row * 25);
  }
  const slot = Math.max(0, Math.min(6, Math.floor((x - 20) / 40)));
  xs.push(40 + slot * 40); ys.push(267);
  return { xs, ys, slot, score: marbleScores[slot] };
}
export function averageReaction(rounds: readonly number[]): number {
  return rounds.length ? Math.round(rounds.reduce((sum, value) => sum + value, 0) / rounds.length) : 0;
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
