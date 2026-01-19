// app/braille/components/TranslateResult.tsx
"use client";

import { useMemo, useState } from "react";
import { cellsToUnicode } from "@/shared/braille";
import { BrailleCell } from "@/app/braille/components/BrailleCell";
import type { BrailleToken } from "@/shared/braille";

type ViewMode = "unicode" | "dots";

type Props = {
  input: string;
  tokens: BrailleToken[];
};

export default function TranslateResult({ input, tokens }: Props) {
  const [view, setView] = useState<ViewMode>("unicode");

  const brailleUnicode = useMemo(() => {
    if (!tokens.length) return "";
    return tokens.map((t) => cellsToUnicode(t.cells)).join("");
  }, [tokens]);

  return (
    <div className="space-y-2">
       <div className="h-6 flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-600">点字</label>
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
            unicode
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
      </div>
      <div className="h-48 w-full overflow-auto rounded-xl border bg-zinc-50 px-3 py-2">
        {input.trim() ? (
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
  );
}
