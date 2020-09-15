/**
 * @file OrderService.js
 * @desc This File Handles all Orders Related services
 * 
 */



const OrderTable = require("../Models/OrderTable");
const ProductTable =require("../Models/ProductTable");
const logger = require('../logger/Logger');
const orderTable = new OrderTable;
const productTable = new ProductTable();





class OrderService{
    /**
     * This Function is used for place order
     */
    async placeOrder(Order){
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try { 
            let order = await orderTable.save(Order);
            if(order.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_PLACED",
                    errorCode:500
                }
                return response;
            }

            response.status.isSuccess=true;
            return response;
        } catch (error) {
            
             response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
            return response
            
        }
    }

    /**
     * This Function is used for place order
     */
    async cancelOrder(Order){
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try { 
            let order = await orderTable.cancel(Order);
            if(order.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_CANCEL",
                    errorCode:500
                }
                return response;
            }

            response.status.isSuccess=true;
            return response;
        } catch (error) {
            
             response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
            return response
            
        }
    }

    /**
     * get order history
     */

    async getOrderHistory(Order){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let orderHistory = await orderTable.getOrder(Order);
            if(orderHistory.length == 0){
                response.error = {
                    errorName:"NO_ORDER_HISTORY",
                    errorCode:980
                }
                return response;
            }
            response.payload=orderHistory;
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
     * get current order history
     */
    async getCurrentOrderHistory(Order){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            console.log("OrderService --- getCurrentOrderHistory",Order);
            let orderHistory = await orderTable.getCurrentOrder(Order);
            response.payload=orderHistory;
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
     * get current order product list
     */
    async getProductInOrder(Order){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            console.log("OrderService --- getProductInOrder",Order);
            let orderHistory = await orderTable.getProductInOrderFind(Order);
            response.payload=orderHistory[0];
            return response;
        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:981
            }
            return response;
        }
    }

    /**
     * get current delivery Notice
     */
    async getDeliveryNotice(){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            console.log("OrderService --- getCurrentDelivery Notice");
            let deliveryNotice = await orderTable.getDeliveryNoticeFind();
            response.payload=deliveryNotice[0];
            return response;
        } catch (error) {
            response.error = {
                errorName:"DB_ERROR",
                errorCode:981
            }
            return response;
        }
    }
}


module.exports=OrderService;