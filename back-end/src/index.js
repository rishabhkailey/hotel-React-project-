const express = require('express')
const bodyparser = require('body-parser')
var users = require('./routes/users')
var hotel = require('./routes/hotel')
var protected = require('./routes/protected')
const session = require('express-session');
const {key,secret} = require('./config/session')
const userModel = require('./models/userModel')
require('./dbConnection')
const cors = require('cors') 
const port = process.env.PORT || 5000;

var app = express();

// for development else new cookie will be generated every time (because browser doesn't send cookie if backend request is on different domain)

// const whiltelist = ['http://localhost:3000'];
// const corsOption = {
//     credentails: true,
//     origin: function(origin, callback) {
//         if(whiltelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         }
//         else {
//             callback(new Error('Not allowed By CORS'))
//         }
//     },credentials: true
// }

// app.use(cors(corsOption))

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

app.use("/", express.static('../front-end/build'))
app.use("/home", express.static('../front-end/build'))


// check user is logged in or not
const checkUser = (req,res,next)=>{
    console.log('checking cookie',req.session)
    if(req.session.email){
        // chechk special method of user model to check the user from cookie 
        userModel.checkUser(req,(err,res)=>{
            if(err){
                res.send({error: true,message: 'server eroor'})
            }
            if(res && res.length > 0)
            {
                next();
            }
            else{
                res.send({error: false,message: 'not authenticated',loginRequired: true})
            }
        })
    }
    else{
        res.send({error: false,message: 'not authenticated',loginRequired: true})
    }
}

app.use('/users',users)

// check user will be callback fxn of every /protected request
app.use('/protected',(req,res,next)=>{
    console.log('inside callback',req.sessionID,req.session.email)
    next();
},checkUser,protected) 

app.use('/hotel',hotel)

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})