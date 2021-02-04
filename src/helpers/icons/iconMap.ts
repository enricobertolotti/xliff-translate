import * as map from "@/assets/country-map.json";

export function iconLookup(languageCode: string): string | null {
  const mapLookup = map.find(
    item => item["alpha-2"] == languageCode.toUpperCase()
  );
  if (mapLookup) {
    return mapLookup.name.toLowerCase();
  } else {
    return null;
  }
}
