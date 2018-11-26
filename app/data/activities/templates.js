module.exports = {
  correctiveAction: function (params) {
    let data = {
      summary: "Product recall requested",
      productid: "p1",
      businessid: "b1",
      productName: "Charge Worx 931L",
      legislation: "General Product Safety Regulations 2005",
      businessName: "Charge Worx",
      date: "12/9/2018",
      attachement: "notice-of-enforcement.pdf",
      description: "Description supplied by user goes here, in a paragraph",
      ...params
    }
    return {
      title: data.summary,
      action: "Corrective action recorded",
      html: `
      <p class="govuk-body">
        Product: <span class="govuk-!-font-weight-bold">${data.productName}</span><br />
        Legislation: <span class="govuk-!-font-weight-bold">${data.legislation}</span><br />
        Business responsible: <span class="govuk-!-font-weight-bold">${data.businessName}</span><br />
        Date decided: <span class="govuk-!-font-weight-bold">${data.date}</span><br />
        Attached: <a href="#">${data.attachement}</a>
      </p>
      <p class="govuk-body">${data.description}</p>
      <a href="/root/product?productid=${data.productid}" class="mspsds-block-link">View product</a>
      <a href="/root/business?businessid=${data.businessid}" class="mspsds-block-link">View business</a>`
    }
  },
  assigned: function (params) {
    return {
      title: "Assigned to " + params.assignee,
      action: "Assigned",
      author: params.author,
      date: params.date
    }
  },
  changedStatus: function (params) {
    return {
      title: params.status == "Open" ? "Reopened" : "Resolved",
      author: params.author,
      date: params.date,
      text: params.description
    }
  },
  caseCreated: function () {
    return {
      title: "Case created",
      action: ""
    }
  }
}