var productsModel = require('../../models/products');

module.exports.products = (req, res) =>{
    productsModel.find({},function(err, dulieu){
    res.render('products.ejs', {title: 'Products', data:dulieu});
    })
}
module.exports.products_them = (req, res)=>{
		res.render('add_products.ejs', {
            title: "Thêm Products"} 	
        )
}
module.exports.products_them_post = (req, res)=>{
   if(req.file){
    var getUrl = req.file.path;
    // var urlSP = getUrl.replace(/\\/g, '/');
    var urlSP = getUrl.replace('public', '');
    var dulieu = {
        nameSP : req.body.nameSP,
        giaSP : req.body.giaSP,
        gioiThieuSP: req.body.gioiThieuSP,
        thongSo: req.body.thongSo,
        urlSP : urlSP
    };
    const newProducts = new productsModel(dulieu);
    newProducts.save(err => {
        if (err) return res.status(500).send(err);
        return res.redirect('/products/them');
    });
   }
   else{
    const newProducts = new productsModel(req.body);
    newProducts.save(err => {
        if (err) return res.status(500).send(err);
        return res.redirect('/products/them');
    });
   }
}
module.exports.xoa = (req, res)=>{
    productsModel.findByIdAndRemove(req.params.idcanxoa, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.redirect('/products');
    });
}

module.exports.products_sua = (req, res)=>{
    productsModel.find({_id: req.params.idcansua},function(err, dulieu){
        res.render('sua_products.ejs', {title: 'Sửa Products', data:dulieu});
        })
}
module.exports.products_sua_post = (req, res)=>{
   if(req.file){
    var getUrl = req.file.path;
    // var urlSP = getUrl.replace(/\\/g, '/');
    var urlSP = getUrl.replace('public', '');
    var dulieu = {
        nameSP : req.body.nameSP,
        giaSP : req.body.giaSP,
        gioiThieuSP: req.body.gioiThieuSP,
        thongSo: req.body.thongSo,
        urlSP : urlSP
    };
    productsModel.findByIdAndUpdate(
        req.params.idcansua,
        dulieu,
        {new: true},
        
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.redirect('/products');
        }
    )
   }
   else{
    productsModel.findByIdAndUpdate(
        req.params.idcansua,
        req.body,
        {new: true},
        
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.redirect('/products');
        }
    )
   }     
    
}
module.exports.products_timkiem_post = (req, res)=>{
    productsModel.find({name : req.body.search},function(err, dulieu){
        res.render('products.ejs', {title: 'search products', data:dulieu });
        })
}