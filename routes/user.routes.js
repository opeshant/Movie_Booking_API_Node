const userController = require('../controller/user.controller');
const userMiddlewares = require('../middlewares/user.middlewares');

const routes = (app) =>{
    app.patch(
        '/mba/api/v1/user/:id',
        userMiddlewares.validateUpdateUserRequest,
        userController.update
    )
}

module.exports = routes;
