/**
 * @file FavouriteTable.js
 * @description This class resprest all DAO layer For Favourites Table
 * @date 06/03/2020
 * 
 * */

 const Db = require("../DbUtils/Db");
 const pool=new Db().getInstance().getConnectionPool();



 class FavouriteTable{
     // constructor
     FavouriteTable(){}

     find(Cart){
            console.log("Inside Favourite Table find")
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query("select * from favorite_table where shop_id = ?",
                    [Cart.shopId],
                    (err,results)=>{
                        if(err){
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(typeof results);
                        return resolve(results);
                    });
                });
            });
        }


        findAll(query){
            console.log("Inside FavouriteTable find all favourite")
            let baseQuery="select * from favorite_table where 1=1";
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
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(typeof results);
                        return resolve(results);
                    });
                });
            });
        }


        /**
         * save Fav Button
         */


        save(Cart){
            console.log("Inside FavouriteTable save")
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query("insert into favorite_table (shop_id,product_id) VALUE(?,?) ",
                    [
                        Cart.shopId,
                        Cart.productId
                    ],
                    (err,results)=>{
                        if(err){
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(typeof results);
                        return resolve(results);
                    });
                });
            });
        }



        /**
         * @description Delete The Fav From User
         * @param {Cart} Cart 
         */
        delete(Cart){

            console.log("Inside FavouriteTable Delete ")
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,connection)=>{
                    if(err){
                        console.log("Error -------------"+err);
                        return reject(err);
                    }
                    connection.query("delete from favorite_table where shop_id = ? AND product_id = ?",
                    [
                        Cart.shopId,
                        Cart.productId
                      
                    ],
                    (err,results)=>{
                        if(err){
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(typeof results);
                        return resolve(results);
                    });
                });
            });
        }

 }

 module.exports=FavouriteTable;