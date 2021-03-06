/* jshint esversion: 6 */

const express     = require('express');
const router      = express.Router();
const Cases       = require("./utils/case");
const array       = require("./utils/arrayHelpers");
const Businesses  = require("./utils/business")
const Attachments = require("./utils/attachment");
const Reset       = require("./utils/reset");
const moment = require("moment");

const dateFilters = require("./filters/dates").filters

var _ = require('lodash');

// Catch-all for redirecting to the correct mode - MUST BE LAST ROUTE ADDED
router.all("/root/*", function (req, res) {
  const mode = req.session.data.mode;
  const rest = req.path.substring(6);
  const route = `/${mode}/${rest}`;
  res.redirect(route);
});

router.all("/:mode(pages|spec|test|old)/*", function (req, res, next) {
  res.locals.data.mode = req.params.mode
  next();
});

// PAGES ----------------------------------------------------------------------

// Some flows are shared between entities, so they need to know which entity has
// launched them.
router.get('/:mode/:entity(case|business|product|case-list)/', function (req, res, next) {
  res.locals.data.currentPage = req.params.entity;
  next();
});


// EMAIL TEST
router.post('/pages/email-test', function (req, res, next) {
  var NotifyClient = require('notifications-node-client').NotifyClient;
  var notifyClient = new NotifyClient("YOUR_NOTIFY_KEY_HERE");
  var email = req.session.data.email;

  var templateId =
    email.type == "close" ? "b7a910e6-fb73-402b-bd26-f54ef1a298d9" :
    email.type == "reassign" ? "4edab54d-d947-4d57-b4b3-3c25bea98838" :
    email.type == "single" ? "c72e8ea5-fb39-464a-aefc-1fad5c163e6d" :
    "b09640e2-2dfa-45b4-afa8-692ce6eadcfd";
  var emailAddress = "YOUR_EMAIL_ADDRESS_HERE";
  var reference = "reference";

  var action_subject = email.action_subject;
  var action_body = email.action_body;
  var action_context = email.action_context;
  var change_details = email.change_details;

  var personalisation = {
    case_id: "1234-6578",
    updater_name: "Tim Harwood",
    name: "Nick",
    case_title: "Problem with lighters",
    status_change: "closed",
    new_assignee: "Ed Horsford (Bolton TS)",
    investigation_url: "https://google.com",
    action_subject: action_subject,
    action_body: action_body,
    action_context: action_context,
    change_details: change_details
  }

  notifyClient.sendEmail(templateId, emailAddress, {
    personalisation: personalisation,
    reference: reference
  })
  .then(response => console.log(response))
  .catch(err => console.error(err));

  next();
});


// FLOWS ----------------------------------------------------------------------
router.post('/:mode/flows/ts-create/product-details', function (req, res, next) {
  Reset.resetNew(req);
  next();
});

router.post('/:mode/flows/ts-create/business-details', function (req, res, next) {
  const data = req.session.data;
  var noneOfAbove = data['new']['report']['business']['typeNone']
  if (noneOfAbove == 'None'){
    res.redirect("/pages/flows/ts-create/previous-corrective-action")
  }
  else {
    next();
  }
});

router.post('/:mode/flows/ts-create/save', function (req, res) {
  const data = req.session.data;
  newCase = Cases.addCase(data);

  Reset.resetNew(req);
  res.redirect('/root/case--created?caseid=' + newCase.id);
});

router.post('/:mode/flows/create/issue-type', function (req, res) {
  let issueType = req.session.data.new['report']['type'];
  let nextPage = (issueType == "Project") ? "04" : "02";
  res.redirect('/root/flows/create/' + nextPage);
});

router.post('/:mode/flows/create/save', function (req, res) {
  const data = req.session.data;
  newCase = Cases.addCase(data);
  Reset.resetNew(req);
  res.redirect('/root/case--created?caseid=' + newCase.id);
});

// Assign flow
router.post('/:mode/flows/assign/save', function (req, res) {
  const data = req.session.data;
  const newAssignee = req.session.data.assignee;
  const assignmentComment = req.session.data['assignment-comment'];
  Cases.assignCase(data, newAssignee, assignmentComment);
  res.redirect('/root/case--confirmation?confirmation=Case%20assigned');
});


// Add product flow
router.post('/:mode/flows/product/add', function (req, res) {
  const data = req.session.data;
  const kase = array.findById(data.cases, data.caseid);
  Cases.addProduct(data, kase)
  res.redirect('/root/case--confirmation?confirmation=Product%20added#products');
});



