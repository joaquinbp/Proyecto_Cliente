const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controllers');
const md_auth = require('../middleware/authenticated');

router.get('/', md_auth.ensureAuth, bookingController.getBookings);
router.post('/', md_auth.ensureAuth, bookingController.createBooking);
router.get('/:id', md_auth.ensureAuth, bookingController.getBooking);
router.put('/:id', md_auth.ensureAuth, bookingController.editBooking);
router.delete('/:id', md_auth.ensureAuth,  bookingController.deleteBooking);

module.exports = router;