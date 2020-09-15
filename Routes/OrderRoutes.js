/**
 * 
 * @file OrderRoutes.js
 * @author Vaibhav D Shinde
 * @date 31 MARCH 2020
 * @description This File handle All Order
 * 
 */

const router = require("express").Router();
const OrderService= require("../Services/OrderService");;
const logger = require("../logger/Logger");



let orderService = new OrderService();

// Place order
router.post("/place",function(req,res,next){
  console.log("Inside Order Placed")
   console.log(req.body);

    orderService.placeOrder(req.body)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

// cancel order
router.post("/cancel",function(req,res,next){
    console.log("Inside Order cancel")
     console.log(req.body);
      orderService.cancelOrder(req.body)
      .then((response)=>{
          return res.status(200).json(response);
      })
      .catch((response)=>{
          return res.status(200).json(response);
      })
  });

/** getting all order history */

router.post("/getorderhistory",function(req,res,next){
   console.log(req.body);
    orderService.getOrderHistory(req.body)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});

/* ********* getting current order history ************* */
router.get("/current-order/:userId",function(req,res,next){
    if(req.params.userId === "undefined"){
        return res.json({
            status:{
                statusCode:200
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }

     let query={
         userId:req.params.userId,
     }

     console.log(query);

     orderService.getCurrentOrderHistory(query)
     .then((response)=>{
         return res.status(200).json(response);
     })
     .catch((response)=>{
         return res.status(200).json(response);
     })
 });

 /** getting all product in order */

router.get("/item-in-order/:userId",function(req,res,next){
    if(req.params.userId === "undefined"){
        return res.json({
            status:{
                statusCode:200
            },
            error:{
                errorName:"BAD_REQUEST"
            }});
    }

     let query={
         userId:req.params.userId,
     }

     console.log(query);
     orderService.getProductInOrder(query)
     .then((response)=>{
         return res.status(200).json(response);
     })
     .catch((response)=>{
         return res.status(200).json(response);
     })
 });

 /** getting Delivery Notice */

 router.get("/delivery-notice",function(req,res,next){
    console.log(req.body);
     orderService.getDeliveryNotice(req.body)
     .then((response)=>{
         return res.status(200).json(response);
     })
     .catch((response)=>{
         return res.status(200).json(response);
     })
 });



module.exports=router;