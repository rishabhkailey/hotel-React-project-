const express = require('express')
const bodyparser = require('body-parser')
var users = require('./routes/users')
var protected = require('./routes/protected')
const session = require('express-session');
const {key,secret} = require('./config/session')
const userModel = require('./models/userModel')
require('./dbConnection')

const port = process.env.PORT || 5000;

var app = express();

app.use(bodyparser.json())

app.use(session({
    key,
    secret
}))

app.use("*", (req, res, next) => {
    console.log("Middleware is called");
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "*")
    next();
})

// check user is logged in or not
const checkUser = (req,res,next)=>{
    console.log('checking cookie',req.session)
    if(req.session.email){
        // chechk special method of user model to check the user from cookie 
        userModel.checkUser(req,(err,res)=>{
            if(err){
                res.send('user not logged in')
            }
            if(res && res.length > 0)
            {
                next();
            }
            else{
                res.send('user not logged in')
            }
        })
    }
    else{
        res.send('not logged in')
    }
}

app.use('/users',users)

// check user will be callback fxn of every /protected request
app.use('/protected',checkUser,protected)

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})