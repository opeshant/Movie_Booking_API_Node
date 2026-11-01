
const movieController = require('../controller/movie.controller');
// const movie = require('../models/movie.model');
const movieMiddlewares = require("../middlewares/movie.middlewares")
const authMideelwares = require('../middlewares/auth.middlewares');


const routes = (app) =>{
// routes function takes express app object as parameter 

    //CREATE
    app.post('/mba/api/v1/movies' , 
       authMideelwares.isAuthenticated,
       authMideelwares.isAdminOrClient,
       movieMiddlewares.validateMovieCreateRequest,
       movieController.createMovie
    );

    //DELETE
    app.delete(
        '/mba/api/v1/movies/:id',
        authMideelwares.isAuthenticated,
        authMideelwares.isAdminOrClient,
        movieController.deleteMovie
    );

    // READ
    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    )
    

    //UPDATE
    app.put(
        '/mba/api/v1/movies/:id',
        authMideelwares.isAuthenticated,
        authMideelwares.isAdminOrClient,
        movieController.updateMovie
    )

    //UPDATE
    app.patch(
        '/mba/api/v1/movies/:id',
        authMideelwares.isAuthenticated,
        authMideelwares.isAdminOrClient,
        movieController.updateMovie
    )

    //READ
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )


}


module.exports = routes;
