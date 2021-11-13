const { DEEPL_KEY } = require("../../secrets/deepl.key");

const DEEPL_URL = `https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_KEY}`;

module.exports = { DEEPL_URL };
