import { placeError, placeMessage } from "./logic/htmlLogic.js";
import { parseObject, type PairType } from "./logic/inputParse.js";
import { addToSession, isExist } from "./logic/sessionOperations.js";
import { sortBy } from "./logic/sortingLogic.js";
import { downloadXML, pairsToXML } from "./logic/xmlHandler.js";

function getElementById<T extends HTMLElement>(id: string) {
  const element = document.getElementById(id) as T;
  if (!element) throw new Error(`Missing element ${id}`);
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

getUpdatedPairs(storageKey)


addButton.addEventListener("click", () => {
  try {
    const { obj, error } = parseObject(input.value, forbiddenValues, "=");

    if (!obj) {
      throw new Error(error ?? "Error during object parse");
    }
    if (isExist(obj, storageKey)) {
      placeMessage(
        "Your previos value will be erased, ready to procceed?",
        () => {
          addToSession([obj], storageKey);
           
           return
        }
      );
    } else {
      addToSession([obj], storageKey);
      
    }
    getUpdatedPairs(storageKey);
  } catch (error) {
    placeError((error as Error).message);
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
    placeError("Error during xml download");
  }
});
sortByNameButton.addEventListener("click", () => {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const result = sortBy(pairs, "key");
  addToSession(result, storageKey);
  getUpdatedPairs(storageKey);
});

sortByValueButton.addEventListener("click", () => {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  const result = sortBy(pairs, "value");
  addToSession(result, storageKey);
  getUpdatedPairs(storageKey);
});

export function getUpdatedPairs(storageKey: string) {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  outputList.innerHTML = ""
  pairs.forEach((pair) => {
    const li = document.createElement("li");
    li.textContent = `${pair.key}=${pair.value}`;
    outputList.appendChild(li);
  });
}
