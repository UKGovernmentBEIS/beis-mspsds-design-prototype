const today = require("../../utils/today")
const products = require("../products")

// templates listed in alphabetical order
module.exports = {
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
      action: "Attachment added",
      isImage,
      date,
      author,
      title,
      description,
      fileExtension
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
  caseCreated: function () {
    return {
      title: "Case created",
      action: ""
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
      type: 'correctiveAction',
      title: summary,
      action: "Corrective action recorded",
      date,
      productName,
      legislation,
      businessName,
      decisionDate,
      attachement,
      description,
      productid,
      businessid,
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
      correspondent: buildEmailCorrespondent(correspondentName, correspondentEmailAddress),
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
  testFailed: function ({
    legislation = "General Product Safety Regulations 2005",
    date = today.long(),
    testDate = today.short(),
    description = "Description supplied by user goes here, in a paragraph",
    productId,
    attachment = "test-results.pdf"
  }) {
    return Object.assign(commonTestTemplate(...arguments),{
      title: "Failed test: " + products.products.find(e => e.id === productId).name,
      action: "Test failure recorded"
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

function buildEmailCorrespondent(name, email) {
  output = ""
  if (name && name.length > 0) {
    output += `<span class="govuk-!-font-weight-bold">${name}</span>`
    if (email && email.length > 0) {
      output += ` (${email})`
    }
  } else if (email && email.length > 0) {
    output += email
  }
  return output
}

function buildEmailSubject(subject, file) {
  preTag = file ? `<a href="#">` :  `<span class="govuk-!-font-weight-bold">`
  postTag = file ? `</a>` : `</span>`
  return `${preTag}${subject}${postTag}`
}