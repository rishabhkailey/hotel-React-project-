const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    hotel_id: {
        type: Number,
        required: true
    }
})

const wishlistModel = mongoose.model('wishlist',wishlistSchema);


wishlistModel.wishlistHotel = (req,callback)=> {
    let query = {email: req.session.email,hotel_id: req.body.hotel_id}
    wishlistModel.create(query,callback)
}


wishlistModel.getWishlist = (req,callback)=>{
    let email = req.session.email; 
    wishlistModel.find({email},callback)
}

wishlistModel.deleteFromWishlist = (req,callback)=>{
    let query = {email: req.session.email,hotel_id: req.body.hotel_id}
    wishlistModel.findOneAndDelete(query,callback)
}

wishlistModel.checkWishlist = (req,callback)=>{
    query = {email: req.session.email,hotel_id: req.body.hotel_id}
    console.log('query = ',query)
    wishlistModel.find(query,callback)
}

module.exports = wishlistModel;