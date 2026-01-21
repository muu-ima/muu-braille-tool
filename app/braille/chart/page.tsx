// app/braille/chart/page.tsx
"use client";

import { useState } from "react";
import { BrailleCell } from "@/app/braille/components/BrailleCell";
import { BrailleTabs, TabType } from "@/app/braille/components/TabButton";
import { tokenizeToBraille } from "@/shared/braille";

const GOJUON_ROWS = [
  { label: "あ行", list: ["あ", "い", "う", "え", "お"] },
  { label: "か行", list: ["か", "き", "く", "け", "こ"] },
  { label: "さ行", list: ["さ", "し", "す", "せ", "そ"] },
  { label: "た行", list: ["た", "ち", "つ", "て", "と"] },
  { label: "な行", list: ["な", "に", "ぬ", "ね", "の"] },
  { label: "は行", list: ["は", "ひ", "ふ", "へ", "ほ"] },
  { label: "ま行", list: ["ま", "み", "む", "め", "も"] },
  { label: "や行", list: ["や", "ゆ", "よ"] },
  { label: "ら行", list: ["ら", "り", "る", "れ", "ろ"] },
  { label: "わ行", list: ["わ", "を", "ん"] },
];

const DAKUON_ROWS = [
  { label: "が行", list: ["が", "ぎ", "ぐ", "げ", "ご"] },
  { label: "ざ行", list: ["ざ", "じ", "ず", "ぜ", "ぞ"] },
  { label: "だ行", list: ["だ", "ぢ", "づ", "で", "ど"] },
  { label: "ば行", list: ["ば", "び", "ぶ", "べ", "ぼ"] },
];

const HANDAKUON_ROWS = [
  { label: "ぱ行", list: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"] },
  { label: "記号", list: ["っ", "ー", "、", "。"] },
];

const A_TO_N_ROWS = GOJUON_ROWS.slice(0, 5);
const H_TO_W_ROWS = GOJUON_ROWS.slice(5);

const ROW_MAP: Record<TabType, typeof GOJUON_ROWS> = {
  a_to_n: A_TO_N_ROWS,
  h_to_w: H_TO_W_ROWS,
  dakuon: DAKUON_ROWS,
  handakuon: HANDAKUON_ROWS,
};

export default function ChartPage() {
  const [tab, setTab] = useState<TabType>("a_to_n");

  // 入力値（tab）から、次のmapへの入力値（rows）を決定する処理
  const rows = ROW_MAP[tab];

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-sm font-semibold text-zinc-600">固定点字表</h2>
        <p className="text-xs text-zinc-500">
          デュアルディスプレイの場合は、この画面をサブモニターに置いておくと便利です。
        </p>
      </header>

      {/* mapで動くタブコンポーネント */}
      <BrailleTabs currentTab={tab} onTabChange={setTab} />

      <div className="overflow-auto rounded-xl border bg-zinc-50 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="p-2">
            <div className="text-base font-bold text-zinc-500 mb-1 px-2 py-1">
              {row.label}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {row.list.map((kana) => {
                const tokens = tokenizeToBraille(kana);
                return (
                  <div
                    key={kana}
                    className="flex items-center justify-between rounded-lg border bg-white px-3 py-2"
                  >
                    <span className="text-base font-bold text-zinc-700">
                      {kana}
                    </span>
                    <div className="flex items-center gap-1">
                      {tokens.flatMap((token, ti) =>
                        token.cells.map((cell, ci) => (
                          <BrailleCell key={`${ti}-${ci}`} dots={cell} />
                        )),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
