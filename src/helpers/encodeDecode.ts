// Converts an array of strings into a single string
function arrayToString(arrOfStrings: Array<string>) {
  return arrOfStrings.join(",");
}

function stringToArray(string: string) {
  return string.split(",");
}

export { arrayToString, stringToArray };
