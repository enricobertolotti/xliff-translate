import * as map from "@/assets/country-map.json";

export function iconLookup(languageCode: string): string | null {
  console.log("langCode", languageCode)
  const mapLookup = map.filter(
    item => item["alpha-2"] == languageCode.toUpperCase()
  )[0];
  if (mapLookup) {
    return mapLookup.name.toLowerCase();
  } else {
    return null;
  }
}
