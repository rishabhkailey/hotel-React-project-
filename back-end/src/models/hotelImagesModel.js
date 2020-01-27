const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    images: [],
    hotel_id: {
        type: Number,
        unique: true,
        required: true
    }
})

const imageModel = mongoose.model('image',imageSchema) 

imageModel.getHotelImages = (req,callback)=>{
    let query = {hotel_id: req.body.hotel_id}
    console.log(query,req.body)
    imageModel.find(query,callback)
}


module.exports = imageModel;