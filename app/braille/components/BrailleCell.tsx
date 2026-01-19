"use client";
import type { Dot } from "@/shared/braille/types";

type Props = {
  dots: Dot[]; // 立ってる点番号の配列
};

const ROWS: Dot[][] = [
  [1, 4],
  [2, 5],
  [3, 6],
];

export function BrailleCell({ dots }: Props) {
  const set = new Set(dots);

  return (
    <div className="grid grid-rows-3 gap-1 rounded-md border bg-white p-2">
      {ROWS.map((row, r) => (
        <div key={r} className="grid grid-cols-2 gap-1">
          {row.map((n) => (
            <span
              key={n}
              className={[
                "h-2.5 w-2.5 rounded-full",
                set.has(n) ? "bg-black" : "bg-zinc-200",
              ].join(" ")}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
