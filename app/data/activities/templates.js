const today = require("../../utils/today")
module.exports = {
  correctiveAction: function (
    {
      summary,
      productid,
      businessid,
      productName,
      legislation = "General Product Safety Regulations 2005",
      businessName,
      date = today.long(),
      decisionDate = today.short(),
      attachement = "notice-of-enforcement.pdf",
      description = "Description supplied by user goes here, in a paragraph"
    }) {
    return {
      title: summary,
      action: "Corrective action recorded",
      date: date,
      html: `
      <p class="govuk-body">
        Product: <span class="govuk-!-font-weight-bold">${productName}</span><br />
        Legislation: <span class="govuk-!-font-weight-bold">${legislation}</span><br />
        Business responsible: <span class="govuk-!-font-weight-bold">${businessName}</span><br />
        Date decided: <span class="govuk-!-font-weight-bold">${decisionDate}</span><br />
        Attached: <a href="#attachments">${attachement}</a>
      </p>
      <p class="govuk-body">${description}</p>
      <a href="/root/product?productid=${productid}" class="mspsds-block-link">View product</a>
      <a href="/root/business?businessid=${businessid}" class="mspsds-block-link">View business</a>`
    }
  },
  assigned: function (
    {
      assignee,
      author,
      date = today.long()
    }) {
    return {
      title: "Assigned to " + assignee,
      action: "Assigned",
      author: author,
      date: date
    }
  },
  changedStatus: function ({
    status = "Closed",
    author,
    date = today.long(),
    description = undefined,
  }) {
    return {
      title: status == "Open" ? "Reopened" : "Resolved",
      author: author,
      date: date,
      text: description
    }
  },
  caseCreated: function () {
    return {
      title: "Case created",
      action: ""
    }
  }
}