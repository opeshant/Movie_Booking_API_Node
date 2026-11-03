const { STATES } = require('mongoose');
const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS_CODES : STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responsebody');
const {USER_ROLE} = require('../utils/constants');

const create = async (req , res) =>{

    try{
        const response = await paymentService.creatPayment(req.body);
        if(response.status == BOOKING_STATUS.expired){
            errorResponseBody.message = "The payment took more than 5 minutes to get processed hence ur booking got expired please try again";
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled){
            errorResponseBody.err = " the payment failed due to some reasonf booking was not succesfult please try again";
            errorResponseBody.data = response;
            return res.status(STATUS.PAYMENT_REQIRED).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message ="successfully completed booking";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


const getPaymentDetailsById = async(req , res)=>{
    try{
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully fecthed the booking and payment deatils";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllPayments = async(req , res)=>{
    try{
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "successfully feteched all the infomrmation";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log("getAllPayments error : " , error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports ={
    create,
    getPaymentDetailsById,
    getAllPayments,

}