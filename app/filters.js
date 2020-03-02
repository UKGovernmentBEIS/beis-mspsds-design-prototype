/* jshint esversion: 6 */


const date    = require("./utils/date").date;
const today   = require("./utils/date").today;
const faker = require("faker");
const CaseSearch   = require("./utils/case-search");
var _ = require('lodash');
var CSV = require('csv-string')


module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {};

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    collection filters
  ------------------------------------------------------------------ */
  filters.filterCollection = function (things, filters) {
    let ret = things;
    filters.forEach(filter => {
      ret = ret.filter(filter);
    });
    return ret;
  };

  filters.withId = function (things, id) {
    return things.find(function (thing) {
      return thing.id === id;
    });
  };

  filters.pick = function (objects, attr) {
    return objects.map(o => o[attr]);
  };

  filters.jsList = function (objects, attr) {
    return "[" + objects.map(o => "'" + o + "'") + "]";
  };

  /* ------------------------------------------------------------------
    caseListSettings filters
  ------------------------------------------------------------------ */
  filters.caseFilters = function (caseListSettings, data) {
    let filters = [];
    if (caseListSettings.status) {
      filters.push(function (kase) {
        return caseListSettings.status.includes(kase.status);
      });
    }
    if (caseListSettings.assignee) {
      let allowedAssignees = [];
      if (caseListSettings.assignee.includes("Me")) {
        allowedAssignees.push(data.currentUser);
      }
      if (caseListSettings.assignee.includes("other")) {
        allowedAssignees.push(caseListSettings["assignee-other"]);
      }
      filters.push(function (kase) {
        return allowedAssignees.includes(kase.assignee);
      });
    }

    if (caseListSettings.creator) {
      let allowedCreators = [];
      if (caseListSettings.creator.includes("Me")) {
        allowedCreators.push(data.currentUser);
      }
      if (caseListSettings.creator.includes("other")) {
        allowedCreators.push(caseListSettings["creator-other"]);
      }
      filters.push(function (kase) {
        return allowedCreators.includes(kase.creator);
      });
    }

    if (caseListSettings.q) {
      filters.push(function(kase) {
        results = CaseSearch.findMatches(kase, caseListSettings.q, data);
        kase.matches = results;
        return results.length > 0
      });
    }
    return filters;
  };

  filters.caseSortAttr = function (caseListSettings) {
    switch (caseListSettings.sort) {
      case "latest": return "dateUpdated";
      case "oldest": return "dateUpdated";
      case "newest": return "dateCreated";
      default: return undefined;
    }
  };

  filters.caseSortDir = function (caseListSettings) {
    // returns if the sort should be reversed
    switch (caseListSettings.sort) {
      case "latest": return true;
      case "oldest": return false;
      case "newest": return true;
      default: return true;
    }
  };

  /* ------------------------------------------------------------------
    case filters
  ------------------------------------------------------------------ */
  // Make a shallow copy of the cases list with children entity id arrays swapped for copies of the children models
  filters.attachCaseChildren = function (cases, { products = [], businesses = [], contacts = [], attachments = [] }) {
    const attachToCase = kase => Object.assign({}, kase, {
      products:     kase.products.map(productId => products.find(product => product.id === productId)),
      attachments:  kase.attachments.map(attachmentId => attachments.find(attachment => attachment.id === attachmentId)),
      businesses:   kase.businesses.map(({ id, role }) => Object.assign({ role }, businesses.find(business => business.id === id))),
      contacts:     kase.contacts.map(({ id, role }) => Object.assign({ role }, contacts.find(contact => contact.id === id))),
    });
    if (Array.isArray(cases)) {
      return cases.map(attachToCase);
    } else {
      return attachToCase(cases);
    }
  };

  // Used in setup to pick a case in a dropdown
  filters.selectChoices = function (cases, selectedByDefault = '0132-1421') {
    return cases.map(kase => ({
      value: kase.id,
      text: `${kase.type} ${kase.id} (assigned to ${kase.assignee})`,
      selected: kase.id === selectedByDefault
    }));
  };

  /* ------------------------------------------------------------------
    business filters
  ------------------------------------------------------------------ */
  // Make a shallow copy of the cases list with children entity id arrays swapped for copies of the children models
  filters.attachBusinessChildren = function (businesses, { products = [], cases = [], contacts = [] , locations = [], attachments = [] }) {
    const attachToCase = business => Object.assign({}, business, {
      products:     business.products.map(productId => products.find(product => product.id === productId)),
      attachments:  business.attachments.map(attachmentId => attachments.find(attachment => attachment.id === attachmentId)),
      cases:        cases.filter(c => c.businesses.some(b => b.id === business.id)),
      contacts:     business.contacts.map(({ id, role }) => Object.assign({ role }, contacts.find(contact => contact.id === id))),
      locations:    business.locations.map(({ id, role }) => Object.assign({ role }, locations.find(location => location.id === id))),
    });
    if (Array.isArray(businesses)) {
      return businesses.map(attachToCase);
    } else {
      return attachToCase(businesses);
    }
  };

  /* ------------------------------------------------------------------
    case filters
  ------------------------------------------------------------------ */
  // Make a shallow copy of the cases list with children entity id arrays swapped for copies of the children models
  filters.attachProductChildren = function (products, { cases = [], businesses = [], contacts = [], attachments = [] }) {
    const attachToCase = product => Object.assign({}, product, {
      cases:        cases.filter(c => c.products.some(id => id === product.id)),
      attachments:  product.attachments.map(attachmentId => attachments.find(attachment => attachment.id === attachmentId)),
      businesses:   product.businesses.map(({ id, role }) => Object.assign({ role }, businesses.find(business => business.id === id))),
    });
    if (Array.isArray(products)) {
      return products.map(attachToCase);
    } else {
      return attachToCase(products);
    }
  };

  /* ------------------------------------------------------------------
    Date Filters
  ------------------------------------------------------------------ */

  filters.prettifyDate = function(data) {
    return date.shortFromInput(new Date(data).getFullYear(), new Date(data).getMonth() + 1, new Date(data).getDate());
  }

  filters.buildDateString = function (year, month, day) {
    return date.shortFromInput(year, month, day);
  };

  filters.getID = function (thing, formatString = "YYMM-HHmm") {
    return thing + today.id(formatString);
  };

  filters.canBeSeenGDPR = function(object, currentTeam) {
    return object.creatorTeam ? object.creatorTeam === currentTeam : true;
  }

  filters.isString = function (obj) {
    return typeof obj == 'string';
  };

  /* ------------------------------------------------------------------
    Generic Filters
  ------------------------------------------------------------------ */

  // filter results for only those containing attr/ var
  filters.filterAttr = function (arr, attr, test) {
    var result = arr.filter(function (item) {
       return item[attr] === test;
    });
    return result
  };

  // filter results for only those containing attr/ var
  filters.removeAttr = function (arr, attr, test) {
    var result = arr.filter(function (item) {
       return item[attr] !== test;
    });
    return result
  };

  // filters.where = (array, key, value) => {
  //   return array.filter(item => {
  //     const keys = key.split('.');
  //     const reducedKey = keys.reduce((object, key) => {
  //       return object[key];
  //     }, item);

  //     return (reducedKey === value ? item : false);
  //   });
  // }

  filters.where = (array, key, value) => {
    // Basic array
    if (_.isArray(array)){
      return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
      });
    }
    // Object array
    else if (_.isObject(array)){
      const objectKeys = Object.keys(array)
      var output = {}

      var filteredKeys = objectKeys.filter(item => {
        const keys = key.split('.');
        const reducedKey = keys.reduce((object, key) => {
          return object[key];
        }, array[item]);
        return (reducedKey === value ? array[item] : false);
      });

      filteredKeys.forEach(key =>{
        output[key] = array[key]
      })
      return output
    }
  }

  // Check whether array includes value
  filters.arrayIncludes = (array, searchElement, caseSensitive=true) =>{
    // Case sensitive
    if ( caseSensitive == true ) return Array.isArray(array) ? array.includes(searchElement) : false
    // Case insensitive
    if ( _.isString(searchElement)) {
      return ( array.map(function(item) {
        if ( item && _.isString(item) ) return item.toLowerCase()
        return item
      }).indexOf( searchElement.toLowerCase() ) < 0 ) ? false : true
    } else {
      return ( array.indexOf( searchElement ) < 0) ? false : true
    }
  }

  filters.faker = (string) => {
    // faker.seed(123)
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var fullName = firstName + " " + lastName
    var email = fullName.split(' ').join('.').toLowerCase() + "@council.gov.uk"
    var user = {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email}
    return user;
  }



  /*
  =====================================================================
  arrayToGovukTable

  Convert an array to form needed for govukTable macro
  =====================================================================

  Expects array or nested array.

  Usage:

  {% set tableData = [
    ["1 January", "Friday", "New Year’s Day"],
    ["2 April", "Friday", "Good Friday"],
    ["5 April", "Monday", "Easter Monday"]
    ]
  %}

  {{ govukTable({
    caption: "2021 Bank holidays",
    firstCellIsHeader: true,
    head: [
      {
        text: "Date"
      },
      {
        text: "Day of week"
      },
      {
        text: "Holiday name"
      }
    ],
    rows: tableData | arrayToGovukTable
  }) }}

  */

  filters.arrayToGovukTable = (array) => {
    // Coerce to nested array
    array = (Array.isArray(array[0])) ? array : [array]
    let tableData = []
    array.forEach(row => {
      let rowData = []
      row.forEach(item => {
        rowData.push({
          html: item  // html for flexibility
        })
      })
      tableData.push(rowData)
    })
    // tableData = (tableData.length == 1) ? tableData[0] : tableData
    return tableData;
  }

  /*
  =====================================================================
  csvToArray

  Convert a CSV string to array or nested array
  =====================================================================

  Expects CSV string. Requires 'csv-string' npm module

  Usage:

  let csvData =
    "Product images,✔,✔,✔,✗
    Case images,✔,✔,✔,✗
    Attachments uploaded with a document,✔,✔,✔,✗
    Generic attachments,✔,✔,✗,✗"

  {% set arrayData = csvData | csvToArray %}

  */

  filters.csvToArray = (csvString) => {
    array = CSV.parse(csvString);
    // Flatten nested array if it's only a single line
    array = (array.length == 1) ? array[0] : array
    return array;
  }

  /*
  =====================================================================
  csvToGovukTable

  Convert a CSV string to form needed for govukTable macro
  =====================================================================

  Expects a CSV string. Requires csvToArray filter (above)

  Usage:

  {% set tableData =
    "1 Janury, Friday, New Year’s Day
    2 April, Friday, Good Friday
    5 April, Monday, Easter Monday"
  %}


  {{ govukTable({
    caption: "2021 Bank holidays",
    firstCellIsHeader: true,
    head: [
      {
        text: "Date"
      },
      {
        text: "Day of week"
      },
      {
        text: "Holiday name"
      }
    ],
    rows: tableData | csvToGovukTable
  }) }}

  */

  filters.csvToGovukTable = (csvString) => {
    let array = filters.csvToArray(csvString)
    return filters.arrayToGovukTable(array);
  }

  /*
  =====================================================================
  arrayToSumaryList

  Convert a nested array to form needed for govukSummaryList
  =====================================================================

  Expects nested array. Key and value are required, the others optional

  Usage:

  let summaryListData = [
    [ "Full name", "Ed Horsford", "/change-name"],
    [ "Email address", "test@example.com", "/change-email"],
    [ "Password", "Set 22 days ago", "/reset", "Reset", "your password"],
  ]

  {{ govukSummaryList({
    rows: summaryListData | arrayToSummaryList
  }) }}

  */

  filters.arrayToSummaryList = array => {
    let arrData = []
    array.forEach( row => {
      let key = row[0]  // required
      let value = row[1] // required
      let href = (row[2] != null) ? row[2] : false
      let text = (row[3] != null ) ? row[3] : "Change"
      let visuallyHiddenText = (row[4] != null ) ? row[4] : row[0].toLowerCase()
      let rowData = {
        key: {
          text: key
        },
        value: {
          html: value // html for flexibility
        }
      }
      // Action (optional)
      if (href){
        let item = {
          href,
          text,
          visuallyHiddenText
        }
        rowData.actions = {
          items: [item]
        }
      }
      arrData.push(rowData)
    })
    return arrData;
  }

  filters.csvToSummaryList = (csvString) => {
    arr = CSV.parse(csvString);
    let arrData = filters.arrayToSummaryList(arr)
    return arrData;
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
};
