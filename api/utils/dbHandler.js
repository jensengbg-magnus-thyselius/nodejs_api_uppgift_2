const low = require('lowdb')
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//Start
class dbExports {

  getAllProducts() {
    let products = db.get('products');
    return products;
  }
  
  addToCart(productId, name, price, imgurl) {
    db.get('cart').push({ productId: productId, name: name, price: price, imgurl: imgurl }).write();
    }
  
  removeFromCart(productId) {
    db.get('cart').remove({productId:parseInt(productId, 10)}).write();
  }
  
  getCart() {
    let cart = db.get('cart');
    return cart;  }
  
}

module.exports = new dbExports();

  