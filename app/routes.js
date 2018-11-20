const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router



function getDate() {
  let today = new Date();
  let dd    = today.getDate();
  let mm    = today.getMonth() + 1;
  let yyyy  = today.getFullYear();

  dd = (dd < 10)?  '0' + dd : dd;
  mm = (mm < 10)?  '0' + mm : mm;

  return dd + '/' + mm + '/' + yyyy;
};




// Process incoming report flow endpoints
router.post('/flows/process-incoming/report-info-endpoint', function (req, res) {
  let type = req.session.data.new['issue-type']
  switch (type) {
    case 'Enquiry':
      res.redirect('/flows/process-incoming/question-info')
      break;
    case 'Product safety allegation':
      res.redirect('/flows/process-incoming/allegation-incident')
      break;
    case 'Product recall notification':
      res.redirect('/flows/process-incoming/recall-info')
      break;
    case 'Notification from RAPEX':
      res.redirect('/flows/process-incoming/rapex')
      break;
    default:
      res.redirect(type)
  }
})

router.post('/flows/process-incoming/save', function (req, res) {
  let type = req.session.data.new['issue-type']
  switch (type) {
    case 'Enquiry':
      res.redirect('/case__new-question')
      break;
    case 'Product safety allegation':
      res.redirect('/case__new-allegation')
      break;
      res.redirect(type)
  }
})

// Report flow: Decide whether to show email capture page
router.post('/flows/process-incoming/email-check-endpoint', function (req, res) {
  let endpoint = req.session.data.new['origin-type']
  switch (endpoint) {
    case 'Phonecall':
      res.redirect('/flows/process-incoming/report-check-answers')
      break;
    case 'Email':
      res.redirect('/flows/process-incoming/email-content')
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
  res.redirect('/pages/case')
})