const express = require('express')
const router = express.Router()
const today = require("./utils/today");
const Cases = require("./utils/case");

// Catch-all for redirecting to the correct mode - MUST BE LAST ROUTE ADDED
router.all("/root/*", function (req, res) {
  const mode = req.session.data.mode;
  const rest = req.path.substring(6);
  const route = `/${mode}/${rest}`;
  res.redirect(route);
})

router.all("/:mode(pages|spec|test|old)/*", function (req, res, next) {
  res.locals.data.mode = req.params.mode
  next()
})

// PAGES ----------------------------------------------------------------------

// Some flows are shared between entities, so they need to know which entity has
// launched them.
router.get('/:mode/:entity(case|business|product|case-list)/', function (req, res) {
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
  let newCase = req.session.data.new
  
  Cases.addDefaults(newCase);

  newCase.dateCreated = today.short();
  newCase.dateUpdated = today.short();
  newCase.id = today.id()
  switch(newCase.report.type) {
    case "Allegation": newCase.type = "Case"; break;
    case "Question": newCase.type = "Question"; break;
    default: newCase.type = "Case";
  }
  newCase.assignee = req.session.data.currentUser
  const caseCareatedActivity = require("./data/activities/templates").caseCreated;
  newCase.activites.push(caseCareatedActivity())

  res.locals.data.cases.push(newCase);

  res.redirect('/root/case?caseid=' + newCase.id);
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
router.post('/:mode/flows/assign/save', function (req, res) {
  const kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid
  });

  let newAssignee = req.body.assignee
  newAssignee = newAssignee === "Other" ? req.body["other-correspondent"] : newAssignee

  const assignedActivityTempalte = require("./data/activities/templates").assigned;
  const newActivity = assignedActivityTempalte({
    assignee: newAssignee,
    author: res.locals.data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.assignee = newAssignee
  kase.activites.unshift(newActivity)

  res.redirect('/root/case')
})



// Location flow
router.post('/:mode/flows/location/save', function (req, res) {

  let newLocation   = req.session.data.location;
  newLocation.id    = 'l' + (res.locals.data.locations.length + 1);

  res.locals.data.locations.push(newLocation);

  if (res.locals.data.currentPage === 'business') {

    let biz = res.locals.data.businesses.find(function (b) {
      return b.id === res.locals.data.businessid
    });

    if (biz) {
      biz.locations.push({
        id:     newLocation.id,
        role:   req.session.data.location.name
      })
    }

    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);

  }

  res.redirect('404');

})

function arrayRemoveByID(arr, value) {
   return arr.filter(function(ele){
       return ele.id != value;
   });
}


// Location flow
router.post('/:mode/flows/location/delete', function (req, res) {

  if (res.locals.data.currentPage === 'business') {

    let biz = res.locals.data.businesses.find(function (b) {
      return b.id === req.session.data.businessid
    });

    if (biz && biz.locations) {
      biz.locations = arrayRemoveByID(biz.locations, req.session.data.locationid)
    }
    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);
  }

  res.redirect('404');

})



router.post('/:mode/flows/location/update', function (req, res) {

  if (res.locals.data.currentPage === 'business') {

    let newLocation   = req.session.data.location;
    newLocation.id    = req.session.data.locationid


    let loc = res.locals.data.locations.find(function (l) {
      return l.id === req.session.data.locationid
    });

    if (loc) {
      for (var k in loc) {
        loc[k] = newLocation[k]
      }
    }

    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);
  }

  res.redirect('404');

})




// Change Status flow
router.post(`/:mode/flows/change-status/save`, function (req, res) {
  const kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid
  });

  const changeStatusActivityTempalte = require("./data/activities/templates").changedStatus;
  const newActivity = changeStatusActivityTempalte({
    status: req.body.status,
    description: req.body['status-description'],
    author: res.locals.data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.status = req.body.status
  kase.activites.unshift(newActivity)

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
      res.redirect("/flows/add-correspondence/01-add-correspondence-context.html")
      break;
    case 'contact':
      res.redirect("/root/flows/contact/add/01.html")
      break;
    case 'product':
      res.redirect("/root/flows/product/add/01.html")
      break;
    case 'incident':
      res.redirect("/flows/add-incident/01-add-incident.html")
      break;
    case 'hazard':
      res.redirect("/root/flows/add-hazard/01.html")
      break;
    case 'risk':
      res.redirect("/root/flows/add-risk/01.html")
      break;
    case 'corrective-action':
      res.redirect("/flows/record-corrective-action/01-record-corrective-action.html")
      break;
    case 'business':
      res.redirect("/root/flows/business/add/01.html")
      break;
    case 'testing':
      res.redirect("/flows/record-test-result/01-record-test-result.html")
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

// TEST SETUP -----------------------------------------------------------------
router.post('/test-setup', function (req, res) {
  if (req.body.caseToAssign !== undefined) {
    const kase = res.locals.data.cases.find(function (c) {
      return c.id === req.body.caseToAssign
    });
    kase.assignee = req.body.assignee
  }
  const newUser = req.body.currentUser
  if (newUser && !res.locals.data.users.includes(newUser)) {
    res.locals.data.users.push(newUser)
  } 
  continuetoView(req, res)
})




// Add your routes here - above the module.exports line
module.exports = router
