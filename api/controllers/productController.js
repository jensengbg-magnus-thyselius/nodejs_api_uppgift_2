
const dbExports = require("../utils/dbHandler");

exports.getAllProducts = function(req, res) {
    let products = dbExports.getAllProducts()
      res.json(products);
};

exports.getCart = function(req, res) {
    let cart = dbExports.getCart()
      res.json(cart);
};

exports.addToCart = function(req, res) {

    var cart = Array.from(dbExports.getCart());
    var products =  Array.from(dbExports.getAllProducts());
    
    if (!products.some(x => x.id == req.params.productId)){
        res.json('Product not found')
        return;
    }
    
    var duplicateFound = cart.some(x => x.productId == req.params.productId)

    if(!duplicateFound){
        let product = products.find(x => x.id == req.params.productId)

        dbExports.addToCart(product.id, product.name, product.price, product.imgurl)
        res.json('Added to cart')
    }
    else{
        res.json('Duplicate product already in cart')
    }

};

exports.removeFromCart = function(req, res) {
    
    var cart =  Array.from(dbExports.getCart());
    
    if(cart.some(x => x.productId == req.params.productId)) {
        dbExports.removeFromCart(req.params.productId)
        res.json('Removed from cart')
    }
    else{
        res.json('Product not in cart')
    }
};

