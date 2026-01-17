// app/braille/chart/page.tsx
import { KANA_TO_BRAILLE } from "@/shared/braille";

export default function ChartPage() {
  const entries = Object.entries(KANA_TO_BRAILLE);

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-600">固定点字表</h2>
      <p className="text-xs text-zinc-500">
        デュアルディスプレイの場合は、この画面をサブモニターに置いておくと便利です。
      </p>

      <div className="max-h-120 overflow-auto rounded-xl border bg-zinc-50 text-sm">
        <table className="w-full text-left">
          <thead className="bg-white/70 border-b">
            <tr>
              <th className="px-2 py-1">かな</th>
              <th className="px-2 py-1">点字</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([kana, braille]) => (
              <tr key={kana} className="border-b last:border-b-0">
                <td className="px-2 py-1 text-lg">{kana}</td>
                <td className="px-2 py-1 text-xl">{braille}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
