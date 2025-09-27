import { parseObject, type PairType } from "./logic/inputParse";
import { addToSession, isExist } from "./logic/sessionOperations";
import { sortBy } from "./logic/sortingLogic";
import { downloadXML, pairsToXML } from "./logic/xmlHandler";

function getElementById<T extends HTMLElement>(id: string) {
  const element = document.getElementById(id) as T;
  if (!element) throw new Error("Missing element");
  return element;
}
const storageKey = "pairsArray";
const forbiddenValues = "[^A-Z|a-z|0-9]";
const addButton = getElementById<HTMLButtonElement>("add-btn");
const deleteButton = getElementById<HTMLButtonElement>("delete-btn");
const xmlButton = getElementById<HTMLButtonElement>("xml-btn");
const sortByNameButton = getElementById<HTMLButtonElement>("sort-by-name-btn");
const sortByValueButton =
  getElementById<HTMLButtonElement>("sort-by-value-btn");
const input = getElementById<HTMLInputElement>("pair-input");
const outputList = getElementById<HTMLUListElement>("obj-list");

addButton.addEventListener("click", () => {
  try {
    const result = parseObject(input.value, forbiddenValues, "=");
    if (!result.obj) {
      // TODO place an error in html
      return;
    }
    if (isExist(result.obj, storageKey)) {
      // place message that it will be erased
      // get button to okay and to cancel
    }
    addToSession([result.obj], storageKey);
  } catch (error) {
    // place an error
  }
});

xmlButton.addEventListener("click", () => {
  try {
    const pairs: PairType[] = JSON.parse(
      sessionStorage.getItem(storageKey) || "[]"
    );
    const xmlString = pairsToXML(pairs);
    downloadXML(xmlString);
  } catch (error) {
    // place an error in html
  }
});
sortByNameButton.addEventListener("click", () => {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const result = sortBy(pairs, "key");
  addToSession(result, storageKey);
});

sortByValueButton.addEventListener("click", () => {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const result = sortBy(pairs, "value");
  addToSession(result, storageKey);
});
