module.exports = {
    resetNew: function(req) {
        req.session.data.new = {
            files: {
                risk: {},
                testing: {},
                related: {}
            }
        }
    }
}