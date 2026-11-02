const Show = require('../models/show.model');
const { STATUS_CODES: STATUS } = require('../utils/constants');
const Theatre = require('../models/theatre.model');


//params data -> this is the object containg deatisl do the show to be created
// returns -> objects with the new show details

const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre){
            throw{
                err : "No theatre found",
                code : STATUS.NOT_FOUND
            }
        }
        if(theatre.movies.indexOf(data.movieId) == -1){
            throw{
                err : "Movie is currently not availabel in request theatre",
                code : STATUS.NOT_FOUND
            }
        }
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABEL_ENTITY
            };
        }
        throw error;
    }
};

 
const getShows = async(data)=>{
    try{
        let filter ={};
        if(data.theatreId){
            filter.theatreId = data.theatreId;
        }
        if(data.movieId){
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if(!response){
            throw{
                err : "No shows found",
                code : STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        throw error;
    }
}
module.exports = {
    createShow,
    getShows
};