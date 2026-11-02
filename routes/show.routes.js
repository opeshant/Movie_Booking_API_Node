const showController = require('../controller/show.controller');
const authMiddleware =  require('../middlewares/auth.middlewares');
const showMiddleware = require('../middlewares/show.middleware');


const routes = (app) =>{
    app.post(
        '/mba/api/v1/shows',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateCreateShowRequest,
        showController.create
    )

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    )
}


module.exports = routes;