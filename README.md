# json-translations-with-deepl
This small script that will help you to translate your app language keys into the chosen language. i18.
(Deepl has some limitations in terms of characters translated per month and target languages allowed with free accounts).

First of all, you must register at Deelpl.com to get the tokenId.
Once you have it, the script expects to get this token from a file in this path `root/secrets/deepl.key.js`.

```javascript
// filename: deepl.key.js

const DEEPL_KEY = 'put-your-deepl-token-id-here';

module.exports = { DEEPL_KEY };
```

Copy your key: value translation text into jsonKeysFile.json
```json
{
  "language.it.label": "Italian",
  "language.de.label": "German",
  "language.ja.label": "Japonese",
  "language.zh.label": "Chinese",
  "language.pt.label": "Portuguese",
  "language.fr.label": "French",
  "language.nl.label": "Dutch"
}
```

In file **json-translations-with-deepl** line 70, *getDeeplTranslations* have two parameters.
You must specify what your target language is, and as optional your source language, default is English.

If everything thing goes as it should, you will have your translations ready in **translations.json** file.
