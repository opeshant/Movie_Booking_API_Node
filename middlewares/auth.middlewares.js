
const {errorresponseBody , successResponseBody} = require('../utils/responsebody');


const validateSignUpRequest = async (req , res , next) => {
    
    // validate name of the user
    if(!req.body.name){
        errorresponseBody.err = "name of the user is not present in the request"
        return res.status(400).json(errorresponseBody);
    }

    // validate email of the user
    if(!req.body.email){
        errorresponseBody.err = "email of user is not present in the request";
        return res.status(400).json(errorresponseBody);
    }
    // validate password presence of the user
    if(!req.body.password){
        errorresponseBody.err ="password of the user not present in the request";
        return res.status(400).json(errorresponseBody);
    }

    // request is valid
    next();
}





module.exports ={
    validateSignUpRequest,
}