const { response } = require('express');
const theatreServices = require('../services/theatre.service');
const {successResponseBody , errorresponseBody} = require('../utils/responsebody');


const create = async (req , res) => {
    try{
        const response  = await theatreServices.createTheatre(req.body);

        if(response.err){
            errorresponseBody.err = response.err;
            errorresponseBody.message = "Validation failed on few paramters of the request body";
            return res.status(response.code).json(errorresponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "successfully created the theatre"
        return res.status(201).json(successResponseBody);

    }
    catch(error){
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }
}

const destroy = async (req , res) =>{
    try{
        const response = await theatreServices.deleteTheatre(req.params.id);
        
        if(response.err){
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleteds the given theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }
}

const getTheatre = async (req , res) =>{
    try{
        const response = await theatreServices.getTheatre(req.params.id);
        if(response.err){
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message ="Successfully fecthed the data of the theatre";
        return res.status(200).json(successResponseBody);
        

    }
    catch(error){
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }
}

const getTheatres = async(req , res)=>{
    try{
        const response = await theatreServices.getAllTheatres();
        successResponseBody.data = response;
        successResponseBody.message = "successfully fecth all the theaters";
        return res.status(200).json(successResponseBody);

    }
    catch(error){
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
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
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
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
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated movies in the theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }
}

module.exports={
        create,
        destroy,
        getTheatre,
        getTheatres,
        update,
        updateMovies
    }