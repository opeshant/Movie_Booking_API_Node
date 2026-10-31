const User = require("../models/user.model")
const { errorResponseBody } = require("../utils/responsebody")


const validateUpdateUserRequest= (req , res , next) =>{

     // validate presence of atleast one userRole or userStatus
     
    if(!(req.body.userRole || req.body.userStatus )){
        errorResponseBody.err = "malformed request please send atleast one paramter";
        return res.status(400).json(errorResponseBody);
    }

    next();
    
}

module.exports ={
    validateUpdateUserRequest,
}