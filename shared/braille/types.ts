// shared/braille/types.ts

// 点字は 1~6 の点番号だけで表現する
export type Dot = 1 | 2| 3| 4| 5| 6;

// 固定表1エントリの型
export type BrailleEntry = {
  key: string;        // "あ", "か", "1", "。"
  dots: Dot[];        // [1, 2, 4] など
  kind?: BrailleKind; // 後で使う（任意）
};

// 分類（将来拡張前提）
export type BrailleKind =
  | "kana"
  | "particle"
  | "symbol"
  | "number"
  | "latin";