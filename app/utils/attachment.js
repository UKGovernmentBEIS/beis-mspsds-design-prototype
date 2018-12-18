const today = require("./date").today;
const array = require("./arrayHelpers");
const Activities = require("./activity");

const isImage = (filename) => {
  return !!filename.match(/[\/.](gif|jpg|jpeg|tiff|png)$/i);
}


const fileExtension = (filename) => {
  const fullStopIdx = filename.lastIndexOf(".")
  return filename.substring(fullStopIdx + 1)
}


const build = ({
  title,
  filename = "",
  date = today.short(),
  description
}) => {
  const id    = filename + Math.random()
  const type  = isImage(filename) ? 'image' : 'document'
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


const findObject = (data) => {
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


const beginningUrl = (data) => {
  switch (data.currentPage) {
    case 'business':
      return '/root/business?businessid=' + data.businessid
    case 'case':
      return '/root/case--confirmation?caseid=' + data.caseid
    case 'product':
      return '/root/product?productid=' + data.productid
    default:
  }
}

const shouldReturn404 = (data) => {
  return !(data.currentPage === 'case' || data.currentPage === 'business' || data.currentPage === 'product')
}

const addAttachment = (data) => {
  let newAttachment = data.attachment;
  const obj = findObject(data);
  newAttachment.id = 'at' + (data.attachments.length + 1);
  obj.attachments.push(newAttachment.id);
  data.attachments.push(newAttachment);

  if (data.currentPage === 'case') {
    const newActivity = Activities.buildAddAttachment(newAttachment, data.currentUser);
    obj.activities.unshift(newActivity);
  }
}

const deleteAttachment = (data) => {
  const obj = findObject(data);
  if (obj) {
    obj.attachments = array.removeByValue(obj.attachments, data.attachmentid);
  }
}

const editAttachment = (data) => {
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
  isImage: isImage,
  fileExtension: fileExtension,
  build: build,
  addAttachment: addAttachment,
  deleteAttachment: deleteAttachment,
  editAttachment: editAttachment,
  beginningUrl: beginningUrl,
  buildTsCreateAttachments: buildTsCreateAttachments, 
  shouldReturn404: shouldReturn404,
}