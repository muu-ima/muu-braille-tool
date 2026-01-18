"use client";
import type { Dot } from "@/shared/braille/types";

export function BrailleCell({ dots }: { dots: Dot[] }) {
  const order: Dot[] = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-2 gap-1 rounded-md border border-zinc-200 p-1">
      {order.map((n) => (
        <span
          key={n}
          className={[
            "h-3 w-3 rounded-full",
            dots.includes(n) ? "bg-black" : "bg-zinc-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
