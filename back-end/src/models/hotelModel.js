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
    console.log(req)

    if(!req.filters)
        hotelModel.find({dest_id: req.dest_id},callback)
    else
    {
        let {minPrice,maxPrice,order} = req.filters
        
        let sort_query = {}

        if(order === 'ratinglth')
            sort_query.review_score = 1
        else if(order === 'ratinghtl')
            sort_query.review_score = -1
        else if(order === 'pricelth')
            sort_query.min_total_price = 1
        else if(order === 'pricehtl')
            sort_query.min_total_price = -1
        
        console.log(sort_query)
        
        hotelModel.find({dest_id: req.dest_id,min_total_price : {$gte: minPrice,$lte: maxPrice}},callback).sort(sort_query)

    }    
    
}

module.exports = hotelModel;