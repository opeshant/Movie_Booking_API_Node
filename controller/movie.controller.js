
const Movie = require('../models/movie.model');
// controller function to create a new movie it returns 
// // movie created 
// in req expects as object 
const movieServices = require('../services/movie.service');

const {successResponseBody , errorresponseBody ,errorResponseBody} = require('../utils/responsebody');

const createMovie = async (req , res) =>{

      try { 
        const response = await movieServices.createMovie(req.body);
        if(response.err){
            errorresponseBody.err = response.err;
           
            errorresponseBody.message = "validation failed on few parameters on req body"
            return res.status(response.code).json(errorresponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully created the moovie";
        return res.status(201).json(successResponseBody)

      }
      catch (err){

        console.log(err.name);
        return res.status(500).json();

      }
};
  
const deleteMovie = async (req , res) =>{
    try{
        const response = await movieServices.deleteMovie(req.params.id);

        if(response.err){
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);
        }
        
        successResponseBody.data = response;
        successResponseBody.message = "successfully deleted the movie";
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(errorresponseBody)
    }
}

const getMovie = async (req , res) =>{
    try{
        const response = await movieServices.getMovieById(req.params.id);
        
        if(response.err){
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);
        }

        successResponseBody.data = response;

        return res.status(200).json(successResponseBody);

    }
    catch(err){

        console.log(err);
        return res.status(500).json(errorresponseBody)
    }
}

const updateMovie = async(req , res) => {
    try{
        const response = await movieServices.updateMovie(req.params.id , req.body);
        if(response.err){
            errorresponseBody.err = response.err;
            errorresponseBody.message = "the updates that we are trying to apply does not validate the schema"
            return res.status(response.code).json(errorresponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
        
    }
    catch(err){
        console.log(err);
        errorresponseBody.err = err;
        return res.status(500).json(errorresponseBody);
    }
}

const getMovies = async (req , res) =>{
    try{
        const response = await movieServices.fetchMovies(req.query);
        if(response.err){
            errorresponseBody = response.err;
            return res.status(response.code).json(errorresponseBody)
        }
        successResponseBody.data = response; 
        return res.status(200).json(successResponseBody)
    }
    catch(error){
       console.log(error);
       errorresponseBody.err = error;
       return res.status(500).json(errorresponseBody)
    }
}


module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}

