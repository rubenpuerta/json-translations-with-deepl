# json-translations-with-deepl

This small script will help you to translate your app language keys into the chosen language. i18.
(Deepl has some limitations in terms of characters translated per month and target languages allowed with free accounts).

First of all, you must register at Deelpl.com to get the tokenId.
Once you have it, the script expects to get this token from a file in this path `root/secrets/deepl.key.js`.

```javascript
// filename: deepl.key.js

const DEEPL_KEY = "put-your-deepl-token-id-here";

module.exports = { DEEPL_KEY };
```

Copy your key: value translation text into jsonKeysFile.json

```javascript
// filename: jsonKeysFile.json

{
  "test.key.one": "your text",
  "test.key.two": "another sentence"
}
```

In file **json-translations-with-deepl** line 70, modify the array **targetLanguages** and put inside it, all the languages you want your keys to be translated into.

```javascript
// filename: json-translations-with-deepl.js

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
```

If everything goes as it should, you will have your translations ready in each corresponting file **ja.json**, **de.json**...
