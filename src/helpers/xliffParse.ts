import {
  XLIFFLanguages,
  XLIFFObject,
  XMLNode
} from "@/models/xliffDefinitions";
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

function getXliffTag(xmlObj: XLIFFObject): XMLNode | null {
  function recursiveResolve(xmlNode: XMLNode): XMLNode | null {
    if (xmlNode.elements) {
      for (let i = 0; i < xmlNode.elements.length; i++) {
        const node = xmlNode["elements"][i];
        if (node.name == "xliff") {
          return node;
        }
        return recursiveResolve(node);
      }
    }
    return null;
  }
  const nodes = xmlObj.elements.map(node => recursiveResolve(node));
  return nodes.filter(node => node != null)?.[0];
}

export function getXliffLanguages(xmlObj: XLIFFObject): XLIFFLanguages | null {
  const xliffTagAttr = getXliffTag(xmlObj)?.elements[0].attributes;
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

export function getTransNodes(xmlObj: XLIFFObject): Array<XMLNode> | null {
  const xliffNode = getXliffTag(xmlObj);
  const transNodes = xliffNode?.elements.filter(node => node.name != "header");
  return transNodes ? transNodes : null;
}
