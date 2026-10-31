const User = require("../models/user.model")
const { errorresponseBody } = require("../utils/responsebody")


const validateUpdateUserRequest= (req , res , next) =>{

     // validate presence of atleast one userRole or userStatus
     
    if(!(req.body.userRole || req.body.userStatus )){
        errorresponseBody.err = "malformed request please send atleast one paramter";
        return res.status(400).json(errorresponseBody);
    }

    next();
}

module.exports ={
    validateUpdateUserRequest,
}