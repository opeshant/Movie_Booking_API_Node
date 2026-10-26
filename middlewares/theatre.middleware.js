
const {errorresponseBody } = require('../utils/responsebody');


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



module.exports ={
    validateTheatreCreateRequest
}