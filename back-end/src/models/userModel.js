const mongoose = require('mongoose')
const {bcrypt,salt} = require('./../config/bcrypt-config')

const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        require: true 
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model('user',userSchema);

userModel.addUser = (req,callback)=>{
    // console.log(req.body)
    var user = req.body;
    user.password = bcrypt.hashSync(user.password, salt) 
    
    console.log(user);
    userModel.create(user,callback)
}

userModel.checkUser = (req,callback)=>{
    console.log(`query = {email: ${req.session.email}}`)
    userModel.find({email: req.session.email},callback)
}

userModel.findUser = (req,callback)=>{
    console.log(`query = {email : ${req.email}}`)
    userModel.find({email: req.body.email},callback)
}

module.exports = userModel;