// Location flow
router.post('/:mode/flows/location/save', function (req, res) {
  const data = req.session.data;
  Businesses.addLocation(data);
  const targetURL = '/root/business?businessid=' + data.businessid + '#locations'
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});

router.post('/:mode/flows/location/delete', function (req, res) {
  const data = req.session.data;
  Businesses.deleteLocation(data);
  const targetURL = '/root/business?businessid=' + data.businessid + '#locations'
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});

router.post('/:mode/flows/location/update', function (req, res) {
  const data = req.session.data;
  Businesses.updateLocation(data);
  const targetURL = '/root/business?businessid=' + data.businessid + '#locations'
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});



// Contact flow
router.post('/:mode/flows/contact/save', function (req, res) {
  const data = req.session.data;
  Businesses.addContact(data);

  Reset.resetConfirmation(req);
  data.confirmation.id    = 'contact-saved';
  data.confirmation.type  = 'success';
  data.confirmation.title = 'Contact added.';


  const targetURL = '/root/business--confirmation?businessid=' + data.businessid + '#contacts';
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});

router.post('/:mode/flows/contact/delete', function (req, res) {
  const data = req.session.data;
  Businesses.deleteContact(data);


  Reset.resetConfirmation(req);
  data.confirmation.id    = 'contact-removed';
  data.confirmation.type  = 'success';
  data.confirmation.title = 'Contact removed.';

  const targetURL = '/root/business--confirmation?businessid=' + data.businessid + '#contacts';
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});

router.post('/:mode/flows/contact/update', function (req, res) {
  const data = req.session.data;
  Businesses.updateContact(data);

  Reset.resetConfirmation(req);
  data.confirmation.id    = 'contact-updated';
  data.confirmation.type  = 'success';
  data.confirmation.title = 'Contact updated.';

  const targetURL = '/root/business--confirmation?businessid=' + data.businessid + '#contacts';
  res.redirect(data.currentPage === 'business' ? targetURL : '404');
});



// Attachment flow
router.post('/:mode/flows/attachment/save', function (req, res) {
  const data = req.session.data;
  Attachments.addAttachment(data);
  const targetURL = Attachments.beginningUrl(data) + '&confirmation=Attachment%20added#attachments';
  const redirectURL = Attachments.shouldReturn404(data) ? '404' : targetURL;
  res.redirect(redirectURL);
});

router.post('/:mode/flows/attachment/delete', function (req, res) {
  const data = req.session.data;
  Attachments.deleteAttachment(data);
  const targetURL = Attachments.beginningUrl(data) + '&confirmation=Attachment%20deleted#attachments';
  const redirectURL = Attachments.shouldReturn404(data) ? '404' : targetURL;
  res.redirect(redirectURL);
});

router.post('/:mode/flows/attachment/update', function (req, res) {
  const data = req.session.data;
  Attachments.editAttachment(data);
  const targetURL = Attachments.beginningUrl(data) + '&confirmation=Attachment%20updated#attachments';
  const redirectURL = Attachments.shouldReturn404(data) ? '404' : targetURL;
  res.redirect(redirectURL);
});



// Change Status flow
router.post(`/:mode/flows/change-status/save`, function (req, res) {
  const data = req.session.data;
  Cases.changeStatus(data, req.body);
  const redirectURL = '/root/case--confirmation?caseid=' + data.caseid + '&confirmation=Status%20updated';
  res.redirect(redirectURL);
});

// Change Visibility flow
router.post(`/:mode/flows/change-visibility/save`, function (req, res) {
  const data = req.session.data;
  let restricted = req.body.restricted === "true"
  Cases.changeVisibility(data, restricted)
  let confirmationText = restricted ? "Case%20visibility%20restricted" : "Case%20visibility%20unrestricted"
  let redirectURL = '/root/case--confirmation?caseid=' + data.caseid + '&confirmation=' + confirmationText;
  res.redirect(redirectURL);
});

// New restriction flow
router.post(`/pages/case/settings/restriction/save`, function (req, res) {
  const data = req.session.data;
  let restricted = req.body.restriction === "true"
  // let restricted = true
  Cases.changeVisibility(data, restricted)
  let confirmationText = restricted ? "Case%20visibility%20restricted" : "Case%20visibility%20unrestricted"
  let redirectURL = '/pages/case/overview';
  res.redirect(redirectURL);
});

router.get(`/pages/case/settings/restriction/on`, function (req, res) {
  const data = req.session.data;
  data.caseId = '0132-1421'
  Cases.changeVisibility(data, true)
  let redirectURL = '/root/case/overview?caseid=0132-1421&currentPage=case&productid=&businessid&signedIn=Yes&currentTeam=Trading%20Standards&currentUser=Tim%20Harwood&hasViewRights=true';
  res.redirect(redirectURL);
});

