// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
const string = require('string')
// Leave this filters line
var filters = {}


/*
  ====================================================================
  filterName
  --------------------------------------------------------------------
  Short description for the filter
  ====================================================================

  Usage:

  [Usage here]

  filters.sayHi = (name) => {
    return 'Hi ' + name + '!'
  }

*/

// Create url / slugs from text
// This is a heading => this-is-a-heading
filters.slugify = (input) => {
  if (!input) throw "Error in slugify: no input", input;
  else return string(input).slugify().toString();
}


// Hyphen separate a string
filters.toKebabCase = (string) => {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
}


// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
