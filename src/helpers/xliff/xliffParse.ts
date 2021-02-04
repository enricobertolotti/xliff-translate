import {
  XLIFFLanguages,
  XLIFFObject,
  XLIFFTransUnit,
  XMLNode
} from "@/models/xliffDefinitions";
import * as convert from "xml-js";

export function xmlToJSObj(xmlString: string) {
  const jsObj = convert.xml2js(xmlString);
  return jsObj;
}

export function JSObjToXML(jsObj: XLIFFObject) {
  return convert.js2xml(jsObj);
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

  // Check if first node is XLIFF node
  if (xmlObj.elements[0].name == "xliff") {
    return xmlObj.elements[0];
  } else {
    // Else loop through all nodes and filter out null results
    const nodes = xmlObj.elements.map(node => recursiveResolve(node));
    return nodes.filter(node => node != null)?.[0];
  }
}

export function getXliffLanguages(xmlObj: XLIFFObject): XLIFFLanguages | null {
  console.log(xmlObj);
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

export function getTransUnits(
  xmlObj: XLIFFObject
): Array<XLIFFTransUnit> | null {
  const fileNode = getXliffTag(xmlObj)?.elements[0];
  let transNodes = fileNode?.elements.filter(node => node.name != "header");
  if (transNodes?.[0].name == "body") {
    transNodes = transNodes?.[0].elements;
  }
  console.log("Transnodes: ", transNodes);
  return transNodes
    ? transNodes.map(node => {
        const nodeID = node.attributes?.id;
        const sourceText = node.elements[0].elements[0].text;
        const targetText = node.elements[1].elements[0].text;
        return {
          id: nodeID ? nodeID : "ID",
          source: sourceText ? sourceText : "Source Text Not Found",
          target: targetText ? targetText : "Target text not found"
        };
      })
    : null;
}