router.get(`/pages/case/settings/restriction/off`, function (req, res) {
  const data = req.session.data;
  data.caseId = '0132-1421'
  Cases.changeVisibility(data, false)
  let redirectURL = '/root/case/overview?caseid=0132-1421&currentPage=case&productid=&businessid&signedIn=Yes&currentTeam=Trading%20Standards&currentUser=Tim%20Harwood&hasViewRights=true';
  res.redirect(redirectURL);
});

// Adding teams to a case (shared across all cases)
router.post(`/pages/case/settings/permissions/save`, function (req, res) {
  const data = req.session.data;

  // Team being added or updated
  let teamName = data.teamName;
  // New or updated permission level including remove
  let permissionsLevel = data.teamPermissionsLevel

  // Ignore if data missing
  if (!teamName || !permissionsLevel) res.redirect('/pages/case/settings/permissions');

  var existingTeam = false // default

  // Check if team is existing and update if necessary
  req.session.data.teamPermissions.forEach(function(team) {
    if (team.teamName == teamName) {
      team.permissionsLevel = permissionsLevel
      existingTeam = true
    }
  });

  // Delete teams with permissions level of 'remove'
  req.session.data.teamPermissions = req.session.data.teamPermissions.filter(team => team.permissionsLevel != 'remove')

  // Reset new variable
  if (req.session.team == 'new') req.session.data.team == ""

  // New team
  if (!existingTeam){
    console.log("Adding team ", teamName, "to case")
    req.session.data.teamPermissions.push({
      teamName: teamName,
      permissionsLevel: permissionsLevel
    })
  }

  res.redirect('/pages/case/settings/permissions');
});


// Add comment flow
router.post(`/:mode/flows/add-comment/save`, function (req, res) {
  const data = req.session.data;
  Cases.addComment(data)
  let redirectURL = '/root/case--confirmation?caseid=' + data.caseid + '&confirmation=Commment%20added';
  res.redirect(redirectURL);

});

// Add Corrective Action flow
router.post(`/:mode/flows/record-corrective-action/save`, function (req, res) {
  const data = req.session.data;
  Cases.addCorrectiveAction(data);
  let redirectURL = '/root/case--confirmation?caseid=' + data.caseid + '&confirmation=Corrective%20action%20recorded';
  res.redirect(redirectURL);
});

// New activity flow
router.post('/:mode/flows/add-activity/choose', function (req, res) {
  let activity = res.locals.data['new-activity'];
  switch (activity) {
    case 'comment':
      res.redirect("/root/flows/add-comment/01-add-comment");
      break;
    case 'email':
      res.redirect("/root/flows/add-email/01e-add-email-context.html");
      break;
    case 'phoneCall':
      res.redirect("/root/flows/add-phonecall/01p-add-phonecall-context.html");
      break;
    case 'meeting':
      res.redirect("/root/flows/add-meeting/01m-add-meeting-context.html");
      break;
    case 'contact':
      res.redirect("/root/flows/contact/add/01.html");
      break;
    case 'product':
      res.redirect("/root/flows/product/add/01.html");
      break;
    case 'corrective-action':
      res.redirect("/root/flows/record-corrective-action/01-record-corrective-action.html");
      break;
    case 'business':
      res.redirect("/root/flows/business/add/01.html");
      break;
    case 'testing-request':
      res.redirect("/root/flows/record-testing-request/01-record-testing-request.html");
      break;
    case 'test-result':
      res.redirect("/root/flows/record-test-result/01-record-test-result.html");
      break;
    case 'change-visibility':
      res.redirect("/root/flows/change-visibility/01-change-visibility.html");
      break;
    case 'send-alert':
      res.redirect("/root/flows/send-alert/about-alerts");
      break;
    default:
      res.render(path);
  }
});

// LISTS ----------------------------------------------------------------------

// Case list and search
router.get('/:mode/case-search', function (req, res, next) {
  res.locals.data.caseListSettings.q = req.query.q || res.locals.data.caseListSettings.q
  next();
});

// Case list and search
router.get('/:mode/case-list', function (req, res, next) {
  res.locals.data.caseListSettings.q = undefined;
  next();
});

