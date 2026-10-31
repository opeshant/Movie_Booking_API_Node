
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
        if(response.err){
            errorResponseBody.err = response.err;
           
            errorResponseBody.message = "validation failed on few parameters on req body"
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully created the moovie";
        return res.status(201).json(successResponseBody)

      }
      catch (err){

        console.log(err.name);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json();

      }
};
  
const deleteMovie = async (req , res) =>{
    try{
        const response = await movieServices.deleteMovie(req.params.id);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        
        successResponseBody.data = response;
        successResponseBody.message = "successfully deleted the movie";
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
};

const getMovie = async (req , res) =>{
    try{
        const response = await movieServices.getMovieById(req.params.id);
        
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;

        return res.status(200).json(successResponseBody);

    }
    catch(err){

        console.log(err);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
};

const updateMovie = async(req , res) => {
    try{
        const response = await movieServices.updateMovie(req.params.id , req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "the updates that we are trying to apply does not validate the schema"
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
        
    }
    catch(err){
        console.log(err);
        errorResponseBody.err = err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovies = async (req , res) =>{
    try{
        const response = await movieServices.fetchMovies(req.query);
        if(response.err){
            errorResponseBody = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response; 
        return res.status(200).json(successResponseBody)
    }
    catch(error){
       console.log(error);
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

