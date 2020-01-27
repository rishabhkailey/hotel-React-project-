const mongoose = require('mongoose')

const destSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    dest_id: {
        type: Number,
        unique: true,
        required: true
    },
    type: String
})

const destModel = mongoose.model('destination',destSchema);

destModel.addDest = (req,callback)=>{
    
    destModel.create(req.body,callback)
}

destModel.findDest = (req,callback)=>{
    // console.log('find dest')
    destModel.find({name: req.body.name},callback)
}

module.exports = destModel;