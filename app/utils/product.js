const today = require('./date').today

module.exports = {
    buildFromData: function(data) {
        return {
            id: "p"+today.id(),
            name: data.new.report.product.name,
            type: data.new.report.productType,
            category: data.new.report.product.category,
            code: data.new.report.product.code,
            description: data.new.report.product.description,
            attachments: [],
            businesses: []
        }
    }    
}