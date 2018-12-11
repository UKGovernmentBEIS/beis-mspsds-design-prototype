const today = require('./date').today

module.exports = {
    buildCreateCase: function (kase) {
        const caseCreatedActivity = require("../data/activities/templates").caseCreated;
        return caseCreatedActivity({
            caseType: kase.report.type,
            caseTitle: kase.title,
            author: kase.assignee,
            dateCreated: kase.dateCreated,
            reporterName: kase.report.reporter.name,
            reporterType: kase.report.reporter.type,
            reporterPhoneNumber: kase.report.reporter.phoneNumber,
            reporterEmailAddress: kase.report.reporter.emailAddress,
            reporterOtherDetails: kase.report.reporter.otherDetails,
            productType: kase.report.productType,
            hazardType: kase.report.hazardType,
            caseSummary: kase.report.summary
        });   
    },
    buildAddProduct: function (product, user) {
        const activityTemplate = require("../data/activities/templates").addProduct;
        return activityTemplate({
            author: user,
            date: today.long(),
            productName: product.name,
            productType: product.type,
            productCategory: product.category,
            productCode: product.code,
            productDescription: product.description,
            productImage: product.posterImage
        });   
    },
    buildAddAttachment: function (attachment, user) {
        const Attachments = require("./attachment")
        const addAttachmentActivityTemplate = require("../data/activities/templates").addAttachment;
        return addAttachmentActivityTemplate({
          author: user,
          title: attachment.title,
          description: attachment.description,  
          isImage: Attachments.isImage(attachment.upload),
          fileExtension: Attachments.fileExtension(attachment.upload)
        });
    },
    buildChangeStatus : function(reqBody, user) {
        const changeStatusActivityTemplate = require("../data/activities/templates").changedStatus;
        return changeStatusActivityTemplate({
          status: reqBody.status,
          description: reqBody['status-description'],
          author: user,
          date: today.long()
        });
    }
}