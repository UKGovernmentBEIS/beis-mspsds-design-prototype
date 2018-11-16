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
  
  cases: [
    {
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
      priority: "Not set",
      numAttachments: 0,
      products: [],
      activites: []
    },
    {
      id: "1810-0001",
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
      priority: "High",
      numAttachments: 6,
      products: [{
        todo: "add prodct details here instead of displaying a standard product panel"
      }],
      hazard: {
        hazardType: "Electric shock, fire",
        hazardTo:   "Young children",
        hazardDescription: "Travel adaptor available from high-street store Game has been reported to have caused a fire and severe electric shocks. Has been reported more than 10 times in the last 2 months.",
        riskLevel: "Serious"
      },
      activites: [
        {
          title: "Comment: Tim Harwood",
          hideName: true,
          action: "",
          text: "Needs addressing asap - we're nearly at the end of SLA"
        },
        {
          title: "Product recall requested",
          action: "Corrective action recorded",
          html: `
            <p class="govuk-body">
              Product: <span class="govuk-!-font-weight-bold">Charge Worx 931L</span><br />
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Business responsible: <span class="govuk-!-font-weight-bold">Charge Worx</span><br />
              Date decided: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">notice-of-enforcement.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a><a href="/product" class="mspsds-block-link">View business</a>`
        },
        {
          title: "Failed test: Travel plug adaptor — Charge Worx 931L",
          action: "Test failure recorded",
          html: `
            <p class="govuk-body">
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Test date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">test-results.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a>`
        },
        {
          title: "Test requested: Travel plug adaptor — Charge Worx 931L",
          action: "Testing requested",
          html: `
            <p class="govuk-body">
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Date requested: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">test-request-form.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a>`
        },
        {
          title: "Discussion with Charge Worx brand ambassadors",
          action: "Meeting recorded",
          html: `
            <p class="govuk-body">
              Meeting with: <span class="govuk-!-font-weight-bold">Jeff Lebowski, Wilma Flintstone, Terry Crews</span><br />
              Date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">transcript.doc</a>
            </p>
            <p class="govuk-body">The Charge Worx brand ambassadors wanted to discuss the enforcement procedure with us, and assured us that... <a href="#">View more</a></p>`
        },
        {
          title: "Jacqui Simmons at Warwickshire TS responds",
          action: "Email recorded",
          html: `
            <p class="govuk-body">
              From: <span class="govuk-!-font-weight-bold">Jacqui Simmons</span> (jacqui.simmons@warwicks.gov.uk)<br />
              Date sent: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Email: <a href="#">RE: More details about Charge Worx case.html</a><br />
              Attached: <a href="#">explosion_damage.jpg</a>
            </p>`
        },
        {
          title: "Asked Jacqui Simmons at Warwickshire TS for further details",
          action: "Email recorded",
          html: `
            <p class="govuk-body">
              To: <span class="govuk-!-font-weight-bold">Jacqui Simmons</span> (jacqui.simmons@warwicks.gov.uk)<br />
              Subject: <span class="govuk-!-font-weight-bold">More details about Charge Worx case</span><br />
              Date sent: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">not-a-virus.exe</a>
            </p>
            <p class="govuk-body">Hi Jacqui, Thanks again for contacting us about the problems with the Charge Worx travel adaptor. I have some... <a href="#">View more</a></p>`
        },
        {
          title: "Reporter asking for progress report",
          action: "Phonecall recorded",
          html: `
            <p class="govuk-body">
              Call with: <span class="govuk-!-font-weight-bold">Mina Harker</span> (07123 123123)<br />
              Date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">transcript.doc</a>
            </p>
            <p class="govuk-body">Mina was wondering whether there was any update on the Charge Worx case. I assured her that we were looking into it... <a href="#">View more</a></p>`
        },
        {
          title: "Deleted: Photo ID",
          action: "Image deleted",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "Updated: Photo ID (was: picture of product in situ)",
          action: "Image details updated",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "picture of product in situ",
          action: "Image added",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "Deleted: Investigation report",
          action: "Document deleted",
          html: `
            <p class="govuk-body">New document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Updated: Investigation report (was: Investigation details)",
          action: "Document details updated",
          html: `
            <p class="govuk-body">New document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Investigation details",
          action: "Document added",
          html: `
            <p class="govuk-body">Document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Removed: Travel plug adaptor — Charge Worx 931L",
          action: "Product removed",
          html: `
            <a href="/product" class="mspsds-block-link">View product details</a>`
        },
        {
          title: "Travel plug adaptor — Charge Worx 931L",
          action: "Product added",
          html: `
            <a href="/product" class="mspsds-block-link">View product details</a>`
        },
        {
          title: "Tesco PLC",
          action: "Business added",
          html: `
            <p class="govuk-body">Role: <span class="govuk-!-font-weight-bold">Distributor</span></p>
            <a href="/business" class="mspsds-block-link">View business details</a>`
        },
        {
          title: "Case Reopened",
          action: "",
          text: "Rationale comment goes here"
        },
        {
          title: "Case Closed",
          action: "",
          text: "Rationale comment goes here"
        },
        {
          title: "Assigned to Nick Golding",
          action: "Assigned"
        },
        {
          title: "Laceration injury",
          action: "Incident added",
          html: `
          <p class="govuk-body">Incident description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p class="govuk-body">
            Occurred: <span class="govuk-!-font-weight-bold">24/9/2018</span><br />
            Affected party: <span class="govuk-!-font-weight-bold">36-year old woman</span><br />
            Location: <span class="govuk-!-font-weight-bold">Rotherham</span>
          </p>
          <p class="govuk-body"><a href="#">View risk assessment document</a></p>`
        },
        {
          title: "Danger of electric shock",
          action: "Hazard added",
          text: "Hazard description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Danger of electric shock",
          action: "Hazard added",
          html: `
            <p class="govuk-body">Hazard description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="govuk-body">
              Risk level: <span class="govuk-!-font-weight-bold">Medium</span><br />
              Vulnerable group: <span class="govuk-!-font-weight-bold">Young children</span>
            </p>
            <p class="govuk-body"><a href="#">View risk assessment document</a></p>`
        },
        {
          title: "Priority: High",
          action: "Set",
          text: `Have flagged as priority due to consumer injuries and potential risks of the product`
        },
        {
          title: "Consumer report",
          action: "Report details added",
          html: `
            <p class="govuk-body">
              Name: <span class="govuk-!-font-weight-bold">Mina Harker</span><br />
              Phone number: <span class="govuk-!-font-weight-bold">07123 123123</span><br />
              Email address: <span class="govuk-!-font-weight-bold">mina@castledracula.ro</span>
            </p>
            <p class="govuk-body">Other details captured during the report entry</p>`
        }
      ]
    
    },







    {
        type:         'Case',
        status:         'Open',
        id:             '1811-0803',
        title:          'ChargeWorx adaptor, Electric shock, fire hazard',
        assignee:       'Tim Harwood',
        dateCreated:    '18/10/2018',


        reporter: {
          type:         "Consumer",
          name:         "Mina Harker",
          phoneNumber:  "07123 123123",
          emailAddress: "mina@castledracula.ro",
          otherDetails: "Other details captured during the report entry"
        },
        

        report: {
          type:         'Allegation',
          date:         '18/10/2018',
          summary:      'Something happened',
          otherDetails: 'Other details captured during the report entry',

          reporter: {
            type:         "Consumer",
            name:         "Mina Harker",
            phoneNumber:  "07123 123123",
            emailAddress: "mina@castledracula.ro",
            otherDetails: "Other details captured during the report entry"
          },

          correspondence: {
              type:       'Email',
              subject:    '',
              body:       '',
              attachment:               '',
              attachmentDescription:    ''
          }
        },


        hazard:     {
          type:       'Electric shock, fire hazard',
          details:    'Travel adaptor available from high-street store Game has been reported to have caused a fire and severe electric shocks. Has been reported more than 10 times in the last 2 months.',
          group:      'Young children',
          riskLevel:    'Serious',
          assessment:   'assessment.pdf'
        },


        incidents:     [{
          id:         'i1',
          details:    'There was a fire',
          attachment: '',
        }],
        

        products:     ['p1', 'p2'],

        businesses:   [
          {
            id:   'b1',
            role:     'Manufacturer'
          },
          {
            id:   'b2',
            role:     'Importer'
          }
        ],
        
        contacts:     [
          {
            id:   'c3',
            role: 'Reporter'
          },
          {
            id:   'c1',
            role: 'Manufacturer'
          },
          {
            id:   'c2',
            role: 'Importer'
          }
        ],

        numAttachments: 1,
        attachments:  ['a1', 'a2'],

        related:    [],
        

        activites: [
        {
          title: "Comment: Tim Harwood",
          hideName: true,
          action: "",
          text: "Needs addressing asap - we're nearly at the end of SLA"
        },
        {
          title: "Product recall requested",
          action: "Corrective action recorded",
          html: `
            <p class="govuk-body">
              Product: <span class="govuk-!-font-weight-bold">Charge Worx 931L</span><br />
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Business responsible: <span class="govuk-!-font-weight-bold">Charge Worx</span><br />
              Date decided: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">notice-of-enforcement.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a><a href="/product" class="mspsds-block-link">View business</a>`
        },
        {
          title: "Failed test: Travel plug adaptor — Charge Worx 931L",
          action: "Test failure recorded",
          html: `
            <p class="govuk-body">
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Test date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">test-results.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a>`
        },
        {
          title: "Test requested: Travel plug adaptor — Charge Worx 931L",
          action: "Testing requested",
          html: `
            <p class="govuk-body">
              Legislation: <span class="govuk-!-font-weight-bold">General Product Safety Regulations 2005</span><br />
              Date requested: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">test-request-form.pdf</a>
            </p>
            <p class="govuk-body">Description supplied by user goes here, in a paragraph</p>
            <a href="/product" class="mspsds-block-link">View product</a>`
        },
        {
          title: "Discussion with Charge Worx brand ambassadors",
          action: "Meeting recorded",
          html: `
            <p class="govuk-body">
              Meeting with: <span class="govuk-!-font-weight-bold">Jeff Lebowski, Wilma Flintstone, Terry Crews</span><br />
              Date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">transcript.doc</a>
            </p>
            <p class="govuk-body">The Charge Worx brand ambassadors wanted to discuss the enforcement procedure with us, and assured us that... <a href="#">View more</a></p>`
        },
        {
          title: "Jacqui Simmons at Warwickshire TS responds",
          action: "Email recorded",
          html: `
            <p class="govuk-body">
              From: <span class="govuk-!-font-weight-bold">Jacqui Simmons</span> (jacqui.simmons@warwicks.gov.uk)<br />
              Date sent: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Email: <a href="#">RE: More details about Charge Worx case.html</a><br />
              Attached: <a href="#">explosion_damage.jpg</a>
            </p>`
        },
        {
          title: "Asked Jacqui Simmons at Warwickshire TS for further details",
          action: "Email recorded",
          html: `
            <p class="govuk-body">
              To: <span class="govuk-!-font-weight-bold">Jacqui Simmons</span> (jacqui.simmons@warwicks.gov.uk)<br />
              Subject: <span class="govuk-!-font-weight-bold">More details about Charge Worx case</span><br />
              Date sent: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">not-a-virus.exe</a>
            </p>
            <p class="govuk-body">Hi Jacqui, Thanks again for contacting us about the problems with the Charge Worx travel adaptor. I have some... <a href="#">View more</a></p>`
        },
        {
          title: "Reporter asking for progress report",
          action: "Phonecall recorded",
          html: `
            <p class="govuk-body">
              Call with: <span class="govuk-!-font-weight-bold">Mina Harker</span> (07123 123123)<br />
              Date: <span class="govuk-!-font-weight-bold">12/9/2018</span><br />
              Attached: <a href="#">transcript.doc</a>
            </p>
            <p class="govuk-body">Mina was wondering whether there was any update on the Charge Worx case. I assured her that we were looking into it... <a href="#">View more</a></p>`
        },
        {
          title: "Deleted: Photo ID",
          action: "Image deleted",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "Updated: Photo ID (was: picture of product in situ)",
          action: "Image details updated",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "picture of product in situ",
          action: "Image added",
          html: `
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <img src="public/images/placeholder.png" style="cursor:pointer" title="click to view full size" />
              </div>
              <div class="govuk-grid-column-two-thirds">
                <p class="govuk-body">Image description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>`
        },
        {
          title: "Deleted: Investigation report",
          action: "Document deleted",
          html: `
            <p class="govuk-body">New document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Updated: Investigation report (was: Investigation details)",
          action: "Document details updated",
          html: `
            <p class="govuk-body">New document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Investigation details",
          action: "Document added",
          html: `
            <p class="govuk-body">Document description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <a href="#">View PDF document</a>`
        },
        {
          title: "Removed: Travel plug adaptor — Charge Worx 931L",
          action: "Product removed",
          html: `
            <a href="/product" class="mspsds-block-link">View product details</a>`
        },
        {
          title: "Travel plug adaptor — Charge Worx 931L",
          action: "Product added",
          html: `
            <a href="/product" class="mspsds-block-link">View product details</a>`
        },
        {
          title: "Tesco PLC",
          action: "Business added",
          html: `
            <p class="govuk-body">Role: <span class="govuk-!-font-weight-bold">Distributor</span></p>
            <a href="/business" class="mspsds-block-link">View business details</a>`
        },
        {
          title: "Case Reopened",
          action: "",
          text: "Rationale comment goes here"
        },
        {
          title: "Case Closed",
          action: "",
          text: "Rationale comment goes here"
        },
        {
          title: "Assigned to Nick Golding",
          action: "Assigned"
        },
        {
          title: "Laceration injury",
          action: "Incident added",
          html: `
          <p class="govuk-body">Incident description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p class="govuk-body">
            Occurred: <span class="govuk-!-font-weight-bold">24/9/2018</span><br />
            Affected party: <span class="govuk-!-font-weight-bold">36-year old woman</span><br />
            Location: <span class="govuk-!-font-weight-bold">Rotherham</span>
          </p>
          <p class="govuk-body"><a href="#">View risk assessment document</a></p>`
        },
        {
          title: "Danger of electric shock",
          action: "Hazard added",
          text: "Hazard description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Danger of electric shock",
          action: "Hazard added",
          html: `
            <p class="govuk-body">Hazard description lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="govuk-body">
              Risk level: <span class="govuk-!-font-weight-bold">Medium</span><br />
              Vulnerable group: <span class="govuk-!-font-weight-bold">Young children</span>
            </p>
            <p class="govuk-body"><a href="#">View risk assessment document</a></p>`
        },
        {
          title: "Priority: High",
          action: "Set",
          text: `Have flagged as priority due to consumer injuries and potential risks of the product`
        },
        {
          title: "Consumer report",
          action: "Report details added",
          html: `
            <p class="govuk-body">
              Name: <span class="govuk-!-font-weight-bold">Mina Harker</span><br />
              Phone number: <span class="govuk-!-font-weight-bold">07123 123123</span><br />
              Email address: <span class="govuk-!-font-weight-bold">mina@castledracula.ro</span>
            </p>
            <p class="govuk-body">Other details captured during the report entry</p>`
        },
        {
          title: "Consumer report",
          action: "Report details added",
          html:   '<p class="govuk-body"><a href="#">View details</a></p>'
        },
        {
          title: "Case created",
          action: ""
        }
      ]

    }

  ],





  products: [

  	{
        id:              'p1',
        name:            'Travel plug adaptor — Charge Worx 931L',
        posterImage:     '/public/images/charge-worx.jpg',
        brand:           'Charge Worx',
        modelName:       'International Travel Adaptor',
        modelNumber:     '931L',
        description:     'Universal travel USB plug adaptor with surge protector',
        type:            'Travel adaptor',
        category:        'Electrical equipment',
        barcode:         '12345678911234',
        productNumber:   '123123131',
        origin:          'China',
        manufacturer:    'b1',
        dateOnMarket:    '10/10/2008',


        businesses:   [
          {
            business:   'b1',
            role:     'Manufacturer'
          },
          {
            business:   'b2',
            role:     'Importer'
          }
        ],

        attachments:  ['a1', 'a2'],
        related:    [],
        activity:     []
    },

    {
        id:              'p2',
        name:            'Travel plug adaptor — Charge Worx 931L',
        posterImage:     '/public/images/charge-worx.jpg',
        brand:           'Charge Worx',
        modelName:       'International Travel Adaptor',
        modelNumber:     '960L',
        description:     'Universal travel USB plug adaptor with surge protector',
        type:            'Travel adaptor',
        category:        'Electrical equipment',
        barcode:         '12345678911234',
        productNumber:   '123123131',
        origin:          'China',
        manufacturer:    'b1',
        dateOnMarket:    '10/10/2008',


        businesses:   [
          {
            business:   'b1',
            role:     'Manufacturer'
          },
          {
            business:   'b2',
            role:     'Importer'
          }
        ],

        attachments:  ['a1', 'a2'],
        related:    [],
        activity:     []
    },

    {
      	id:     		'p3',
      	name: 			'Another adaptor'
    }

  ],

  businesses: [

  	{
  		id: 			'b1',
  		name: 		'ChargeWorx'
  	},

  	{
  		id: 			'b2',
      name:                   'Wonderlite Ltd.',
      address:                '48 Bush Road, London N1 1XQ',
      contact:                'Paul Jones, 0207 1234 5678, paul.jones@abc.np',
      primaryAuthority:       'Suffolk Trading Standards'
  	}

  ],

  contacts: [

    {
      id:       'c1',
      name:     'Paul Jones',
      title:    'Head of Product',
      phone:    '0207 1234 5678',
      email:    'paul.jones@abc.np',
    },

    {
      id:       'c2',
      name:     'Gemma Wilkinson',
      title:    'Head of Procurement',
      phone:    '',
      email:    'gemma.wilkinson@abc.np',
    },

    {
      id:       'c3',
      name:     'Mina Harker',
      title:    '',
      phone:    '07123 123123',
      email:    'mina@castledracula.ro',
    }

  ]

};
