// app/braille/components/HistoryPanel.tsx
"use client";

import { useState } from "react";
import { saveHistory, loadHistory, deleteHistory } from "@/shared/braille";
import type { BrailleHistoryItem } from "@/shared/braille/history";

type Props = {
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
  onPick: (item: BrailleHistoryItem) => void;
  currentInput: string;
};

export default function HistoryPanel({
  activeId,
  onActiveIdChange,
  onPick,
  currentInput,
}: Props) {
  const [history, setHistory] = useState<BrailleHistoryItem[]>(() =>
    loadHistory(),
  );

  const reload = () => setHistory(loadHistory());

  const handleSave = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    saveHistory({
      id: Date.now().toString(),
      input: trimmed,
      createdAt: Date.now(),
    });

    reload();
  };

  const handleLoad = (item: BrailleHistoryItem) => {
    onActiveIdChange(item.id);
    onPick(item);
  };

  const handleDelete = (id: string) => {
    deleteHistory(id);
    if (activeId === id) onActiveIdChange(null);
    reload();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg border px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100"
        >
          履歴に保存
        </button>
        <div className="ml-auto text-xs font-semibold text-zinc-600">履歴</div>
      </div>

      {history.length === 0 ? (
        <div className="text-sm text-zinc-400">履歴はまだありません</div>
      ) : (
        <div className="space-y-2">
          {history.map((h) => (
            <div
              key={h.id}
              className={[
                "flex items-center gap-2 rounded-lg border px-3 py-2 bg-white",
                activeId === h.id ? "bg-zinc-100" : "",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => handleLoad(h)}
                   className="min-w-0 flex-1 text-left text-sm text-zinc-700 hover:underline"
              >
               <span className="block truncate">{h.input}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(h.id)}
                className="shrink-0 rounded border px-2 py-1 text-xs hover:bg-zinc-100"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
