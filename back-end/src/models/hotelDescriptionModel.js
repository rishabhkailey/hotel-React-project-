const mongoose = require('mongoose')

const descSchema  = new mongoose.Schema({
    desc: String,
    hotel_id: {
        type: Number,
        unique: true
    }
})

const descModel = mongoose.model('hotel_description',descSchema);

descModel.addDescription = (req,callback)=>{
    descModel.create(req,callback);
}

descModel.findHotelDescription = (req,callback)=>{
    let query = {hotel_id: req.body.hotel_id};
    console.log(query,req.body)
    descModel.find(query,callback)
}

module.exports = descModel