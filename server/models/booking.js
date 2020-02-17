const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookingSchema = new Schema({
    user: {type: String, required: true},
    company: {type: String, required: true}, 
    date: {type: String, required: true},
    time: {type: String, required: true} 
  });
  
  module.exports = mongoose.model('Booking',BookingSchema);