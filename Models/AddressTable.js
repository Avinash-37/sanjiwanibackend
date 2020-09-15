/**
 * @file AddressTable.js
 * @desc User Shopping cart 
 * 
 */

 
const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();


 class AddressTable{

    
    save(Address) {
        console.log("Inside Address Table Save")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("insert into shop_address_table (shop_id,address_type,shop_address) values(?,?,?)", 
                [  Address.shopId,
                   Address.addressType,
                   Address.shopAddress
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
        console.log("Inside Address Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("update shop_address_table set shop = ? , total_price = ? , update_date = ?  where product_id = ? AND shop_id = ?", 
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

     delete(Address) {
        console.log("Inside Address Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("delete from shop_address_table where  address_type = ? AND shop_id = ?", 
                [  
                   Address.addressType,
                   Address.shopId
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
                connection.query("select * from shop_address_table where shop_id = ?", 
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
  
 }

 module.exports=AddressTable;