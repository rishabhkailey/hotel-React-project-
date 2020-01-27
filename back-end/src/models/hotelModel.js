const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    dest_id: Number,
    dest_type: String,
    hotel_id: {
        required: true,
        type: Number,
        unique: true
    },
    hotel_name: String,
    accommodation_type_name: String,
    photo_url: String,
    address: String,
    city: String,
    country_trans: String,
    currency_code: String,
    min_total_price: Number,
    review_score: Number,
    review_score_word: String,
    class: Number,
    distance_from_destination : Number
})

const hotelModel = mongoose.model('hotel',hotelSchema);

hotelModel.updateHotel = (req,callback)=>{
    hotelModel.updateOne({hotel_id: req.hotel_id},req,callback)
}

hotelModel.addHotel = (req,callback)=>{
    // console.log(req)
    hotelModel.create(req.body,callback)
}

hotelModel.findHotelByDestinationId = (req,callback)=>{
    // called after find dest no need to use .body
    // console.log(req)
    hotelModel.find({dest_id: req.dest_id},callback)
}

module.exports = hotelModel;