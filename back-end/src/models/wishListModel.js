const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    wishlist: []
})

const wishlistModel = mongoose.model('wishlist',wishlistSchema);

wishlistModel.add = (req,callback)=> {
    let email = req.session.email

    wishlistModel.findOne({email},(err,res)=>{
        if(res){
            let list = res[0]
            list.push(req.body)
            wishlistModel.findOneAndUpdate({email},{$set:{wishlist:list}},callback)
        }
        if(err){
            console.log(err)
        }
    })
}

wishlistModel.createWishList = (req,callback)=>{

    let email = req.session.email
    let obj = {
        email,
        wishlist: [req.body]
    } 
    console.log(obj)

    wishlistModel.create(obj,callback)
}

wishlistModel.getwishlists = (req,callback)=>{

    let email = req.session.email; 

    wishlistModel.findOne({email},callback)
}

module.exports = wishlistModel;