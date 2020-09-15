/*
File   : Config.js
@uthor : Vaibhav D. Shinde
Date   :22 July 2019

This is Config File  Server for issuesing and for getting Config for Dev Enviorment
*/
const logger = require('../logger/Logger');

let Config = null


logger.info("[CONFIG][Message : NODE_ENV detecting... ]");
logger.info("[CONFIG][Message : NODE_ENV : "+process.env.NODE_ENV+"]");

if(process.env.NODE_ENV === 'production'){
logger.info("[CONFIG][Message : Setting production config [OK]]");
    Config={
        db:{
            userName:"root",
            host:"34.93.213.17",
            password:"atc9dpfoxtrot",
            name:"apecto_mall"
        },
        pool:{
            limit:10,
        },
        process:{
            port:6000
        },
        session:{
            secret:"56ggdft278488"
        }
    }
}else{

    logger.info("[CONFIG][Message : Setting development config [OK]]");
    Config={
        db:{
            userName:"root",
            host:"localhost",
            password:"",
            name:"apecto_mall"
        },
        pool:{
            limit:10,
        },
        process:{
            port:4510
        },
        session:{
            secret:"56ggdft278488"
        }


}

}


module.exports=Config;