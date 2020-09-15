/**
 * 
 * @file ProductRoutes.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This file Handle all Partner Offer Related Routes
 * 
 */

const router = require("express").Router();
const ShopService = require("../Services/ShopService");
const logger = require("../logger/Logger");

let shopService = new ShopService();

// posting Ratings
router.post("/product_add",function(req,res,next){
    console.log("request",req.body);
    let Product={
        productId:req.body.productId,
        productName:req.body.productName,
        productDescription:req.body.productDescription,
        brand:req.body.brand,
        category:req.body.category,
        subCategory:req.body.subCategory,
        netActualPrice:req.body.actualPrice,
        netOfferPrice:req.body.offerPrice,
        offerPercentage:req.body.offerPercentage,
        wholeSellerId:req.body.wholeSellerId,
        isAvailable:req.body.isAvailable,
        quantity:req.body.quantity,
    }
    console.log(Product);
    shopService.addProduct(Product)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});



router.get("/products/:shopId",function(req,res,next){
    if(req.params.shopId === "undefined"){
        return res.json({
            status:{
                statusCode:200,
                isSuccess:true,
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }
     let query={
         shopId:req.params.shopId,
         sqlQuery:req.query
     }
     console.log("product list query",query);
    shopService.getAllProductList(query)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

module.exports=router;