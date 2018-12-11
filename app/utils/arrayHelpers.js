module.exports = {
  findById: function(arr, id) {
    return arr.find(function (element) {
      return element.id === id
    })
  },
  removeById: function(arr, value) {
     return arr.filter(function(ele){
         return ele.id != value;
     });
  },

  removeByValue: function(arr, value) {
    return arr.filter(function(ele) {
      return ele != value;
    })
  }
}
