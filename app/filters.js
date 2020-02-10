/* jshint esversion: 6 */


const date    = require("./utils/date").date;
const today   = require("./utils/date").today;
const moment = require("moment");
const faker = require("faker");
const CaseSearch   = require("./utils/case-search");
var _ = require('lodash');


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

  // set attribute on object
  filters.debug = (item) => {
    console.log('Debug', item)
    return item;
  }

  // set attribute on object
  filters.arrayToDate = (array) => {
    return new Date(array[2], array[1] -1, array[0])
  }

  // set attribute on object
  filters.govukDate = (date) => {
    var theDate = moment(date)
    if (theDate.isValid()){
      return theDate.format('D MMMM YYYY')
    }
    else return ''
  }

  // Return month names from numbers. eg January, Februray
  filters.prettyMonth = (monthNumber) => {
    if (monthNumber){
      return moment().month(monthNumber - 1).format("MMMM");
    }
    else return ''
  }

  // set attribute on object
  filters.setAttribute = (dictionary, key, value) => {
    var newDictionary = Object.assign({}, dictionary);
    newDictionary[key] = value;
    return newDictionary;
  }

  filters.toKebabCase = (string) => {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
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

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
};
