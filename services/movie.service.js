const { get } = require('mongoose');
const Movie = require('../models/movie.model');



const createMovie = async(data) => {
    const movie = await Movie.create(data);
    return movie;
}

const deleteMovie = async(id) =>{
    const reponse = await Movie.findByIdAndDelete(id)
    return reponse;
}

 const getMovieById = async(id) =>{
    const movie = await Movie.findById(id);
    console.log(movie);
    if(!movie){
        return {
            err : "No movie found for the corresponding id provided",
        }
    };
    return movie;

 }

 module.exports={
    getMovieById,
    createMovie,
    deleteMovie
 }