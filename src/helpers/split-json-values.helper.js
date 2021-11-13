const jsonKeysToBeTranslated = require("../../jsonKeysFile.json");

const translationKeys = Object.keys(jsonKeysToBeTranslated);

/**
 * Deepl API do not accept more than 50 text per call
 * so, should be split into arrays of 50 values as max.
 */
const getTextToBeTranslated = () => {
  const textToBeTranslated = translationKeys.map(
    (key) => `&text=${jsonKeysToBeTranslated[key]}`
  );
  const len = Math.ceil(textToBeTranslated.length / 50);
  const arrPerEach50values = [];
  for (let i = 0; i < len; i++) {
    arrPerEach50values.push(textToBeTranslated.splice(0, 50));
  }
  return arrPerEach50values;
};

const textToBeTranslated = getTextToBeTranslated();

module.exports = { translationKeys, textToBeTranslated };
