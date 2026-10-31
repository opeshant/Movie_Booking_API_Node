const userService = require('../services/user.service');
const {errorresponseBody , successResponseBody} = require('../utils/responsebody');
const {STATUS_CODES: STATUS} = require('../utils/constants');


const update = async(req , res) => {
    try{
        const response = await userService.updateUserRoleOrStatus(req.body , req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated the user";

        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){

        if(error.err){
            errorresponseBody.err = error.err;
            return res.status(error.code).json(errorresponseBody);
        }
        errorresponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorresponseBody);
    }
}

module.exports ={
    update,

}