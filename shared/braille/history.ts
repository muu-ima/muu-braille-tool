// shared/braille/history.ts

// 保存単位（1変換）
export type BrailleHistoryItem = {
  id: string;
  input: string;
  createdAt: number;
};

// ローカルストレージのキー
const KEY = "braille-history";

// 履歴をすべて取得する
export function loadHistory(): BrailleHistoryItem[] {
  // window が無ければ空配列
  if (typeof window === "undefined") return [];

  // localStarage に何も無ければ空配列
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

// 履歴を1件保存する
export function saveHistory(item: BrailleHistoryItem) {
  if (typeof window === "undefined") return;

  const list = loadHistory();

  const normalized = item.input.trim();
  if (!normalized) return;

  // ✅ 同じ input があれば除去して先頭に持ってくる
  const filtered = list.filter((x) => x.input !== normalized);

  const next: BrailleHistoryItem[] = [
    { ...item, input: normalized },
    ...filtered,
  ].slice(0, 50);

  localStorage.setItem(KEY, JSON.stringify(next));
}


// 指定した履歴を件削除する
export function deleteHistory(id: string) {
  // id が無ければ何もしない
  if(typeof window === "undefined") return;
    const list = loadHistory();

    const next = list .filter((i) => i.id !== id);

    localStorage.setItem(KEY, JSON.stringify(next));
}
