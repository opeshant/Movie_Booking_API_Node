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
    );

    app.get(
        '/mba/api/v1/bookings/:id',
        authMiddleware.isAuthenticated,
        bookingController.getBookingById
    )

    
    app.get(
        '/mba/api/v1/bookings/all',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        bookingController.getAllBookings
    );


    app.get(
        '/mba/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingController.getBookings
    );

    
    


};

module.exports = routes;