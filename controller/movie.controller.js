
const Movie = require('../models/movie.model');
// controller function to create a new movie it returns 
// // movie created 
// in req expects as object 
const movieServices = require('../services/movie.service');


const errorresponseBody = {
    err :{},
    data :{},
    message:"something went wrong",
    sucesss:false,
    code : 404
}

const successResponseBody={
     err :{},
    data :{},
    message:"successfully proceessed the request",
    sucesss:true,
}

const createMovie = async (req , res) =>{

      try { 
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success : true,
            error :{},
            data : movie , 
            message : "successfully created a new movie"

        })

      }
      catch (err){
        console.log(err);
        return res.status(500).json({
            success: false , 
            data:{},
            message:"something is wrong"
        })
      }
};
  
const deleteMovie = async (req , res) =>{
    try{
        const response = await Movie.deleteOne({
            _id : req.params.id
        });
        return res.status(200).json({
            success:true,
            error:{},
            message:'successfully deleted the movie',
            data:response
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            error : err,
            message:'somethiong went wrong',
            data:{}
        })
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


module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
}
