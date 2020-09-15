/**
 * @file ProductService.js
 * @desc This File Handles all Service and Busniess Logic of Offers Sections
 * 
 */

const ProductTable = require("../Models/ProductTable");
const RatingTable = require("../Models/RatingTable");
const FavouriteTable = require("../Models/FavouriteTable");
const ImageTable = require("../Models/ImageTable");
const CartTable = require("../Models/CartTable");
const ShopTable = require("../Models/ShopTable");
const logger = require('../logger/Logger')
const productTable = new ProductTable();
const ratingTable = new RatingTable();
const favouriteTable = new FavouriteTable();
const imageTable = new ImageTable();
const cartTable = new CartTable();
const shopTable = new ShopTable();


class ProductService{


    async getAllProductList(query){
        console.log("get All product list query",query);
        let response={
            status:{
                statusCode:200,
                isSuccess:true,
            },
            error:null,
            payload:null
        };

        try{
        let products = await productTable.find(query);
        let ratings = await  ratingTable.find(query);
        let images = await imageTable.find(query);
        let favcontent  = await favouriteTable.find({shopId:query.shopId});
        let cartContent  = await cartTable.find({shopId:query.shopId});

        console.log("Cart Content display" );
        console.log(cartContent);
        if(products.length === 0){
            response.error={
                error:null,
                errorName:"NO_PRODUCT_FOUND",
                errorCode:234,
                errMsg:"Please Try Again"
            }
            return response;
        }
      console.log("after product");
        response.payload=products.map((product)=>{
            console.log("inside map");
            let rating = ratings.find(rating=> rating.product_id === product.product_id);
             if(rating.Rating){
                 product.rating = rating.Rating;
             }else{
                 product.rating = null;
             }
             console.log("after rating map");
             let image = images.find(image => image.product_id === product.product_id);
             console.log("Images find"+image);
             if(image.product_id){
                 product.images={
                    frontView:image.front_view,
                    backView:image.back_view
                }
             }
             console.log("after Image map");
             if(favcontent.find(fav=>fav.product_id===product.product_id) ){
                product.favProduct=true
             }else{
                product.favProduct=false
             }
             console.log("After favourite map");
             if(cartContent.find(cart => cart.product_id === product.product_id)){
                 product.inCart=true
             }else{
                product.inCart=false
             }
             
             console.log("after cart content");
             //return 
             return product;
        });

        return response;

        
        }catch(error){
            response.error={
                errorName:"DB_ERROR",
                error:error,
                errorCode:560,
                errMsg:"Something Went Wrong"
            }

            return response
        }

        
    }

    async addProduct(Product){
        console.log("in shop Service Add Product",Product);
        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try { 
            let product = await shopTable.save(Product);
            console.log(product);
            if(product.affectedRows == 0){
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


    

}


module.exports=ProductService;