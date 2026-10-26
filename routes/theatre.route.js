const theatreController = require('../controller/theatre.controller');
const theatreMiddlewares = require('../middlewares/theatre.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete(
        '/mba/api/v1/theatres/:id',
        theatreController.destroy
    );

    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    );

    app.patch(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );
    app.put(
        '/mba/api/v1/theatres',
        theatreController.update
    )

}



module.exports = routes;