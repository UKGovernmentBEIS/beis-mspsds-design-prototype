/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const today = require("./utils/date").today;
const date = require("./utils/date").date;
const Cases = require("./utils/case");
const Activities = require("./utils/activity");
const array = require("./utils/arrayHelpers");
const Products = require("./utils/product")
const Attachments = require("./utils/attachment");
const Reset = require("./utils/reset");

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




// FLOWS ----------------------------------------------------------------------

router.post('/:mode/flows/ts-create/save', function (req, res) {
  const data = req.session.data;

  let newCase = Cases.buildFromData(data);
  data.cases.push(newCase);

  let activity = Activities.buildCreateCase(newCase);
  newCase.activities.unshift(activity);
  
  const files = require("./utils/attachment").buildTsCreateAttachments(data);
  newCase.attachments.unshift(...files.map(f => f.id));
  activity.attachments.unshift(...files);
  data.attachments.push(...files);
  
  newCase.dateUpdated = today.short();

  let product = Products.buildFromData(data)
  data.products.push(product);
  newCase.products.push(product.id);

  const addProductActivity = Activities.buildAddProduct(product, data.currentUser)
  newCase.activities.unshift(addProductActivity);

  Reset.resetNew(req);

  res.redirect('/root/case--created?caseid=' + newCase.id);
});



router.post('/:mode/flows/create/save', function (req, res) {
  const data = req.session.data;
  
  let newCase = Cases.buildFromData(data);
  data.cases.push(newCase);

  let activity = Activities.buildCreateCase(newCase)
  newCase.activities.unshift(activity);

  Reset.resetNew(req)
  res.redirect('/root/case--created?caseid=' + newCase.id);
});


// Report flow: Decide whether to show email capture page
// TODO: DELETE when this is no longer used by old material
router.post('/:mode/flows/process-incoming/email-check-endpoint', function (req, res) {
  let endpoint = req.session.data.new['origin-type'];
  switch (endpoint) {
    case 'Phonecall':
      res.redirect('/root/flows/process-incoming/report-check-answers');
      break;
    case 'Email':
      res.redirect('/root/flows/process-incoming/email-content');
      break;
    default:
      res.redirect(endpoint);
  }
});

