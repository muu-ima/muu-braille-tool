// app/braille/translate/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { tokenizeToBraille, cellsToUnicode } from "@/shared/braille";
import { BrailleCell } from "@/app/braille/components/BrailleCell";

type ViewMode = "unicode" | "dots";

export default function TranslatePage() {
  const [input, setInput] = useState("");
  const [view, setView] = useState<ViewMode>("unicode");

  const tokens = useMemo(() => tokenizeToBraille(input), [input]);

  // Unicode表示用（全トークンの cells を Unicode にして連結）
  const brailleUnicode = useMemo(
    () => tokens.map((t) => cellsToUnicode(t.cells)).join(""),
    [tokens]
  );

  return (
    <section className="space-y-4">
      {/* 翻訳セクションヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-600">翻訳</h2>

        <div className="flex items-center gap-2">
          {/* 表示切替 */}
          <div className="flex rounded-full border bg-white p-1">
            <button
              type="button"
              onClick={() => setView("unicode")}
              className={[
                "rounded-full px-3 py-1 text-xs",
                view === "unicode"
                  ? "bg-black text-white"
                  : "text-zinc-600 hover:bg-zinc-100",
              ].join(" ")}
            >
              Unicode
            </button>
            <button
              type="button"
              onClick={() => setView("dots")}
              className={[
                "rounded-full px-3 py-1 text-xs",
                view === "dots"
                  ? "bg-black text-white"
                  : "text-zinc-600 hover:bg-zinc-100",
              ].join(" ")}
            >
              Dot
            </button>
          </div>

          {/* デュアルディスプレイ用の固定表ボタン */}
          <Link
            href="/braille/chart"
            target="_blank"
            className="rounded-full border px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
          >
            点字表を別ウィンドウで開く
          </Link>
        </div>
      </div>

      {/* レイアウト本体：モバイル縦 / md以上で2カラム */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 左：入力 */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-600">
            日本語テキスト
          </label>
          <textarea
            className="h-48 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例）あさがお"
          />
        </div>

        {/* 右：出力 */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-600">点字</label>

          <div className="h-48 w-full overflow-auto rounded-xl border bg-zinc-50 px-3 py-2">
            {input ? (
              view === "unicode" ? (
                <div className="text-2xl wrap-break-word">{brailleUnicode}</div>
              ) : (
                <div className="space-y-2">
                  {tokens.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-2"
                    >
                      <div className="w-10 shrink-0 text-sm text-zinc-600">
                        {t.src}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {t.cells.length === 0 ? (
                          <span className="text-sm text-red-600">未対応</span>
                        ) : (
                          t.cells.map((cell, j) => (
                            <BrailleCell key={j} dots={cell} />
                          ))
                        )}
                      </div>

                      {t.unknown && (
                        <span className="ml-auto text-xs text-zinc-500">
                          unknown
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <span className="text-sm text-zinc-400">
                ここに点字が表示されます
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
