const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');



const routes = (app) =>{
    app.post(
        '/mba/api/v1/auth/signUp',
        authMiddleware.validateSignUpRequest,
        authController.singUp
    );

    app.post(
        '/mba/api/v1/auth/signin',
        authMiddleware.validateSignInRequest,
        authController.signin
    );

    app.patch(
        '/mba/api/v1/auth/reset',
        authMiddleware.isAuthenticated,
        authController.resetPassword
    );
}

module.exports = routes;
