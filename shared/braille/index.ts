// shared/braille/index.ts

// 型
export type { Dot, BrailleKind, BrailleEntry } from "./types";

// 変換
export { tokenizeToBraille } from "./convert";

// 表示
export { cellsToUnicode } from "./render";

export { saveHistory, loadHistory, deleteHistory } from "./history";

// （必要なら後で）固定表を外に出す
// export { BRAILLE_TABLE } from "./table";
