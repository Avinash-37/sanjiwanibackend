/**
 * This File Handle and Initiate all Server Responses for Apeccto App
 * 
 * File   : Server.js
 * author : Vaibhav D. Shinde
 * Date   : 22 July 2019
 */
// This line must come before importing any instrumented module.
const express = require('express');
const querystring = require('querystring');
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Config = require("./Configs/Config");
//const cluster = require("cluster");
//const os      = require("os");
//imorting routes

const ProductRoutes = require('./Routes/ProductRoutes');
const FavouriteRoutes = require('./Routes/FavouriteRoutes');
const CartRoutes = require('./Routes/CartRoutes');
const RatingRoutes = require('./Routes/RatingRoutes');
const AddressRoutes = require('./Routes/AddressRoutes');
const OrderRoutes = require('./Routes/OrderRoutes');
const ShopRoutes = require('./Routes/ShopRoutes');

const logger = require('./logger/Logger');

/*
console.log("Strting server.........");
if(cluster.isMaster){
    console.log("Starting master.........");
    for(let i=0;i<os.cpus().length;i++){
        cluster.fork();
    }
}else{
*/
// instantiate Express
const app = express();

// use middleware to serve static files in express js
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());



app.use((req,res,next)=>{
    let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info("[Protocol : "+req.protocol+"] [HostName :"+req.hostname+"] [Path :"+req.path+"] [MethodType : "+req.method+"] [UserIP : "+userIp+" ] [UserAgent : "+req.header('user-agent')+"]");
    next();
});

app.use("/usercart",CartRoutes);
app.use("/product",ProductRoutes);
app.use("/rate",RatingRoutes);
app.use("/userfav",FavouriteRoutes);
app.use("/order",OrderRoutes);
app.use("/address",AddressRoutes);
app.use("/shop",ShopRoutes);
 
app.use((req,res,next)=>{
    res.status(404).json({
        status:{
            status:"OK",
            statusCode:404,
            isSucess:true
        },
        error:{
            errorName:"FILE_NOT_FOUND",
            errorMsg:"File is Not Found From USERCART",
            errorCode:678
        },
        payload:null

    });
})




let PORT=Config.process.port;

// Start Server 
app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }
    console.log(`sanjiwani backendpa Server Started on  ${PORT} Port`);
});


//}









/*

cluster.on('exit', (worker) => {
    console.log('mayday! mayday! worker', worker.id, ' is no more!')
    cluster.fork()
});


cluster.on('fork', function (worker) {
    console.log('foring worker for CPU core :', worker.id, 'was forked.........');
});


*/