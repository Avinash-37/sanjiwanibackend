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
const logger = require('../logger/Logger')
const productTable = new ProductTable();
const ratingTable = new RatingTable();
const favouriteTable = new FavouriteTable();
const imageTable = new ImageTable();
const cartTable = new CartTable();




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
    /**
     * 
     */
    async getProduct(product){

        let response={
            status:{
                statusCode:200
            },
            error:null,
            payload:null
        };
        try {
            let products = await productTable.getProduct(product);
            let images = await imageTable.getImages(product);
            if(products.length === 0){
                response.error={
                    errorName:"NO_DESC_FOUND"
                }
            }
            //mapping images and rating
            response.payload= [{...products[0] , images:images[0]}]
            return response;
        } catch (error) {
            response.error={
                errorName:"DB_ERROR"
            }
            return response;
        }
    }

    
    // get favourite product list
    async getAllProductFavouriteList(query){
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

        console.log("favourite table Content");
        console.log(favcontent);
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
        response.payload=favcontent.map((favcontents)=>{
            console.log("inside map");
            let rating = ratings.find(rating=> rating.product_id === favcontents.product_id);
            console.log("rating in favourit",rating);
             if(rating.Rating){
                favcontents.rating = rating.Rating;
             }else{
                favcontents.rating = null;
             }
             console.log("after rating map")
             let image = images.find(image => image.product_id === favcontents.product_id);
             console.log("Images find"+image);
             if(image.product_id){
                favcontents.images={
                    frontView:image.front_view,
                    backView:image.back_view
                }
             }
             console.log("after Image map");
             let productDetails=products.find(product=>product.product_id === favcontents.product_id);
             if(productDetails.product_id){
                favcontents.product_name=productDetails.product_name,
                favcontents.actual_price=productDetails.actual_price,
                favcontents.offer_price=productDetails.offer_price,
                favcontents.wholeseller_id=productDetails.wholeseller_id,
                favcontents.offer_percent=productDetails.offer_percent,
                favcontents.favProduct=true
             }  
             console.log("After favourite map");
             if(cartContent.find(cart => cart.product_id === favcontents.product_id)){
                    favcontents.inCart=true
             }else{
                favcontents.inCart=false
             }          
             console.log("after favoutite content");
             //retrn 
             return favcontents;
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

    
    async getProductByName(product){
        let response={
            status:{
                statusCode:200,
                isSuccess:true
            },
            error:null,
            payload:null
        };
        try {
            let products = await productTable.searchProducts(product);
            if(products.length === 0){
                response.error={
                    error:null,
                    errorName:"NO_PRODUCT_FOUND",
                    errorCode:234,
                    errMsg:"Please Try Again"
                }
                return response;
            }else{
                //mapping images and rating
                response.payload=products;
                return response;
            }
            
        } catch (error) {
            response.error={
                errorName:"DB_ERROR"
            }
            return response;
        }
    }
    

}


module.exports=ProductService;