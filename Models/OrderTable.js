/**
 * @file OrderTable.js
 * @desc Order Table for User for placed order 
 * 
 */

 
const Db = require("../DbUtils/Db");
const pool=new Db().getInstance().getConnectionPool();


 class OrderTable{

    
    save(order) {
        console.log("Inside Order Table Save");
        console.log("Inside Order Table Save order Id",order.productId);
        console.log("Inside Order Table Save product Quantity",order.productQuantity);
        console.log("Inside Order Table Save wholeseller id ",order.wholsellerId);
        let productID=order.productId;
        let productQUANTITY=order.productQuantity;
        let wholesellerID=order.wholsellerId;
        let splitProductID=productID.split(",");
        let splitProductQUANTITY=productQUANTITY.split(",");
        let splitWholesellerID=wholesellerID.split(",");
        let orderID=new Date().getTime()+"";
        console.log(splitProductID.length);
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in placing order ------" + err);
                    return reject(err);
                }
                
                for(let i=0;i<splitProductID.length;i++){
                    connection.query("insert into order_product_table (product_id,order_id,product_quantity,wholeseller_id) values(?,?,?,?)", 
                [ 
                   splitProductID[i],
                   orderID,
                   splitProductQUANTITY[i],
                   splitWholesellerID[i]
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        console.log("after placing order",results);
                        return resolve(results);
                    });
                }

                this.placeOrder(order,orderID);
                
            });
        });
    }


     cancel(order) {
        console.log("Inside Order Table cancel");
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in cancel order ------" + err);
                    return reject(err);
                }
                    connection.query("UPDATE `order_table` SET `order_status`='CANCELLED' WHERE order_id=?", 
                [ 
                   order.order_id
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        console.log("after cancel order",results);
                        return resolve(results);
                    });
                
            });
        });
     }

     
     placeOrder(order,orderId){
        console.log("Called placeorder ------"+order );
        console.log("Called placeorder orderId ------"+orderId );
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in placing order placeorder ------" + err);
                    return reject(err);
                }
                connection.query("insert into order_table (shop_id,order_id,order_status,total_price,placed_date,delivery_date,shipping_address,contact_details) values(?,?,?,?,?,?,?,?)", 
                [
                   order.shopId,
                   orderId,
                   "IN_PROCESS",
                   order.totalPrice,
                   new Date(),
                   new Date(new Date().getTime()+(1000*60*60*24)),
                   order.shippingAddress,
                   order.contactDetails
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
      *This method get Joined values for OrderHistory 
      * @param {object} Order Order object with shopId as values
      */
     getOrder(Order) {
        console.log("Inside Order Table getOrder",Order);
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting order history after place----" + err);
                    return reject(err);
                }
                connection.query("CALL GET_ORDER(?)"
                , 
                [  
                   Order.shopId
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

      /**
      *This method get Joined values for OrderHistory 
      * @param {object} Order Order object with shopId as values
      */
     getCurrentOrder(Order) {
        console.log("Inside Order Table current order histroy ",Order);
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting current order history ----" + err);
                    connection.release();
                    return reject(err);
                }
                connection.query("select * from order_table where shop_Id=? AND order_status='IN_PROCESS' OR order_status='READY_FOR_DELIVERY' ORDER BY(placed_date) DESC"
                , 
                [  
                   Order.userId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results[0]);
                        return resolve(results);
                    });
            });
        });
     }

    //  *************** get order id *************
    getCurrentOrderId(Order) {
        console.log("Inside Order Table current order histroy ");
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting current order history ----" + err);
                    return reject(err);
                }
                connection.query("select order_id from order_table where shop_Id=? and order_status='IN_PROCESS'"
                , 
                [  
                   Order.userId
                ],
                    (err, results) => {
                        if (err) {
                            connection.release();
                            console.log(err);
                            return reject(err);
                        }
                        connection.release();
                        console.log(results[0]);
                        return resolve(results);
                    });
            });
        });
     }
  
     //  *************** get order id *************
    getCurrentOrderProduct(OrderId) {
        console.log("Inside Order Product Table current order histroy ");
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting current order Product ----" + err);
                    return reject(err);
                }
                connection.query("select * from order_product_table where order_id=?"
                , 
                [  
                   OrderId
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


         //  *************** get order id *************
    getProductInOrderFind(userId) {
        console.log("Inside Order Product Table current order histroy ",userId);
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting current order Product ----" + err);
                    return reject(err);
                }
                connection.query("CALL GET_SHOP_CURRENT_ORDER_PRODUCT_LIST(?)", 
                [  
                   userId.userId
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


     
    //  *************** get delivery notice *************
    getDeliveryNoticeFind() {
        console.log("Inside Order Product Table current order histroy ");
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("Error in getting current order Product ----" + err);
                    return reject(err);
                }
                connection.query("SELECT * FROM `delivery_notice` ORDER BY(createdAt) DESC", 
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

 module.exports=OrderTable;