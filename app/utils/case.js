const today = require('./date').today
const dateFactory = require('./date').date.shortFromInput
const Activities = require("./activity");
const Products = require("./product")
const Attachments = require("./attachment");

let lastCaseNumber = 18110802
const giveNextId = () => {
  prettyId = lastCaseNumber.toString().substring(0, 4) + '-' + lastCaseNumber.toString().substring(4, 8)
  lastCaseNumber = lastCaseNumber - 1
  return prettyId;
}

const addDefaults = (kase) => {
  const requiredListProperties = [
    'products',
    'businesses',
    'contacts',
    'attachments',
    'related',
    'activities',
  ]
  requiredListProperties.forEach(property => {
    if (kase[property] === undefined) { kase[property] = [] }
  })
  if (kase.title === undefined) { kase.title = 'Undefined' }
  if (kase.status === undefined) { kase.status = 'Open' }
  if (kase.visible === undefined) { kase.visible = true }
  return kase
}

const buildDefaultWithDifferences = (nonDefaultFields) => {
  const reporterData = nonDefaultFields.report && nonDefaultFields.report.reporter
  const reporter = reporterData ? {
    type: reporterData.type,
    name: reporterData.name,
    phoneNumber: reporterData.phoneNumber,
    emailAddress: reporterData.emailAddress,
    otherDetails: reporterData.otherDetails
  } : null;

  const reportData = nonDefaultFields.report;
  const report = reportData ? {
    type: reportData.type,
    date: reportData.date,
    summary: reportData.summary,
    productType: reportData.productType,
    hazardType: reportData.hazardType,
    reporter: reporter
  } : null;

  return addDefaults({
    id: nonDefaultFields.id || giveNextId(),
    type: nonDefaultFields.type || 'Case',
    assignee: nonDefaultFields.assignee || 'Tim Harwood',
    team: nonDefaultFields.team || '',
    overdue: nonDefaultFields.overdue,
    dateUpdated: nonDefaultFields.dateUpdated,
    dateCreated: nonDefaultFields.dateCreated,
    report: report,
    match: nonDefaultFields.match || null
  })
}

const setDateArguments = (daysApart, nonDefaultFields) => {
  nonDefaultFields.dateCreated = dateFactory(2018, 10, 18);
  nonDefaultFields.dateUpdated = dateFactory(2018, 10, 18 + daysApart);
  return nonDefaultFields;
}

const setHazardArguments = (hazard, nonDefaultFields) => {
  nonDefaultFields.report = { hazardType: hazard };
  return nonDefaultFields;
}

const buildFromData = (data) => {
  let newCase = data.new;
  addDefaults(newCase);
  newCase.dateCreated = today.short();
  newCase.dateUpdated = today.short();
  newCase.report.date = today.short();
  newCase.id = today.id();
  switch (newCase.report.type) {
    case "Allegation":    newCase.type = "Case"; break;
    case "Report":        newCase.type = "Case"; break;
    case "Question":      newCase.type = "Question"; break;
    case "Investigation": newCase.type = "Investigation"; break;
    default:              newCase.type = "Case";
  }
  if (!newCase.assignee) { newCase.assignee = data.currentUser; }
  if (!newCase.creator) { newCase.creator = data.currentUser; }
  if (newCase.type == "Case") { newCase.title = newCase.report.productType + " - " + newCase.report.hazardType; }
  return newCase;
}

const addCreatedActivity = (newCase) => {
  let activity = Activities.buildCreateCase(newCase);
  newCase.activities.unshift(activity);
} 

const addAttachments = (data, newCase) => {
  const files = Attachments.buildTsCreateAttachments(data);
  if(files.length === 0){ return }
  newCase.attachments.unshift(...files.map(f => f.id));
  newCase.activities[0].attachments.unshift(...files);
  data.attachments.push(...files);
}

const addProduct = (data, newCase) => {
  if(!data.new.report.product){ return }
  let product = Products.buildFromData(data);
  data.products.push(product);
  newCase.products.unshift(product.id);
  const addProductActivity = Activities.buildAddProduct(product, data.currentUser);
  newCase.activities.unshift(addProductActivity);
}

const addCase = (data) => {
  let newCase = buildFromData(data);
  data.cases.push(newCase);
  addCreatedActivity(newCase);
  addAttachments(data, newCase);
  addProduct(data, newCase);
  return newCase;
}

module.exports = {
  buildFromData: buildFromData, 
  buildDefaultWithDifferences: buildDefaultWithDifferences,
  setDateArguments: setDateArguments,
  setHazardArguments: setHazardArguments,
  addCase: addCase,
  addDefaults: addDefaults,
}