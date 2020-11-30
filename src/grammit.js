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
module.exports = (inputraw, word) => {
  let input = inputraw.toLowerCase();
  const grams = [];

  const spl = word ? splitToWords(input) : splitToCharacters(input);

  if (input.length < 3) return grams;

  spl.forEach((char, index) => {
    if (index < spl.length - 2) {
      grams.push(spl.slice(index, index + 3).join(" "));
    }
  });

  return [...new Set(grams)];
};
