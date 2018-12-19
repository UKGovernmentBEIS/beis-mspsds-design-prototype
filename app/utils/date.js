/* jshint esversion: 6 */

const format  = require('date-fns/format');
const usedIds = [];

module.exports = {
  today:{
    short: function() {
      return format(new Date(), "DD/MM/YYYY");
    },
    long: function() {
      return format(new Date(), "DD MMMM YYYY");
    },
    id: function(formatString = "YYMM-HHmm") {
      return format(new Date(), formatString);
    }
  },
  date: {
    shortFromInput: function(year, month, day) {
      return format(new Date(year, month - 1, day), "DD/MM/YYYY");
    }
  }
};