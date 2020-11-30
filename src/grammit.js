/** @param {string} text */
function splitToCharacters(text) {
  return text.split("");
}

/** @param {string} text */
function splitToWords(text) {
  const sanitized = text.replace(/[.|?|!|"|'|`|*]/g, "");
  return sanitized.split(" ");
}

/** @param {string} inputraw */
/** @param {boolean} word */
module.exports = (inputraw, word, nValue) => {
  let input = inputraw.toLowerCase();
  const grams = [];

  const spl = word ? splitToWords(input) : splitToCharacters(input);

  if (input.length < nValue) return grams;

  spl.forEach((char, index) => {
    if (index < spl.length - (nValue - 1)) {
      grams.push(spl.slice(index, index + nValue).join(" "));
    }
  });

  return [...new Set(grams)];
};
