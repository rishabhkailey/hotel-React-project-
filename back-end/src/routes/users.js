const express = require('express')
const userModel = require('./../models/userModel')
const router = express.Router()
const {bcrypt,salt} = require('./../config/bcrypt-config')

router.post('/login',(req,res)=>{
    console.log('login',req.body)
    userModel.findUser(req,(error,response)=>{
        if(error){
            console.log('error')
            res.json({error: true,logIn: false,msg: 'server error'})
        }
        console.log(response)
        if(response){
            if(response.length == 0){
                res.json({error: true,logIn: false,msg: 'no user found'})
            }
            else{
                let user = response[0];
                console.log(req.body)
                if(bcrypt.compareSync(req.body.password,user.password))
                {
                    req.session.email = user.email
                    console.log(`cookie after authentication ${req.sessionID}`,req.session)
                    res.json({error: false,logIn: true,msg: 'user autheticated'})
                }
                else{
                    res.json({error: true,logIn: false,msg: 'incorrect password'})
                }
            }
            console.log(response)
        }
    })
  
})

router.post('/signup',(req,res)=>{
    userModel.findUser(req,(error,response)=>{
        if(error)
        {
            console.log('error')
            console.log(`sign up failed`)
            res.json({error: true,signUp: false,msg: 'server error'})
        }
        if(response && response.length > 0)
        {
            console.log(`sign up failed user already exists`)
            res.json({error: true,signUp: false,msg: 'user already exists'})
        }
        if(response && response.length === 0)
        {
            userModel.addUser(req,(error,response)=>{
                if(error){
                    console.log('error',error)
                    res.json({error: false,signUp: false,msg: 'server error'})
                }
                if(response){
                    console.log(response)
                    req.session.email = req.body.email
                    console.log('account created')
                    res.json({error: false,signUp: true,msg: 'account created'})
                }
            })
        }
            
    })
    
})

module.exports = router