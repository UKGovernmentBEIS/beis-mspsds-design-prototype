// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
const moment = require("moment");
var _ = require('lodash');

// Leave this filters line
var filters = {}

/*
  ====================================================================
  arrayToDateObject
  --------------------------------------------------------------------
  Convert array to javascript date object
  ====================================================================

  Usage:

  {{ [1,2,2020] | arrayToDateObject }}

  = 2020-02-01T00:00:00.000Z

*/

filters.arrayToDateObject = (array) => {
  return new Date(array[2], array[1] -1, array[0])
}



/*
  ====================================================================
  dateToGovukDate
  --------------------------------------------------------------------
  Convert date object to govuk date (1 February 2020)
  ====================================================================

  Usage:

  {{ date | dateToGovukDate }}

  = 1 February 2020

*/

filters.dateToGovukDate = (date) => {
  let theDate = moment(date)
  if (theDate.isValid()){
    return theDate.format('D MMMM YYYY')
  }
  else return ''
}

/*
  ====================================================================
  arrayToGovukDate
  --------------------------------------------------------------------
  Convert array to govuk date
  ====================================================================

  Usage:

  {{ [1, 2, 2020] | arrayToGovukDate }}

  = 1 February 2020

*/

filters.arrayToGovukDate = (array) => {
  let dateObject = filters.arrayToDateObject(array)
  let govukDate = filters.dateToGovukDate(dateObject)
  return govukDate
}

/*
  ====================================================================
  prettyMonth
  --------------------------------------------------------------------
  Return month names from numbers.
  ====================================================================

  Usage:

  {{ 1 | prettyMonth }}

  = January

*/

filters.prettyMonth = (monthNumber) => {
  if (monthNumber){
    return moment().month(monthNumber - 1).format("MMMM");
  }
  else return ''
}

/*
  ====================================================================
  sortDateArrays
  --------------------------------------------------------------------
  Add support for sorting by date arrays
  ====================================================================
  Copied from https://github.com/mozilla/nunjucks/blob/master/nunjucks/src/filters.js#L425

  Requires positional args, no named args
*/

//
filters.sortDateArrays = (arr, reversed, attr) => {

    let array = _.map(arr, v => v)


    array.sort((a, b) => {
      let x = (attr) ? a[attr] : a
      let y = (attr) ? b[attr] : b

      // Convert arrays of 3 to date objects
      x = (_.isArray(x) && (x.length == 3)) ? filters.arrayToDateObject(x) : x
      y = (_.isArray(y) && (y.length == 3)) ? filters.arrayToDateObject(y) : y

      // console.log({x}, {attr})
      // if (!caseSens && _.isString(x) && _.isString(y)) {
      //   x = x.toLowerCase()
      //   y = y.toLowerCase()
      // }

      if (x < y) {
        return reversed ? 1 : -1
      } else if (x > y) {
        return reversed ? -1 : 1
      } else {
        return 0
      }
    })

    return array
  }

// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
