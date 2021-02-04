/////// Encode Decode

// Converts an array of strings into a single string
function arrayToString(arrOfStrings) {
  return arrOfStrings.join(",");
}

function stringToArray(string) {
  return string.split(",");
}

/////// Helper functions

function localstorageSetIDs(xliffIDArray) {
  window.localStorage.setItem("xliffIDs", arrayToString(xliffIDArray));
}

function localstorageGetIDs() {
  const xliffIDs = window.localStorage.getItem("xliffIDs");
  if (xliffIDs) {
    return stringToArray(xliffIDs);
  } else return [];
}

// Loading and storing

function localstorageLoadOBJ(filename) {
  return JSON.parse(window.localStorage.getItem(filename));
}

function localstorageAddOBJ(filename, obj) {
  window.localStorage.setItem(filename, JSON.stringify(obj));
}

function localstorageRemoveOBJ(filename) {
  window.localStorage.removeItem(filename);
}

export function saveFileToLocalStorage(file) {
  window.localStorage.setItem(file.name, file);
}

export function loadAllFiles() {
  return null;
}
