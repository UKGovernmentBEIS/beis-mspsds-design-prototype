// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
const _ = require('lodash');

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


*/

// Merge arrays or strings together in to an array
filters.combineArrays = (arr1=[], arr2=[]) => {
  if (_.isString(arr1)) arr1 = [arr1]
  if (_.isString(arr2)) arr2 = [arr2]
  return [...arr1, ...arr2]
}

// Flatten object array to nested array
filters.objectArrayToArray = array => {
  let newArray = []
  array.forEach(item => {
    let newItem = []
    Object.keys(item).forEach(part => {
      newItem.push(item[part])
    })
    newArray.push(newItem)
  })
  return newArray
}

// Keep only whitelisted keys from object or array of objects
filters.keepAttributes = (array, ...keysToKeep) => {
  const keepKeys = function(theObject) {
    var newObj = {}
    // Re-orders and keeps only selected keys
    keysToKeep.forEach(key => {
      let objectKeys = Object.keys(theObject)
      if (objectKeys.includes(key)){
        newObj[key] = theObject[key]
      }
    })
    return newObj
  }
  // Array of objects
  if (_.isArray(array)){
    return array.map(keepKeys)
  }
  // Single object
  else return keepKeys(array)
}

// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
