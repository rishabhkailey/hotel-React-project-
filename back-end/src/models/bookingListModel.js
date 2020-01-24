const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    bookings: []
})

const bookingModel = mongoose.model('booking',bookingSchema);

bookingModel.add = (req,callback)=> {
    let email = req.session.email

    bookingModel.getBookings(req,(err,res)=>{
        if(res){
            let list = res[0].bookings
            list.push(req.body)
            bookingModel.findOneAndUpdate({email},{$set:{bookings:list}},callback)
        }
        if(err){
            console.log(err)
        }
    })
}

bookingModel.createBooking = (req,callback)=>{

    let email = req.session.email
    let obj = {
        email,
        bookings: [req.body]
    } 
    console.log(obj)

    bookingModel.create(obj,callback)
}

bookingModel.getBookings = (req,callback)=>{

    let email = req.session.email; 

    bookingModel.find({email},callback)
}

module.exports = bookingModel;