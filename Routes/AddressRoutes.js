/**
 * 
 * @file AddressRoutes.js
 * @author Vaibhav D Shinde
 * @date 04 FEB 2020
 * @description This File handle All Address Routtes
 * 
 */







const router = require("express").Router();
const AddService= require("../Services/AddressService");;
const logger = require("../logger/Logger");



let addService = new AddService();






// posting Ratings


router.post("/save",function(req,res,next){
   
    let Address={
        shopId:req.body.shopId,
        addressType:req.body.addressType,
        shopAddress:req.body.shopAddress
    }

   console.log(Address);

    addService.saveAddress(Address)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});







/** deleting address */

router.post("/delete",function(req,res,next){
   
    
    let Address={
        shopId:req.body.shopId,
        addressType:req.body.addressType
    }

   console.log(Address);

   

    addService.deleteAddress(Address)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});


/**
 * getting address
 */
router.post("/get",function(req,res,next){
   
    

    let Address={
        shopId:req.body.shopId,
        
    }

   console.log(Address);

   

    addService.getAddress(Address)
    .then((response)=>{
        return res.status(200).json(response);
    })
    .catch((response)=>{
        return res.status(200).json(response);
    })
});










module.exports=router;