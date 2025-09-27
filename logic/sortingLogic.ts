import type { PairType } from "./inputParse";

type SortCondition = "key" | "value";

export function sortBy(pairs: PairType[], condition: SortCondition) {
  return pairs.sort((a, b) => a[condition].localeCompare(b[condition]));
}
