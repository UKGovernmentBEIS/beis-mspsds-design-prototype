const today = require('./date').today
const dateFactory = require('./date').date.shortFromInput

let lastCaseNumber = 18110802
const giveNextId = () => {
  prettyId = lastCaseNumber.toString().substring(0, 4) + '-' + lastCaseNumber.toString().substring(4, 8)
  lastCaseNumber = lastCaseNumber - 1
  return prettyId;
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

const setDateArguments = (daysApart, nonDefaultFields) => {
  nonDefaultFields.dateCreated = dateFactory(2018, 10, 18);
  nonDefaultFields.dateUpdated = dateFactory(2018, 10, 18 + daysApart);
  return nonDefaultFields;
}
const setHazardArguments = (hazard, nonDefaultFields) => {
  nonDefaultFields.report = { hazardType: hazard };
  return nonDefaultFields;
}

module.exports = {
  buildFromData: function(data) {
    let newCase = data.new;
    this.addDefaults(newCase);
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
  }, 
  buildDefaultWithDifferences: buildDefaultWithDifferences,
  setDateArguments: setDateArguments,
  setHazardArguments: setHazardArguments,
  buildHazardCase: (hazard, nonDefaultFields) => {
    nonDefaultFields.report = { hazardType: hazard };
    return buildDefaultWithDifferences(nonDefaultFields)
  }
}