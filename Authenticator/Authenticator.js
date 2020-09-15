/*
File   : Authenticator.js
@uthor : Vaibhav D. Shinde
Date   :22 July 2019

This is Authentiation Server for issuesing and verify token for apectoweb app api 
*/

const jwt = require("jsonwebtoken");
const Config = require("../Configs/Config");

function Authenticator(){
    return{
        getToken:function(payload,callback){
            if(!payload){
                return callback(new Error("Provide Payload"),null);
            }

            jwt.sign(payload,Config.session.secret,(err,token)=>{
                if(err){
                    return callback(err,null);
                }
                return callback(null,token);
            });
        },

        authenticate:function(token,callback){
            if(!token){
                return callback(new Error("Provide Token"),null);
            }
            jwt.verify(token,Config.dev.session.secret,(err,user)=>{
                if(err){
                    return callback(err,null);
                }
                return callback(null,user);
            });
        }
    }
}


module.exports=Authenticator;