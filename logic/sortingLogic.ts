import type { PairType } from "./inputParse.js";

type SortCondition = "key" | "value";
/**
 * Sorts by condition
 * @param pairs an array that needs to be sorted 
 * @param condition on what condition object will be compared 
 * @returns sorted array
 */
export function sortBy(pairs: PairType[], condition: SortCondition) {
  return pairs.sort((a, b) => a[condition].localeCompare(b[condition]));
}
