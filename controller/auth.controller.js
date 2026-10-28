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
       console.log("SIGNUP ERROR:", error);
       errorresponseBody.err = error;
       errorresponseBody.code = 500;
       return res.status(500).json(errorresponseBody);
}
}
module.exports = {
    singUp
}