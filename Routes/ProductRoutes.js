/**
 * 
 * @file ProductRoutes.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This file Handle all Partner Offer Related Routes
 * 
 */

const router = require("express").Router();
const ProductService = require("../Services/ProductService");
const logger = require("../logger/Logger");

let productService = new ProductService();

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
    productService.getAllProductList(query)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

/**
 * Product Description
 */
 
router.get("/desc/:productId",function(req,res,next){

    if(req.params.productId === "undefined"){
        return res.json({
            status:{
                statusCode:200
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }

     let query={
         productId:req.params.productId,
     }

     console.log(query);

   

    productService.getProduct(query)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

// Find Favourite product List
router.get("/fav-products/:shopId",function(req,res,next){
    if(req.params.shopId === "undefined"){
        return res.json({
            status:{
                statusCode:200
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }
     let query={
         shopId:req.params.shopId,
         sqlQuery:req.query
     }
     console.log(query);
    productService.getAllProductFavouriteList(query)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});


/**
 * this route will be used for getting info from serching product
 */
router.post("/search",function(req,res,next){
    console.log("-------------------GET product route hit--------------------",req.body.productName);

    productService.getProductByName(req.body.productName)
    .then(response=>{
        return res.status(200).json(response);
    })
    .catch(response=>{
        return res.status(200).json(response);
    });

});





module.exports=router;
