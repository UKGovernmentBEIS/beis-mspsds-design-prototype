const today = require('./date').today;

module.exports = {
    buildFromData: function(data) {

        if (!data.id) {
            data.id = "b-"+today.id("YYMM-HHmm-sss");
        }

        return {
            id:             data.id,
            companyNumber:  data.number,
            name:           data.name,
            type:           data.type,
            contact:        data.contact,
            address:        data.address +', '+ data.town +', '+ data.county +', '+ data.postcode +', '+ data.country ,
            attachments:    [],
            contacts:       [],
            locations:      []
        };
    }    
};