// Assign flow
router.post('/:mode/flows/assign/save', function (req, res) {
  const data = req.session.data;

  const kase = array.findById(data.cases, data.caseid)
  
  let newAssignee = req.body.assignee;
  newAssignee = newAssignee === "Other" ? req.body["other-assignee"] : newAssignee;

  const assignedActivityTemplate = require("./data/activities/templates").assigned;
  const newActivity = assignedActivityTemplate({
    assignee: newAssignee,
    author: data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.assignee = newAssignee;
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});


// Add product flow
router.post('/:mode/flows/product/add', function (req, res) {
  const data = req.session.data;

  const kase = array.findById(data.cases, data.caseid)

  const product = Products.buildFromData(data)
  data.products.push(product);
  kase.products.push(product.id);

  kase.dateUpdated = today.short();

  const addProductActivity = Activities.buildAddProduct(product, data.currentUser)
  kase.activities.unshift(addProductActivity);

  res.redirect('/root/case#activity');
});



// Location flow
router.post('/:mode/flows/location/save', function (req, res) {
  const data = req.session.data;

  let newLocation   = data.location;
  newLocation.id    = 'l' + (data.locations.length + 1);

  data.locations.push(newLocation);

  if (data.currentPage === 'business') {
    const biz = array.findById(data.businesses, data.businessid)
    
    if (biz) {
      biz.locations.push({
        id:     newLocation.id,
        role:   data.location.name
      });
    }

    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);

  }

  res.redirect('404');

});

router.post('/:mode/flows/location/delete', function (req, res) {
  const data = req.session.data;

  if (data.currentPage === 'business') {

    const biz = data.businesses(data.businesses, data.businessid)
    
    if (biz && biz.locations) {
      biz.locations = array.removeById(biz.locations, data.locationid);
    }
    res.redirect('/root/business#locations?businessid='+data.businessid);
  }

  res.redirect('404');

});



router.post('/:mode/flows/location/update', function (req, res) {
  const data = req.session.data;

  if (data.currentPage === 'business') {

    let newLocation   = data.location;
    newLocation.id    = data.locationid;

    const loc = array.findById(data.locations, data.locationid)

    if (loc) {
      for (var k in loc) {
        loc[k] = newLocation[k];
      }
    }

    res.redirect('/root/business#locations?businessid=' + data.businessid);
  }

  res.redirect('404');

});






// Attachment flow
router.post('/:mode/flows/attachment/save', function (req, res) {
  const data = req.session.data;

  let newAttachment   = data.attachment;
  newAttachment.id    = 'at' + (data.attachments.length + 1);

  
  let obj = null;
  let redirectURL = '404';
  
  switch (data.currentPage) {
    case 'business':
      obj = array.findById(data.businesses, data.businessid)
      redirectURL = '/root/business#locations?businessid='+data.businessid;
      break;
    
    case 'case':
      obj = array.findById(data.cases, data.caseid)
      redirectURL = '/root/case#locations?caseid='+data.caseid;
      
      const newActivity = Activities.buildAddAttachment(newAttachment, data.currentUser)
      obj.activities.unshift(newActivity);
      break;

    case 'product':
      obj = array.findById(data.products, data.productid)
      redirectURL = '/root/product#locations?productid='+data.productid;
      break;

    default:
      console.log("data.currentPage not set to appropriate value in flows/attachment/save route")
  }
  
  obj.attachments.push(newAttachment.id)
  data.attachments.push(newAttachment)
  
  res.redirect(redirectURL);
});

router.post('/:mode/flows/attachment/delete', function (req, res) {
  const data = req.session.data;

  let redirectURL = '404';

  if (data.currentPage === 'business') {
    const biz = array.findById(data.businesses, data.businessid)
    
    redirectURL = '/root/business#locations?businessid='+data.businessid;

    if (biz) {
      biz.attachments = array.removeByValue(biz.attachments, data.attachmentid);
    }
  }

  if (data.currentPage === 'case') {
    const kase = array.findById(data.cases, data.caseid)

    if (kase) {
      kase.attachments = array.removeByValue(kase.attachments, data.attachmentid);
    }

    redirectURL = '/root/case#locations?caseid='+data.caseid;
  }

  if (data.currentPage === 'product') {
    const prod = array.findById(data.products, data.productid)

    if (prod) {
      prod.attachments = array.removeByValue(prod.attachments, data.attachmentid);
    }

    redirectURL = '/root/product#locations?productid='+data.productid;
  }

   res.redirect(redirectURL);
});


router.post('/:mode/flows/attachment/update', function (req, res) {
  const data = req.session.data;

  let newAttachment   = data.attachment;
  newAttachment.id    = data.attachmentid;
  newAttachment.date  = today.short();

  const att = array.findById(data.attachments, data.attachmentid)

  if (att) {
    for (var k in att) {
      att[k] = newAttachment[k];
    }
  }

  let redirectURL = '404';

  if (data.currentPage === 'business') {
    redirectURL = '/root/business#locations?businessid='+data.businessid;
  }
  if (data.currentPage === 'case') {
    redirectURL = '/root/case#locations?caseid='+data.caseid;
  }
  if (data.currentPage === 'business') {
    redirectURL = '/root/product#locations?productid='+data.productid;
  }

  res.redirect(redirectURL);

});

// Change Status flow
router.post(`/:mode/flows/change-status/save`, function (req, res) {
  const data = req.session.data;

  const kase = array.findById(data.cases, data.caseid)

  const newActivity = Activities.buildChangeStatus(req.body, data.currentUser)

  kase.dateUpdated = today.short();
  kase.status = req.body.status;
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});

// Add comment flow
router.post(`/:mode/flows/add-comment/save`, function (req, res) {
  const data = req.session.data;

  const kase = array.findById(data.cases, data.caseid)

  const activityTemplate = require("./data/activities/templates").commentAdded;
  const newActivity = activityTemplate({
    commentText: data['new-comment'],
    author: data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});

// Add Corrective Action flow
router.post(`/:mode/flows/record-corrective-action/save`, function(req, res) {
  const data = req.session.data;
  
  const kase = array.findById(data.cases, data.caseid)

  activityTemplate = require('./data/activities/templates').correctiveAction
  const newActivity = activityTemplate({
    summary: data['corrective-action-summary'],
    productName: data['TODO-product-input-name'],
    legislation: data['input-autocomplete'],
    businessName: data['TODO-business-input-name'],
    decisionDate: date.shortFromInput(data["corrective-action-date-year"], data['corrective-action-date-month'], data['corrective-action-date-day']),
    attachment: data['corrective-action-file-upload-1'],
    description: data['corrective-action-details']
  })
  kase.activities.unshift(newActivity)
  kase.updated = today.short()
  res.redirect('/root/case')
})

// New activity flow
router.post('/:mode/flows/add-activity/choose', function (req, res) {
  let activity = res.locals.data['new-activity'];
  switch (activity) {
    case 'comment':
      res.redirect("/root/flows/add-comment/01-add-comment");
      break;
    case 'correspondence':
      res.redirect("/flows/add-correspondence/01-add-correspondence-context.html");
      break;
    case 'email':
      res.redirect("/flows/add-correspondence/01e-add-email-context.html");
      break;
    case 'phoneCall':
      res.redirect("/flows/add-correspondence/01p-add-phonecall-context.html");
      break;
    case 'meeting':
      res.redirect("/flows/add-correspondence/01m-add-meeting-context.html");
      break;
    case 'contact':
      res.redirect("/root/flows/contact/add/01.html");
      break;
    case 'product':
      res.redirect("/root/flows/product/add/01.html");
      break;
    case 'incident':
      res.redirect("/flows/add-incident/01-add-incident.html");
      break;
    case 'corrective-action':
      res.redirect("../record-corrective-action/01-record-corrective-action.html");
      break;
    case 'business':
      res.redirect("/root/flows/business/add/01.html");
      break;
    case 'testing-request':
      res.redirect("/flows/record-testing-request/01-record-testing-request.html");
      break;
    case 'test-result':
      res.redirect("/flows/record-test-result/01-record-test-result.html");
      break;
    default:
      res.render(path);
  }
});

// LISTS ----------------------------------------------------------------------

// Case list and search
router.get('/:mode/case-search', function (req, res, next) {
  res.locals.data.caseListSettings.q = "nick 32142";
  // TODO if we ever stop mocking out the search, then this could be a starting point. As, we're faking it
  // res.locals.data.caseListSettings.q = req.query.q
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
    const kase = array.findById(data.cases, req.body.caseToAssign)

    kase.assignee = req.body.assignee;
  }
  const newUser = req.body.currentUser;
  if (newUser && !data.users.includes(newUser)) {
    data.users.push(newUser);
  }
  next();
});

// Add your routes here - above the module.exports line
module.exports = router;

function buildTsCreateAttachments(data) {
  const testFile = Attachments.build({ title: "Test Results", filename: data.new.files.testing.upload });
  const riskFile = Attachments.build({ title: "Risk Assessment", filename: data.new.files.risk.upload });
  const relatedFile = Attachments.build({ title: "Related Attachment", filename: data.new.files.related.upload });
  return [testFile, riskFile, relatedFile ].filter(file => file.filename.length > 0)
}
