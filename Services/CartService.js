/**
 * @file CartService.js
 * @desc This File Handles all cart Related Service
 * 
 */

const ProductTable = require("../Models/ProductTable");
const CartTable = require("../Models/CartTable");
const logger = require('../logger/Logger')
const cartTable = new CartTable();

class CartService{
    /**
     * This Function is used for get all rating For Products
     */
    async saveCart(Cart){
        console.log(Cart);
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };


        try { 
            let cart = await cartTable.save(Cart);
            console.log(cart);
            if(cart.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_ADD",
                    errorCode:500
                }
                return response;
            }

            response.status.isSuccess=true;
            return response;
        } catch (error) {
            if(error.errno == 1062){
                response.error = {
                    errorName:"ALREADY_PRESENT",
                    errorCode:980
                }
                return response;

            }
             response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
            return response
            
        }
    }


    async updateCart(Cart){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let cart = await cartTable.update(Cart);
            if(cart.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_UPDATE",
                    errorCode:980
                }
                return response;
            }

            response.status.isSuccess=true

            return response;

        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }

            return response;
            
        }



    }



    /**
     * this method is used to delete the product from cart
     */


    async deleteCart(Cart){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let cart = await cartTable.delete(Cart);
            if(cart.affectedRows == 0){
                response.error = {
                    errorName:"NO_PRODUCT_TO_DELETE",
                    errorCode:980
                }
                return response;
            }
            response.status.isSuccess=true
            return response;
        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
            return response;
        }
    }

    /**
     * this method is used to delete the All product from cart
     */


    async deleteAllCart(Cart){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let cart = await cartTable.deleteAll(Cart);
            if(cart.affectedRows == 0){
                response.error = {
                    errorName:"NO_PRODUCT_TO_DELETE",
                    errorCode:980
                }
                return response;
            }
            response.status.isSuccess=true
            return response;
        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
            return response;
        }
    }



    /**
     * get Cart
     */

    async getCart(Cart){

        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };


        try { 
            let cart = await cartTable.find(Cart);
            if(cart.length == 0){
                response.error = {
                    errorName:"NO_PRODUCT_IN_CART",
                    errorCode:980
                }
                return response;
            }
            response.payload=cart;
            return response;

        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }

            return response;
            
        }



    }

}


module.exports=CartService;