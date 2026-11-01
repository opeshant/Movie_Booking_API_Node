
const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};

const {STATUS_CODES : STATUS } = require('../utils/constants');

// params req -> HTTP request object
// params res -> HTTP response object
// params next -> next middleware function 
// returns -> where the req is valid or not


const validateMovieCreateRequest = async (req, res, next) => {

    // validate the name
    if(!req.body.name) {
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the description
    if(!req.body.description) {
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the casts
    if(!Array.isArray(req.body.casts) || req.body.casts.length === 0) {
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate trailerurl 
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The trailer of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate releaseDate
    if(!req.body.releaseDate){
        badRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate director of the movie 

    if(!req.body.director){
        badRequestResponse.err = "The director  of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    
    next();
};

module.exports = {
    validateMovieCreateRequest
};
