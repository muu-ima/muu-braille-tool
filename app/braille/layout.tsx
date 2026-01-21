// app/braille/layout.tsx
import type { ReactNode } from "react";
import { BrailleTabs } from "./BrailleTabs";

export default function BrailleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col"
    style={{
      backgroundImage: "url(/braille-bg.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* ヘッダー＋メイン */}
      <main className="mx-auto w-full max-w-4xl px-4 py-8 space-y-6 flex-1">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">点字ツール</h1>
            <p className="mt-1 text-xs text-zinc-500">
              翻訳画面と固定の点字表を切り替えて使えます。
            </p>
          </div>

          <BrailleTabs />
        </header>

        {children}
      </main>
    </div>
  );
}
