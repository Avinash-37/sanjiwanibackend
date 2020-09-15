/**
 * @file Product.js
 * @description This file is POJO represantaion of ProductTable for Apecto Partner
 * @date 04 feb 2020
 *  
 */






//const ResourceNotFoundError=require("../Error/ResourceNotFoundError");
const date= require("date-and-time");
const Db = require("../DbUtils/Db");
const {isEmpty,queryBuilder} = require("../helper/Utils"); 


const ProductTable=function(){
     
 //const pool=new DbUtils().getPool();    
    const now= new Date();
    const pool=new Db().getInstance().getConnectionPool();

    return{
        //retrive all records from database
        find:function(query){
            console.log("Inside find all product");
            console.log(query);
            let baseQuery="SELECT * from product_table where 1=1 "

            baseQuery=queryBuilder(baseQuery,query);
            console.log(baseQuery)
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query(baseQuery,     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results);
                    });
                });
            });
        },

        //get ProductList
        getProduct:function(product){
            console.log("Inside find Product",product);
            let baseQuery="SELECT * from product_table where product_id = ?"

            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query(baseQuery,
                        [product.productId],     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results);
                    });
                });
            });
        },
         //get ProductList
         searchProducts:function(product){
            console.log("Inside find Product",product);
            let baseQuery="SELECT * from product_table where product_name like(?)"
        
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query(baseQuery,
                        [product+"%"],     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results);
                    });
                });
            });
        },

        //get ProductList
        updateProduct:function(product){
            console.log("Inside find Product");
            let baseQuery="SELECT * from product_table where product_id = ?"

            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query(baseQuery,
                        [product.productId],     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results);
                    });
                });
            });
        },

        findFav:function(query){
            console.log("Inside find favourite product");
            console.log(query);
            let baseQuery="SELECT * from product_table where 1=1"

            baseQuery=queryBuilder(baseQuery,query);
            console.log(baseQuery)
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query(baseQuery,     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results);
                    });
                });
            });
        },

        // get product list when item in order product table
        //get ProductList
        getProductFromOrderProductTable:function(){
            console.log("Inside find Order Product table in ProductTable");
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query("CALL `GET_ORDER_PRODUCT_LIST`()",     
                    (err,results)=>{
                        if(err){
                            
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        return resolve(results[0]);
                    });
                });
            });
        },

    } 
    

}

module.exports=ProductTable;