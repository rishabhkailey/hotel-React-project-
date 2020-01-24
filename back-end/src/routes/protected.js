const express = require('express')
const router = express.Router()
let wishListModel = require('./../models/wishListModel')
let bookingModel = require('./../models/bookingListModel')
router.get('/',(req,res)=>{
    res.send('welcome')
})

router.post('/getWishList',(req,res)=>{
    wishListModel.getWishList(req,(err,response)=>{
        if(response){
            res.send(response[0].wishlist)
        }
        if(err){
            console.log(err)
        }
    })
})

router.post('/addWishlist',(req,res)=>{
    wishListModel.getWishList(req,(err,response)=>{
        if(err){
            console.log(err)
        }
        console.log(response)
        if(response && response.length === 0){
            console.log('create')
            wishListModel.createWishList(req,(err,response)=>{
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
})

router.post('/getBookings',(req,res)=>{
    bookingModel.getBookings(req,(err,response)=>{
        if(response){
            res.send(response[0].bookings)
        }
        if(err){
            console.log(err)
        }
    })
})

router.post('/bookHotel',(req,res)=>{
    bookingModel.getBookings(req,(err,response)=>{
        if(err){
            console.log(err)
        }
        console.log(response)
        if(response && response.length === 0){
            console.log('create')
            bookingModel.createBooking(req,(err,response)=>{
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
            bookingModel.add(req,(err,response)=>{
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
})

module.exports = router