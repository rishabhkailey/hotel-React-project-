const express = require('express')
const router = express.Router()

let destModel = require('./../models/destinationModel')
let hotelModel = require('./../models/hotelModel')
let descModel = require('./../models/hotelDescriptionModel')
let imageModel = require('./../models/hotelImagesModel')
let reviewModel = require('./../models/hotelReviewModel')

router.post('/checkUserReview',(req,res)=>{
    reviewModel.checkUserReview(req,(error,response)=>{
        if(error){
            console.log(error)
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length == 0){
            res.send({error: false,message: 'no review found',review: null})
        }
        if(response && response.length > 0){
            res.send({error: false,review: response[0],message: 'review found'})
        }
    })
})

router.post('/getHotelReviews',(req,res)=>{
    reviewModel.getHotelReviews(req,(error,response)=>{
        if(error){
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length == 0){
            res.send({error: true,message: 'no review found',reviews: []})
        }
        if(response && response.length > 0){
            res.send({error: false,reviews: response})
        }
    })
})



router.post('/getHotelImages',(req,res)=>{
    imageModel.getHotelImages(req,(error,response)=>{
        if(error){
            res.send({error: true,message: 'server error'})
            console.log(error)
        }
        
        if(response && response.length > 0){
            res.send({error: false,images: response[0].images})
        }
 
        if(response && response.length == 0){
            res.send({error: true,images: [],message: 'no images found'})
        }
    })
})


router.post('/getHotelDescription',(req,res)=>{
    descModel.findHotelDescription(req,(error,response)=>{
        if(error){
            console.log(error);
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length > 0){
            res.send({desc: response[0].desc,error: false})
        }
        if(response && response.length == 0){
            res.send({desc: '',error: true,message: 'description not found'})
        }
    })
})

router.post('/searchHotels',(req,res)=>{
    destModel.findDest(req,(error,response)=>{
        if(error){
            console.log(error);
            res.send({error: true,message: 'server error'})
        }
        if(response && response.length == 0){
            res.send({hotels: [],error: false,message: 'no destination found'})
        }
        if(response && response.length > 0){
            hotelModel.findHotelByDestinationId(response[0],(e,r)=>{
                if(e){
                    console.log(e)
                    res.send({error: true,message: 'server error'})
                }
                if(r){
                    res.send({error: false,hotels: r})
                }
            })
        }
    })
})


router.post('/searchDestination',(req,res)=>{
    destModel.findDest(req,(error,response)=>{
        if(error){
            console.log(error);
            res.send({error: true,message: 'server error'})
        }
        if(response){
            if(response){
                res.send({dest: response,error: false})
            }
        }
    })
})


// admin
// router.post('/addDestination',(req,res)=>{
//     destModel.findDest(req,(error,response)=>{
//         if(error){
//             console.log(error)
//             res.send({error: true,message: 'server error'})
//         }
//         if(response && response.length == 0){
//             destModel.addDest(req,(e,r)=>{
//                 if(e){
//                     console.log(e)
//                     res.send({error: true,message: 'server error'})
//                 }
//                 if(r){
//                     console.log(r)
//                     res.send({error: false,message: 'destination added'})
//                 }
//             })
//         }
//     })
// })

module.exports = router;