const today = require('./date').today

module.exports = {
  addDefaults: function (kase) {
    const requiredListProperties = [
      'products',
      'businesses',
      'contacts',
      'attachments',
      'related',
      'activities',
    ]
    requiredListProperties.forEach(property => {
      if (kase[property] === undefined) {
        kase[property] = []
      }
    })
    if (kase.title === undefined) {
      kase.title = 'Undefined'
    }
    if (kase.status === undefined) {
      kase.status = 'Open'
    }
    if (kase.visible === undefined) {
      kase.visible = true
    }
    return kase
  },
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
  }
}
