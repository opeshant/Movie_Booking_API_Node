const Payment = require('../models/payment.mdel');
const Booking = require('../models/booking.model');
const {STATUS_CODES : STATUS, BOOKING_STATUS, PAYMENT_STATUS} = require('../utils/constants');

const creatPayment = async(data) =>{
      try{
        const booking = await Booking.findById(data.bookingId);
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
}

module.exports ={
    creatPayment

}