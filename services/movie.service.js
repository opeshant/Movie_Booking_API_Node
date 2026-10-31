
const Movie = require('../models/movie.model');


// params data -> object containg data of the new movie to be created
// returns -> returns the new movie created

const createMovie = async(data) => {
    try {

        const movie = await Movie.create(data);
        return movie;

    }
    catch(error){

        if(error.name == 'ValidationError'){

            let err = {};

            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });

            console.log(err);

            return {err : err, code : 422};
        }
        else {
            throw error;
        }
    }
}



//params id -> id which will be used to identify the movie to be deleted
// returns -> using the function findByIdAndDelete 
// returns -> object conatining the details of the  deleted movie

const deleteMovie = async(id) => {

    try{
        const response = await Movie.findByIdAndDelete(id);
        if(!response){
            return {
                err : "No movie record fpund for the id provided",
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


// params id -> id which will be used to identify the movie to be fetched
// returns -> objects containing the movie fecthed

const getMovieById = async(id) => {

    const movie = await Movie.findById(id);

    console.log(movie);

    if(!movie){
        return {
            err : "No movie found for the corresponding id provided",
            code : 404
        };
    }

    return movie;
}





// params id -> id used to identify movie to be updated 
// params data -> actual data which is to be updated in the db
// returns -> returns the new updated movie deatils

const updateMovie = async(id, data) => {

    try {

        const movie = await Movie.findByIdAndUpdate(
            id,
            data,
            {
                new : true,
                runValidators : true
            }
        );

        if(!movie){
            return {
                err : "No movie found for the corresponding id provided",
                code : 404
            };
        }

        return movie;

    }
    catch(error){

        if(error.name == 'ValidationError'){

            let err = {};

            Object.keys(error.errors).forEach((key)=>{

                err[key] = error.errors[key].message;

            });

            console.log(err);

            return {err : err, code : 422};
        }
        else {
            throw error;
        }
    }
}



// params filter -> filter will help us in filtering out data based onthe conditions it contains 
// returns an object containg all the movies fetechd based on the filter

const fetchMovies = async (filter)=>{
    let query ={};
    if(filter.name){
        query.name = filter.name;
    }
    let movies = await Movie.find(query);
    if(!movies){
        return {
            err:"not abel to find query movies",
            code : 404 
        }
    }
    return movies;
}


module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
};
