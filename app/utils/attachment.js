const today = require("./date").today;

module.exports = {
    isImage: function(filename) {
        return !!filename.match(/[\/.](gif|jpg|jpeg|tiff|png)$/i);
    },

    fileExtension: function(filename) {
        const fullStopIdx = filename.lastIndexOf(".")
        return filename.substring(fullStopIdx + 1)
    },
    build: function({
        title,
        filename = "",
        date = today.short(),
        description
    }) {
        const id = filename + Math.random()
        const type = this.isImage(filename) ? 'image' : 'document'
        const url = type === 'image' ? '/public/images/placeholder.png' : '/public/images/document-thumbnail.png'
        return {
            id,
            title,
            filename,
            date,
            type,
            description,
            thumbnail: url,
            url
        }
    },
    buildTsCreateAttachments: function(data) {
        const testFile = this.build({ title: "Test Results", filename: data.new.files.testing.upload });
        const riskFile = this.build({ title: "Risk Assessment", filename: data.new.files.risk.upload });
        const relatedFile = this.build({ title: "Related Attachment", filename: data.new.files.related.upload });
        return [testFile, riskFile, relatedFile].filter(file => file.filename.length > 0)
      }
}