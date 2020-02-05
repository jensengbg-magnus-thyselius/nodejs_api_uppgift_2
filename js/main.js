
//variables
const productGrid = document.getElementById('mainGrid');
const cartProducts = getCart()
const allProducts = getProducts()
let data

//API functions
async function getProducts() {
    const url = 'http://localhost:5050/products';
    let response = await fetch(url, { method: 'GET' });
    data = response.json()
    return data
}

async function getCart() {
    const url = 'http://localhost:5050/cart';
    let response = await fetch(url, { method: 'GET' });
    data = response.json()
    return data
}

async function addToCart() {
    
    console.log('adding to cart ' + this.id)
    const url = 'http://localhost:5050/cart/' + this.id + '';
    await fetch(url, { method: 'POST' });
}

async function removeFromCart() {
    
    console.log('removing from cart ' + this.id);
    const url = 'http://localhost:5050/cart/' + this.id + '';
    await fetch(url, { method: 'DELETE' });
}



//TO STRING ON GET ALL PRODUCTS
document.getElementById("getProductsButton").addEventListener('click', showProducts)
document.getElementById("getCartButton").addEventListener('click', showCart)



//FUNCTIONS TO SHOW PRODUCTS & CART
function showProducts() {
    console.log('clearing products....')
    productGrid.innerHTML = ''
    getProducts().then(response => {
        const json = JSON.stringify(response);
        createProducts(json);
    });
}

function showCart() {
    console.log('clearing cart....')
    productGrid.innerHTML = ''
    getCart().then(response => {
        const json = JSON.stringify(response);
        createCart(json);
    });
      
}

//FUNCTION TO LIST PRODUCTS

function createProducts(products) {
    
    let productArr = JSON.parse(products)
    productArr.forEach(x => {

        productGrid.innerHTML += '<div class="prodBox">' +
            '<p class="productInfo" id="cartStatus '+ x.id +'"></p>' +
            '<p class="productInfo"> Name:' + x.name + '</p>' +
            '<p class="productInfo"> Price:' + x.price + '</p>' +
            '<img src = ' + x.imgurl + ' class = "productImg">' +
            '<button class="prodButton" id="' + x.id + '">Lägg till i varukorg</button>'
            '</div>'
            


            getCart().then(function(result) {
                
                let cartArr = JSON.parse(JSON.stringify(result));
                console.log(cartArr);
                for(let i = 0; i < cartArr.length; i++ ){
                    
                    if( cartArr[i].productId == x.id){
                        let p = document.getElementById('cartStatus ' + cartArr[i].productId)
                        p.innerHTML = 'Redan tillagd.'
                    }
                }
            });
        });

    var buttonsArr = document.getElementsByClassName("prodButton");
    
    for (var i = 0; i < buttonsArr.length; i++) {
        let button = buttonsArr[i]
        button.addEventListener('click', addToCart)
    }
}

//FUNCTION TO LIST ALL CART PRODUCTS

function createCart(products) {

    
    let productArr = JSON.parse(products)
    productArr.forEach(x => {

        productGrid.innerHTML += '<div class="prodBox">' +
            '<button type="button" class="prodButton" id="' + x.productId + '">Ta bort ur varukorg</button>' +
            '<p class="productInfo"> Name:' + x.name + '</p>' +
            '<p class="productInfo"> Price:' + x.price + '</p>' +
            '<img src = ' + x.imgurl + ' class = "productImg">' +
            '</div>'            
    })

    var buttonsArr = document.getElementsByClassName("prodButton");
    for (var i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].addEventListener('click', removeFromCart)
    }

    return productArr;

    
}



// remove.addEventListener('click', function(){
//     removeFromCart();
// })







    