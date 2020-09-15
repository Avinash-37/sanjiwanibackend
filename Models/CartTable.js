/**
 * @file Cart.js
 * @desc User Shopping cart 
 * 
 */

 
const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();

 class CartTable{

    
    save(Cart) {
        console.log("Inside Cart Table Save")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("insert into cart_table (shop_id,product_id,wholeseller_id,quantity,net_actual_price,net_offer_price,total_price,update_date) values(?,?,?,?,?,?,?,?)", 
                [  Cart.shopId,
                   Cart.productId,
                   Cart.wholeSellerId,
                   Cart.quantity,
                   Cart.netActualPrice,
                   Cart.netOfferPrice,
                   Cart.totalAmount,
                   new Date()
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results);
                        return resolve(results);
                    });
            });
        });
     }


     /**
      * updating Cart
      */
     update(Cart) {
        console.log("Inside Cart Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("update cart_table set quantity = ? , total_price = ? , update_date = ?  where product_id = ? AND shop_id = ?", 
                [  
                   Cart.quantity,
                   Cart.totalAmount,
                   new Date(),
                   Cart.productId,
                   Cart.shopId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results);
                        return resolve(results);
                    });
            });
        });
     }



     /**
      * Delete
      * 
      */

     delete(Cart) {
        console.log("Inside Cart Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("delete from cart_table where product_id = ? AND shop_id = ?", 
                [  
                   Cart.productId,
                   Cart.shopId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results);
                        return resolve(results);
                    });
            });
        });
     }

    /**
      * Delete all data from table
      * 
      */

     deleteAll(Cart) {
        console.log("Inside Cart Table delete All table data from cart")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error when deleteing all cart data---" + err);
                    return reject(err);
                }
                connection.query("delete from cart_table where shop_id = ?", 
                [  
                   Cart.shopId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results);
                        return resolve(results);
                    });
            });
        });
     }

     /**
      * Select
      */

     find(Cart) {
        console.log("Inside Cart Table Update");
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("CALL GET_CART(?)", 
                [  
                   Cart.shopId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results[0]);
                        return resolve(results[0]);
                    });
            });
        });
     }
  
 }

 module.exports=CartTable;