// TEST SETUP -----------------------------------------------------------------
router.post('/test-setup', function (req, res, next) {
  const data = req.session.data;

  if (req.body.caseToAssign !== undefined) {
    const kase = array.findById(data.cases, req.body.caseToAssign);

    kase.assignee = req.body.assignee;
  }
  const newUser = req.body.currentUser;
  if (newUser && !data.users.includes(newUser)) {
    data.users.push(newUser);
  }

  Reset.resetNew(req);

  next();
});

// New task list omni-creation journey -----------------------------------------------------------------

const setCaseDefaults = (req) => {
  var data = req.session.data
  var countOfCases = data.cases.length
  data.caseId = "1800-" + countOfCases.toString().padStart(4, '0')
  _.set(data, 'new.id', data.caseId)
  _.set(data, 'new.status', "Open")
  _.set(data, 'new.assignee', data.currentUser)
  _.set(data, 'new.report.product.items', [])
  _.set(data, 'currentPage', 'Case')
  _.set(data, 'navActive', 'Case')
  _.set(data, 'new.taskListSections', data.defaultTaskListSections)
  _.set(data, 'new.isDraft', true)

}

const logInAsTradingStandards = (req) => {
  var data = req.session.data
  _.set(data, 'signedIn', 'Yes')
  _.set(data, 'currentTeam', 'Trading Standards')
}

// Maps between user facing case types and internal 'report types'- used as a noun in text and for functionality.
const setReportTypeFromCaseType = (req, caseType) =>{

  var data = req.session.data
  var reportType = "Report" //fallback

  switch (caseType) {
    case ("reportProductIssue"):
      reportType = "Report"
      break
    case ("reportOtherIssue"):
      reportType = "Report"
      break
    case ("shareTestResults"):
      reportType = "Report"
      break
    case ("enquiry"):
      reportType = "Enquiry"
      break
    case ("project"):
      reportType = "Project"
      break
  }
  _.set(data, 'new.report.type', reportType)
}

// -------------------------------------------------------------------
// Supporting information
// -------------------------------------------------------------------

router.post('/pages/case/documents', function (req, res) {
  const data = req.session.data;

  const documentType = _.get(data, 'newDocumentType')
  console.log("document type was," + documentType)

  // Delete temporary storage
  if (documentType) delete data.newDocumentType

  if (documentType == 'Risk assessment') {
    res.redirect('/pages/case/risk-assessment/new')
  }
  else {
    console.log(documentType, 'not one of the types we support yet')
    res.redirect('/pages/case/documents')
  }


});


// Forward product pages to their templates
router.get('/pages/case/documents/:index/edit', function (req, res, next) {
  const data = req.session.data;
  const kase = array.findById(data.cases, data.caseid);

  var index = req.params.index
  var documentType = kase.report.history.items[index].type

  if (documentType == 'Risk assessment'){
    res.render('pages/case/risk-assessment/edit', {currentItemIndex: index})

  }
  else {
    res.render('pages/case/supporting-information/' + template, {currentItemIndex: index})
  }
});


// Forward product pages to their templates
router.get('/pages/case/documents/:index/:template', function (req, res, next) {
  const data = req.session.data;
  const kase = array.findById(data.cases, data.caseid);

  var index = req.params.index
  var template = req.params.template

  res.render('pages/case/supporting-information/' + template, {currentItemIndex: index})

});





router.post('/pages/case/documents/:index/save', function (req, res) {
  const data = req.session.data;
  var index = req.params.index;

  var documentType = data.document.type
  delete data.document.type //just in case

  var today = new Date()
  let todayArray = [today.getDate(), today.getMonth()+1, today.getFullYear()]

  // Load up current case
  const kase = array.findById(data.cases, data.caseid);


  let documentData = {}

  // Handle risk assessments only
  if (documentType == "Risk assessment") {
    let riskLevelOther = (documentData.riskLevelOther) ? (": (" + documentData.riskLevelOther.toLowerCase() + ")") : ""
    documentData = data.riskAssessment
    documentData.type = "Risk assessment"
    documentData.title = documentData.type + ': ' + documentData.riskLevel.toLowerCase() + riskLevelOther
    delete data.riskAssessment
  }

  let documentNumber = 0

  const makeFileName = (...args) =>{

    let fileName = []
    args.forEach(arg =>{
      var part = arg.split(' ').join("-")
      fileName.push(part)
    })
    fileName = fileName.join('_')

    return fileName
  }

  // New document
  if (index == 'new'){
    documentData.dateAdded = todayArray
    documentData.author = data.currentTeam
    if (documentData.hasFile == 'yes'){
      let fileDate = dateFilters.formatDate(today, "dashDate")
      documentData.fileName = makeFileName(fileDate, documentData.title, ".pdf")
    }
    kase.report.history.items.push(documentData)
    documentNumber = kase.report.history.items.length - 1
  }
  // Updated document
  else {
    documentData.dateUpdated = todayArray
    Object.assign(kase.report.history.items[index], documentData)
    documentNumber = index
  }



  // Risk assessment specific
  let currentCaseRiskLevel = _.get(kase, 'riskLevel')
  let isRiskAssessment = (documentType == "Risk assessment")

  let defaultRedirect = '/pages/case/documents'

  if (isRiskAssessment){
    if (documentData.riskLevel != currentCaseRiskLevel){
      // Store most recent risk level temporarily
      data.lastRiskLevel = documentData.riskLevel
      data.documentNumber = documentNumber
      res.redirect('/pages/case/risk-level/match-risk-level');
    }
    else {
      res.redirect('/pages/case/documents/' + documentNumber + '/view');
    }
  }
  else {
    res.redirect(defaultRedirect);
  }


});

