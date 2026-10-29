const User = require('../models/user.model');
const userService = require('../services/user.service');
const {successResponseBody , errorresponseBody , errorResponseBody} = require('../utils/responsebody');

const jwt = require('jsonwebtoken');


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

const signin = async(req , res) =>{
    try{
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            errorresponseBody.err = "invalid password for the given email";
            errorresponseBody.code = 401;
            return res.status(401).json(errorresponseBody);
        }


        const token = jwt.sign({
        id : user.id ,
        email : user.email 
        },
        process.env.AUTH_KEY,
        {expiresIn : '1h'}
        );


        console.log(jwt.verify(token , process.env.AUTH_KEY));


        successResponseBody.message = "successfully logged in ";
        successResponseBody.data = {
            email : user.email,
            role : user.userRole,
            status : user.userStatus,
            token : token
        }
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorresponseBody.err = error.err;
            return res.status(error.code).json(errorresponseBody);
        }
        errorresponseBody.err = error.message;
        errorresponseBody.code = 500;
        return res.status(500).json(errorresponseBody)
    }
}


module.exports = {
    singUp,
    signin
}