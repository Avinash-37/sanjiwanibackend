/**
 * 
 * @file RatingRoute.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This file Handle all Partner Offer Related Routes
 */







const router = require("express").Router();
const RatingService = require("../Services/RatingService");
const logger = require("../logger/Logger");



let ratingService = new RatingService();



router.get("/product/:productId",function(req,res,next){
    console.log("Inside Product Catalogue Rating");

    if(req.params.productId === "undefined"){
        return res.json({
            status:{
                statusCode:200
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }

    let Product={
        id:req.params.productId
    }
    ratingService.getRating(Product)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});



// posting Ratings
router.post("/rateproduct",function(req,res,next){
    let Product={
        id:req.body.productId,
        shopId:req.body.shopId,
        rating:req.body.rating,
        comment:req.body.comment,
        userName:req.body.userName,
    }
    ratingService.save(Product)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});










module.exports=router;