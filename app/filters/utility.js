// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
var _ = require('lodash');
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


filters.falsify = (input) => {
  if (_.isNumber(input)) return input
  else if (input == false) return false
  else if (input == 'true') return true
  else if (input == 'false') return false
  return input;
}

// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
