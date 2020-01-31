const express = require('express')
const router = express.Router()

let wishlistModel = require('./../models/wishListModel')
let bookingModel = require('./../models/bookingListModel')
let reviewModel = require('./../models/hotelReviewModel')
let hotelModel = require('./../models/hotelModel')

router.get('/',(req,res)=>{
    res.send('welcome')
})


router.post('/getBookings',(req,res)=>{
    bookingModel.getBookings(req,(err,response)=>{
        if(response){
            hotelModel.find({hotel_id: {$in : response.map((x)=>{
                        return{hotel_id: x.hotel_id 
                    } 
                })}
            },(e,r)=>{
                if(r) {
                    console.log(r)
                    res.send({error: false , hotels: r})
                }
                if(e) {
                    res.send({error: true, message: 'server error'})
                }
            })
        }
        if(err){
            res.send({error: true, message: 'server error'})
            console.log(err)
        }
    })
})

router.post('/bookHotel',(req,res)=>{
    bookingModel.addBooking(req,(error,response)=>{
        if(error){
            console.log(error)
            res.send({error: true,booked:false,message: 'server error'})
        }
        if(response){
            console.log(response)
            res.send({error:false,message: 'booked',booked: true})
        }
    })
})

router.post('/deleteBooking',(req,res)=>{
    bookingModel.deleteBooking(req,(error,response)=>{
        console.log(error,response)
        if(error){
            console.log(error)
            res.send({error: true,message: 'server error'})
        }
        if(response){
            console.log(response)
            res.send({error: false,message: 'removed',booked: false})
        }
    })
})

router.post('/isBooked',(req,res)=>{
    bookingModel.checkBooking(req,(error,response)=>{
        if(error){
            console.log(error)
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length > 0){
            console.log(response)
            res.send({error: false,booked: true})
        }
        if(response && response.length == 0){
            console.log(response)
            res.send({error: false,booked: false})
        }
    })
})


router.post('/getWishlist',(req,res)=>{
    wishlistModel.getWishlist(req,(err,response)=>{
        if(response){
            res.send({error: false , hotels: response})
        }
        if(err){
            res.send({error: true, message: 'server error'})
            console.log(err)
        }
    })
})

router.post('/wishlistHotel',(req,res)=>{
    wishlistModel.wishlistHotel(req,(error,response)=>{
        if(error){
            console.log(error)
            res.send({error: true,booked:false,message: 'server error'})
        }
        if(response){
            console.log(response)
            res.send({error:false,message: 'wishlisted',wishlisted: true})
        }
    })
})

router.post('/deleteFromWishlist',(req,res)=>{
    wishlistModel.deleteFromWishlist(req,(error,response)=>{
        console.log(error,response)
        if(error){
            console.log(error)
            res.send({error: true,message: 'server error'})
        }
        if(response){
            console.log(response)
            res.send({error: false,message: 'removed',wishlisted: false})
        }
    })
})

router.post('/isWishlist',(req,res)=>{
    wishlistModel.checkWishlist(req,(error,response)=>{
        if(error){
            console.log(error)
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length > 0){
            console.log(response)
            res.send({error: false,wishlisted: true})
        }
        if(response && response.length == 0){
            console.log(response)
            res.send({error: false,wishlisted: false})
        }
    })
})


router.post('/addReview',(req,res)=>{
    reviewModel.findUserReview(req,(error,response)=>{
        // console.log(response.length)
        if(response && response.length == 0){
            reviewModel.addReview(req,(e,r)=>{
                if(e){
                    res.send({error: true,message: 'server error'})
                }
                if(r){
                    console.log(r)
                    res.send({error: false,message: 'review added'})
                }
            })
        }
        if(response && response.length > 0){
            reviewModel.updateReview(req,(e,r)=>{
                console.log(e,r)
                if(e){
                    console.log(e)
                    res.send({error: true,message: 'server error'})
                }
                if(r){
                    console.log(r)
                    res.send({error: false,message: 'review updated'})
                }
            })
        }
    })
})


module.exports = router