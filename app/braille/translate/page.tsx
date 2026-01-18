// app/braille/translate/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { tokenizeToBraille, cellsToUnicode } from "@/shared/braille";
import { saveHistory, loadHistory, deleteHistory } from "@/shared/braille";

import { BrailleCell } from "@/app/braille/components/BrailleCell";
import type { BrailleHistoryItem } from "@/shared/braille/history";

type ViewMode = "unicode" | "dots";

export default function TranslatePage() {
  const [input, setInput] = useState("");
  const [view, setView] = useState<ViewMode>("unicode");
  const [history, setHistory] = useState<BrailleHistoryItem[]>([]);

  const tokens = useMemo(() => tokenizeToBraille(input), [input]);

  const brailleUnicode = useMemo(
    () => tokens.map((t) => cellsToUnicode(t.cells)).join(""),
    [tokens],
  );


  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    saveHistory({
      id: Date.now().toString(),
      input: trimmed,
      createdAt: Date.now(),
    });

    setHistory(loadHistory());
  };

  const handleLoad = (item: BrailleHistoryItem) => {
    setInput(item.input);
  };

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(loadHistory());
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-600">翻訳</h2>

        <div className="flex items-center gap-2">
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

          <Link
            href="/braille/chart"
            target="_blank"
            className="rounded-full border px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
          >
            点字表を別ウィンドウで開く
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100"
          >
            履歴に保存
          </button>
        </div>

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

      {history.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-zinc-600">履歴</div>
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLoad(h)}
                  className="text-sm text-zinc-700 hover:underline"
                >
                  {h.input}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(h.id)}
                  className="ml-auto rounded border px-2 py-1 text-xs"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
