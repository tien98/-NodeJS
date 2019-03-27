const express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var homeRoute = require('./routes/home.router.js');
var productsRouter = require('./routes/admin/products.router');
const port = (process.env.PORT || 3000)

const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");

mongoose.connect('mongodb://localhost/shop');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', homeRoute);
app.use('/products', productsRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))