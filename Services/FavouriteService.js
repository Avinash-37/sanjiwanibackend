/**
 * @file FavouriteTable.js
 * @desc This File Handles all cart Related Service
 * 
 */



const FavouriteTable = require("../Models/FavouriteTable");
const logger = require('../logger/Logger')
const favouriteTable = new FavouriteTable();





class FavouriteService{
    
    /**
     * get favourite
     */

    async getFav(Cart){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let fav = await favouriteTable.find(Cart);
            if(fav.length == 0){
                response.error = {
                    errorName:"NO_PRODUCT_IN_FAV",
                    errorCode:980
                }
                return response;
            }
            response.payload=fav;
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
     * Save Favourite by User
     * 
     * 
     */
    async saveFav(Cart){
        console.log(Cart);
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try { 
            let fav = await favouriteTable.save(Cart);
            console.log(cart);
            if(fav.affectedRows == 0){
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



    async deleteFav(Cart){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let fav = await favouriteTable.delete(Cart);
            if(fav.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_DELETE_FAV",
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
}


module.exports=FavouriteService;