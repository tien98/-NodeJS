var express = require('express');
var cotroller = require('../contorller/home.controller');
var router = express.Router();

router.get('/', cotroller.home);
router.get('/*.:idxem', cotroller.xem);
router.get('/search', cotroller.search);
module.exports = router;