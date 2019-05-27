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
    let data = req.body;
   if(req.file){
    var getUrl = req.file.path;
    // var urlSP = getUrl.replace(/\\/g, '/');
    var urlSP = getUrl.replace('public', '');
    data.urlSP = urlSP;
   }
    const newProducts = new productsModel(data);
    newProducts.save(err => {
        if (err) return res.status(500).send(err);
        return res.redirect('/products/them');
    });
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
    let data = req.body;
   if(req.file){
    var getUrl = req.file.path;
    // var urlSP = getUrl.replace(/\\/g, '/');
    var urlSP = getUrl.replace('public', '');
    data.urlSP = urlSP;
        }
    productsModel.findByIdAndUpdate(
        req.params.idcansua,
        data,
        {new: true},
        
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.redirect('/products');
        }
    )
}

module.exports.products_timkiem_post = (req, res)=>{
    productsModel.find({name : req.body.search},function(err, dulieu){
        res.render('products.ejs', {title: 'search products', data:dulieu });
        })
}