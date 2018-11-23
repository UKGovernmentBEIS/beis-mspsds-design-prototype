const format = require('date-fns/format')

module.exports = {
  short: function() {
    return format(new Date(), "DD/MM/YYYY")
  },
  long: function() {
    return format(new Date(), "DD MMMM YYYY")
  }
}