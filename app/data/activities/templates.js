const today = require("../../utils/date").today
const products = require("../products")
const attachments = require("../attachments")

module.exports = {
  deleteAttachment: function ({ attachmentId }) {
    const attachment = attachments.attachments.find(element => element.id === attachmentId)
    return {
      type: "deleteAttachment",
      title: "Deleted: " + attachment.title,
      action: `${capitalizeFirstLetter(attachment.type)} deleted`,
      fileExtension: attachments.fileExtension(attachment.filename),
      attachment
    }
  },


  addAttachment: function({
    title,
    description,
    author,
    date = today.long(),
    isImage = true,
    fileExtension
  }) {
    return {
      type: 'addAttachment',
      action: `${isImage ? 'Image' : 'Document'} added`,
      isImage,
      date,
      author,
      title,
      description,
      fileExtension
    }
  },


  addProduct: function({
    author,
    date = today.long(),
    productName,
    productType,
    productCategory,
    productCode,
    productDescription,
    productImage
  }) {
    return {
      type: 'addProduct',
      title: productName,
      action: "Product information added",
      date,
      author,
      productType,
      productCategory,
      productCode,
      productDescription,
      productImage
    }
  },


  addBusiness: function({
    author,
    date = today.long(),
    businessName,
    businessType,
    businessAddress,
    businessCompanyNumber
  }) {
    return {
      type: 'addBusiness',
      title: businessType + ': ' + businessName,
      action: "Business information added",
      date,
      author,
      businessName,
      businessType,
      businessAddress,
      businessCompanyNumber
    }
  },


  assigned: function (
    {
      assignee,
      author,
      date = today.long(),
      text
    }) {
    return {
      title: "Assigned to " + assignee,
      action: "Assigned",
      author: author,
      date: date,
      text: text
    }
  },


  caseCreated: function (
    {
      caseType,
      caseTitle,
      author,
      dateCreated,
      reporterName,
      reporterType,
      reporterPhoneNumber,
      reporterEmailAddress,
      reporterOtherDetails,
      productType,
      hazardType,
      caseSummary,
      attachments = []
    }) {
    return {
      type: 'caseCreated',
      title: caseType + " logged: " + caseTitle,
      action: "",
      author: author,
      date: dateCreated,
      caseType,
      reporterName,
      reporterType,
      reporterPhoneNumber,
      reporterEmailAddress,
      reporterOtherDetails,
      productType,
      hazardType,
      caseSummary,
      attachments
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


  commentAdded: function ({commentText, author, date}) {
    return {
      title: "Comment: " + author,
      hideName: true,
      action: "Comment added",
      date: date,
      text: commentText
    }
  },


  correctiveAction: function (
    {
      summary,
      businessId,
      productId,
      productName,
      legislation = "General Product Safety Regulations 2005",
      businessName,
      date = today.long(),
      decisionDate = today.short(),
      attachment = "notice-of-enforcement.pdf",
      description = "Description supplied by user goes here, in a paragraph"
    }) {
    return {
      type: 'correctiveAction',
      title: summary,
      action: "Corrective action recorded",
      date,
      productName,
      businessId,
      productId,
      legislation,
      businessName,
      decisionDate,
      attachment,
      description
    }
  },


  email: function({
    summary,
    direction,
    correspondentName,
    correspondentEmailAddress,
    subject,
    date = today.long(),
    emailDate = today.short(),
    emailFile,
    attachment,
    description
  }) {
    return {
      type: 'email',
      title: summary,
      action: "Email recorded",
      direction,
      correspondent: buildCorrespondent(correspondentName, correspondentEmailAddress),
      subject: buildEmailSubject(subject, emailFile),
      date,
      emailDate,
      attachment,
      description
    }
  },


  meeting: function({
    summary,
    correspondents,
    date = today.long(),
    meetingDate,
    attachment,
    description
  }) {
    return {
      type: "meeting",
      action: "Meeting recorded",
      title: summary,
      correspondents,
      date,
      meetingDate,
      attachment,
      description
    }
  },


  phoneCall: function({
    summary,
    correspondentName,
    phoneNumber,
    date = today.long(),
    phoneCallDate = today.short(),
    transcript,
    description
  }) {
    return {
      type: "phoneCall",
      title: summary,
      action: "Phone call recorded",
      correspondent: buildCorrespondent(correspondentName, phoneNumber),
      date,
      phoneCallDate,
      attachment: transcript,
      description
    }
  },

  testFailed: function (
    {
      legislation = "General Product Safety Regulations 2005",
      date = today.long(),
      testDate = today.short(),
      description = "Description supplied by user goes here, in a paragraph",
      productId,
      attachment = "test-results.pdf"
    },
    prod = products.products) {
    return Object.assign(commonTestTemplate(...arguments),{
      title: "Failed test: " + prod.find(e => e.id === productId).name,
      action: "Recorded"
    })
  },

  testPassed: function (
    {
      legislation = "General Product Safety Regulations 2005",
      date = today.long(),
      testDate = today.short(),
      description = "Description supplied by user goes here, in a paragraph",
      productId,
      attachment = "test-results.pdf"
    }, 
    prod = products.products,) {
    return Object.assign(commonTestTemplate(...arguments),{
      title: "Passed test: " + prod.find(e => e.id === productId).name,
      action: "Recorded"
    })
  },
  
  testRequested: function({
    legislation = "General Product Safety Regulations 2005",
    date = today.long(),
    testDate = today.short(),
    description = "Description supplied by user goes here, in a paragraph",
    productId,
    attachment = "test-results.pdf"
  }) {
    return Object.assign(commonTestTemplate(...arguments),{
      title: "Test requested: " + products.products.find(e => e.id === productId).name,
      action: "Test requested",
    })
  }


}




const commonTestTemplate = function ({
  legislation = "General Product Safety Regulations 2005",
  date = today.long(),
  testDate = today.short(),
  description = "Description supplied by user goes here, in a paragraph",
  productId,
  attachment = "test-results.pdf"
}) {
  return {
    type: "test",
    legislation,
    date,
    testDate,
    description,
    productId,
    attachment
  }
}

function buildCorrespondent(name, detail) {
  output = ""
  if (name && name.length > 0) {
    output += `<span class="govuk-!-font-weight-bold">${name}</span>`
    if (detail && detail.length > 0) {
      output += ` (${detail})`
    }
  } else if (detail && detail.length > 0) {
    output += detail
  }
  return output
}

function buildEmailSubject(subject, file) {
  preTag = file ? `<a href="#">` :  `<span class="govuk-!-font-weight-bold">`
  postTag = file ? `</a>` : `</span>`
  return `${preTag}${subject}${postTag}`
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1)
}
