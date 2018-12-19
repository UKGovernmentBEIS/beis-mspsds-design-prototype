/* jshint esversion: 6 */

const today = require("./date").today;
const array = require("./arrayHelpers");

addLocation = (data) => {
  let newLocation = data.location;
  newLocation.id = 'l' + (data.locations.length + 1);
  const biz = array.findById(data.businesses, data.businessid);

  if (biz) {
    data.locations.push(newLocation);
    biz.locations.push({
      id: newLocation.id,
      role: data.location.name
    });
  }
};

deleteLocation = (data) => {
  const biz = array.findById(data.businesses, data.businessid);
  if (biz && biz.locations) {
    biz.locations = array.removeById(biz.locations, data.locationid);
  }
};

updateLocation = (data) => {
  let newLocation = data.location;
  newLocation.id = data.locationid;

  const loc = array.findById(data.locations, data.locationid);
  if (loc) {
    for (var k in loc) {
      loc[k] = newLocation[k];
    }
  }
};

module.exports = {
  addLocation: addLocation,
  deleteLocation: deleteLocation,
  updateLocation: updateLocation,
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

