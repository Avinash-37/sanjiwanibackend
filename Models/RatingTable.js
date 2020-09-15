/**
 * @file FavouriteTable.js
 * @description This class resprest all DAO layer For Favourites Table
 * @date 06/03/2020
 * 
 * */

const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();



class RatingTable{
    // constructor
    FavouriteTable(){

    }

    find(query){
           console.log("Inside Rating Table")
           return new Promise((resolve,reject)=>{
               pool.getConnection((err,connection)=>{
                   if(err){
                       console.log("Error -------------"+err);
                       return reject(err);
                   }
                   connection.query("select product_id,FORMAT(AVG(rating),1) AS Rating from rating_table GROUP BY product_id ",
                   (err,results)=>{
                       if(err){
                           connection.release();
                           return reject(err);
                       }
                       connection.release();
                       console.log(typeof results);
                       return resolve(results);
                   });
               });
           });
       

    }

    getRatings(product){
        console.log("Inside Rating Table")
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.log("Error -------------"+err);
                    return reject(err);
                }
                connection.query("select * from rating_table where product_id = ? ORDER BY(createdAt) DESC",[product.id],
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
    

 }

 //

 /**
  * 
  * @param {*} product 
  */
 save(product) {
    console.log("Inside Rating Table Save",product)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Error -------------" + err);
                return reject(err);
            }
            connection.query("insert into rating_table (product_id,shop_id,rating,comment,user_name,createdAt) values(?,?,?,?,?,?)",
             [  product.id,
                product.shopId,
                product.rating,
                product.comment,
                product.userName,
                new Date(),
            ],
                (err, results) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    connection.release();
                    return resolve(results);
                });
        });
    });
 }

    



}

module.exports=RatingTable;