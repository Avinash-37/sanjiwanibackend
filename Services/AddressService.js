/**
 * @file AddressService.js
 * @desc This File Handles all cart Related Service
 * 
 */



const AddTable = require("../Models/AddressTable");
const logger = require('../logger/Logger')
const addTable = new AddTable();





class AddressService{


   


    /**
     * This Function is used for save address
     */
    async saveAddress(Address){
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };


        try { 
            let add = await addTable.save(Address);
            if(add.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_ADD",
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
     * this method is used to delete the address from Address Book
     */


    async deleteAddress(Address){

        console.log("Inside Address Delete");

        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };


        try { 
            let add = await addTable.delete(Address);
            if(add.affectedRows == 0){
                response.error = {
                    errorName:"NO_ADD_TO_DELETE",
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
     * get Address
     */

    async getAddress(Address){

        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };


        try { 
            let add = await addTable.find(Address);
            if(add.length == 0){
                response.error = {
                    errorName:"NO_ADD_PRESENT",
                    errorCode:980
                }
                return response;
            }

            response.payload=add;

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


module.exports=AddressService