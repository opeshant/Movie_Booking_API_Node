const theatreController = require('../controller/theatre.controller');
const theatre = require('../models/theatre.model');

const routes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreController.create
    );
}

module.exports = routes;