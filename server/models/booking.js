const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookingSchema = new Schema({
    id_user: {type: String, required: true},
    id_company: {type: String, required: true}, 
    user: {type: String, required: true},
    company: {type: String, required: true}, 
    date: {type: String, required: true},
    time: {type: String, required: true} 
  });
  
  module.exports = mongoose.model('Booking',BookingSchema);