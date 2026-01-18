import type { Dot, BrailleKind } from "./types";
import { BRAILLE_MAP } from "./table";

// 1セル = 6点のうち立つ点の集合
export type BrailleCell = Dot[];

// 1文字（src）に対応する出力（1～2セル）
export type BrailleToken = {
  src: string;          // 入力の1文字
  cells: BrailleCell[]; // 例: 「か」→ [[1,2]] / 「が」→ [DAKUON, K] の2セル
  kind: BrailleKind | "dakuon" | "handakuon" | "sokuon" | "choon" | "other";
  unknown?: boolean;
};

// 濁音→清音への対応（ここは今のやつを移植）
const DAKUTEN_BASE: Record<string, string> = {
  が: "か",
  ぎ: "き",
  ぐ: "く",
  げ: "け",
  ご: "こ",
  ざ: "さ",
  じ: "し",
  ず: "す",
  ぜ: "せ",
  ぞ: "そ",
  だ: "た",
  ぢ: "ち",
  づ: "つ",
  で: "て",
  ど: "と",
  ば: "は",
  び: "ひ",
  ぶ: "ふ",
  べ: "へ",
  ぼ: "ほ",
};

const HANDAKUTEN_BASE: Record<string, string> = {
  ぱ: "は",
  ぴ: "ひ",
  ぷ: "ふ",
  ぺ: "へ",
  ぽ: "ほ",
};

// 濁音符/半濁音符の「セル」を table から引く
function getMarkCell(mark: "゛" | "゜"): BrailleCell | null {
  const hit = BRAILLE_MAP[mark];
  return hit?.dots ?? null;
}

export function tokenizeToBraille(input: string): BrailleToken[] {
  const chars = Array.from(input);
  const out: BrailleToken[] = [];

  const dakuonMark = getMarkCell("゛");
  const handakuonMark = getMarkCell("゜");

  for (const ch of chars) {
    // 1) 濁音
    const baseDaku = DAKUTEN_BASE[ch];
    if (baseDaku) {
      const baseEntry = BRAILLE_MAP[baseDaku];
      if (baseEntry?.dots && dakuonMark) {
        out.push({
          src: ch,
          cells: [dakuonMark, baseEntry.dots],
          kind: "dakuon",
        });
        continue;
      }
    }

    // 2) 半濁音
    const baseHandaku = HANDAKUTEN_BASE[ch];
    if (baseHandaku) {
      const baseEntry = BRAILLE_MAP[baseHandaku];
      if (baseEntry?.dots && handakuonMark) {
        out.push({
          src: ch,
          cells: [handakuonMark, baseEntry.dots],
          kind: "handakuon",
        });
        continue;
      }
    }

    // 3) 通常（清音・記号・数字・英字など）
    const hit = BRAILLE_MAP[ch];
    if (hit?.dots) {
      out.push({
        src: ch,
        cells: [hit.dots],
        kind:
          ch === "っ" ? "sokuon"
          : ch === "ー" ? "choon"
          : hit.kind ?? "other",
      });
      continue;
    }

    // 4) 未対応
    out.push({
      src: ch,
      cells: [],
      kind: "other",
      unknown: true,
    });
  }

  return out;
}
