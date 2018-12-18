const today = require('./date').today;
const dateFactory = require('./date').date.shortFromInput;
const Activities = require("./activity");
const ActivityTemplates = require("../data/activities/templates");
const array = require("./arrayHelpers");
const Products = require("./product")
const Businesses = require("./business")
const Attachments = require("./attachment");

// Creation from initial files
let lastCaseNumber = 18110802
giveNextId = () => {
  prettyId = lastCaseNumber.toString().substring(0, 4) + '-' + lastCaseNumber.toString().substring(4, 8)
  lastCaseNumber = lastCaseNumber - 1
  return prettyId;
}

buildDefaultWithDifferences = (nonDefaultFields) => {
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

  return {
    id: nonDefaultFields.id || giveNextId(),
    type: nonDefaultFields.type || 'Case',
    status: nonDefaultFields.status || 'Open',
    title: nonDefaultFields.title || 'Undefined',
    visible: nonDefaultFields.visible || true,
    assignee: nonDefaultFields.assignee || 'Tim Harwood',
    team: nonDefaultFields.team || '',
    overdue: nonDefaultFields.overdue,
    dateUpdated: nonDefaultFields.dateUpdated,
    dateCreated: nonDefaultFields.dateCreated,
    report: report,
    products: nonDefaultFields.products || [],
    businesses: nonDefaultFields.businesses || [],
    contacts: nonDefaultFields.contacts || [],
    activities: nonDefaultFields.activities || [],
    attachments: nonDefaultFields.attachments || [],
    related: nonDefaultFields.related || [],
    match: nonDefaultFields.match || null
  }
}

setDateArguments = (daysApart, nonDefaultFields) => {
  nonDefaultFields.dateCreated = dateFactory(2018, 10, 18);
  nonDefaultFields.dateUpdated = dateFactory(2018, 10, 18 + daysApart);
  return nonDefaultFields;
}

setHazardArguments = (hazard, nonDefaultFields) => {
  nonDefaultFields.report = {
    hazardType: hazard
  };
  return nonDefaultFields;
}

// Creation or change from flows
buildFromData = (data) => {
  let newCase = data.new;
  addDefaults(newCase);
  newCase.dateCreated = today.short();
  newCase.dateUpdated = today.short();
  if (newCase.report) {
    newCase.report.date = today.short();
  }

  newCase.id = today.id();
  switch (newCase.report.type) {
    case "Allegation":
      newCase.type = "Case";
      break;
    case "Report":
      newCase.type = "Case";
      break;
    case "Question":
      newCase.type = "Question";
      break;
    case "Investigation":
      newCase.type = "Investigation";
      break;
    default:
      newCase.type = "Case";
  }
  if (!newCase.assignee) {
    newCase.assignee = data.currentUser;
  }
  if (!newCase.creator) {
    newCase.creator = data.currentUser;
  }
  if (newCase.type == "Case") {
    newCase.title = newCase.report.productType + " - " + newCase.report.hazardType;
  }
  return newCase;
}

addCreatedActivity = (newCase) => {
  const activity = Activities.buildCreateCase(newCase);
  newCase.activities.unshift(activity);
}

addAttachments = (data, kase) => {
  const files = Attachments.buildTsCreateAttachments(data);
  if (files.length === 0) {
    return
  }
  kase.attachments.unshift(...files.map(f => f.id));
  kase.activities[0].attachments.unshift(...files);
  data.attachments.push(...files);
  kase.dateUpdated = today.short();
}

addProduct = (data, kase) => {
  if (!data.new.report.product) {
    return
  }
  const product = Products.buildFromData(data);
  data.products.push(product);
  kase.products.unshift(product.id);
  const addProductActivity = Activities.buildAddProduct(product, data.currentUser);
  kase.activities.unshift(addProductActivity);
  kase.dateUpdated = today.short();
}


addBusiness = (data, kase) => {
  if (!data.new.report.business) {
    return
  }
  const business = Businesses.buildFromData(data);
  data.businesses.push(business);

  kase.businesses.unshift({
    id: business.id,
    role: business.type
  });
  const addBusinessActivity = Activities.buildAddBusiness(business, data.currentUser);
  kase.activities.unshift(addBusinessActivity);
  kase.dateUpdated = today.short();
}

