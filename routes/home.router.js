var express = require('express');
var cotroller = require('../contorller/home.controller');
var router = express.Router();

router.get('/', cotroller.home);
router.get('/*.:idxem', cotroller.xem);
router.get('/search', cotroller.search);
router.get('/add-to-cart/:id',isLoggedIn, cotroller.add_to_cart);
router.get('/shopping-cart',isLoggedIn, cotroller.shopping_cart);
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
module.exports = router;