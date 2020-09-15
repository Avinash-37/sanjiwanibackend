/**
 * 
 * @file FavouriteRoutes.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This File handle All cart Routes
 * 
 */







const router = require("express").Router();
const FavouriteService = require("../Services/FavouriteService");
const logger = require("../logger/Logger");



let favouriteService = new FavouriteService();

// posting Ratings

router.post("/fav/add/",function(req,res,next){
    let Cart={
        productId:req.body.productId,
        shopId:req.body.shopId
    }
    console.log(Cart);
    favouriteService.saveFav(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});






/**
 * Delete Fav  From User
 */

router.post("/fav/delete/",function(req,res,next){
   
    let Cart={
        productId:req.body.productId,
        shopId:req.body.shopId,
    }
    console.log(Cart);
    favouriteService.deleteFav(Cart)
        .then((response)=>{
            return res.status(200).json(response);
        })
        .catch((response)=>{
            return res.status(200).json(response);
        })
    });



/**
 * Getting From User
 * @param { Cart} User
 */
router.post("/fav/get/",function(req,res,next){

    let Cart={
        shopId:req.body.shopId,
    }
    console.log(Cart);
    favouriteService.getFav(Cart)
        .then((response)=>{
            return res.status(200).json(response);
        })
        .catch((response)=>{
            return res.status(200).json(response);
        })
});










module.exports=router;