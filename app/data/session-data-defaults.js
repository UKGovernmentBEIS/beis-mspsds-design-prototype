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
  currentTeam:   'OPSS - Processing',

  signedIn:       'No',

  alwaysDisplayCrumbs: 'No', 

  debugging:     'No',

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

  tsCaseListSettings: {
    sort: "latest",
    creator: ["Me"],
    status: ["Open"]
  },

  confirmation: {},

  createUrl: "/root/flows/create/01",
  createUrl: "/pages/flows/create-new",

  cases:          require("./cases.js").cases,
  products:       require("./products.js").products,
  businesses:     require("./businesses.js").businesses,
  contacts:       require("./contacts.js").contacts,
  locations:      require("./locations.js").locations,
  users:          require("./users.js").users,
  attachments:    require("./attachments.js").attachments,

  productTypes:   require("./product-types.js").productTypes,
  hazardTypes:    require("./hazard-types.js").hazardTypes,
  businessTypes:  require("./business-types").businessTypes,

  teams:          require("./teams.js").teams,
  legislation:    require("./legislation.js").legislation,

  fileTypes:      require("./file-types").fileTypes,
  questionTypes:  require("./question-types").questionTypes,

  tradingStandardsOrganisations:  require("./trading-standards-orgs").tradingStandardsOrganisations,

  teamPermissions: [
    { 
      teamName: "OPSS - processing",
      permissionsLevel: "admin"
    },
    { 
      teamName: "Birmingham Council",
      permissionsLevel: "view-full"
    },
    { 
      teamName: "The Office of Product Safety and Standards",
      permissionsLevel: "view-full"
    }
  ],

  defaultTaskListSections: {
    summary: {
      title: 'Title and summary',
      url: 'title-and-summary',
      isRequired: true,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    categories: {
      title: 'Relevant legislation',
      url: 'relevant-legislation',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    products: {
      title: 'Product identification',
      url: 'product/index',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    hazards: {
      title: 'Hazard and risk details',
      url: 'hazards-and-risks',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    businesses: {
      title: 'Businesses involved',
      url: 'business/index',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    testResults: {
      title: 'Test results',
      url: 'test-result/index',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: 'Can’t start yet',
        prerequisiteText: 'Add product details first'
      }
    },
    caseHistory: {
      title: 'Case history',
      url: 'case-history/index',
      isRequired: false,
      hideInTaskList: false,
      _extra: 'Including incidents',
      status: {
        isComplete: false,
        text: '',
      }
    },
    filesAndAttachments: {
      title: 'Files and attachments',
      url: 'files-and-attachments',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    source: {
      title: 'Reporter’s details',
      url: 'reporter/index',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    settings: {
      title: 'Metadata and settings',
      url: 'metadata-and-settings',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: '',
      }
    },
    nextSteps: {
      title: 'Next steps',
      url: 'escalate-case',
      isRequired: false,
      hideInTaskList: true,
      status: {
        isComplete: false,
        text: '',
      }
    },
    caseName: {
      title: 'Case naming',
      url: 'title',
      isRequired: false,
      hideInTaskList: false,
      status: {
        isComplete: false,
        text: 'Can’t start yet',
        prerequisiteText: 'Add product and hazard details first'
      }
    }
  },


  defaultSections: {
    reportProductIssue: {
      "part0": [],
      "part1": [
        'categories',
        'products',
        'hazards',
        'caseHistory'
      ],
      "part2": [
        "businesses",
        "testResults",
        "filesAndAttachments",
        "source",
      ],
      "part3": [
        "caseName",
        "settings"
      ]
    },
    shareTestResults: {
      "part0": [],
      "part1": [
        'summary',
        'categories',
        'products',
        'testResults'
      ],
      "part2": [
        'caseHistory',
        "businesses",
        "filesAndAttachments",
        "source",
      ],
      "part3": [
        "settings"
      ]
    },
    enquiry: {
      "part0": [],
      "part1": [
        'summary',
        'categories',  
        "source"  
      ],
      "part2": [
        'products',
        'hazards',
        'caseHistory',
        "businesses",
        "testResults",
        "filesAndAttachments"
      ],
      "part3": [
        "settings"
      ]
    },
    project: {
      "part0": [],
      "part1": [
        'summary'
      ],
      "part2": [
        'categories',
        'products',
        'hazards',
        'caseHistory',
        "businesses",
        "testResults",
        "filesAndAttachments",
        "source"
      ],
      "part3": [
        "settings"
      ]
    },
  },

  reportNames: {
    enquiry: "Make an enquiry",
    report: "Make a report",
    project: "Create a project",
    allegation: "Make an allegation"
  },
  
  new: {
    files: {
      testing: {},
      risk: {},
      related: {},
      product: {},
      evidence: {},
    }
  }
};
