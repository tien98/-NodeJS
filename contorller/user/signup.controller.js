var passport = require('passport');
module.exports.signup = (req, res, next) =>{
    var message = req.flash('error');
    res.render('user/signup.ejs', { title: 'Sign Up',csrfToken: req.csrfToken(), message: message, hasErrors: message.length>0 });
}
module.exports.profile = (req, res, next) =>{
    res.render('user/profile.ejs', { title: 'Profile'});
}

module.exports.signin = (req, res, next) =>{
    var message = req.flash('error');
    res.render('user/signin.ejs', { title: 'Sign In',csrfToken: req.csrfToken(), message: message, hasErrors: message.length>0 });
}
module.exports.logout = (req, res, next) =>{
    req.logout();
    res.redirect('/');
}
