// app/braille/chart/page.tsx
import { tokenizeToBraille, cellsToUnicode } from "@/shared/braille";
import clsx from "clsx";

const SEION_LIST = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
  "っ",
  "ー",
];
const DAKUON_LIST = [
  "が",
  "ぎ",
  "ぐ",
  "げ",
  "ご",
  "ざ",
  "じ",
  "ず",
  "ぜ",
  "ぞ",
  "だ",
  "ぢ",
  "づ",
  "で",
  "ど",
  "ば",
  "び",
  "ぶ",
  "べ",
  "ぼ",
];
const HANDAKUON_LIST = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];

const ALL_KANA = [...SEION_LIST, ...DAKUON_LIST, ...HANDAKUON_LIST];

// chart 用 entries（kind を含む）
const entries = ALL_KANA.map((kana) => {
  const token = tokenizeToBraille(kana)[0]; // 1文字前提
  return {
    kana,
    braille: token ? cellsToUnicode(token.cells) : kana,
    kind: token?.kind ?? "other",
  };
});

export default function ChartPage() {
  // ★ここで entries を作り直さない（消す）

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-600">固定点字表</h2>
      <p className="text-xs text-zinc-500">
        デュアルディスプレイの場合は、この画面をサブモニターに置いておくと便利です。
      </p>

      <div className="overflow-auto rounded-xl border bg-zinc-50 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {entries.map(({ kana, braille, kind }) => (
            <div
              key={kana}
              className={clsx(
                "flex items-center justify-between rounded-lg border px-3 py-2",
                kind === "dakuon" && "bg-yellow-200",
                kind === "handakuon" && "bg-green-200",
                kind === "other" && "bg-white",
              )}
            >
              <div className="text-xs font-semibold text-zinc-700">{kana}</div>
              <div className="text-xl">{braille}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
