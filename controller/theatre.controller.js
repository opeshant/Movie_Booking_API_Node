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
        const reponse = await theatreServices.deleteTheatre(req.params.id);
        
        if(response.err){
            errorresponseBody.err = response.err;
            return res.status(response.code).json(errorresponseBody);
        }

        successResponseBody.data = reponse;
        successResponseBody.message = "Successfully deleteds the given theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }
}

module.exports={
        create,
        destroy
    }