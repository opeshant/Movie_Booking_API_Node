 const { get } = require('mongoose');
const Movie = require('../models/movie.model');

 const getMovieById = async(id) =>{
    const movie = Movie.findById(id);
    console.log(movie);
    if(!movie){
        return {
            err : "No movie found for the corresponding id provided",
        }
    };
    return movie;

 }

 module.exports={
    getMovieById
 }