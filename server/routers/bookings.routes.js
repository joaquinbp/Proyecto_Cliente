const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controllers');

router.get('/',bookingController.getBookings);
router.post('/', bookingController.createBooking);
router.get('/:id',bookingController.getBooking);
router.put('/:id',bookingController.editBooking);
router.delete('/:id',bookingController.deleteBooking);

module.exports = router;