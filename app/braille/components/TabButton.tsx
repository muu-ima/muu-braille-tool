import { clsx } from "clsx";

// page.tsx でも使うので export する
export type TabType = "a_to_n" | "h_to_w" | "dakuon" | "handakuon";

// このコンポーネント専用のデータなので、ここに閉じる
const TABS = [
  { id: "a_to_n", label: "あ行～な行" },
  { id: "h_to_w", label: "は行～わ行" },
  { id: "dakuon", label: "濁音" },
  { id: "handakuon", label: "半濁音・促音・長音・記号" },
] as const;

export const BrailleTabs = ({ 
  currentTab, 
  onTabChange 
}: { 
  currentTab: TabType; 
  onTabChange: (id: TabType) => void; 
}) => {
  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs cursor-pointer transition-colors duration-200 ease-in-out",
            currentTab === tab.id
              ? "bg-black text-white border-black"
              : "bg-white text-zinc-700 border-zinc-300 hover:bg-slate-100"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};