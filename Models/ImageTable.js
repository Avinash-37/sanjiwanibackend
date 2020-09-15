/**
 * @file ImageTable.js
 * @description This class resprest all DAO layer For Favourites Table
 * @date 06/03/2020
 * 
 * */

const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();



class ImageTable{
    // constructor
    ImageTable(){}

    find(query){
           console.log("Inside ImageTableTable")
           return new Promise((resolve,reject)=>{
               pool.getConnection((err,connection)=>{
                   if(err){
                       console.log("Error -------------"+err);
                       return reject(err);
                   }
                   connection.query("select * from image_table",
                   (err,results)=>{
                       if(err){
                           connection.release();
                           return reject(err);
                       }
                       connection.release();
                       console.log(results);
                       return resolve(results);
                   });
               });
           });
       

    }


    getImages(product){
        console.log("Inside ImageTableTable")
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.log("Error -------------"+err);
                    return reject(err);
                }
                connection.query("select * from image_table where product_id = ?",[product.productId],
                (err,results)=>{
                    if(err){
                        connection.release();
                        return reject(err);
                    }
                    connection.release();
                    console.log(results);
                    return resolve(results);
                });
            });
        });
    
    }



}

module.exports=ImageTable;