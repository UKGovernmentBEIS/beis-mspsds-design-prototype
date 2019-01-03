module.exports = {
    resetNew: function(req) {
        req.session.data.new = {
            files: {
                risk: {},
                testing: {},
                related: {},
                product: {},
                evidence: {},
            }
        }
    },
    resetConfirmation: function(req) {
        req.session.data.confirmation = {}
    }
}