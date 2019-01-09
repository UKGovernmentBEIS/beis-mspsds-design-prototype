/* jshint esversion: 6 */
const array         = require("./arrayHelpers");

findMatches = (kase, q, data) => {
  const firstTerm = q.split(" ")[0].toLowerCase()
  let results = []
  results = results.concat(findMatchesInObject({ ...kase,
    label: kase.type
  }, firstTerm))
  if (kase.report) {
    results = results.concat(findMatchesInObject({ ...kase.report,
      label: "Report"
    }, firstTerm))
  }
  if (kase.report && kase.report.reporter) {
    results = results.concat(findMatchesInObject({ ...kase.report.reporter,
      label: "Reporter"
    }, firstTerm))
  }
  if (kase.products.length > 0) {
    kase.products.forEach((productId) => {
      let product = array.findById(data.products, productId)
      results = results.concat(findMatchesInObject({ ...product,
        label: "Product"
      }, firstTerm))
    })
  }
  if (kase.businesses.length > 0) {
    kase.businesses.forEach((businessReference) => {
      let business = array.findById(data.businesses, businessReference.id)
      results = results.concat(findMatchesInObject({ ...business,
        label: "Business"
      }, firstTerm))
    })
  }
  return results;
}

findMatchesInObject = (object, query) => {
  let results = []
  Object.keys(object).forEach(function (key) {
    if (typeof object[key] !== "string") return [];
    const value = object[key].toLowerCase()
    if (value.indexOf(query) !== -1) {
      const highlightedText = getHighlightedText(query, value);
      const highlightLabel = object.label.toString() + " " + key.toString()
      const gdprApplies = object.label === "Reporter"
      results.push({
        label: highlightLabel,
        text: highlightedText,
        gdprApplies: gdprApplies
      })
    }
  });
  return results;
}

getHighlightedText = (query, value) => {
  const highlight = "<span class='highlight'>" + query + "</span>"
  const highlightedSnippets = value.split(query)
  let highlightedText = ""
  for (let i = 0; i < highlightedSnippets.length; i++) {
    highlightedText = highlightedText + shortenText(highlightedSnippets[i], 20);
    if (i < highlightedSnippets.length - 1) {
      highlightedText = highlightedText + highlight;
    }
  }
  return highlightedText;
}

shortenText = (text, maxChars) => {
  if (text.length <= maxChars * 2) {
    return text;
  }
  let beginning = text.slice(0, maxChars);
  const lastIndex = beginning.lastIndexOf(" ");
  beginning = beginning.substring(0, lastIndex);

  let end = text.slice(-maxChars);
  const firstIndex = end.indexOf(" ");
  end = end.substring(firstIndex);

  return beginning + '[...]' + end;
}

module.exports = {
  findMatches: findMatches,
}