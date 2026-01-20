
type Entry = {
    kana: string;
    braille: string;
    other: "dakuon" | "handakuon" | "other";
};


export function GridSheet() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {entries.map((entry) => {
        return( <div key={entry.kana} className="">
          {/* この中に grid を置く */}
        </div>);
       })}
    </div>
  );
}
