/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
  
  caseid: "1811-0803",

  createUrl: "/pages/flows/process-incoming/report-origin-type",


  cases:        require("./cases.js").cases,
  products:     require("./products.js").products,
  businesses:   require("./businesses.js").businesses,
  contacts:     require("./contacts.js").contacts,
  locations:    require("./locations.js").locations,
};