// Update case risk level after adding a risk assessment
router.post('/pages/case/risk-level/match-risk-level', function (req, res) {
  const data = req.session.data;

  // Load up current case
  const kase = array.findById(data.cases, data.caseid);

  let riskLevel = data.lastRiskLevel
  delete data.lastRiskLevel
  let documentNumber = data.documentNumber
  delete data.documentNumber

  let matchRiskLevel = data.matchRiskQuestion
  matchRiskLevel = (matchRiskLevel == "true") ? true : false

  if (matchRiskLevel){
    kase.riskLevel = riskLevel
  }

  res.redirect('/pages/case/documents/' + documentNumber + '/view')

});

// Update case risk level
router.post('/pages/case/risk-level/save', function (req, res) {
  const data = req.session.data;

  // Load up current case
  const kase = array.findById(data.cases, data.caseid);

  let caseRiskLevel = data.riskLevel
  delete data.riskLevel
  let caseRiskLevelOther = data.riskLevelOther
  delete data.riskLevelOther

  kase.riskLevel = caseRiskLevel
  kase.riskLevelOther = caseRiskLevelOther

  res.redirect('/pages/case/overview')

});


// -------------------------------------------------------------------
// New task list create journey
// -------------------------------------------------------------------

// Some sections are conditional on others
const updateRequiredSections = (req) => {
  var data = req.session.data

  // Case naming requires product and hazards
  var caseNamingStatus = _.get(data, 'new.taskListSections.autoCaseName.status')
  if (caseNamingStatus.text == 'Can’t start yet' && caseNamingStatus.isComplete == false){

    var productCount = _.get(data, 'new.report.product.items')
    productCount = productCount ? productCount.length : false

    var hasHazards = _.get(data, 'new.report.reportType')
    hasHazards = (hasHazards) ? true : false
    console.log("Product count: ", productCount, " hasHzards: ", hasHazards)
    if (productCount & hasHazards){
      console.log('Removing can’t start yet')
      _.set(data, 'new.taskListSections.autoCaseName.status.text', "")
    }
  }

}

// Reset data when visiting new
router.get('/pages/flows/create-new', function (req, res, next) {
  var data = req.session.data

  // Clear existing data
  Reset.resetNew(req);
  delete data.customTitle
  delete data.product
  delete data.business
  delete data.testResult
  delete data.historyItem
  delete data.reporter

  // Set up data
  var urlBase = '/pages/flows/create-new/'
  var urlStem = 'case-type'

  // set case no / assignee, etc
  setCaseDefaults(req)
  logInAsTradingStandards(req)

  // Support a case type passed via query string - so we can
  // bypass the first question
  var caseType = _.get(req.session.data, 'newType')
  if (caseType) {
      setReportTypeFromCaseType(req, caseType)
      _.set(req.session.data, 'new.report.caseType', caseType)
    delete(req.session.data.newType)
    res.redirect(urlBase + 'overview');
  }

  // If no type, ask for type
  if (!caseType) res.redirect(urlBase + urlStem)

});


// Case type
router.post('/pages/flows/create-new/case-type', function (req, res, next) {

  var data = req.session.data
  var caseType = _.get(data, 'new.report.caseType')

  // Map case types to report types
  setReportTypeFromCaseType(req, caseType)

  var reportType = _.get(data, 'new.report.type')

  // Force 'reports' to be assigned to OPSS
  if (reportType == "Report"){
    _.set(data, 'new.assignee', "OPSS - Processing")
  }

  res.redirect('/pages/flows/create-new/overview')

});


