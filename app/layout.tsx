// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Braille-Tool - 点字ツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen overflow-auto text-gray-900">
        {/* 共通ヘッダー */}
        <div
          className="
          sticky top-0 z-30
          w-full border-b border-zinc-200/60
        bg-white/60 backdrop-blur-md
        supports-backdrop-filter:bg-white/50"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="font-bold">
              <span className="text-pink-500">Cocco</span> BrailleTool
            </div>
            <nav className="flex gap-4 text-sm">
              <Link href="/braille/translate">点字ツール</Link>
              <Link href="/braille/chart">点字表</Link>
            </nav>
          </div>
        </div>

        {/* コンテンツ：ここは全幅にする */}
        <main className="w-full rounded-xl shadow-sm">{children}</main>

        {/* 共通フッター */}
        <footer className="w-full mt-8">
          <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-center text-gray-500 space-y-2">
            <div className="flex items-center justify-center gap-4">
              <a
                className="hover:text-gray-700 underline underline-offset-2"
                href="https://enyukari.capoo.jp/cocco-braille-card/"
                target="_blank"
                rel="noreferrer"
              >
                エディタ（Webサイト）
              </a>
            </div>
            <div>
              © {new Date().getFullYear()} Cocco Neil. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
