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

export function getPathToTag(
  xmlObj: XLIFFObject,
  tagName?: string,
  tagAttributeID?: string
): Array<number> | null {
  function recursiveResolve(xmlNode: XMLNode): Array<number> | null {
    if (xmlNode.elements) {
      // For each child element
      for (let i = 0; i < xmlNode.elements.length; i++) {
        // Loop through and get the child node
        const node = xmlNode["elements"][i];
        // If the child node is the xliff return the child index
        if (
          node.name == tagName &&
          // If tag attribute is defined and the node attribute equals it
          (!tagAttributeID || node.attributes?.id == tagAttributeID)
        ) {
          console.log(node);
          return [i];
        } else {
          const result = recursiveResolve(node);
          // If found add node id to front of array
          if (result != null) {
            return [i].concat(result);
          }
          // Otherwise nothing was found, return null to parent
          return null;
        }
      }
    }
    // Reached bottom of the tree, return null
    return null;
  }

  // Check if first node is XLIFF node
  if (xmlObj.elements[0].name == "xliff") {
    return [0];
  }

  for (let i = xmlObj.elements.length - 1; i >= 0; i--) {
    const path = recursiveResolve(xmlObj.elements[i]);
    if (path) {
      return [i].concat(path);
    }
  }
  return null;
}

export function resolveNode(
  xmlObj: XLIFFObject,
  path: Array<number>
): XMLNode | null {
  let node = xmlObj.elements[path[0]];
  console.log("Original Node: ", node);
  for (let i = 1; i < path.length; i++) {
    node = node.elements?.[path[i]];
  }
  return node ? node : null;
}

function getXliffTag(xmlObj: XLIFFObject): XMLNode | null {
  const path = getPathToTag(xmlObj, "xliff");
  return path ? resolveNode(xmlObj, path) : null;
}

export function setTransUnitField(
  xmlObj: XLIFFObject,
  unitID: string,
  unitText: string
): XLIFFObject {
  function setValue(
    xmlNode: XMLNode,
    unitID: string,
    unitText: string
  ): XMLNode {
    if (xmlNode.name == "trans-unit" && xmlNode.attributes?.id == unitID) {
      console.log(
        "Found text: ",
        xmlNode.elements[1].elements[0].text,
        unitText
      );
      xmlNode.elements[1].elements[0].text = unitText;
      return xmlNode;
    } else if (xmlNode.elements) {
      xmlNode.elements.forEach(child => setValue(child, unitID, unitText));
      return xmlNode;
    }
    return xmlNode;
  }
  console.log("XMLOBject", xmlObj.elements);
  xmlObj.elements.forEach(child => setValue(child, unitID, unitText));
  return xmlObj;
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

export function getTransUnits(
  xmlObj: XLIFFObject
): Array<XLIFFTransUnit> | null {
  const fileNode = getXliffTag(xmlObj)?.elements[0];
  let transNodes = fileNode?.elements.filter(node => node.name != "header");
  if (transNodes?.[0].name == "body") {
    transNodes = transNodes?.[0].elements;
  }
  return transNodes
    ? transNodes.map(node => {
        const nodeID = node.attributes?.id;
        const sourceText = node.elements[0].elements[0].text;
        const targetText = node.elements[1].elements[0].text;
        const note = node.elements[2]?.elements[0]?.text;
        return {
          id: nodeID ? nodeID : "ID",
          source: sourceText ? sourceText : "Source Text Not Found",
          target: targetText ? targetText : "Target text not found",
          note: note ? note : null
        };
      })
    : null;
}
