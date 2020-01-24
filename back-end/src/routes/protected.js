const express = require('express')
const router = express.Router()
let wishListModel = require('./../models/wishListModel')
router.get('/',(req,res)=>{
    res.send('welcome')
})

router.post('/addWishlist',(req,res)=>{
    wishListModel.find(req,(err,response)=>{
        if(err){
            console.log(err)
        }
        if(response && response.length === 0){
            wishListModel.create(req,(err,response)=>{
                if(err){
                    console.log(err)
                    res.json({error: true,msg: 'failed'})
                }
                if(response){
                    console.log(res)
                    res.json({error: false,msg: 'done'})
                }
            })
        }
        if(response && response.length !== 0){
            wishListModel.add(req,(err,response)=>{
                if(err){
                    console.log(err)
                    res.json({error: true,msg: 'failed'})
                }
                if(response){
                    console.log(res)
                    res.json({error: false,msg: 'done'})
                }
            })
        }
    })
    wishListModel.add(req,(err,response)=>{
    })
})

module.exports = router