import { XLIFFLanguages, XLIFFObject } from "@/models/xliffDefinitions";
import * as convert from "xml-js";

export function xmlToJSObj(xmlString: string) {
  const jsObj = convert.xml2js(xmlString);
  return jsObj;
}

export function JSObjToXML(jsObj: XLIFFObject) {
  const xml = convert.js2xml(jsObj);
  return xml;
}

export function getXMLVersion(jsObj: XLIFFObject): string | null {
  const version = jsObj.declaration?.attributes?.version;
  return version ? version : null;
}

function getXliffTag(xmlObj: XLIFFObject) {
  for (let i = 0; i < xmlObj.elements.length; i++) {
    if (xmlObj["elements"][i].name == "html") {
      return xmlObj["elements"][i]["elements"][0]["elements"][0]["elements"][0];
    }
  }
}

export function getXliffLanguages(xmlObj: XLIFFObject): XLIFFLanguages | null {
  const xliffTagAttr = getXliffTag(xmlObj)?.attributes;
  let sourceLang = null;
  let targetLang = null;

  if (xliffTagAttr?.["source-language"] && xliffTagAttr?.["target-language"]) {
    sourceLang = xliffTagAttr["source-language"];
    targetLang = xliffTagAttr["target-language"];
  }

  return sourceLang && targetLang
    ? { source: sourceLang, target: targetLang }
    : null;
}
