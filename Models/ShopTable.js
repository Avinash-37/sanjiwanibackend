 
const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();

 class ShopTable{

    




    
    save(Product) {
        console.log("Inside Shop Table Save",Product)
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("insert into product_table (product_id,product_name,product_desc,brand,category,sub_category,actual_price,offer_price,offer_percent,wholeseller_id,is_available,available_qty,added_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [   Product.productId,
                    Product.productName,
                    Product.productDescription,
                    Product.brand,
                    Product.category,
                    Product.subCategory,
                    Product.netActualPrice,
                    Product.netOfferPrice,
                    Product.offerPercentage,
                    Product.wholeSellerId,
                    Product.isAvailable,
                    Product.quantity,
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
      * updating Product
      */
     update(Product) {
        console.log("Inside Product Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("update Product_table set quantity = ? , total_price = ? , update_date = ?  where product_id = ? AND shop_id = ?", 
                [  
                   Product.quantity,
                   Product.totalAmount,
                   new Date(),
                   Product.productId,
                   Product.shopId
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

     delete(Product) {
        console.log("Inside Product Table Update")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error -------------" + err);
                    return reject(err);
                }
                connection.query("delete from Product_table where product_id = ? AND shop_id = ?", 
                [  
                   Product.productId,
                   Product.shopId
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

     deleteAll(Product) {
        console.log("Inside Product Table delete All table data from Product")
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error when deleteing all Product data---" + err);
                    return reject(err);
                }
                connection.query("delete from Product_table where shop_id = ?", 
                [  
                   Product.shopId
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

 module.exports=ShopTable;