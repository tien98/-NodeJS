var express = require('express');
var passport = require('passport');
var controller = require('../../contorller/user/signup.controller');
var router = express.Router();

//token
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
// router.use(csrfProtection);

router.get('/profile', isLoggedIn , controller.profile);

router.get('/logout',isLoggedIn,controller.logout);

router.use('/', notLoggedIn, function(req, res, next){
    next();
});
router.get('/signup' ,csrfProtection,controller.signup);
router.post('/signup',passport.authenticate('local.signup',{  
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true 
    })
);

router.get('/signin' ,csrfProtection,controller.signin);
router.post('/signin',passport.authenticate('local.signin',{  
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true 
    })
);


module.exports = router;
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}