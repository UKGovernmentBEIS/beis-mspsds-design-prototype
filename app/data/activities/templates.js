const today = require("../../utils/today")
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