addDefaults = (kase) => {
  const requiredListProperties = [
    'products',
    'businesses',
    'contacts',
    'attachments',
    'related',
    'activities',
  ]
  requiredListProperties.forEach(property => {
    if (kase[property] === undefined) {
      kase[property] = []
    }
  })
  if (kase.title === undefined) {
    kase.title = 'Undefined'
  }
  if (kase.status === undefined) {
    kase.status = 'Open'
  }
  if (kase.visible === undefined) {
    kase.visible = true
  }
  return kase
}

addCase = (data) => {
  const newCase = buildFromData(data);
  data.cases.push(newCase);
  addCreatedActivity(newCase);
  addAttachments(data, newCase);
  addProduct(data, newCase);
  addBusiness(data, newCase);
  return newCase;
}

assignCase = (data, newAssignee) => {
  const kase = array.findById(data.cases, data.caseid);
  newAssignee = newAssignee === "Other" ? req.body["other-assignee"] : newAssignee;

  const newActivity = ActivityTemplates.assigned({
    assignee: newAssignee,
    author: data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.assignee = newAssignee;
  kase.activities.unshift(newActivity);
}

changeStatus = (data, body) => {
  const kase = array.findById(data.cases, data.caseid);
  const newActivity = Activities.buildChangeStatus(body, data.currentUser);

  kase.dateUpdated = today.short();
  kase.status = body.status;
  kase.activities.unshift(newActivity);
}

changeVisibility = (data, visibility) => {
  const kase = array.findById(data.cases, data.caseid);
  kase.dateUpdated = today.short();
  kase.visible = visibility === 'true';
}

addComment = (data) => {
  const kase = array.findById(data.cases, data.caseid);
  const newActivity = ActivityTemplates.commentAdded({
    commentText: data['new-comment'],
    author: data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.activities.unshift(newActivity);
}

addCorrectiveAction = (data) => {
  const kase = array.findById(data.cases, data.caseid);
  const newActivity = ActivityTemplates.correctiveAction({
    summary: data['corrective-action-summary'],
    productName: data['TODO-product-input-name'],
    legislation: data['input-autocomplete'],
    businessName: data['TODO-business-input-name'],
    decisionDate: date.shortFromInput(data["corrective-action-date-year"], data['corrective-action-date-month'], data['corrective-action-date-day']),
    attachment: data['corrective-action-file-upload-1'],
    description: data['corrective-action-details']
  });

  kase.activities.unshift(newActivity);
  kase.updated = today.short();
}

// Search

findMatches = (kase, q, data) => {
  const firstTerm = q.split(" ")[0].toLowerCase()
  let results = []
  results = results.concat(findMatchesInObject({ ...kase, label: kase.type}, firstTerm))
  if(kase.report){
    results = results.concat(findMatchesInObject({ ...kase.report, label: "Report" }, firstTerm))
  }
  if(kase.report && kase.report.reporter){
    results = results.concat(findMatchesInObject({ ...kase.report.reporter, label: "Reporter" }, firstTerm))
  }
  if(kase.products.length > 0){
    kase.products.forEach((productId) => {
      let product = array.findById(data.products, productId)
      results = results.concat(findMatchesInObject({ ...product, label: "Product" }, firstTerm))
    })
  }
  if(kase.businesses.length > 0){
    kase.businesses.forEach((businessReference) => {
      let business = array.findById(data.businesses, businessReference.id)
      results = results.concat(findMatchesInObject({ ...business, label: "Business" }, firstTerm))
    })
  }
  console.log(results)
  return results;
}

findMatchesInObject = (object, query) =>{
  let results = []
  Object.keys(object).forEach(function (key) {
    if (typeof object[key] !== "string") return [];
    const value = object[key].toLowerCase()
    if (value.indexOf(query) !== -1) {
      // TODO: Cut out long unhighlighted text
      const highlight = "<span class='highlight'>" + query + "</span>"
      const highlightedText = value.replace(new RegExp(query, 'g'), highlight)
      const highlightLabel = object.label.toString() + " " + key.toString()
      results.push({label: highlightLabel, text: highlightedText})
    }
  })
  return results;
}

module.exports = {
  buildFromData: buildFromData,
  buildDefaultWithDifferences: buildDefaultWithDifferences,
  setDateArguments: setDateArguments,
  setHazardArguments: setHazardArguments,
  addCase: addCase,
  assignCase: assignCase,
  addDefaults: addDefaults,
  addProduct: addProduct,
  addAttachments: addAttachments,
  changeStatus: changeStatus,
  changeVisibility: changeVisibility,
  addComment: addComment,
  addCorrectiveAction: addCorrectiveAction,
  findMatches: findMatches,
}