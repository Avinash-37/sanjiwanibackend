/**
 * @file RatingService.js
 * @desc This File Handles all Service and Busniess Logic of Offers Sections
 * 
 */



const RatingTable = require("../Models/RatingTable");
const logger = require('../logger/Logger')
const ratingTable = new RatingTable();





class RatingService{
    /**
     * This Function is used for get all rating For Products
     */
    async getRating(product){
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try { 
            let ratings = await ratingTable.getRatings(product);
            if(ratings.length == 0){
                response.error = {
                    errorName:"NO_RATINGS_AVAILABLE",
                    errorCode:980
                }
                return response;
            }
            return response.payload=ratings;
        } catch (error) {
            return response.error = {
                errorName:"DB_ERROR",
                errorCode:980
            }
        }
    }


    async save(product){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try { 
            let ratings = await ratingTable.save(product);
            if(ratings.affectedRows == 0){
                response.error = {
                    errorName:"FAILED_TO_RATE",
                    errorCode:980
                }
                return response;
            }
            response.status.isSuccess=true,
            response.status.successMsg="Successfully Rated this product!!!"
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


module.exports=RatingService;