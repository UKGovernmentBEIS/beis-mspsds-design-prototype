const today = require('./date').today

const buildDefaultWithDifferences = (nonDefaultFields) => {
  const reporterData = nonDefaultFields.report && nonDefaultFields.report.reporter
  const reporter = reporterData ? {
    type: reporterData.type || "Consumer",
    name: reporterData.name || "Jenny Patterson",
    phoneNumber: reporterData.phoneNumber || "",
    emailAddress: reporterData.emailAddress || "",
    otherDetails: reporterData.otherDetails || ""
  } : null;

  const reportData = nonDefaultFields.report;
  const report = reportData ? {
    type: reportData.type || 'Allegation',
    date: reportData.date || '18/10/2018',
    summary: reportData.summary || '',
    productType: reportData.productType || 'Toy',
    hazardType: reportData.hazardType || '',
    reporter: reporter
  } : null;

  return {
    id: nonDefaultFields.id || '1811-0758',
    type: nonDefaultFields.type || 'Case',
    status: nonDefaultFields.status || 'Open',
    title: nonDefaultFields.title || 'Undefined',
    visible: nonDefaultFields.visible || true,
    assignee: nonDefaultFields.assignee || 'Tim Harwood',
    team: nonDefaultFields.team || '',
    overdue: nonDefaultFields.overdue || 'Overdue',
    dateUpdated: nonDefaultFields.dateUpdated || '16/10/2018',
    dateCreated: nonDefaultFields.dateCreated || '18/10/2018',
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
  buildHazardCase: (hazard, nonDefaultFields) => {
    nonDefaultFields.report = { hazardType: hazard };
    return buildDefaultWithDifferences(nonDefaultFields)
  }
}