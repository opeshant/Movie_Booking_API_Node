const userService = require('../services/user.service');
const {successResponseBody , errorresponseBody , errorResponseBody} = require('../utils/responsebody');



const singUp = async (req , res ) => {
    try{
        const response = await userService.creatUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "successfully registred a user";
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        
       if(error.err){
        errorresponseBody.err = error.err;
        errorresponseBody.code = error.code;
        return res.status(error.code).json(errorresponseBody);
       }
       errorresponseBody.err = error.message;
       errorresponseBody.code = 500;
       return res.status(500).json(errorresponseBody);
}
}


module.exports = {
    singUp
}