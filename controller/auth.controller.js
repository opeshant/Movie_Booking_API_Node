const User = require('../models/user.model');
const userService = require('../services/user.service');
const {successResponseBody , errorResponseBody} = require('../utils/responsebody');

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
        errorResponseBody.err = error.err;
        errorResponseBody.code = error.code;
        return res.status(error.code).json(errorResponseBody);
       }
       errorResponseBody.err = error.message;
       errorResponseBody.code = 500;
       return res.status(500).json(errorResponseBody);
}
}

const signin = async(req , res) =>{
    try{
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            errorResponseBody.err = "invalid password for the given email";
            errorResponseBody.code = 401;
            return res.status(401).json(errorResponseBody);
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
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.code = 500;
        return res.status(500).json(errorResponseBody)
    }
}

const resetPassword = async (req , res) =>{

    try{
        const user = await userService.getUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if(!isOldPasswordCorrect){
            throw {err : "invalid old password , please write the correct password" , code : 403}
        }
        user.password =  req.body.newPassword;
        await user.save();

        successResponseBody.data = user;
        successResponseBody.message ="successfully updated the password for the given request";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
       return res.status(500).json(errorResponseBody);
    }
}


module.exports = {
    singUp,
    signin,
    resetPassword
}