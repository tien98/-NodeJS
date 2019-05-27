const fetch = require('node-fetch');
const Bluebird = require('bluebird');
var Cart = require('../models/cart');
fetch.Promise = Bluebird;

var productsModel = require('../models/products');
module.exports.home = (req, res) =>{
    productsModel.find({},function(err, dulieu){
    res.render('home.ejs', {title: 'Home', data:dulieu});
    })
}

module.exports.xem = (req, res) =>{
    // productsModel.find({_id : req.params.idxem},function(err, dulieu){
    // res.render('xem.ejs', {title: 'Xem Thông Tin', data:dulieu});
    // })
   return fetch(`http://localhost:3000/tasks/*.${req.params.idxem}`)
    .then(res => res.json())
    .then(json => res.render('xem.ejs', {title: 'Xem Thông Tin', data:json}));
}

module.exports.search = (req, res) =>{
    var noMatch;
    var q = req.query.q;
    if(req.query.q){
        const regex = new RegExp(escapeRegex(req.query.q), 'gi');
        productsModel.find({ nameSP: regex},function(err, dulieu){
            if(err){
                console.log(err);
            }
            else{    
                if(dulieu.length < 1){
                    noMatch = "Không tìm thấy , xin lại nhập lại!!" ;
                }
                res.render('search.ejs', {title: 'Ket Qua', 
                                            data:dulieu, 
                                            value : q, noMatch : noMatch});
            }
            
    })
    }else{
        productsModel.find({},function(err, dulieu){
            res.render('search.ejs', {title: 'Home', 
                                    data:dulieu, value:  "", 
                                    noMatch : noMatch});
            })
   }
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports.add_to_cart = (req, res, next) =>{
   var productId = req.params.id;
   var cart =new Cart(req.session.cart ? req.session.cart : {items: {}} );
   productsModel.findById(productId,function(err, product){
         if(err){
             return res.redirect('/');
         }
         console.log(product);
         cart.add(product, product.id);
         req.session.cart = cart;
         console.log(req.session.cart);
         res.redirect('/');
    })
}
module.exports.shopping_cart = (req, res, next) =>{
    if(!req.session.cart){
        return res.render('/user/add-to-cart', {products: null, title: "Shopping cart"});
    }
    var cart = new Cart(req.session.cart);
    res.render('user/add-to-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice,title: "Shopping cart"});
 }
