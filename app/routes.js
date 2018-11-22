const express = require('express')
const router = express.Router()

// Catch-all for redirecting to the correct mode - MUST BE LAST ROUTE ADDED
router.all("/root/*", function (req, res) {
  redirectByMode(req, res);
})

function redirectByMode(req, res) {
  const mode = req.session.data.mode;
  console.log(req.path);
  const rest = req.path.substring(6);
  const route = `/${mode}/${rest}`;
  res.redirect(route);
}

function getDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  dd = (dd < 10) ? '0' + dd : dd;
  mm = (mm < 10) ? '0' + mm : mm;

  return dd + '/' + mm + '/' + yyyy;
};

// PAGES ----------------------------------------------------------------------

// Some flows are shared between entities, so they need to know which entity has
// launched them.
router.get('/:mode/:entity(case|business|product|case-list)/', function(req, res) {
  res.locals.data.currentPage = req.params.entity
  continuetoView(req, res)
})

// FLOWS ----------------------------------------------------------------------

// Process incoming report flow endpoints
router.post('/:mode/flows/process-incoming/report-info-endpoint', function (req, res) {
  let type = req.session.data.new['type']
  switch (type) {
    case 'Enquiry':
      res.redirect('/root/flows/process-incoming/question-info')
      break;
    case 'Product safety allegation':
      res.redirect('/root/flows/process-incoming/allegation-incident')
      break;
    case 'Product recall notification':
      res.redirect('/root/flows/process-incoming/recall-info')
      break;
    case 'Notification from RAPEX':
      res.redirect('/root/flows/process-incoming/rapex')
      break;
    default:
      res.redirect(type)
  }
})

router.post('/:mode/flows/process-incoming/save', function (req, res) {
  res.locals.data.cases.push(req.session.data.new);
  res.redirect('/root/case?caseid='+req.session.data.new['id']);
})

// Report flow: Decide whether to show email capture page
router.post('/:mode/flows/process-incoming/email-check-endpoint', function (req, res) {
  let endpoint = req.session.data.new['origin-type']
  switch (endpoint) {
    case 'Phonecall':
      res.redirect('/root/flows/process-incoming/report-check-answers')
      break;
    case 'Email':
      res.redirect('/root/flows/process-incoming/email-content')
      break;
    default:
      res.redirect(endpoint)
  }
})

// Assign flow
router.post('/flows/assign/save', function (req, res) {
  let kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid
  });

  kase.dateUpdated = getDate();

  let newAssignee = req.body.assignee
  newAssignee = newAssignee === "Other" ? req.body["other-correspondent"] : newAssignee
  kase.assignee = newAssignee
  res.redirect('/root/case')
})

// New activity flow
router.post('/:mode/flows/add-activity/choose', function (req, res) {
  let activity = res.locals.data['new-activity']
  switch (activity) {
    case 'comment':
      res.redirect("/root/flows/add-comment/01-add-comment")
      break;
    case 'correspondance':
      res.redirect("/root/flows/add-correspondence/01-add-correspondence-context.html")
      break;
    case 'contact':
      res.redirect("/root/flows/add-contact/01-add-contact.html")
      break;
    case 'product':
      res.redirect("/root/flows/add-product/01-add-product.html")
      break;
    case 'incident':
      res.redirect("/root/flows/add-incident/01-add-incident.html")
      break;
    case 'hazard':
      res.redirect("/root/flows/add-hazard/01-add-hazard.html")
      break;
    case 'risk':
      res.redirect("/root/flows/add-risk/01-add-risk.html")
      break;
    case 'corrective-action':
      res.redirect("/root/flows/record-corrective-action/01-record-corrective-action.html")
      break;
    case 'business':
      res.redirect("/root/flows/add-business/01-add-business.html")
      break;
    default:
      res.render(path)
  }
})

// LISTS ----------------------------------------------------------------------

// Case list and search
router.get('/:mode/case-search', function (req, res) {
  res.locals.data.caseListSettings.q = "nick 32142"
  // TODO if we ever stop mocking out the search, then this could be a starting point. As, we're faking it
  // res.locals.data.caseListSettings.q = req.query.q
  continuetoView(req, res);
})

// Case list and search
router.get('/:mode/case-list', function (req, res) {
  res.locals.data.caseListSettings.q = undefined
  continuetoView(req, res)
})

function continuetoView(req, res) {
  res.render(req.path.substring(1));
}




// Add your routes here - above the module.exports line
module.exports = router
