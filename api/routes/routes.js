
module.exports = function(app) {
    var productController = require('../controllers/productController.js');

    app.route('/products')
        .get(productController.getAllProducts)
    
    app.route('/cart')
        .get(productController.getCart)
    
    app.route('/cart/:productId')
    .post(productController.addToCart)
    .delete(productController.removeFromCart);
    
    
    };
    

