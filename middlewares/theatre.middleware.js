
const {errorResponseBody } = require('../utils/responsebody');


// params req -> HTTP request object
// params res -> HTTP response object
// params next -> next middleware function 
// returns -> where the req is valid or not


const validateTheatreCreateRequest = async(req , res , next) => {
    // validate the presence of name 
    if(!req.body.name){
        errorResponseBody.message = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validation for presnce of pincode
    if(!req.body.pincode){
        errorResponseBody.message = "the name of the pincode is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    // validation for the presence of city 

    if(!req.body.city){
        errorResponseBody.message = "the name of the city is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    // everyhting is fine move to the next middlewares 

    next();    
}

const validateUpdateMoviesRequest = async(req , res , next) => {
     
    //validation of update parameters
    if(req.body.insert === undefined){
        errorResponseBody.message = "The insert paramters is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validation of moviesIds are present
    if(!req.body.movieIds){
        errorResponseBody.message = "No movies was present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validation if movieIds is empty or not
    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.message ="expected arary fo movie Ids but found somehting else";
        return res.status(400).json(errorResponseBody)
    }

    
    // vaildation id length of array is greater than 1
    if(req.body.movieIds.length == 0){
        errorResponseBody.message = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }

    next();

}


module.exports ={
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}