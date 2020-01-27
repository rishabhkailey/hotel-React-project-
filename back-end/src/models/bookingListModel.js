const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    hotel_id:{
        type: Number,
        required: true
    }
})

const bookingModel = mongoose.model('booking',bookingSchema);

bookingModel.addBooking = (req,callback)=> {
    let query = {email: req.session.email,hotel_id: req.body.hotel_id}
    bookingModel.create(query,callback)
}


bookingModel.getBookings = (req,callback)=>{
    let email = req.session.email; 
    bookingModel.find({email},callback)
}

bookingModel.deleteBooking = (req,callback)=>{
    let query = {email: req.session.email,hotel_id: req.body.hotel_id}
    bookingModel.findOneAndDelete(query,callback)
}

bookingModel.checkBooking = (req,callback)=>{
    query = {email: req.session.email,hotel_id: req.body.hotel_id}
    bookingModel.find(query,callback)
}

module.exports = bookingModel;