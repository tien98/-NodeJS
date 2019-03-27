var mongoose = require('mongoose');
var products = new mongoose.Schema({ nameSP: 'string', 
                                    giaSP: 'string',
                                    urlSP: 'string' , 
                                    gioiThieuSP: 'string', 
                                    thongSo: 'string' }, {collection: 'products'});
module.exports = mongoose.model('products', products);