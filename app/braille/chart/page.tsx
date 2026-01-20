// app/braille/chart/page.tsx
"use client";

import { useState } from "react";
import { BrailleCell } from "@/app/braille/components/BrailleCell";
import { BRAILLE_MAP } from "@/shared/braille/table"; 
import type { Dot } from "@/shared/braille/types";
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
  { label: "促音、長音", list: ["っ", "ー"] },
];

const DAKUON_ROWS = [
  { label: "が行", list: ["が", "ぎ", "ぐ", "げ", "ご"] },
  { label: "ざ行", list: ["ざ", "じ", "ず", "ぜ", "ぞ"] },
  { label: "だ行", list: ["だ", "ぢ", "づ", "で", "ど"] },
  { label: "ば行", list: ["ば", "び", "ぶ", "べ", "ぼ"] },
];

const HANDAKUON_ROWS = [
  { label: "ぱ行", list: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"] },
];

const A_TO_N_ROWS = GOJUON_ROWS.slice(0, 5);
const H_TO_W_ROWS = GOJUON_ROWS.slice(5);

function makeEntry(kana: string) {
  const e = BRAILLE_MAP[kana];
  return {
    kana,
    dots: (e?.dots ?? []) as Dot[],
    kind: e?.kind ?? "other",
  };
}

export default function ChartPage() {
  // ★ここで entries を作り直さない（消す）

  type Tab = "a_to_n" | "h_to_w" | "dakuon" | "handakuon";
  const [tab, setTab] = useState<Tab>("a_to_n");

  const rows =
    tab === "a_to_n"
      ? A_TO_N_ROWS
      : tab === "h_to_w"
        ? H_TO_W_ROWS
        : tab === "dakuon"
          ? DAKUON_ROWS
          : HANDAKUON_ROWS;

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-600">固定点字表</h2>
      <p className="text-xs text-zinc-500">
        デュアルディスプレイの場合は、この画面をサブモニターに置いておくと便利です。
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab("a_to_n")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "a_to_n" ? "bg-black text-white" : "bg-white text-zinc-700",
          )}
        >
          あ行～な行
        </button>
        <button
          type="button"
          onClick={() => setTab("h_to_w")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "h_to_w" ? "bg-black text-white" : "bg-white text-zinc-700",
          )}
        >
          は行～わ行
        </button>
        <button
          type="button"
          onClick={() => setTab("dakuon")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "dakuon" ? "bg-black text-white" : "bg-white text-zinc-700",
          )}
        >
          濁音
        </button>
        <button
          type="button"
          onClick={() => setTab("handakuon")}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs",
            tab === "handakuon"
              ? "bg-black text-white"
              : "bg-white text-zinc-700",
          )}
        >
          半濁音
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
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <div className="text-xs font-semibold text-zinc-700">
                      {entry.kana}
                    </div>
                      <BrailleCell dots={entry.dots} />
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
