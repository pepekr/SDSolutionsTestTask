import type { PairType } from "./inputParse";

export function addToSession(objs: PairType[], storageKey: string) {
  let pairs: object[] = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
  pairs.push(...objs);
  sessionStorage.setItem(storageKey, JSON.stringify(pairs));
}

export function isExist(newObj: PairType, storageKey: string) {
  let pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  if (pairs.find((storedObj) => storedObj.key === newObj.key)) {
    return true;
  }
  return false;
}
export function deleteSelected(objects: PairType[], storageKey: string) {
  let pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const newPairs = pairs.filter((obj) => {
    return !objects.some((o) => o.key === obj.key && o.value === obj.value);
  });
  sessionStorage.setItem(storageKey, JSON.stringify(newPairs));
}