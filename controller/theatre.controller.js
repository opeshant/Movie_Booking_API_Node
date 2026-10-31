const { response } = require('express');
const theatreServices = require('../services/theatre.service');
const {successResponseBody , errorResponseBody} = require('../utils/responsebody');
const {STATUS_CODES : STATUS} = require('../utils/constants');



const create = async (req , res) => {
    try{
        const response  = await theatreServices.createTheatre(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "successfully created the theatre"
        return res.status(STATUS.CREATED).json(successResponseBody);

    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy = async (req , res) =>{
    try{
        const response = await theatreServices.deleteTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleteds the given theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatre = async (req , res) =>{
    
    try{
        const response = await theatreServices.getTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message ="Successfully fecthed the data of the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }

    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres = async(req , res)=>{
    try{
        
        const response = await theatreServices.getAllTheatres(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "successfully fecth all the theaters";
        return res.status(STATUS.CREATED).json(successResponseBody);

    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async(req , res)=>{
    try{
        const response = await theatreServices.updateTheatre(req.params.id , req.body);
        if(!response){
            return {
                err : "no theatre found for the corresponding id",
                code : 404
            }
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully updates the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}




//params theatre id -> unqiue id of the theatre which we want to update 
//params movieIds -> array of movie ids that are expected to be updated in theatre 
// params insert -> boolean that tells us that whether we want to insert movies or remove them
// return updated theatre obejct 

const updateMovies = async (req , res) => {
    try{
        const response = await theatreServices.updateMoviesInTheatres(
            req.params.id , 
            req.body.movieIds,
            req.body.insert
        );
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated movies in the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async(req , res)=>{
    try{
        const response = await theatreServices.getMoviesInATheatre(req.params.id);
        if(response.err){
            errorResponseBody.err  = response.err;
           return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully fectehd the data for the following theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const checkMovie = async (req , res)=>{

     try{
        const response = await theatreServices.checkMovieInTheatre(req.params.theatreId , req.params.movieId);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "successfully checked if movie is present in the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);
     }
     catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
     }
}

module.exports={
        create,
        destroy,
        getTheatre,
        getTheatres,
        update,
        updateMovies,
        getMovies,
        checkMovie
    }