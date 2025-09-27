import type { PairType } from "./inputParse.js";
/**
 * Creates XML string
 * @param pairs 
 * @returns 
 */
export function pairsToXML(pairs: PairType[]): string {
  const xmlPairs = pairs
    .map(
      (p) =>
        `  <pair>\n    <key>${p.key}</key>\n    <value>${p.value}</value>\n  </pair>`
    )
    .join("\n");
  return `<pairs>\n${xmlPairs}\n</pairs>`;
}
/**
 * Downloads xml file
 * @param xmlString 
 * @param filename 
 */
export function downloadXML(xmlString: string, filename = "data.xml") {
  const blob = new Blob([xmlString], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
