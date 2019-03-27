var productsModel = require('../models/products');
module.exports.home = (req, res) =>{
    productsModel.find({},function(err, dulieu){
    res.render('home.ejs', {title: 'Home', data:dulieu});
    })
}

module.exports.xem = (req, res) =>{
    productsModel.find({_id : req.params.idxem},function(err, dulieu){
    res.render('xem.ejs', {title: 'Xem Thông Tin', data:dulieu});
    })
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
