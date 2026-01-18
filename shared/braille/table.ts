import type { BrailleEntry } from "./types";

export const BRAILLE_TABLE: BrailleEntry[] = [
  // かな
  { key: "あ", dots: [1], kind: "kana" },
  { key: "い", dots: [1, 2], kind: "kana" },

  { key: "゛", dots: [4, 5, 6], kind: "symbol" }, // ※dotsは例。あとで正しい値に差し替え
  { key: "゜", dots: [5, 6], kind: "symbol" }, // ※同上

  // 助詞（かなと同じ見た目でも意味が違う）
  { key: "は", dots: [2, 3, 4], kind: "particle" },
  { key: "を", dots: [3, 4, 6], kind: "particle" },

  // 数字
  { key: "1", dots: [1], kind: "number" },
  { key: "2", dots: [1, 2], kind: "number" },

  // 記号
  { key: "。", dots: [2, 5, 6], kind: "symbol" },
  { key: "、", dots: [2], kind: "symbol" },

  // 英字
  { key: "A", dots: [1], kind: "latin" },
];

export const BRAILLE_MAP: Record<string, BrailleEntry> = Object.fromEntries(
  BRAILLE_TABLE.map((e) => [e.key, e]),
);
