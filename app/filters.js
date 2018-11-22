module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

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
    COLLECTION FILTERS
  ------------------------------------------------------------------ */
  filters.filterCollection = function(thigs, filters) {
    let ret = thigs
    filters.forEach(filter => {
      ret = ret.filter(filter)
    });
    return ret
  }

  filters.withId = function (things, id) {
    return things.find(function (thing) {
      return thing.id === id
    })
  }

  filters.pick = function(objects, attr) {
    return objects.map(o => o[attr])
  }

  filters.jsList = function(objects, attr) {
    return "[" + objects.map(o => "'" + o + "'") + "]"
  }

  /* ------------------------------------------------------------------
    caseListSettings FILTERS
  ------------------------------------------------------------------ */
  filters.caseFilters = function (caseListSettings, currentUser) {
    let filters = []
    if (caseListSettings.status) {
      filters.push(function (kase) {
        return caseListSettings.status.includes(kase.status)
      })
    }
    if (caseListSettings.assignee) {
      let allowedAssignees = []
      if (caseListSettings.assignee.includes("Me")) {
        allowedAssignees.push(currentUser)
      }
      if (caseListSettings.assignee.includes("other")) {
        allowedAssignees.push(caseListSettings["assignee-other"])
      }
      filters.push(function (kase) {
        return allowedAssignees.includes(kase.assignee)
      })
    }
    if (caseListSettings.q) {
      filters.push(function(kase) {
        return kase.match !== undefined
      })

      // TODO - this is a close-to working solution, but it doesn't search in related entities, so isn't quite good enough to implement atm
      //        if improved, though, it could complete replace the faked "match" stuff
      /*filters.push(function(kase) {
        const firstTerm = caseListSettings.q.split(" ")[0].toLowerCase()
        const results = []
        Object.keys(kase).forEach(function(key) {
          if (typeof kase[key] !== "string") return;
          const value = kase[key].toLowerCase()
          if (value.indexOf(firstTerm) !== -1) {
            results.push(["case", key, value.indexOf(firstTerm), firstTerm])
          }
        })
        return results.length > 0
      })*/
    }
    return filters
  }
  
  filters.caseSortAttr = function (caseListSettings) {
    switch (caseListSettings.sort) {
      case "latest": return "dateUpdated"
      case "oldest": return "dateUpdated"
      case "newest": return "dateCreated"
      default: return undefined
    }
  }

  filters.caseSortDir = function (caseListSettings) {
    // returns if the sort should be reversed
    switch (caseListSettings.sort) {
      case "latest": return true
      case "oldest": return false
      case "newest": return true
      default: return true
    }
  }
  
  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
