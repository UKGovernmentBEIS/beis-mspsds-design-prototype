// Blueprint
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
        otherDetails: '',
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
      hazard: {
        type: '',
        details: '',
        group: '',
        riskLevel: '',
        assessment: ''
      },
      incidents: [],
      products: [],
      businesses: [{id: 'b1', role: 'Manufacturer'}],
      contacts: [{id: 'c3', role: 'Reporter'}],
      attachments: [],
      related: [],
      activites: [],
      match: { // This is a hack to make some cases show up in test results
        key:  'Case reference', 
        value: "01<span class='highlight'>32-142</span>1"
      }
    }
*/
module.exports = {
  cases: [
    {
      // TODO Remove this case once case__empty.js page is no longer needed
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
      priority: "Not set",
      numAttachments: 0,
      products: [],
      activity: [],
      activites: [],
      dateCreated: '18/10/2018',
      dateUpdated: '18/10/2018'
    },
    {
      // TODO Remove this case once case__empty.js page is no longer needed
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
      priority: "High",
      numAttachments: 6,
      products: ["p1"],
      dateCreated: '18/10/2018',
      dateUpdated: '22/10/2018',
      hazard: {
        type: "Electric shock, fire",
        group: "Young children",
        description: "Travel adaptor available from high-street store Game has been reported to have caused a fire and severe electric shocks. Has been reported more than 10 times in the last 2 months.",
        riskLevel: "Serious"
      },
      activity: [
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
      match:  {
        key:  'Case reference',
        value: "01<span class='highlight'>32-142</span>1"
      },
      report: {
        type: 'Allegation',
        date: '18/10/2018',
        summary: 'Something happened',
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
      hazard: {
        type: 'Electric shock, fire hazard',
        details: 'Travel adaptor available from high-street store Game has been reported to have caused a fire and severe electric shocks. Has been reported more than 10 times in the last 2 months.',
        group: 'Young children',
        riskLevel: 'Serious',
        assessment: 'assessment.pdf'
      },
      incidents: [{
        id: 'i1',
        details: 'There was a fire',
        attachment: '',
      }],
      products: ['p1', 'p2'],
      businesses: [
        {
          id: 'b1',
          role: 'Manufacturer'
        },
        {
          id: 'b2',
          role: 'Importer'
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
      attachments: ['a1', 'a2'],
      related: [],
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
          html: '<p class="govuk-body"><a href="#">View details</a></p>'
        },
        {
          title: "Case created",
          action: ""
        }
      ]
    },
    {
      type: 'Case',
      status: 'Open',
      id: '1811-0802',
      title: 'Untitled case',
      assignee: 'Ed Smith-Muller',
      dateCreated: '18/10/2018',
      dateUpdated: '21/10/2018',
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Entrapment, Injuries hazard',
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
      hazard: {
        type: 'Choking hazard',
      },
      products: ['p6'],
      match:  {
        key:  'Assignee',
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
      hazard: {
        type: 'Suffocation hazard',
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
      hazard: {
        type: 'Electric shock hazard',
      },
      products: ['p9'],
    },
    {
      id: '1811-0795',
      type: 'Case',
      status: 'Open',
      products: ['p10'],
      hazard: {
        type: 'Electric shock hazard',
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
      hazard: {
        type: 'Chemical hazard',
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
      hazard: {
        type: 'Damage to sight hazard',
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
      hazard: {
        type: 'Chemical, Choking hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Poison hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Injuries hazard',
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
      hazard: {
        type: 'Entrapment, Injuries hazard',
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
      hazard: {
        type: 'Choking hazard',
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
      hazard: {
        type: 'Suffocation hazard',
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
      hazard: {
        type: 'Strangulation hazard',
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
      hazard: {
        type: 'Electric shock hazard',
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
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0770',
      type: 'Case',
      status: 'Open',
      products: ['p35'],
      hazard: {
        type: 'Chemical hazard',
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
      hazard: {
        type: 'Damage to sight hazard',
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
      hazard: {
        type: 'Damage to sight hazard',
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
      hazard: {
        type: 'Chemical, Choking hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Another title? Really?',
      },
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
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
      hazard: {
        type: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018',
      match:  {
        key:  'Product, model number',
        value: "Makita Pen, 1/4 x 18 mm, Stainless Steel, F <span class='highlight'>32142</span>"
      },
    },
    {
      id: '1811-0758',
      type: 'Question',
      status: 'Open',
      products: ['p47'],
      title: 'Has anyone recently advised on snap bracelets / slap warps? ',
      assignee: "Jan Mikolajczak",
      team: 'TSC',
      overdue: 'Overdue',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018'
    },
    {
      id: '1811-0757',
      type: 'Case',
      status: 'Closed',
      products: ['p48'],
      hazard: {
        type: 'Electric shock, fire hazard',
      },
      assignee: 'Christopher Hunter',
      dateUpdated: '16/10/2018',
      dateCreated: '18/10/2018',
      match:  {
        key:  'Product, manufacturer reference',
        value: "<span class='highlight'>32142</span>-USB-UCE6-90-BLA-D"
      }
    },
    {
      id: '1811-0756',
      type: 'Case',
      status: 'Open',
      products: ['p49'],
      hazard: {
        type: 'Electric shock, fire hazard',
      },
      assignee: 'Tim Harwood',
      team: 'Processing',
      dateUpdated: '16/10/2018',

      dateCreated: '18/10/2018'
    },
  ],
}