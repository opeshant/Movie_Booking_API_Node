
const Movie = require('../models/movie.model');
// controller function to create a new movie it returns 
// // movie created 
// in req expects as object 

const movieServices = require('../services/movie.service');
const {successResponseBody , errorResponseBody} = require('../utils/responsebody');
const {STATUS_CODES : STATUS} = require('../utils/constants');




const createMovie = async (req , res) =>{

      try { 
        const response = await movieServices.createMovie(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "successfully created the moovie";
        return res.status(STATUS.CREATED).json(successResponseBody)
      }
      catch (error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json();

      }
};
  
const deleteMovie = async (req , res) =>{
    try{
        const response = await movieServices.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully deleted the movie";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
};

const getMovie = async (req , res) =>{
    try{
        const response = await movieServices.getMovieById(req.params.id);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);

    }
    catch(error){

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);

    }
};

const updateMovie = async(req , res) => {
    try{
        const response = await movieServices.updateMovie(req.params.id , req.body);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
        
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovies = async (req , res) =>{
    try{
        const response = await movieServices.fetchMovies(req.query);
        successResponseBody.data = response; 
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
       errorResponseBody.err = error;
       return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
};


module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
};

