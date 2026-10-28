const userService = require('../services/user.service');
const {successResponseBody , errorResponseBody} = require('../utils/responsebody');

const singUp = async (req , res ) => {
    try{
        const response = await userService.creatUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "successfully registred a user";
        return res.status(201).json(successResponseBody);
    }
    catch(error){
       errorResponseBody.err = error;
       return res.status(500).json(errorResponseBody);
}
}
module.exports = {
    singUp
}