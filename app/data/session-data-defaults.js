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
  currentUser:   'Tim Harwood',
  mode:         "pages",
  currentPage:  "case",
  
  caseid: "0132-1421",
  businessid: "b1",
  productid: "p1",

  caseListSettings: {
    sort: "latest",
    assignee: ["Me"],
    status: ["Open"]
  },

  createUrl: "/root/flows/create/01",

  cases:        require("./cases.js").cases,
  products:     require("./products.js").products,
  businesses:   require("./businesses.js").businesses,
  contacts:     require("./contacts.js").contacts,
  locations:    require("./locations.js").locations,
  users:        require("./users.js").users,
  attachments:  require("./attachments.js").attachments,
};
