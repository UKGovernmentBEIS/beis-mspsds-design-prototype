/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const today = require("./utils/today");
const Cases = require("./utils/case");
const array = require("./utils/arrayHelpers");
const attachment = require("./utils/attachment");

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
  let newCase = req.session.data.new;

  Cases.addDefaults(newCase);

  newCase.dateCreated = today.short();
  newCase.dateUpdated = today.short();
  newCase.report.date = today.short();

  newCase.id = today.id();

  switch(newCase.report.type) {
    case "Allegation":  newCase.type = "Case"; break;
    case "Question":    newCase.type = "Question"; break;
    default:            newCase.type = "Case";
  }

  newCase.assignee = 'OPSS - Processing';

  const caseCareatedActivity = require("./data/activities/templates").caseCreated;
  newCase.activities.push(caseCareatedActivity());

  res.locals.data.cases.push(newCase);

  res.redirect('/root/case?caseid=' + newCase.id);
});



router.post('/:mode/flows/create/save', function (req, res) {
  let newCase = req.session.data.new;

  Cases.addDefaults(newCase);

  newCase.dateCreated = today.short();
  newCase.dateUpdated = today.short();
  newCase.report.date = today.short();

  newCase.id = today.id();

  switch(newCase.report.type) {
    case "Allegation":  newCase.type = "Case"; break;
    case "Question":    newCase.type = "Question"; break;
    default:            newCase.type = "Case";
  }

  if ( !newCase.assignee ) {
    newCase.assignee = req.session.data.currentUser;
  }

  if ( !newCase.creator ) {
    newCase.creator = req.session.data.currentUser;
  }


  const caseCareatedActivity = require("./data/activities/templates").caseCreated;
  newCase.activities.push(caseCareatedActivity());

  res.locals.data.cases.push(newCase);

  res.redirect('/root/case?caseid=' + newCase.id);
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
  const kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid;
  });

  let newAssignee = req.body.assignee;
  newAssignee = newAssignee === "Other" ? req.body["other-assignee"] : newAssignee;

  const assignedActivityTempalte = require("./data/activities/templates").assigned;
  const newActivity = assignedActivityTempalte({
    assignee: newAssignee,
    author: res.locals.data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.assignee = newAssignee;
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});


// Location flow
router.post('/:mode/flows/location/save', function (req, res) {

  let newLocation   = req.session.data.location;
  newLocation.id    = 'l' + (res.locals.data.locations.length + 1);

  res.locals.data.locations.push(newLocation);

  if (res.locals.data.currentPage === 'business') {

    let biz = res.locals.data.businesses.find(function (b) {
      return b.id === res.locals.data.businessid;
    });

    if (biz) {
      biz.locations.push({
        id:     newLocation.id,
        role:   req.session.data.location.name
      });
    }

    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);

  }

  res.redirect('404');

});

router.post('/:mode/flows/location/delete', function (req, res) {

  if (res.locals.data.currentPage === 'business') {

    let biz = res.locals.data.businesses.find(function (b) {
      return b.id === req.session.data.businessid;
    });

    if (biz && biz.locations) {
      biz.locations = array.removeByID(biz.locations, req.session.data.locationid);
    }
    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);
  }

  res.redirect('404');

});



router.post('/:mode/flows/location/update', function (req, res) {

  if (res.locals.data.currentPage === 'business') {

    let newLocation   = req.session.data.location;
    newLocation.id    = req.session.data.locationid;


    let loc = res.locals.data.locations.find(function (l) {
      return l.id === req.session.data.locationid;
    });

    if (loc) {
      for (var k in loc) {
        loc[k] = newLocation[k];
      }
    }

    res.redirect('/root/business#locations?businessid='+req.session.data.businessid);
  }

  res.redirect('404');

});






// Attachment flow
router.post('/:mode/flows/attachment/save', function (req, res) {

  let newAttachment   = req.session.data.attachment;
  newAttachment.id    = 'at' + (res.locals.data.attachments.length + 1);

  res.locals.data.attachments.push(newAttachment);

  let obj = null;
  let redirectURL = '404';

  if (res.locals.data.currentPage === 'business') {
    obj = res.locals.data.businesses.find(function (b) {
      return b.id === res.locals.data.businessid;
    });
    redirectURL = '/root/business#locations?businessid='+res.locals.data.businessid;
  }

  if (res.locals.data.currentPage === 'case') {
    obj = res.locals.data.cases.find(function (c) {
      return c.id === res.locals.data.caseid;
    });

    const addAttachmentActivityTemplate = require("./data/activities/templates").addAttachment;
    const newActivity = addAttachmentActivityTemplate({
      author: res.locals.data.currentUser,
      title: req.body.attachment.title,
      description: req.body.attachment.description,
      isImage: attachment.isImage(req.body.attachment.url),
      fileExtension: attachment.fileExtension(req.body.attachment.url)
    });

    obj.activities.unshift(newActivity);

    redirectURL = '/root/case#locations?caseid='+res.locals.data.caseid;
  }

  if (res.locals.data.currentPage === 'product') {
    obj = res.locals.data.products.find(function (p) {
      return p.id === res.locals.data.productid;
    });
    redirectURL = '/root/product#locations?productid='+res.locals.data.productid;
  }

  if (obj) {
    obj.attachments.push(newAttachment.id);
  }


  res.redirect(redirectURL);

});




