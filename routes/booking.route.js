const bookingController = require('../controller/booking.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const bookingMiddlwares = require('../middlewares/booking.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingMiddlwares.validateBookingCreateRequest,
        bookingController.create
    );
};

module.exports = routes;