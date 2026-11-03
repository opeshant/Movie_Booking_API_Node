const Payment = require('../models/payment.mdel');
const Booking = require('../models/booking.model');
const {STATUS_CODES : STATUS, BOOKING_STATUS, PAYMENT_STATUS , USER_ROLE} = require('../utils/constants');
const User = require('../models/user.model');

const creatPayment = async(data) =>{
      try{
        
        const booking = await Booking.findById(data.bookingId);

        if(booking.status == BOOKING_STATUS.successful){
            throw{
                err : "booking already done cannot make a new payment against it",
                code : STATUS.FORBBIDEN
            }
        }
        if(!booking){
            throw{
                err : "No booking found",
                code : STATUS.NOT_FOUND
            }
        }
            let bookingTime = booking.createdAt;
            let currentTime = Date.now();

        let minute = Math.floor(((currentTime - bookingTime) / 1000) /60);
        if(minute > 5){
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }

        const payment = await Payment.create({
            bookingId : data.bookingId,
            amount : data.amount
        });
        if(payment.amount != booking.totalCost){
            payment.status = PAYMENT_STATUS.failed;
        }
        if(!payment || payment.status == PAYMENT_STATUS.failed){
            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();
            return booking;
        }
        payment.status = PAYMENT_STATUS.success;
        booking.status = BOOKING_STATUS.successful;
        await booking.save();
        await payment.save();

        return booking;
      }
      catch(error){ 
        throw error;
      }
};


const getPaymentById = async(id) =>{
    try{
        const response = await Payment.findById(id).populate('bookingId');
        if(!response){
            throw{
                err : "no payment found",
                code : STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        throw error;
    }
}

const getAllPayments = async (userId) => {
    try {
        const user = await User.findById(userId);
        let filter = {};

        if (user.userRole !== USER_ROLE.admin) {
            filter.userId = user.id;
        }
        const bookings = await Booking.find(filter , '_id');
        const bookingIds = bookings.map(b => b._id);
        const payments = await Payment.find({bookingId :{$in : bookingIds}});
        return payments;
    } catch (error) {
        throw error;
    }
}




module.exports ={
    creatPayment,
    getPaymentById,
    getAllPayments,

}