const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


// Process incoming report flow endpoints
router.post('/flows/process-incoming/report-info-endpoint', function(req, res) {
  let endpoint = req.session.data.new['issue-type']
  switch (endpoint) {
    case 'Enquiry':
      res.redirect('/flows/process-incoming/question-info')
      break;
    case 'Product safety allegation':
        res.redirect('/flows/process-incoming/allegation-info')
        break;
    case 'Product recall notification':
        res.redirect('/flows/process-incoming/recall-info')
        break;
    case 'Notification from RAPEX':
        res.redirect('/flows/process-incoming/rapex')
        break;
    default:
      res.redirect(endpoint)
  }
})