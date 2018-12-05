const format = require('date-fns/format')

module.exports = {
  today:{
    short: function() {
      return format(new Date(), "DD/MM/YYYY")
    },
    long: function() {
      return format(new Date(), "DD MMMM YYYY")
    },
    id: function() {
      return format(new Date(), "YYMM-HHmm")
    }
  },
  date: {
    shortFromInput: function(year, month, day) {
      return format(new Date(year, month - 1, day), "DD/MM/YYYY")
    }
  }
}