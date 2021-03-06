/* jshint esversion: 6 */


const today = require("./date").today;
const array = require("./arrayHelpers");
const Activities = require("./activity");
const attachments = require("../data/attachments");

build = ({
  title,
  filename = "",
  date = today.short(),
  description
}) => {
  const id    = filename + Math.random()
  const type  = attachments.isImage(filename) ? 'image' : 'document'
  const url   = type === 'image' ? '/public/images/placeholder.png' : '/public/images/document-thumbnail.png'
  return {
    id,
    title,
    filename,
    date,
    type,
    description,
    thumbnail: url,
    url
  }
}


findObject = (data) => {
  switch (data.currentPage) {
    case 'business':
      return array.findById(data.businesses, data.businessid);
    case 'case':
      return array.findById(data.cases, data.caseid);
    case 'product':
      return array.findById(data.products, data.productid);
    default:
      console.log("data.currentPage not set to appropriate value in flows/attachment/save route");
  }
}


beginningUrl = (data) => {
  switch (data.currentPage) {
    case 'business':
      return '/root/business?businessid=' + data.businessid;
    case 'case':
      return '/root/case--confirmation?caseid=' + data.caseid;
    case 'product':
      return '/root/product?productid=' + data.productid;
    default:
  }
};

shouldReturn404 = (data) => {
  return !(data.currentPage === 'case' || data.currentPage === 'business' || data.currentPage === 'product');
};

addAttachment = (data) => {

  let newAttachment = data.attachment;
  const obj = findObject(data);
  
  addAttachmentToObj(data, newAttachment, obj);

};

addAttachmentToObj = (data, att, obj) => {

  let newAttachment = att;

  newAttachment.id = 'at' + (data.attachments.length + 1);
  obj.attachments.unshift(newAttachment.id);
  data.attachments.push(newAttachment);

  if (data.currentPage === 'case') {
    const newActivity = Activities.buildAddAttachment(newAttachment, data.currentUser);
    obj.activities.unshift(newActivity);
  }
};


deleteAttachment = (data) => {
  const obj = findObject(data);
  if (obj) {
    obj.attachments = array.removeByValue(obj.attachments, data.attachmentid);
  }
}

editAttachment = (data) => {
  let newAttachment = data.attachment;
  newAttachment.id = data.attachmentid;
  newAttachment.date = today.short();

  const att = array.findById(data.attachments, data.attachmentid);
  if (att) {
    for (var k in att) {
      att[k] = newAttachment[k];
    }
  }
}

buildTsCreateAttachments = (data) => {
  let attachments = [];
  let files = data.new.report.files || [];

   Object.entries(files).forEach(
    ([_, attachmentType]) => {
        Object.entries(attachmentType).forEach(
          ([_, attachment]) => {
              attachments.push( build(attachment) );
          }
        );
    }
  );

  return attachments;
}


oldBuildTsCreateAttachments = (data) => {
  const testFile = build({
    title: "Test Results",
    filename: data.new.files.testing.upload
  });
  const riskFile = build({
    title: "Risk Assessment",
    filename: data.new.files.risk.upload
  });
  const relatedFile = build({
    title: "Related Attachment",
    filename: data.new.files.related.upload
  });
  const productFile = build({
    title: "Product Attachment",
    filename: data.new.files.product.upload
  });
  const evidenceFile = build({
    title: "Evidence Attachment",
    filename: data.new.files.evidence.upload
  });
  return [testFile, riskFile, productFile, evidenceFile,  relatedFile].filter(file => file.filename.length > 0)
}

module.exports = {
  build: build,
  addAttachment: addAttachment,
  addAttachmentToObj: addAttachmentToObj,
  deleteAttachment: deleteAttachment,
  editAttachment: editAttachment,
  beginningUrl: beginningUrl,
  buildTsCreateAttachments: buildTsCreateAttachments, 
  shouldReturn404: shouldReturn404,
}