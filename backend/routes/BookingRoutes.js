const { Router } = require("express");
const BookingController = require("../controllers/BookingController");
const bookingRouter = Router();

bookingRouter.post("/bookings", BookingController.handleCreateBooking);

module.exports = bookingRouter;