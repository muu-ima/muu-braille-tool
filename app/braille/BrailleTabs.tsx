// app/braille/BrailleTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BrailleTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/braille/translate", label: "翻訳" },
    { href: "/braille/chart", label: "点字表" },
  ];

  return (
    <nav className="inline-flex rounded-full border bg-white px-1 py-1 shadow-sm text-xs">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "px-3 py-1 rounded-full transition",
              active
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
