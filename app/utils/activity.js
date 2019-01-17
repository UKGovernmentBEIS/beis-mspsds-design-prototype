const today = require('./date').today
const activityTemplates = require("../data/activities/templates")

buildAddAttachment = function (attachment, user) {
    return activityTemplates.addAttachment({
      author:           user,
      title:            attachment.title,
      description:      attachment.description,
      isImage:          attachment.isImage,
      fileExtension:    attachment.fileExtension
    });
}

module.exports = {
    buildCreateCase: function (kase) {
        const caseCreatedActivity = activityTemplates.caseCreated;
        return caseCreatedActivity({
            caseType:               kase.report.type,
            caseTitle:              kase.title,
            author:                 kase.assignee,
            dateCreated:            kase.dateCreated,
            reporterName:           (kase.report.reporter) ? kase.report.reporter.name : "",
            reporterType:           (kase.report.reporter) ? kase.report.reporter.type : "",
            reporterPhoneNumber:    (kase.report.reporter) ? kase.report.reporter.phoneNumber : "",
            reporterEmailAddress:   (kase.report.reporter) ? kase.report.reporter.emailAddress : "",
            reporterOtherDetails:   (kase.report.reporter) ? kase.report.reporter.otherDetails : "",
            productType:            kase.report.productType,
            hazardType:             kase.report.hazardType,
            caseSummary:            kase.report.summary
        });
    },
    buildAddProduct: function (product, user) {
        const activityTemplate = activityTemplates.addProduct;
        return activityTemplate({
            author:             user,
            date:               today.long(),
            productName:        product.name,
            productType:        product.type,
            productCategory:    product.category,
            productCode:        product.code,
            productDescription: product.description,
            productImage:       product.posterImage
        });
    },
    buildAddBusiness: function (business, user) {
        const activityTemplate = activityTemplates.addBusiness;

        let bizName = '';
        if (business.name) {
            if (typeof business.name === 'string') {
                bizName = business.name;
            } else if (business.name.legal) {
                bizName = business.name.legal;
            } else if (business.name.trading) {
                bizName = business.name.trading;
            }
        }

        return activityTemplate({
            author:         user,
            date:           today.long(),
            businessName:           bizName,
            businessType:           business.type,
            businessAddress:        business.address,
            businessCompanyNumber:  business.companyNumber
        });   
    },
    buildAddAttachment: buildAddAttachment,
    buildChangeStatus : function(reqBody, user) {
        const changeStatusActivityTemplate = activityTemplates.changedStatus;
        return changeStatusActivityTemplate({
          status:       reqBody.status,
          description:  reqBody['status-description'],
          author:       user,
          date:         today.long()
        });
    }
}
