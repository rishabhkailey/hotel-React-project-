const mongoose = require('mongoose');
// import {username,password} from './config/mongoUser'
const {username , password} = require('./config/mongoUser');

mongoose.connect(`mongodb+srv://${username}:${password}@uca-qs5g6.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.catch((err)=>{
    console.log(err)
})

var db = mongoose.connection;
db.on('error', function () {
    console.log("Error connecting to db")
})

db.once('open', function () {
    console.log("Connected to db")
})