// Main task list page
router.get('/pages/flows/create-new/overview', function (req, res, next) {
  var data = req.session.data

  // TEMP for prototype - needed by other pages but gets easily cleared when rebooting prototype
  var caseType = _.get(data, 'new.report.type')
  if (!caseType) {
    setCaseDefaults(req)
    logInAsTradingStandards(req)
    caseType = "Report"
    _.set(data, 'new.report.type', caseType)
    _.set(data, 'new.report.caseType', "reportProductIssue")
  }

  // Update 'can't start yet' badges, etc
  updateRequiredSections(req)

  next();
});

// For case types other than reports of products
router.post('/pages/flows/create-new/name-and-summary', function (req, res) {
  const data = req.session.data;
  const caseTitle = data.new.title
  const caseSummary = data.new.report.summary
  if (!caseTitle || !caseSummary) {
    res.redirect('/pages/flows/create-new/name-and-summary')
  }
  else {
    _.set(data, 'new.taskListSections.summary.status.isComplete', true)
    _.set(data, 'new.taskListSections.autoCaseName.status.isComplete', true)
    // Clear out 'can't start yet' text
    _.set(data, 'new.taskListSections.autoCaseName.status.text', '')
    res.redirect('/pages/flows/create-new/overview');
  }

});

// Auto case name page - for reports of products
router.post('/pages/flows/create-new/name', function (req, res) {
  const data = req.session.data

  // If we alredy have a title (revisiting section)
  if (data.new.title){
    res.redirect('/pages/flows/create-new/summary')
  }
  else {
    // Radio question
    const useAutoTitle = data['use-auto-title']
    var title = ''
    // Auto-title
    if (useAutoTitle != 'no') {
      // Get the title
      title = useAutoTitle
    }
    // Manual title
    else {
      title = data.customTitle
      delete data.customTitle
    }
    // In case title is blank
    if (!title) {
      res.redirect('/pages/flows/create-new/name')
    }
    // Copy title in to case
    else {
      _.set(data, 'new.title', title)
      res.redirect('/pages/flows/create-new/summary');
    }
  }
});


// Redirect to directly adding a product if products section is required
router.get('/pages/flows/create-new/product/index', function (req, res, next) {
  var data = req.session.data
  var productItems = _.get(data, 'new.report.product.items')
  var productCount = (productItems)? productItems.length : 0

  // Start adding a product immediately if products required
  var productsAreRequired = data.defaultSections[data.new.report.caseType].part1.includes('products')

  // Only redirect if we don’t alredy have products
  if (productCount == 0 && productsAreRequired){
    delete data.product
    res.redirect('/pages/flows/create-new/product/new/generic-or-specific')
  }
  // Else render page
  else {
    next ()
  }

});

// Product index page
router.post('/pages/flows/create-new/product/index', function (req, res, next) {
  var data = req.session.data
  var questionData = _.get(data, 'new.report.product.addMore')

  // Clear data for next time
  delete data.new.report.product.addMore

  var productItems = _.get(data, 'new.report.product.items')
  var productCount = (productItems)? productItems.length : 0

  if (questionData) {
    if (questionData == 'true'){
      // Adding a new product
      // Status is not complete
      _.set(data, 'new.taskListSections.products.status.isComplete', false)
      // Status "In progress"
      _.set(data, 'new.taskListSections.products.status.text', "In progress")

      // Delete data before beginning journey
      delete data.product
      res.redirect('/pages/flows/create-new/product/new/generic-or-specific')
    }
    if (questionData == 'false'){
      _.set(data, 'new.taskListSections.products.status.isComplete', true)
      _.set(data, 'new.taskListSections.products.status.text', "Completed")
      // Remove 'can't start yet' from test results if present
      if ((_.get(data, 'new.taskListSections.testResults.status.text') == 'Can’t start yet') || (_.get(data, 'new.taskListSections.testResults.status.text') == 'Not relevant')){
        if (productCount == 0){
          _.set(data, 'new.taskListSections.testResults.status.text', "Not relevant")
        }
        else _.set(data, 'new.taskListSections.testResults.status.text', "")
      }
      res.redirect('/pages/flows/create-new/overview')
    }
  }
  // No option selected - render page instead
  else {
    next();
  }
});

// Forward product pages to their templates
router.get('/pages/flows/create-new/product/:index/:template', function (req, res, next) {
  var index = req.params.index
  var template = req.params.template
  res.render('pages/flows/create-new/product/' + template, {currentItemIndex: index})
});

