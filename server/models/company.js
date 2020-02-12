const mongoose = require('mongoose');
const {Schema} = mongoose;

const CompanySchema = new Schema({ 
    name: {type: String, required: true},
    CIF: {type: String, required: true}, 
    address: {type: String, required: true},
    city: {type: String, required: true}, 
    sector: {type: String, required: true}   
  });

  module.exports = mongoose.model('Company',CompanySchema);