const axios = require("axios");
const fs = require("fs");
const { pipe } = require("./utils");
const { DEEPL_URL } = require("./src/constants/deepl-url.constants");
const {
  translationKeys,
  textToBeTranslated,
} = require("./src/helpers/split-json-values.helper");

const getDeeplResponse = async (targetLanguage, sourceLanguage = "en") => {
  try {
    const requests = textToBeTranslated.map((arrTextToBeTranslated) => {
      const urlDataRequested = encodeURI(
        `${arrTextToBeTranslated.join(
          ""
        )}&source_lang=${sourceLanguage}&target_lang=${targetLanguage}`
      );
      return axios.get(`${DEEPL_URL}${urlDataRequested}`);
    });
    return await axios.all(requests);
  } catch (error) {
    Error("Error getting deepl response");
  }
};

const deeplResponseTransformer = async (deeplResponse) => {
  try {
    let retrievedTranslations = [];
    (await deeplResponse).forEach(({ status, data }) => {
      if (status === 200) {
        retrievedTranslations = [
          ...retrievedTranslations,
          ...data.translations.map(({ text }) => text),
        ];
      }
    });
    return retrievedTranslations;
  } catch (error) {
    console.error("Error running deeplResponseTransformer");
  }
};

const setKeysToTranslations = async (deeplTranslatedText) => {
  try {
    const text = await deeplTranslatedText;
    return translationKeys.reduce((acc, cur, idx) => {
      acc[cur] = text[idx];
      return acc;
    }, {});
  } catch (error) {
    Error("Error assigning keys to translations");
  }
};

const storeData = (targetLanguage) => async (data) => {
  try {
    fs.writeFileSync(`${targetLanguage}.json`, JSON.stringify(await data));
  } catch (err) {
    Error("Error saving json file");
  }
};

const getDeeplTranslations = (targetLanguage, sourceLanguage) =>
  pipe(
    deeplResponseTransformer,
    setKeysToTranslations,
    storeData(targetLanguage)
  )(getDeeplResponse(targetLanguage, sourceLanguage));

const targetLanguages = [
  "ja",
  "de",
  "fr",
  "pt-pt",
  "pl",
  "nl",
  "en-gb",
  "it",
  "el",
];
const originLanguage = "en";

targetLanguages.forEach((targetLanguage) => {
  getDeeplTranslations(targetLanguage, originLanguage);
});
