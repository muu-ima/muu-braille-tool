// shared/braille/render.ts
import type { Dot } from "./types";

/** 6点点字（U+2800〜）へ変換 */
export function cellToUnicode(dots: Dot[]): string {
  let bits = 0;
  for (const d of dots) bits |= 1 << (d - 1); // 1→bit0 ... 6→bit5
  return String.fromCodePoint(0x2800 + bits);
}

export function cellsToUnicode(cells: Dot[][]): string {
  return cells.map(cellToUnicode).join("");
}
