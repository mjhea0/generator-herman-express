const cheerio = require('cheerio');

function extractCsrfToken(res) {
  const $ = cheerio.load(res.text);
  return $('[name=_csrf]').val();
}

module.exports = {
  extractCsrfToken,
};
