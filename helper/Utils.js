
/**
 * This function check if object is Empty or Not
 */
function isEmpty(obj){
    return Object.keys(obj).length == 0 && obj.constructor === Object
}


function queryBuilder(sqlQuery , query){
    let baseQuery=sqlQuery;
    if(!isEmpty(query)){
        
        console.log("Object Has Keys");
        if(query.sqlQuery.hasOwnProperty("cat")){
            console.log("hasOwnProperty");
            baseQuery+=" AND category = "+"'"+query.sqlQuery.cat+"'"+"order by offer_percent DESC";
            console.log("hihihuhuhuhuh",baseQuery);
        }

        if(query.sqlQuery.hasOwnProperty("sub_cat")){
            console.log("hasOwnProperty");
            baseQuery+=" AND sub_category = "+"'"+query.sqlQuery.sub_cat+"'"+"order by offer_percent DESC";
        }

        if(query.sqlQuery.hasOwnProperty("price")){
            //checking if array 
            if(Array.isArray(query.sqlQuery.price)){
                    baseQuery+=" AND offer_price BETWEEN "+query.sqlQuery.price[0]+" AND "+query.sqlQuery.price[1];
                
            }else{
                //if not an arry
                baseQuery+="AND offer_price="+query.sqlQuery.price[0]
            }
        }
    }else{
        console.log("In elsse ",query);
        baseQuery+="order by offer_percent DESC";
    }

    return baseQuery;
    
    
}



module.exports={
    isEmpty:isEmpty,
    queryBuilder:queryBuilder
}