// Branch between search and category information
router.post('/pages/flows/create-new/product/:index/generic-or-specific', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var questionData = data.product.class
  if (questionData) {
    if (questionData == 'specific'){
      if (index == 'new'){
        res.redirect('/pages/flows/create-new/product/'+index +'/search')
      }
      else {
        res.redirect('/pages/flows/create-new/product/'+index +'/category')
      }

    }
    if (questionData == 'generic'){
      res.redirect('/pages/flows/create-new/product/'+index +'/category')
    }
  }
  else {
    next();
  }

});

// Product search or add directly
router.post('/pages/flows/create-new/product/:index/search', function (req, res, next) {
  var index = req.params.index
  var data = req.session.data
  var searchOrAdd = _.get(data, 'product.searchOrAdd')
  var searchTerm = _.get(data, 'product.searchTerm')
  if (searchOrAdd == 'search'){
    res.redirect('/pages/flows/create-new/product/' + index + '/search-results?product[searchTerm]=' + searchTerm )
  }
  else if (searchOrAdd == 'add'){
    res.redirect('/pages/flows/create-new/product/' + index + '/category' )
  }
  next()
});

// Save the product data - new or ammend
router.post('/pages/flows/create-new/product/:index/save', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var productItems = _.get(data, 'new.report.product.items')
  if (!productItems) _.set(data, 'new.report.product.items', []) //just to be safe
  var productData = data.product
  delete data.product

  if (index == 'new') {
    data.new.report.product.items.push(productData)
  }
  else {
    data.new.report.product.items[index] = productData
  }
  delete data.product

  res.redirect('/pages/flows/create-new/product/index')
});

// Business pages
router.post('/pages/flows/create-new/business/index', function (req, res, next) {
  var data = req.session.data
  var questionData = _.get(data, 'new.report.business.addMore')

  // Clear data for next time
  delete data.new.report.business.addMore

  if (questionData) {
    if (questionData == 'true'){
      // Adding a new product
      _.set(data, 'new.taskListSections.businesses.status.isComplete', false)
      _.set(data, 'new.taskListSections.businesses.status.text', "In progress")
      var businessCount = _.get(data, 'new.report.business.items')
      businessCount = (businessCount)? businessCount.length : 0
      delete data.business
      // res.redirect('/pages/flows/create-new/business/new/search')
      res.redirect('/pages/flows/create-new/business/new/enter-manual')
    }
    if (questionData == 'false'){
      _.set(data, 'new.taskListSections.businesses.status.isComplete', true)
      _.set(data, 'new.taskListSections.businesses.status.text', "Completed")
      res.redirect('/pages/flows/create-new/overview')
    }
  }
  // No option selected - render page instead
  else {
    next();
  }
});

// Business search
router.post('/pages/flows/create-new/business/:index/search', function (req, res, next) {
  var index = req.params.index
  var data = req.session.data
  var questionData = _.get(data, 'business.searchTerm')
  res.redirect('/pages/flows/create-new/business/' + index + '/search-results?business[searchTerm]=' + questionData )
});

// Forward business pages to their templates
router.get('/pages/flows/create-new/business/:index/:template', function (req, res, next) {
  var index = req.params.index
  var template = req.params.template
  res.render('pages/flows/create-new/business/' + template, {currentItemIndex: index})
});



// Save the product data - new or ammend
router.post('/pages/flows/create-new/business/:index/save', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var businesses = _.get(data, 'new.report.business.businesses')
  if (!businesses) _.set(data, 'new.report.business.businesses', []) //just to be safe
  var businessData = data.business

  if (index == 'new') {
    data.new.report.business.businesses.push(businessData)
  }
  else {
    data.new.report.business.businesses[index] = businessData
  }
  delete data.business

  res.redirect('/pages/flows/create-new/business/index')
});


// Test results

// Business pages
router.post('/pages/flows/create-new/test-result/index', function (req, res, next) {
  var data = req.session.data
  var questionData = _.get(data, 'new.report.testResult.addMore')

  // Clear data for next time
  delete data.new.report.testResult.addMore

  if (questionData) {
    if (questionData == 'true'){
      // Adding a new test result
      _.set(data, 'new.taskListSections.testResults.status.isComplete', false)
      _.set(data, 'new.taskListSections.testResults.status.text', "In progress")
      var testResultCount = _.get(data, 'new.report.testResult.items')
      testResultCount = (testResultCount)? testResultCount.length : 0
      delete data.testResult
      res.redirect('/pages/flows/create-new/test-result/new/results-file')
    }
    if (questionData == 'false'){
      _.set(data, 'new.taskListSections.testResults.status.isComplete', true)
      _.set(data, 'new.taskListSections.testResults.status.text', "Completed")
      res.redirect('/pages/flows/create-new/overview')
    }
  }
  // No option selected - render page instead
  else {
    next();
  }
});

