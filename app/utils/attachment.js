module.exports = {
    isImage: function(filename) {
        return !!filename.match(/[\/.](gif|jpg|jpeg|tiff|png)$/i);
    },

    fileExtension: function(filename) {
        const fullStopIdx = filename.lastIndexOf(".")
        return filename.substring(fullStopIdx + 1)
    }
}