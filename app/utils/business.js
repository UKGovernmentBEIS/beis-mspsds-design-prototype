const today = require('./date').today

module.exports = {
    buildFromData: function(data) {
        return {
            id:             "b"+today.id(),
            companyNumber:  data.new.report.business.number,
            name:           data.new.report.business.name,
            type:           data.new.report.business.type,
            address:        data.new.report.business.address +', '+ data.new.report.business.country +', '+ data.new.report.business.postcode ,
            attachments:    [],
            contacts:       [],
            locations:      []
        }
    }    
}