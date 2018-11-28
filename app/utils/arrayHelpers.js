module.exports = {
  removeByID: function(arr, value) {
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
