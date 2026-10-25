
const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};

const validateMovieCreateRequest = async (req, res, next) => {

    // validate the name
    if(!req.body.name) {
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the description
    if(!req.body.description) {
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the casts
    if(!Array.isArray(req.body.casts) || req.body.casts.length === 0) {
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate trailerurl 
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The trailer of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate releaseDate
    if(!req.body.releaseDate){
        badRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate director of the movie 

    if(!req.body.director){
        badRequestResponse.err = "The director  of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    
    next();
};

module.exports = {
    validateMovieCreateRequest
};
