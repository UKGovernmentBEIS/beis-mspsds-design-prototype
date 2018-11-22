const date = require('date-fns')

module.exports = {
  short: function() {
    return date.format(new Date(), "DD/MM/YYYY")
  },
  long: function() {
    return date.format(new Date(), "DD MMMM YYYY")
  }
}