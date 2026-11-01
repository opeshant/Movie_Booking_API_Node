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

    app.patch(
        '/mba/api/v1/bookings/:id',
        authMiddleware.isAuthenticated,
        bookingMiddlwares.canChangeStatus,
        bookingController.update
    )
};

module.exports = routes;