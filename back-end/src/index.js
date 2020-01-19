const express = require('express')
const bodyparser = require('body-parser')
var users = require('./routes/users')
require('./dbConnection')
const port = process.env.PORT || 5000;

var app = express();

app.use(bodyparser.json())

app.use("*", (req, res, next) => {
    console.log("Middleware is called");
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "*")
    next();
})

app.use('/users',users)

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})