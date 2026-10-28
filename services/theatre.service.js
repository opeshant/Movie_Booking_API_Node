const theatre = require('../models/theatre.model');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

// params data -> object containing deatils of the theatre to be vreated 
// returns -> object with the new theatre details 

const createTheatre = async(data) => {
    try{
    const response = await Theatre.create(data);
    return response;
    }
    catch(error){

        if(error.name == "ValidationError" ){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err : err , code : 422};
        }
        console.log(error);
        throw error;
    }
}



// params id -> unique id using which we can identufy the theatre to be deleted
// return -> returns the deleted theatre object 

const deleteTheatre = async (id) => {
    try{
        const response = await Theatre.findByIdAndDelete(id);
       if(!response){
        return {
            err :"No record of a theatre found for the given theatre",
            code : 404
        }
       }

        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


// 
const getTheatre = async (id)=>{
    //params id - id the unique id based on which we will fecth a theatre
    try{

    const response = await Theatre.findById(id);
    if(!response){
        // no element or no record found for the given id
        return {
            err : "no theatre found for the given id ",
            code : 404
        }
    }
    return response;

    }
    catch(error){
        console.log(error);
        throw error;
    }
    
}



// params data -> data to be used to filter out theatres based on city / pincode
// returns -> object with the filters contents of the theatres

const getAllTheatres = async (data) =>{
    try{
       

        let query={};
        let pagination={};

        if(data && data.city){
            // this check whether city is present in query params or not 
            query.city = data.city;
        }
        if(data && data.pincode){
            // this is going to seprately check whether 
            query.pincode = Number(data.pincode);
        }
        if(data && data.name){
            // this checks whether name is present in query params or not 
            query.name = data.name;
        }
        if(data && data.movieId){
            // let movie = await Movie.findById(data.movieId);

            query.movies = {$all : data.movieId }
        }
        if(data && data.limit){
            pagination.limit = Number(data.limit);
        }
        
        if(data && data.skip){
            // for first page we send skip as 0 
            let perpPage = (data.limit) ? data.limit: 5;
            pagination.skip = data.skip*perpPage;
        }

        const response = await Theatre.find(query , {} , pagination); 
        return response;

    }
    catch(error){
        console.log(error);
        throw error;
    }
}

// mongooose has a find function which expects js object as a input paramter
// if object is empty then find function return all the data
//otherwise based on the key value pairs prsent in the object mongoose does filteration on the database 
// the key is attribute name of the document of the collections
// and in the value of the pair we put some custome value to it 







/// params id -> id used for identify the movie to be updated
// params data -> data object to be used to update the theatre 
// returns -> it returns the new updated theatre object 

const updateTheatre = async(id , data)=>{
    try{
        const response = await Theatre.findByIdAndUpdate(id , data , {new : true , runValidators : true});
        if(!response){
            return {
                err : "no theatre found for the corresponding id",
                code : 404
            }
        }
        return response;
    }
    catch(error){
        if(error.name == 'ValidationError'){
            let err ={};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {err : err , code : 422};
        }
        throw error;
    }
}






const updateMoviesInTheatres = async(theatreId , movieIds , insert) => {
    try{

        let theatre;
        if(insert){
        // we need to add movies 
         theatre = await Theatre.findByIdAndUpdate(
            {_id : theatreId},
            {$addToSet : {movies : {$each : movieIds}}},
            {new : true}
         );

    }

    else {

        // we need to remove movies
        await Theatre.updateOne(
            {_id : theatre},
            {$pull : {movies :{$in : movieIds}}},
            {new : true}
        )
    }
    // const theatre = await Theatre.findById(theatreId);
    return theatre.populate('movies');

    }

    catch(error){
        if(error.name == "TypeError"){
            return {
                code : 404 , 
                err : "no theatre found for the given id"
            }
        }
        console.log(error);
        throw error;
    }
}

const getMoviesInATheatre = async(id)=>{

    try{
        const theatre = await Theatre.findById(id , {name : 1 , movies : 1}).populate('movies');
        // by this we will only get name and movies only and nothing more 
        // populate -> gives whole object rathre than giving only name 
        
        if(!theatre){
            return {
                err : "no theatre with the given id given",
                code : 404
            }
        }
        return theatre;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}




module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre
}