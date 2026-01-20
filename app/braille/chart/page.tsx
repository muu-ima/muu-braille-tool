// app/braille/chart/page.tsx
"use client";

import { useState } from "react";
import { tokenizeToBraille, cellsToUnicode } from "@/shared/braille";
import clsx from "clsx";

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

const A_TO_N_ROWS = GOJUON_ROWS.slice(0, 5);
const H_TO_W_ROWS = GOJUON_ROWS.slice(5);

function makeEntry(kana: string) {
  const token = tokenizeToBraille(kana)[0]; // 1文字前提
  return {
    kana,
    braille: token ? cellsToUnicode(token.cells) : kana,
    kind: token?.kind ?? "other",
  };
}

export default function ChartPage() {
  // ★ここで entries を作り直さない（消す）

  const [tab, setTab] = useState<"first" | "second">("first");
  const rows = tab === "first" ? A_TO_N_ROWS : H_TO_W_ROWS;

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-600">固定点字表</h2>
      <p className="text-xs text-zinc-500">
        デュアルディスプレイの場合は、この画面をサブモニターに置いておくと便利です。
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab("first")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "first" ? "bg-black text-white" : "bg-white text-zinc-700",
          )}
        >
          あ行～な行
        </button>
        <button
          type="button"
          onClick={() => setTab("second")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "second" ? "bg-black text-white" : "bg-white text-zinc-700",
          )}
        >
          は行～わ行
        </button>
      </div>
      <div className="overflow-auto rounded-xl border bg-zinc-50 text-sm">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="text-xs font-semibold text-zinc-500 mb-1 px-2 py-1">
              {row.label}
            </div>
            <div className="grid grid-cols-5 gap-2 px-2 mb-2">
              {row.list.map((kana) => {
                const entry = makeEntry(kana);
                return (
                  <div
                    key={entry.kana}
                    className={clsx(
                      "flex items-center justify-between rounded-lg border px-3 py-2",
                      entry.kind === "dakuon" && "bg-yellow-200",
                      entry.kind === "handakuon" && "bg-green-200",
                      entry.kind === "other" && "bg-white",
                    )}
                  >
                    <div className="text-xs font-semibold text-zinc-700">
                      {entry.kana}
                    </div>
                    <div className="text-xl">{entry.braille}</div>
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
