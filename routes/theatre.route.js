const theatreController = require('../controller/theatre.controller');
const theatreMiddlewares = require('../middlewares/theatre.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.create
    );
}

module.exports = routes;