// Functions to fix JSON
const removeComments = (jsonString) => {
  return jsonString.replace(/\/\*[\s\S]*?\*\/|\/\/.*(?=[\n\r])/g, '');
};

const removeTrailingCommas = (jsonString) => {
  return jsonString.replace(/,\s*(\}|\])/g, '$1');
};

const fixUnescapedStrings = (jsonString) => {
  return jsonString.replace(/:(\s*)"(https?:.*?)\n/g, ':$1"$2",'); // Fix URLs
};

export const fixJsonString = (jsonString) => {
  try {
    // Remove comments
    let cleanedJson = removeComments(jsonString);

    // Remove trailing commas
    cleanedJson = removeTrailingCommas(cleanedJson);

    // Fix unescaped strings
    cleanedJson = fixUnescapedStrings(cleanedJson);

    // Parse JSON
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Invalid JSON format");
  }
};
