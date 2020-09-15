const Config=require("../Configs/Config");
const mysql=require("mysql");
const logger = require('../logger/Logger');





class Db {

    constructor() {
        this.dbConnectionPool=mysql.createPool({
            connectionLimit:Config.pool.limit,
            user           :Config.db.userName,
            host           :Config.db.host,
            database       :Config.db.name,
            password       :Config.db.password,
            multipleStatements : true
        });
        logger.info("[DB][Database Pool created]    [OK]");


        if(!this.dbConnectionPool){
            logger.info("[DB.Event][Failed To register Event]    [FAILED]");
        }else{
            logger.info("[DB.Event][Event registered] [OK]");

            this.dbConnectionPool.on('acquire',(connection)=>{
              console.log("connection %d is aquired", connection.threadId);
            });

            this.dbConnectionPool.on('release',(connection)=>{
                console.log("connection %d is release", connection.threadId);
              });

            
        }
    }

    getConnectionPool(){
        return this.dbConnectionPool;
    }

    

}

class Singleton {

  constructor() {
      if (!Singleton.instance) {
        logger.info("[DB.POOL][Creating New Instance Of DB POOL]    [OK]");

          Singleton.instance = new Db();
      }
  }

  getInstance() {
    logger.info("[DB.POOL][Returning Old Instance Of DB POOL]    [OK]");

      return Singleton.instance;
  }

}

module.exports = Singleton;


