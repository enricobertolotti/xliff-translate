// Vuex Store
import store from "@/store/store";

// Helpers
import { xmlToJSObj, JSObjToXML } from "@/helpers/xliff/xliffParse.ts";

// External Libraries
import { saveAs } from "file-saver";
import JSZip from "jszip";

// Definitions
import { XLIFFStoreObject } from "@/models/xliffDefinitions";

export async function uploadFiles(file: File): Promise<void> {
  const obj = xmlToJSObj(await file.text());
  store.dispatch("addXliffOBJ", {
    filename: file.name,
    object: obj
  });
}

export function downloadFile(filename: string): void {
  console.log("Getting filename: ", filename);
  const file = store.getters.getXliffStoreObj(filename);
  console.log("Returned File: ", file);
  const textfile = JSObjToXML(file.object);
  const downloadFilename = file.filename;
  console.log("download: ", downloadFilename, textfile);
  const blob = new Blob([textfile], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, downloadFilename);
}

export function downloadAllFiles(): void {
  const allXliffObjs: Array<XLIFFStoreObject> = store.getters.getAllxliffs;
  const zip = new JSZip();

  allXliffObjs.forEach(obj => {
    const textobj = JSObjToXML(obj.object);
    zip.file(obj.filename, textobj);
  });

  zip.generateAsync({ type: "blob" }).then(function(blob) {
    saveAs(blob, "hello.zip");
  });
}
