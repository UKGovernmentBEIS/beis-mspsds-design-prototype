const dateFactory   = require('../utils/date').date.shortFromInput;

let lastCaseNumber = 18110802;
const giveNextId = () => {
  prettyId = lastCaseNumber.toString().substring(0, 4) + '-' + lastCaseNumber.toString().substring(4, 8);
  lastCaseNumber = lastCaseNumber - 1;
  return prettyId;
};

buildDefaultWithDifferences = (nonDefaultFields) => {
  const reporterData = nonDefaultFields.report && nonDefaultFields.report.reporter;

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
    creatorTeam: nonDefaultFields.creatorTeam || 'OPSS - IMU',
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
  };
};


setDateArguments = (daysApart, nonDefaultFields) => {
  nonDefaultFields.dateCreated = new Date(2018, 10 - 1, 18);
  nonDefaultFields.dateUpdated = new Date(2018, 10 - 1, 18 + daysApart);
  return nonDefaultFields;
};

setHazardArguments = (hazard, nonDefaultFields) => {
  nonDefaultFields.report = {
    hazardType: hazard
  };
  return nonDefaultFields;
};

module.exports = {
  buildDefaultWithDifferences: buildDefaultWithDifferences,
  setDateArguments: setDateArguments,
  setHazardArguments: setHazardArguments,
}