// Forward product pages to their templates
router.get('/pages/flows/create-new/test-result/:index/:template', function (req, res, next) {
  var index = req.params.index
  var template = req.params.template
  res.render('pages/flows/create-new/test-result/' + template, {currentItemIndex: index})
});

// Save the product data - new or ammend
router.post('/pages/flows/create-new/test-result/:index/save', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var testResultes = _.get(data, 'new.report.testResult.testResults')
  if (!testResultes) _.set(data, 'new.report.testResult.testResults', []) //just to be safe
  var testResultData = data.testResult

  if (index == 'new') {
    data.new.report.testResult.testResults.push(testResultData)
  }
  else {
    data.new.report.testResult.testResults[index] = testResultData
  }
  delete data.testResult

  res.redirect('/pages/flows/create-new/test-result/index')
});

// Reporters
router.get('/pages/flows/create-new/reporter/:index/:template', function (req, res, next) {
  var index = req.params.index
  var template = req.params.template
  res.render('pages/flows/create-new/reporter/' + template, {currentItemIndex: index})
});

router.post('/pages/flows/create-new/reporter/:index/source-type', function (req, res, next) {
  var index = req.params.index
  var data = req.session.data
  var reporterType = _.get(data, 'reporter.type')
  var orgName = ''
  switch (reporterType) {
    case ("Business"):
      orgName = _.get(data, 'reporter.businessName')
      break
    case ("Trading Standards"):
      orgName = _.get(data, 'reporter.tradingStandardsName')
      break
    case ("Local authority"):
      orgName = _.get(data, 'reporter.localAuthorityName')
      break
    case ("Other government department or agency"):
      orgName = _.get(data, 'reporter.departmentOrAgencyName')
      break
    case ("Stakeholder"):
      orgName = _.get(data, 'reporter.opssStakeholderName')
      break
    case ("Other"):
      orgName = _.get(data, 'reporter.otherOrgName')
      break

  }
  console.log('setting', orgName)
  _.set(data, 'reporter.orgName', orgName)
  res.redirect('/pages/flows/create-new/reporter/' + index + '/contact-details' )
});

// Save the product data - new or ammend
router.post('/pages/flows/create-new/reporter/:index/save', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var reports = _.get(data, 'new.report.reporter.reports')
  if (!reports) _.set(data, 'new.report.reporter.reports', []) //just to be safe
  var reporter = data.reporter

  if (index == 'new') {
    data.new.report.reporter.reports.push(reporter)
  }
  else {
    data.new.report.reporter.reports[index] = reporter
  }
  delete data.reporter

  res.redirect('/pages/flows/create-new/reporter/index')
});



router.get('/pages/flows/create-new/case-history/:index/edit', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index
  var template = req.params.template
  var historyItem = _.get(data, 'new.report.history.items['+index+']')
  switch (historyItem.type) {
    case ("Corrective action"):
      res.redirect('/pages/flows/create-new/case-history/' + index + '/corrective-action' )
      break
    case ("Incident"):
      res.redirect('/pages/flows/create-new/case-history/' + index + '/incident' )
      break
    default:
      res.redirect('/pages/flows/create-new/case-history/index' )
  }
});

// History items
router.get('/pages/flows/create-new/case-history/:index/:template', function (req, res, next) {
  var index = req.params.index
  var template = req.params.template
  res.render('pages/flows/create-new/case-history/' + template, {currentItemIndex: index})
});

// Save the data
router.post('/pages/flows/create-new/case-history/:index/save', function (req, res, next) {
  var data = req.session.data
  var index = req.params.index

  var historyItems = _.get(data, 'new.report.history.items')
  if (!historyItems) _.set(data, 'new.report.history.items', []) //just to be safe
  var historyItem = data.historyItem

  if (index == 'new') {
    data.new.report.history.items.push(historyItem)
  }
  else {
    data.new.report.history.items[index] = historyItem
  }
  delete data.historyItem

  res.redirect('/pages/flows/create-new/case-history/index')
});

// Save
router.post('/pages/flows/create-new/save', function (req, res) {
  const data = req.session.data;
  newCase = Cases.addCase(data);
  data.caseid = newCase.id
  Reset.resetNew(req);
  res.redirect('/pages/flows/create-new/case-created');
  // res.redirect('/root/case/overview?caseid=' + newCase.id);
});

// Add your routes here - above the module.exports line
module.exports = router;
