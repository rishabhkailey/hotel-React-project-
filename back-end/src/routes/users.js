const express = require('express')
const userModel = require('./../models/userModel')
const router = express.Router()
const {bcrypt,salt} = require('./../config/bcrypt-config')

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
                console.log(req.body)
                if(bcrypt.compareSync(req.body.password,user.password))
                {
                    req.session.email = user.email
                    console.log(`cookie after authentication ${req.session}`,req.session)
                    res.send("user authenticated")
                }
                else{
                    res.send("incorrect password")
                }
            }
            console.log(response)
        }
    })
  
})

router.post('/signup',(req,res)=>{
    userModel.addUser(req,(error,response)=>{
        if(error){
            console.log('error')
            res.send('failed')
        }
        if(response){
            console.log(response)
            req.session.email = req.body.email
            res.send('success')
        }
    })
})

module.exports = router