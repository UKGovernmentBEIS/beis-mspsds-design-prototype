/* jshint esversion: 6 */

const express     = require('express');
const router      = express.Router();
const Cases       = require("./utils/case");
const array       = require("./utils/arrayHelpers");
const Businesses  = require("./utils/business")
const Attachments = require("./utils/attachment");
const Reset       = require("./utils/reset");

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

router.post('/:mode/flows/ts-create/product-images-any', function (req, res, next) {
  var hasImages = req.session.data['product-images-any']
  if (hasImages == 'yes') {
    req.session.data['images-count'] = 1
    res.redirect("/pages/flows/ts-create/product-image-upload")
  }
  else res.redirect("/pages/flows/ts-create/why-reporting")
});

router.post('/:mode/flows/ts-create/product-images-more', function (req, res, next) {
  var moreImages = req.session.data['more-images-question']
  if (moreImages == 'yes') {
    req.session.data['images-count'] ++
    res.redirect("/pages/flows/ts-create/product-image-upload")
  }
  else res.redirect("/pages/flows/ts-create/why-reporting")
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

// Add your routes here - above the module.exports line
module.exports = router;
