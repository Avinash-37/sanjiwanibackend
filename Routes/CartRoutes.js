/**
 * 
 * @file CartRoutes.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This File handle All cart Routes
 * 
 */







const router = require("express").Router();
const CartService = require("../Services/CartService");;
const logger = require("../logger/Logger");



let cartService = new CartService();






// posting Ratings
router.post("/add",function(req,res,next){
    let Cart={
        productId:req.body.productId,
        shopId:req.body.shopId,
        netActualPrice:req.body.netActualPrice,
        netOfferPrice:req.body.netOfferPrice,
        quantity:req.body.quantity,
        wholeSellerId:req.body.wholeSellerId,
        totalAmount:req.body.netOfferPrice*req.body.quantity

    }
    console.log(Cart);
    cartService.saveCart(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});






router.post("/update",function(req,res,next){
    let Cart={
        productId:req.body.productId,
        shopId:req.body.shopId,
        netActualPrice:req.body.netActualPrice,
        netOfferPrice:req.body.netOfferPrice,
        quantity:req.body.quantity,
        wholeSellerId:req.body.wholeSellerId,
        totalAmount:req.body.netOfferPrice*req.body.quantity
    }
    console.log(Cart);
    cartService.updateCart(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

router.post("/delete",function(req,res,next){
    let Cart={
        productId:req.body.productId,
        shopId:req.body.shopId,
    }
    console.log(Cart);
    cartService.deleteCart(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

router.post("/delete-all",function(req,res,next){
    let Cart={
        shopId:req.body.shopId,
    }
    console.log(Cart);
    cartService.deleteAllCart(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});


router.post("/get",function(req,res,next){
    let Cart={
        shopId:req.body.shopId,
    }
    console.log(Cart);
    cartService.getCart(Cart)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});










module.exports=router;