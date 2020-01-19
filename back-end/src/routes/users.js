const express = require('express')
const userModel = require('./../models/userModel')
const router = express.Router()


router.post('/login',(req,res)=>{
    console.log('login',req.body)
    userModel.findUser(req,(error,response)=>{
        if(error){
            console.log('error')
        }
        console.log(response)
        if(response){
            if(response.length == 0){
                res.send('no user found')
            }
            else{
                let user = response[0];
                
            }
            console.log(response)
        }
    })
  
})

router.post('/signup',(req,res)=>{
    userModel.addUser(req,(error,response)=>{
        if(error){
            console.log('error')
        }
        if(response){
            console.log(response)
            res.send('success')
        }
    })
    // res.send('signup request')
})

module.exports = router