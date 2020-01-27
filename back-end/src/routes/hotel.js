const express = require('express')
const router = express.Router()

let destModel = require('./../models/destinationModel')
let hotelModel = require('./../models/hotelModel')

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