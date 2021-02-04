import * as endecode from "@/helpers/xliff/encodeDecode";
import { XLIFFObject } from "@/models/xliffDefinitions";

function localstorageSetIDs(xliffIDArray: Array<string>) {
  window.localStorage.setItem("xliffIDs", endecode.arrayToString(xliffIDArray));
}

function localstorageGetIDs(): Array<string> | null {
  const xliffIDs = window.localStorage.getItem("xliffIDs");
  if (xliffIDs) {
    return endecode.stringToArray(xliffIDs);
  } else {
    return null;
  }
}

function localstorageLoadOBJ(filename: string): XLIFFObject | null {
  const localstorageItem = window.localStorage.getItem(filename);
  if (localstorageItem) {
    return JSON.parse(localstorageItem);
  } else {
    return null;
  }
}

function localstorageAddOBJ(filename: string, obj: XLIFFObject): void {
  window.localStorage.setItem(filename, JSON.stringify(obj));
}

function localstorageRemoveOBJ(filename: string): void {
  window.localStorage.removeItem(filename);
}

export {
  localstorageSetIDs,
  localstorageGetIDs,
  localstorageLoadOBJ,
  localstorageAddOBJ,
  localstorageRemoveOBJ
};
