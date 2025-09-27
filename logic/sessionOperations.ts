import type { PairType } from "./inputParse.js";
/**
 * Functions that add new values to the session object, and overrides the old key values if there a conflict
 * @param objs array of new values
 * @param storageKey session storage key
 */
export function addToSession(objs: PairType[], storageKey: string) {
  let pairs: PairType[] = JSON.parse(sessionStorage.getItem(storageKey) || "[]");

  pairs = pairs.filter((obj)=>objs.every((newObj)=>newObj.key !== obj.key))
  pairs.push(...objs);
  sessionStorage.setItem(storageKey, JSON.stringify(pairs));
}
/**
 * Checks if newObj has the same key as some objects inside session storage
 * @param newObj 
 * @param storageKey 
 * @returns boolean true - if exists false if not
 */
export function isExist(newObj: PairType, storageKey: string) {
  let pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  if (pairs.find((storedObj) => storedObj.key === newObj.key)) {
    return true;
  }
  return false;
}
/**
 * Deleting objects from session storage array
 * @param objects 
 * @param storageKey 
 */
export function deleteSelected(objects: PairType[], storageKey: string) {
  let pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const newPairs = pairs.filter((obj) => {
    return !objects.some((o) => o.key === obj.key && o.value === obj.value);
  });
  sessionStorage.setItem(storageKey, JSON.stringify(newPairs));
}