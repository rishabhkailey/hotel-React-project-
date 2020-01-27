const mongoose = require('mongoose')

const reviewSchema  = new mongoose.Schema({
    author_email: String,
    author_uname: String,
    average_score_out_of_10: {
        type: Number,
        required: true
    },
    message: String,
    date: {
        type: Date,
        required: true
    },
    hotel_id: {
        type: Number,
        required: true
    }
})

const reviewModel = mongoose.model('hotel_review',reviewSchema);

reviewModel.getHotelReviews = (req,callback)=>{
    reviewModel.find({hotel_id: req.body.hotel_id},callback);
}

reviewModel.addReview = (req,callback)=>{
    req.body.author_email = req.session.email
    req.body.author_uname = req.session.uname
    req.body.date = new Date()
    reviewModel.create(req.body,callback)
}

reviewModel.findUserReview = (req,callback)=>{
    let query = {author_email: req.session.email,hotel_id: req.body.hotel_id}
    console.log('query = ',query)
    reviewModel.find(query,callback)
}

reviewModel.updateReview = (req,callback)=>{
    
    req.body.author_email = req.session.email
    req.body.author_uname = req.session.uname
    req.body.date = new Date()

    let query = {author_email: req.session.email,hotel_id: req.body.hotel_id}
    console.log('update query = ',query)

    reviewModel.findOneAndUpdate(query,req.body,callback)
}

module.exports = reviewModel