const DbUtils=require("./DbUtils");
const Db = require("./Db");
dbUtils=new DbUtils();

/*
console.log(dbUtils.getPool());
dbUtils.close();
*/





module.exports=(function(){


    let db = new Db().getInstance();

    db.getConnectionPool().query("select 1+1 from UserTable",(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
    });
    



})();









