const  User = require('../models/user.model');

const creatUser= async (data) => {
    try{
        const response = await User.create(data);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

module.exports ={
    creatUser
}