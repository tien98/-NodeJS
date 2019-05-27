const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var homeRoute = require('./routes/home.router.js');
var productsRouter = require('./routes/admin/products.router');
var signUpRouter = require('./routes/user/signup.router');

const port = process.env.PORT || 3001;

const app = express()
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// app.set("views", "./views");
const db_url = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/shop';
mongoose.connect(db_url);
require('./config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new  MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000  }
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/products', productsRouter);
app.use('/user', signUpRouter);
app.use('/', homeRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))