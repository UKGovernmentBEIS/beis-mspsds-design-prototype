const Cases = require("../utils/case")
// Blueprint
// There's a map at the bottom of the file which adds empty lists for
// all properites which expect it if not present
/*
    {
      type: 'Case',
      status: 'Open',
      id: '1811-xxxx',
      title: 'Untitled case',
      assignee: '',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      report: {
        type: 'Allegation',
        date: '18/10/2018',
        summary: '',
        productType: 'Toy',
        hazardType: 'Electric shock',
        reporter: {
          type: "Consumer",
          name: "",
          phoneNumber: "",
          emailAddress: "",
          otherDetails: ""
        },
        correspondence: {
          type: 'Email',
          subject: '',
          body: '',
          attachment: '',
          attachmentDescription: ''
        }
      },
      products: [],
      businesses: [{id: 'b1', role: 'Manufacturer'}],
      contacts: [{id: 'c3', role: 'Reporter'}],
      attachments: [],
      related: [],
      activities: [],
      match: { // This is a hack to make some cases show up in test results
        key:  'Case reference',
        value: "01<span class='highlight'>32-142</span>1"
      }
    }
*/
module.exports = {
  cases: [
    {
      id: '1811-0758',
      type: 'Question',
      status: 'Open',
      products: ['p47'],
      title: 'Has anyone recently advised on snap bracelets / slap wraps?',
      assignee: "Tim Harwood",
      team: 'TSC',
      overdue: 'Overdue',
      dateUpdated: '21/10/2018',
      dateCreated: '18/10/2018',
      report: {
        type: 'Allegation',
        date: '18/10/2018',
        summary: `PCC Plymotion are looking to run some road safety awareness aimed at cyclists. One product they are considering handing out to raise awareness are snap bracelets / slap warps. These are hi viz plastic coated lengths of metal and if you tap them onto your arm they wrap around.We have previously advised not to supply these as there have been safety issues with the edges of the metal being sharp and cutting through the plastic outer and injuring users.
        Their website lists a number of authorities that they provide with promotional material. Red Zulu have provided a test certificate dated 06 September 2005 (12 years ago) to show that the snap bracelet has been tested against parts of EN71. The report states the item is NOT a toy but has passed the tests applied to it.
        The Supplier has also provided advice details of communication with TS. Plymotion have only provided an extract of this advice which is that:
        “My view is a bracelet handed out as part of an overall promotional road safety package cannot meet the reflective requirements for PPE. As such you would presumably argue that you therefore do not supply it as PPE, it is merely one of various items intended to promote the message that reflective clothing and other items increase safety. The product is not ‘intended to make the wearer stand out’. As the product is not considered PPE it does not need a CE Mark.
        As regards the Toy Safety requirements there are many items which at first sight do not appear to be toys but which are, through reason of their design, intended use, packaging, logos etc. There is nothing in what you have told me that makes me consider this would be classed as a toy, although ultimately the decision about this, and what to do as regards testing, is for you. Again, not being a toy it would not require a CE Mark.”
        I have asked for the full version of this advice.
        I can accept an argument that they may not be PPE but I struggle to see an argument that they are not toys if they are being given to children. What else are they? If the snap bracelets / slap warps are only given to adults I would suggest that they would be caught by GPSR and appropriately marked as not suitable for children and not to be used as PPE.`,
        productType: 'Toy',
        hazardType: '',
        reporter: {
          type: "Consumer",
          name: "Jenny Patterson",
          phoneNumber: "",
          emailAddress: "",
          otherDetails: ""
        },
      },
      businesses: [{id: 'b3', role: 'Manufacturer'}],
      contacts: [
        {
          id: 'c1',
          role: 'Main contact'
        },
        {
          id: 'c2',
          role: 'Head of procurement'
        }
      ],
      activities: require("./activities/1811-0758").activities,
      attachments: ['at1', 'at2'],
      // the below properties have not been set for this case
      // related: [],
      // match: { // This is a hack to make some cases show up in test results
      //   key:  'Case reference',
      //   value: "01<span class='highlight'>32-142</span>1"
      // }
    },

    {
      // EMPTY CASE
      type: 'Case',
      id: "1810-0000",
      title: "Untitled case",
      reporter: {},
      status: "Open",
      assignee: "Tim Harwood",
      creator:  "Tim Harwood",
      numAttachments: 0,
      products: [],
      activities: [],
      dateCreated: '18/10/2018',
      dateUpdated: '18/10/2018'
    },
    {
      type: 'Case',
      id: "1810-0001",
      title: "Untitled case",
      reporter: {
        name: "Mina Harker",
        type: "Consumer",
        phoneNumber: "07123 123123",
        emailAddress: "mina@castledracula.ro",
        otherDetails: "Other details captured during the report entry"
      },
      status: "Open",
      assignee: "Tim Harwood",
      numAttachments: 0,
      products: [],
      activities: [],
      dateCreated: '18/10/2018',
      dateUpdated: '18/10/2018'
    },
    {
      id: "1810-0002",
      type: "Question",
      title: "Charge Worx, Travel plug adaptor –Electric shock, fire hazard",
      reporter: {
        name: "Mina Harker",
        type: "Consumer",
        phoneNumber: "07123 123123",
        emailAddress: "mina@castledracula.ro",
        otherDetails: "Other details captured during the report entry"
      },
      status: "Open",
      assignee: "Nick Golding",
      creator:  "Tim Harwood",
      numAttachments: 6,
      products: ["p1"],
      dateCreated: '18/10/2018',
      dateUpdated: '22/10/2018',
      activities: require("./activities/1810-0002").activities
    },
    {
      type: 'Case',
      status: 'Open',
      id: '0132-1421',
      title: 'ChargeWorx adaptor, Electric shock, fire hazard',
      assignee: 'Tim Harwood',
      dateCreated: '18/10/2018',
      dateUpdated: '22/10/2018',
      reporter: {
        type: "Consumer",
        name: "Mina Harker",
        phoneNumber: "07123 123123",
        emailAddress: "mina@castledracula.ro",
        otherDetails: "Other details captured during the report entry"
      },
      match: {
        key: 'Case reference',
        value: "01<span class='highlight'>32-142</span>1"
      },
      report: {
        type: 'Allegation',
        date: '18/10/2018',
        summary: 'Something happened',
        productType: 'Toy',
        hazardType: 'Electric shock',
        otherDetails: 'Other details captured during the report entry',
        reporter: {
          type: "Consumer",
          name: "Mina Harker",
          phoneNumber: "07123 123123",
          emailAddress: "mina@castledracula.ro",
          otherDetails: "Other details captured during the report entry"
        },
        correspondence: {
          type: 'Email',
          subject: '',
          body: '',
          attachment: '',
          attachmentDescription: ''
        }
      },
      products: ['p1', 'p2'],
      businesses: [
        {
          id: 'b1',
          role: 'Manufacturer – Charge Worx, International Travel Adaptor 931L'
        },
        {
          id: 'b2',
          role: 'Importer – Charge Worx, International Travel Adaptor 931L'
        }
      ],
      contacts: [
        {
          id: 'c3',
          role: 'Reporter'
        },
        {
          id: 'c1',
          role: 'Manufacturer'
        },
        {
          id: 'c2',
          role: 'Importer'
        }
      ],
      numAttachments: 1,
      attachments: ['at1', 'at2'],
      related: [],
      activities: require("./activities/0132-1421.js").activities
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0802',
      title: 'Untitled case',
      assignee: 'Ed Smith-Muller',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      products: ['p2'],
    },
    {
      type: 'Question',
      status: 'Open',
      id: '1811-0801',
      title: "Shouldn't this be categorised as a toy?",
      assignee: 'Tim Harwood',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      products: ['p4'],
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0800',
      assignee: 'Tim Harwood',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      report: {
        hazardType: 'Entrapment, Injuries hazard',
      },
      products: ['p5'],
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0799',
      assignee: 'Nick Golding',
      dateCreated: '18/10/2018',
      dateUpdated: '20/10/2018',
      report: {
        hazardType: 'Choking hazard',
      },
      products: ['p6'],
      match: {
        key: 'Assignee',
        value: "<span class='highlight'>Nick</span> Golding – <span class='highlight'>nick</span>.golding@softwire.com"
      },
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0798',
      assignee: 'Christopher Hunter',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      report: {
        hazardType: 'Suffocation hazard',
      },
      products: ['p7'],
    },
    {
      type: 'Question',
      status: 'Open',
      id: '1811-0797',
      assignee: 'Amanda Farrell',
      title: 'Has anyone successfully located the importer for these?',
      dateCreated: '18/10/2018',
      dateUpdated: '20/10/2018',
      products: ['p8'],
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0796',
      assignee: 'Ed Smith-Muller',
      title: 'Has anyone successfully located the importer for these?',
      dateCreated: '18/10/2018',
      dateUpdated: '20/10/2018',
      report: {
        hazardType: 'Electric shock hazard',
      },
      products: ['p9'],
    },
    {
      id: '1811-0795',
      type: 'Case',
      status: 'Open',
      products: ['p10'],
      report: {
        hazardType: 'Electric shock hazard',
      },
      assignee: 'Nick Golding',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '20/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0794',
      type: 'Case',
      status: 'Open',
      products: ['p11'],
      report: {
        hazardType: 'Chemical hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '20/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0793',
      type: 'Question',
      status: 'Open',
      products: ['p12'],
      title: 'What legislation applies to importing these?',
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0792',
      type: 'Case',
      status: 'Open',
      products: ['p13'],
      report: {
        hazardType: 'Damage to sight hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0791',
      type: 'Case',
      status: 'Open',
      products: ['p14'],
      report: {
        hazardType: 'Chemical, Choking hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0790',
      type: 'Case',
      status: 'Open',
      products: ['p15'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Garry Oldboy',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0789',
      type: 'Question',
      status: 'Open',
      products: ['p16'],
      title: 'Haven\'t these been recalled already?',
      assignee: 'Adebola Showemimo',
      team: 'TSC',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0788',
      type: 'Case',
      status: 'Open',
      products: ['p17'],
      report: {
        hazardType: 'Poison hazard',
      },
      assignee: 'Tim Harwood',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0787',
      type: 'Case',
      status: 'Closed',
      products: ['p18'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Nick Golding',
      team: 'Processing',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0786',
      type: 'Question',
      status: 'Closed',
      products: ['p19'],
      title: 'Can anyone think of another title?',
      assignee: 'Adebola Showemimo',
      team: 'TSC',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0785',
      type: 'Case',
      status: 'Open',
      products: ['p20'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      dateUpdated: '19/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0784',
      type: 'Case',
      status: 'Open',
      products: ['p21'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0783',
      type: 'Case',
      status: 'Closed',
      products: ['p22'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0782',
      type: 'Case',
      status: 'Open',
      products: ['p23'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Nick Golding',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0781',
      type: 'Case',
      status: 'Closed',
      products: ['p24'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0780',
      type: 'Case',
      status: 'Open',
      products: ['p25'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0779',
      type: 'Case',
      status: 'Open',
      products: ['p26'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0778',
      type: 'Question',
      status: 'Open',
      products: ['p27'],
      title: 'What legislation should I be testing under?',
      assignee: 'Adebola Showemimo',
      team: 'TSC',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0777',
      type: 'Case',
      status: 'Open',
      products: ['p28'],
      report: {
        hazardType: 'Injuries hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0776',
      type: 'Case',
      status: 'Open',
      products: ['p29'],
      report: {
        hazardType: 'Entrapment, Injuries hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0775',
      type: 'Case',
      status: 'Open',
      products: ['p30'],
      report: {
        hazardType: 'Choking hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0774',
      type: 'Case',
      status: 'Open',
      products: ['p31'],
      report: {
        hazardType: 'Suffocation hazard',
      },
      assignee: 'Nick Golding',
      team: 'Processing',
      dateUpdated: '18/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0773',
      type: 'Case',
      status: 'Open',
      products: ['p32'],
      report: {
        hazardType: 'Strangulation hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0772',
      type: 'Case',
      status: 'Open',
      products: ['p33'],
      report: {
        hazardType: 'Electric shock hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0771',
      type: 'Question',
      status: 'Open',
      products: ['p34'],
      title: 'Toys (Safety) Regulations -can you plead guilty in absence?',
      assignee: 'Nick Golding',
      team: 'TSC',
      overdue: 'Overdue',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018',
      report: {
        summary: `I am about to serve summons on a toy safety issue, which is something we have not done for a while. I have established that these are Summary only offences, via S12(5) CPA and time limit is 12 months (reg 56). So, question is, can the defendant enter a plea of guilty in absence, hence requiring relevant pape work for such a plea to be served?
        Section 12 Magistrates Courts Act 1980 seems to say a plea of guilty can be made in absence, but my logic circuits question how someone can plead guilty by letter to an offence with a possible prison sentence.
        I can't find anything in the Criminal Procedure Rules which assists.`
      }
    },
    {
      id: '1811-0770',
      type: 'Case',
      status: 'Open',
      products: ['p35'],
      report: {
        hazardType: 'Chemical hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0769',
      type: 'Case',
      status: 'Open',
      products: ['p36'],
      report: {
        hazardType: 'Damage to sight hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0768',
      type: 'Case',
      status: 'Open',
      products: ['p37'],
      report: {
        hazardType: 'Damage to sight hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0767',
      type: 'Case',
      status: 'Open',
      products: ['p38'],
      report: {
        hazardType: 'Chemical, Choking hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      overdue: 'Overdue',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0766',
      type: 'Case',
      status: 'Open',
      products: ['p39'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Nick Golding',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0765',
      type: 'Case',
      status: 'Open',
      products: ['p40'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0764',
      type: 'Case',
      status: 'Open',
      products: ['p41'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0763',
      type: 'Question',
      status: 'Closed',
      products: ['p42'],
      assignee: 'Amanda Farrell',
      team: 'TSC',
      dateUpdated: '17/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0762',
      type: 'Case',
      status: 'Closed',
      products: ['p43'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0761',
      type: 'Case',
      status: 'Open',
      products: ['p44'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Christopher Hunter',
      team: 'Processing',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0760',
      type: 'Case',
      status: 'Open',
      products: ['p45'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Ed Smith-Muller',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0759',
      type: 'Case',
      status: 'Open',
      products: ['p46'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018',
      match: {
        key: 'Product, model number',
        value: "Makita Pen, 1/4 x 18 mm, Stainless Steel, F <span class='highlight'>32142</span>"
      },
    },
    {
      id: '1811-0757',
      type: 'Case',
      status: 'Closed',
      products: ['p48'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Christopher Hunter',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018',
      match: {
        key: 'Product, manufacturer reference',
        value: "<span class='highlight'>32142</span>-USB-UCE6-90-BLA-D"
      }
    },
    {
      id: '1811-0756',
      type: 'Case',
      status: 'Open',
      products: ['p49'],
      report: {
        hazardType: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '16/10/2018',

      dateCreated: '18/10/2018'
    },
  ].map(Cases.addDefaults),
}
