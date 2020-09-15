const ProductService = require("../Services/ProductService");



new ProductService().getAllProductList().then(result=>{console.log("Inside then "+result)}).catch(err=>{console.log("Inside Then"+err)});