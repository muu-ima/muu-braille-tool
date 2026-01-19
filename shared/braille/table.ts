import type { BrailleEntry } from "./types";

export const BRAILLE_TABLE: BrailleEntry[] = [
  // かな（清音）
  /** あ行（母音） */
  { key: "あ", dots: [1], kind: "kana" },
  { key: "い", dots: [1, 2], kind: "kana" },
  { key: "う", dots: [1, 4], kind: "kana" },
  { key: "え", dots: [1, 2, 4], kind: "kana" },
  { key: "お", dots: [2, 4], kind: "kana" },

  /** か行（母音 + ⑥） */
  { key: "か", dots: [1, 6], kind: "kana" },
  { key: "き", dots: [1, 2, 6], kind: "kana" },
  { key: "く", dots: [1, 4, 6], kind: "kana" },
  { key: "け", dots: [1, 2, 4, 6], kind: "kana" },
  { key: "こ", dots: [2, 4, 6], kind: "kana" },

  /** さ行（母音 + ⑤⑥） */
  { key: "さ", dots: [1, 5, 6], kind: "kana" },
  { key: "し", dots: [1, 2, 5, 6], kind: "kana" },
  { key: "す", dots: [1, 4, 5, 6], kind: "kana" },
  { key: "せ", dots: [1, 2, 4, 5, 6], kind: "kana" },
  { key: "そ", dots: [2, 4, 5, 6], kind: "kana" },

  /** た行（母音 + ③⑤） */
  { key: "た", dots: [1, 3, 5], kind: "kana" },
  { key: "ち", dots: [1, 2, 3, 5], kind: "kana" },
  { key: "つ", dots: [1, 3, 4, 5], kind: "kana" },
  { key: "て", dots: [1, 2, 3, 4, 5], kind: "kana" },
  { key: "と", dots: [2, 3, 4, 5], kind: "kana" },

  /** な行（母音 + ③） */
  { key: "な", dots: [1, 3], kind: "kana" },
  { key: "に", dots: [1, 2, 3], kind: "kana" },
  { key: "ぬ", dots: [1, 3, 4], kind: "kana" },
  { key: "ね", dots: [1, 2, 3, 4], kind: "kana" },
  { key: "の", dots: [2, 3, 4], kind: "kana" },

  /** は行（母音 + ③⑥） */
  { key: "は", dots: [1, 3, 6], kind: "kana" },
  { key: "ひ", dots: [1, 2, 3, 6], kind: "kana" },
  { key: "ふ", dots: [1, 3, 4, 6], kind: "kana" },
  { key: "へ", dots: [1, 2, 3, 4, 6], kind: "kana" },
  { key: "ほ", dots: [2, 3, 4, 6], kind: "kana" },

  /** ま行（母音 + ③⑤⑥） */
  { key: "ま", dots: [1, 3, 5, 6], kind: "kana" },
  { key: "み", dots: [1, 2, 3, 5, 6], kind: "kana" },
  { key: "む", dots: [1, 3, 4, 5, 6], kind: "kana" },
  { key: "め", dots: [1, 2, 3, 4, 5, 6], kind: "kana" },
  { key: "も", dots: [2, 3, 4, 5, 6], kind: "kana" },

  /** や行（特殊） */
  { key: "や", dots: [3, 4], kind: "kana" },
  { key: "ゆ", dots: [3, 4, 6], kind: "kana" },
  { key: "よ", dots: [3, 4, 5], kind: "kana" },

  /** ら行（母音 + ⑤） */
  { key: "ら", dots: [1, 5], kind: "kana" },
  { key: "り", dots: [1, 2, 5], kind: "kana" },
  { key: "る", dots: [1, 4, 5], kind: "kana" },
  { key: "れ", dots: [1, 2, 4, 5], kind: "kana" },
  { key: "ろ", dots: [2, 4, 5], kind: "kana" },

  /** わ行（特殊） */
  { key: "わ", dots: [3], kind: "kana" },
  { key: "を", dots: [3, 5], kind: "kana" },
  { key: "ん", dots: [3, 5, 6], kind: "kana" },

  // 濁音・半濁音（前置記号として使う）
  // 濁音は「⑤」を前に付ける / 半濁音は「⑥」を前に付ける
  { key: "゛", dots: [5], kind: "symbol" },
  { key: "゜", dots: [6], kind: "symbol" },

  // 記号（最低限）
  { key: "。", dots: [2, 5, 6], kind: "symbol" },
  { key: "、", dots: [2], kind: "symbol" },
];

export const BRAILLE_MAP: Record<string, BrailleEntry> = Object.fromEntries(
  BRAILLE_TABLE.map((e) => [e.key, e]),
);
