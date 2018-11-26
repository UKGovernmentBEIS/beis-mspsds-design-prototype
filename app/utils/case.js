module.exports = {
  addDefaults: function (kase) {
    const requiredListProperties = [
      'incidents',
      'products',
      'businesses',
      'contacts',
      'attachments',
      'related',
      'activites',
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
    return kase
  }
}