const authController = require('../controller/auth.controller');

const routes = (app) =>{
    app.post(
        '/mba/api/v1/auth/singUp',
        authController.singUp
    )
}

module.exports = routes;
