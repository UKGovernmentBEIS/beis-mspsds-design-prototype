const templates = require("./templates")

module.exports = {
  activities: [
    templates.commentAdded({
      commentText: "Needs addressing asap - we're nearly at the end of SLA",
      author: "Tim Harwood",
      date: "16 OCtober 2018"
    }),
    templates.correctiveAction({
      summary: "Product recall requested",
      productid: 'p1',
      businessid: 'b1',
      productName: "Charge Worx 931L",
      legislation: "General Product Safety Regulations 2005",
      businessName: "Charge Worx",
      date: "16 August 2018",
      decisionDate: "12/9/2018",
      attachement: "notice-of-enforcement.pdf",
      description: "Description supplied by user goes here, in a paragraph"
    }),
    templates.testFailed({
      legislation: "General Product Safety Regulations 2005",
      date: "10 October 2018",
      testDate: "12/9/2018",
      description: "Description supplied by user goes here, in a paragraph",
      productId: 'p1',
      attachment: "test-results.pdf"
    }),
    templates.testRequested({
      legislation: "General Product Safety Regulations 2005",
      date: "10 October 2018",
      testDate: "12/9/2018",
      description: "Description supplied by user goes here, in a paragraph",
      productId: 'p1',
      attachment: "test-request-form.pdf"
    }),
    templates.meeting({
      summary: "Discussion with Charge Worx brand ambassadors",
      correspondents: "Jeff Lebowski, Wilma Flintstone, Terry Crews",
      meetingDate: "2/9/2018",
      attachment: "transcript.doc",
      description: 'The Charge Worx brand ambassadors wanted to discuss the enforcement procedure with us, and assured us that... <a href="#">View more</a>'
    }),
    templates.email({
      summary: "Jacqui Simmons at Warwickshire TS responds",
      direction: "From",
      correspondentName: "Jacqui Simmons",
      correspondentEmailAddress: "jacqui.simmons@warwicks.gov.uk",
      subject: "RE: More details about Charge Worx case.html",
      emailDate: "12/9/2018",
      emailFile: "email.txt",
      attachment: "explosion_damage.jpg"
    }),
    templates.email({
      summary: "Asked Jacqui Simmons at Warwickshire TS for further details",
      direction: "To",
      correspondentName: "Jacqui Simmons",
      correspondentEmailAddress: "jacqui.simmons@warwicks.gov.uk",
      subject: "More details about Charge Worx case",
      emailDate: "12/9/2018",
      attachment: "not-a-virus.exe",
      description: `Hi Jacqui, Thanks again for contacting us about the problems with the Charge Worx travel adaptor. I have some... <a href="#">View more</a>`
    }),
    templates.phoneCall({
      summary: "Reporter asking for progress report",
      correspondentName: "Consumer",
      phoneNumber: "",
      phoneCallDate: "12/9/2018",
      transcript: "transcript.doc",
      description: `<p class="mspsds-parenthesis-text">Consumer contact details hidden to comply with GDPR legislation. Ask OPSS (who created this case) for contact details if needed.</p><p>Mina was wondering whether there was any update on the Charge Worx case. I assured her that we were looking into it... <a href="#">View more</a></p>`
    }),
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
    templates.caseCreated({
      caseType: "Allegation",
      productType: "Furniture & Furnishings",
      hazardType: "Entrapment",
      caseSummary: "Case summary details captured during report entry",
      reporterType: "Consumer",
      reporterName: "Mina Harker",
      reporterPhoneNumber: "07123 123123",
      reporterEmailAddress: "mina@castledracula.ro",
      reporterOtherDetails: "Other details captured during the report entry"
    })
  ]
}
