import * as convert from "xml-js";

export function xmlToJSObj(xmlString) {
  const jsObj = convert.xml2js(xmlString);
  return jsObj;
}

export function JSObjToXML(jsObj) {
  const xml = convert.js2xml(jsObj);
  return xml;
}

export function getXMLVersion(xmlObj) {
  console.log(xmlObj);
  return xmlObj["declaration"]["attributes"]["version"];
}

function getXliffTag(xmlObj) {
  for (let i = 0; i < xmlObj["elements"].length; i++) {
    if (xmlObj["elements"][i].name == "html") {
      return xmlObj["elements"][i]["elements"][0]["elements"][0]["elements"][0];
    }
  }
}

export function getXliffLanguages(xmlObj) {
  console.log(getXliffTag(xmlObj));
  const sourceLang = getXliffTag(xmlObj)["attributes"]["source-language"];
  const targetLang = getXliffTag(xmlObj)["attributes"]["target-language"];
  return sourceLang + " => " + targetLang;
}