router.post('/:mode/flows/attachment/delete', function (req, res) {

  let redirectURL = '404';

  if (res.locals.data.currentPage === 'business') {
    let biz = res.locals.data.businesses.find(function (b) {
      return b.id === res.locals.data.businessid;
    });

    redirectURL = '/root/business#locations?businessid='+res.locals.data.businessid;

    if (biz) {
      biz.attachments = array.removeByValue(biz.attachments, req.session.data.attachmentid);
    }
  }

  if (res.locals.data.currentPage === 'case') {
    let kase = res.locals.data.cases.find(function (c) {
      return c.id === res.locals.data.caseid;
    });

    if (kase) {
      kase.attachments = array.removeByValue(kase.attachments, req.session.data.attachmentid);
    }

    redirectURL = '/root/case#locations?caseid='+res.locals.data.caseid;
  }

  if (res.locals.data.currentPage === 'product') {
    let prod = res.locals.data.products.find(function (p) {
      return p.id === res.locals.data.productid;
    });

    if (prod) {
      prod.attachments = array.removeByValue(prod.attachments, req.session.data.attachmentid);
    }

    redirectURL = '/root/product#locations?productid='+res.locals.data.productid;
  }

   res.redirect(redirectURL);

});


router.post('/:mode/flows/attachment/update', function (req, res) {

  let newAttachment   = req.session.data.attachment;
  newAttachment.id    = req.session.data.attachmentid;
  newAttachment.date  = today.short();

  let att = res.locals.data.attachments.find(function (a) {
    return a.id === req.session.data.attachmentid;
  });

  if (att) {
    for (var k in att) {
      att[k] = newAttachment[k];
    }
  }

  let redirectURL = '404';

  if (res.locals.data.currentPage === 'business') {
    redirectURL = '/root/business#locations?businessid='+res.locals.data.businessid;
  }
  if (res.locals.data.currentPage === 'case') {
    redirectURL = '/root/case#locations?caseid='+res.locals.data.caseid;
  }
  if (res.locals.data.currentPage === 'business') {
    redirectURL = '/root/product#locations?productid='+res.locals.data.productid;
  }

  res.redirect(redirectURL);

});

// Change Status flow
router.post(`/:mode/flows/change-status/save`, function (req, res) {
  const kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid;
  });

  const changeStatusActivityTempalte = require("./data/activities/templates").changedStatus;
  const newActivity = changeStatusActivityTempalte({
    status: req.body.status,
    description: req.body['status-description'],
    author: res.locals.data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.status = req.body.status;
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});

// Add comment flow
router.post(`/:mode/flows/add-comment/save`, function (req, res) {
  const kase = res.locals.data.cases.find(function (c) {
    return c.id === req.session.data.caseid;
  });

  const activityTemplate = require("./data/activities/templates").commentAdded;
  const newActivity = activityTemplate({
    commentText: res.locals.data['new-comment'],
    author: res.locals.data.currentUser,
    date: today.long()
  });

  kase.dateUpdated = today.short();
  kase.activities.unshift(newActivity);

  res.redirect('/root/case');
});

// New activity flow
router.post('/:mode/flows/add-activity/choose', function (req, res) {
  let activity = res.locals.data['new-activity'];
  switch (activity) {
    case 'comment':
      res.redirect("/root/flows/add-comment/01-add-comment");
      break;
    case 'correspondance':
      res.redirect("/flows/add-correspondence/01-add-correspondence-context.html");
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
    case 'hazard':
      res.redirect("/root/flows/add-hazard/01.html");
      break;
    case 'risk':
      res.redirect("/root/flows/add-risk/01.html");
      break;
    case 'corrective-action':
      res.redirect("/flows/record-corrective-action/01-record-corrective-action.html");
      break;
    case 'business':
      res.redirect("/root/flows/business/add/01.html");
      break;
    case 'testing':
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
  if (req.body.caseToAssign !== undefined) {
    const kase = res.locals.data.cases.find(function (c) {
      return c.id === req.body.caseToAssign;
    });
    kase.assignee = req.body.assignee;
  }
  const newUser = req.body.currentUser;
  if (newUser && !res.locals.data.users.includes(newUser)) {
    res.locals.data.users.push(newUser);
  }
  next();
});

// Add your routes here - above the module.exports line
module.exports = router;
