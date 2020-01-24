const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    hotel_id:{
        type: Number,
        require: true
    },
    hotel_image:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    country:{
        type:String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    currency_code: {
        type:String,
        require: true
    }
})

const bookingModel = mongoose.model('booking',bookingSchema);

bookings.add = (req,callback)=>{
    var booking = req.body;
    booking.email = req.session.email; 
    console.log(booking)

    userModel.create(booking,callback)
}

bookings.getBookings = (req,callback)=>{

    let email = req.session.email; 

    userModel.find({email},callback)
}

module.exports = bookingModel;