
const {errorresponseBody , successResponseBody} = require('../utils/responsebody');
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
        errorresponseBody.err = "name of the user is not present in the request"
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    // validate email of the user
    if(!req.body.email){
        errorresponseBody.err = "email of user is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }
    // validate password presence of the user
    if(!req.body.password){
        errorresponseBody.err ="password of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    // request is valid
    next();
}

const validateSignInRequest = async (req , res , next) =>{

    if(!req.body.email){
        errorresponseBody.err = "no email provided for the sign in ";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    if(!req.body.password){
        errorresponseBody.err = "no password provided for sign in";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    // request is valid 
    next();

}

const isAuthenticated = async(req , res , next) =>{
    const token = req.headers["x-access-token"];

    try{

        if(!token){

            errorresponseBody.err = "no token provided";
            return res.status(STATUS.FORBBIDEN).json(errorresponseBody);
    }
    const response = jwt.verify(token , process.env.AUTH_KEY);
    if(!response){
        errorresponseBody.err = "token not verified";
        return res.status(STATUS.UNAUTHORIZED).json(errorresponseBody);
    }
    const user = await userService.getUserById(response.id);
    
    req.user = user.id;
    next();
}
    catch(error){
        if(error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError'){
            errorresponseBody.err = error.message;
            return res.status(STATUS.UNAUTHORIZED).json(errorresponseBody);
        }
        if(error.code == STATUS.NOT_FOUND){
            errorresponseBody.message = "user doesnot exist";
            return res.status(error.code).json(errorresponseBody);
        }
        errorresponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorresponseBody);
    }

}

const validateResetPasswordRequest = (req , res , next) =>{
     
    // validate old password presence
    if(!req.body.oldPassword){
        errorresponseBody.err = "missing the old password in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    //validate newPassword presence 
    if(!req.body.newPassword){
        errorresponseBody.err = "missing the new password in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorresponseBody);
    }

    // everything is good 
    next();

}

const isAdmin = async(req , res, next) =>{
     
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        errorresponseBody.err = "user is not an admin , cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorresponseBody);
    }
    next();

}catch(error){
   errorresponseBody.err = error.err;
   errorresponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR || error.code).json(errorresponseBody);
}
};



const isClient = async(req , res , next)=>{
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        errorresponseBody.err = "user is not a client cannot procees with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorresponseBody);

    }
    next();

}
catch(error){
   errorresponseBody.err = error.err;
   errorresponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR || error.code).json(errorresponseBody);
}
};



const isAdminOrClient = async (req , res , next) =>{
    try{
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client){
        errorresponseBody.err = "user is not a client nor a admin cannot proceed with the request";
        return res.status(STATUS.UNAUTHORIZED).json(errorresponseBody);
    }
    next();
}
catch(error){

   errorresponseBody.err = error.err;
   errorresponseBody.message ="something went wrong";
   return res.status(STATUS.INTERNAL_SERVER_ERROR|| error.code).json(errorresponseBody);
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