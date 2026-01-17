// app/braille/translate/page.tsx
"use client";

import { useState } from "react";
import { tokenizeToBraille } from "@/shared/braille";
import Link from "next/link";

export default function TranslatePage() {
  const [input, setInput] = useState("");
  const tokens = tokenizeToBraille(input);
  const braille = tokens.map((t) => t.braille).join("");

  return (
    <section className="space-y-4">
      {/* 翻訳セクションヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-600">翻訳</h2>

        {/* デュアルディスプレイ用の固定表ボタン */}
        <Link
          href="/braille/chart"
          target="_blank"
          className="rounded-full border px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
        >
          点字表を別ウィンドウで開く
        </Link>
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
          <div className="h-48 w-full wrap-break-word rounded-xl border bg-zinc-50 px-3 py-2 text-2xl">
            {braille ? (
              braille
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
