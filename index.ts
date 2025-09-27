import { placeError, placeMessage } from "./logic/htmlLogic.js";
import { parseObject, type PairType } from "./logic/inputParse.js";
import { addToSession, isExist } from "./logic/sessionOperations.js";
import { sortBy } from "./logic/sortingLogic.js";
import { downloadXML, pairsToXML } from "./logic/xmlHandler.js";
/**
 * Helper function to not check every time if element is null
 * @param id 
 * @returns 
 */
function getElementById<T extends HTMLElement>(id: string) {
  const element = document.getElementById(id) as T;
  if (!element) throw new Error(`Missing element ${id}`);
  return element;
}
// Elements and constants
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
// getting pairs once page is loaded 
getUpdatedPairs(storageKey)

/**
 * parsing new object, checking if the object key in storage already
 * if yes showing message to additional check
 * getting updated pairs 
 */
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
    input.value = ""
    getUpdatedPairs(storageKey);
  } catch (error) {
    placeError((error as Error).message);
  }
});
/**
 * deletes all selected pairs, before that showing message for additional confirmation
 * deletes by checking checkboxes in li elements 
 */
deleteButton.addEventListener("click",()=>
  {
    let pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
    placeMessage("All selected pairs will be deleted, ready to proceed?",()=>
      {
        try {
          const liArr = Array.from(outputList.children) as HTMLLIElement[]
        liArr.forEach(li=>
          {
            const checkbox = li.querySelector("input")
            if(!checkbox) throw new Error("Checkbox is missing");
            if(!checkbox.value) throw new Error("Checkbox value is missing")
            if(checkbox.checked)
              {
                pairs = pairs.filter(obj=>obj.key!==checkbox.value)
              }              
          })
        sessionStorage.setItem(storageKey, JSON.stringify(pairs));
        getUpdatedPairs(storageKey)
        } catch (error) {
          placeError((error as Error).message)
        }
        
      })
  })

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
/**
 * Gets array of pairs from storage
 * makes checkbox with pair key as value to track a pair
 * @param storageKey 
 */
export function getUpdatedPairs(storageKey: string) {
  const pairs: PairType[] = JSON.parse(
    sessionStorage.getItem(storageKey) || "[]"
  );
  outputList.innerHTML = ""
  pairs.forEach((pair) => {
    const li = document.createElement("li");
    li.className = "pair-li"
    const p = document.createElement("p")
    p.textContent = `${pair.key}=${pair.value}`;
    p.className = "pair-p"
    const checkbox = document.createElement('input')
    checkbox.value = pair.key;
    checkbox.type = "checkbox"
    checkbox.className = "pair-deletion-checkbox"
    li.appendChild(p)
    li.appendChild(checkbox)
    outputList.appendChild(li);
  });
}
