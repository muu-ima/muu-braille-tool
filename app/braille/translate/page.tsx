// app/braille/translate/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { tokenizeToBraille } from "@/shared/braille";
import type { BrailleHistoryItem } from "@/shared/braille/history";

import TranslateResult from "@/app/braille/components/TranslateResult";
import HistoryPanel from "@/app/braille/components/HistoryPanel";

export default function TranslatePage() {
  const [input, setInput] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const tokens = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return [];
    return tokenizeToBraille(trimmed);
  }, [input]);

  const handlePickHistory = (item: BrailleHistoryItem) => {
    setActiveId(item.id);
    setInput(item.input);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-600">翻訳</h2>

        <div className="flex items-center gap-2">
          <Link
            href="/braille/chart"
            target="_blank"
            className="rounded-full border px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
          >
            点字表を別ウィンドウで開く
          </Link>
        </div>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-2">
        {/* 左：入力 */}
        <div className="space-y-2">
          <div className="h-6 flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-600">
              日本語テキスト
            </label>
            {/* 右と高さを揃えるためのダミー（不要なら空でOK） */}
            <div className="w-35" />
          </div>

          <textarea
            className="h-48 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例）あさがお"
          />
        </div>

        {/* 右：結果表示（表示モード切替もここに寄せる） */}
        <TranslateResult input={input} tokens={tokens} />
      </div>

      {/* 履歴（load/click/delete/clear はここに閉じる） */}
      <HistoryPanel
        activeId={activeId}
        onPick={handlePickHistory}
        onActiveIdChange={setActiveId}
        currentInput={input}
      />
    </section>
  );
}
