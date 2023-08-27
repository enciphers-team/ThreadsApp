const Meta = require("html-metadata-parser");

const getPageMetadata = async (url) => {
  try {
    const result = await Meta.parser(url);

    console.log("get metadata response:", JSON.stringify(result, null, 3));
    return { error: false, result };
  } catch (error) {
    return { error: true, errorDetails: error };
  }
};

module.exports = getPageMetadata