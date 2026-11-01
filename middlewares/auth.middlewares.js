
const {errorResponseBody , successResponseBody} = require('../utils/responsebody');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const {USER_ROLE , USER_STATUS} = require('../utils/constants');
const {STATUS_CODES : STATUS} = require('../utils/constants');
// valition for singUp request
// params req 0> https req object 
// params res -> http res object 
// params next -> next middleware

 
const validateSignUpRequest = async (req , res , next) => {
    
    // validate name of the user
    if(!req.body.name){
        errorResponseBody.err = "name of the user is not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate email of the user
    if(!req.body.email){
        errorResponseBody.err = "email of user is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate password presence of the user
    if(!req.body.password){
        errorResponseBody.err ="password of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // request is valid
    next();
}

const validateSignInRequest = async (req , res , next) =>{

    if(!req.body.email){
        errorResponseBody.err = "no email provided for the sign in ";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.password){
        errorResponseBody.err = "no password provided for sign in";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // request is valid 
    next();

}

const isAuthenticated = async(req , res , next) =>{
    const token = req.headers["x-access-token"];

    try{

        if(!token){

            errorResponseBody.err = "no token provided";
            return res.status(STATUS.FORBBIDEN).json(errorResponseBody);
    }
    const response = jwt.verify(token , process.env.AUTH_KEY);
    if(!response){
        errorResponseBody.err = "token not verified";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    const user = await userService.getUserById(response.id);
    
    req.user = user.id;
    next();
}
    catch(error){
        if(error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError'){
            errorResponseBody.err = error.message;
            return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
        }
        if(error.code == STATUS.NOT_FOUND){
            errorResponseBody.message = "user doesnot exist";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }

}

const validateResetPasswordRequest = (req , res , next) =>{
     
    // validate old password presence
    if(!req.body.oldPassword){
        errorResponseBody.err = "missing the old password in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    //validate newPassword presence 
    if(!req.body.newPassword){
        errorResponseBody.err = "missing the new password in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // everything is good 
    next();

}

const isAdmin = async(req , res, next) =>{
     
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.err = "user is not an admin , cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    next();

}catch(error){
   errorResponseBody.err = error.err;
   errorResponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR || error.code).json(errorResponseBody);
}
};



const isClient = async(req , res , next)=>{
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        errorResponseBody.err = "user is not a client cannot procees with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);

    }
    next();

}
catch(error){
   errorResponseBody.err = error.err;
   errorResponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR || error.code).json(errorResponseBody);
}
};



const isAdminOrClient = async (req , res , next) =>{
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client){
        errorResponseBody.err = "user is not a client nor a admin cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    next();
}
catch(error){

   errorResponseBody.err = error.err;
   errorResponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR|| error.code).json(errorResponseBody);
}
};


module.exports ={
    validateSignUpRequest,
    validateSignInRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}