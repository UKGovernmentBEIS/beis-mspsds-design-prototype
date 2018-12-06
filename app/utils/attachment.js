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
    }
}