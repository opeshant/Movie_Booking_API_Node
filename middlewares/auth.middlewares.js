
const {errorresponseBody , successResponseBody} = require('../utils/responsebody');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

// valition for singUp request
// params req 0> https req object 
// params res -> http res object 
// params next -> next middleware

 
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

const validateSignInRequest = async (req , res , next) =>{

    if(!req.body.email){
        errorresponseBody.err = "no email provided for the sign in ";
        return res.status(400).json(errorresponseBody);
    }

    if(!req.body.password){
        errorresponseBody.err = "no password provided for sign in";
        return res.status(400).json(errorresponseBody);
    }

    // request is valid 
    next();

}

const isAuthenticated = async(req , res , next) =>{
    const token = req.headers["x-access-token"];

    try{

        if(!token){

            errorresponseBody.err = "no token provided";
            return res.status(403).json(errorresponseBody);
    }
    const response = jwt.verify(token , process.env.AUTH_KEY);
    if(!response){
        errorresponseBody.err = "token not verified";
        return res.status(401).json(errorresponseBody);
    }
    const user = await userService.getUserById(response.id);
    
    req.user = user.id;
    next();
}
    catch(error){
        if(error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError'){
            errorresponseBody.err = error.message;
            return res.status(401).json(errorresponseBody);
        }
        if(error.code == 404){
            errorresponseBody.message = "user doesnot exist";
            return res.status(error.code).json(errorresponseBody);
        }
        errorresponseBody.err = error;
        return res.status(500).json(errorresponseBody);
    }

}

const validateResetPasswordRequest = (req , res , next) =>{
     
    // validate old password presence
    if(!req.body.oldPassword){
        errorresponseBody.err = "missing the old password in the request";
        return res.status(400).json(errorresponseBody);
    }

    //validate newPassword presence 
    if(!req.body.newPassword){
        errorresponseBody.err = "missing the new password in the request";
        return res.status(400).json(errorresponseBody);
    }

    // everything is good 
    next();

}




module.exports ={
    validateSignUpRequest,
    validateSignInRequest,
    isAuthenticated,
    validateResetPasswordRequest
}