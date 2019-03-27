module.exports.them = (req, res, next) =>{
	var errors =[];
	if(!req.body.nameSP){
		errors.push('Name is required');
	}
	if(!req.body.giaSP){
		errors.push('Gia is required');
    }
    if(!req.body.gioiThieuSP){
		errors.push('Gioi thieu is required');
    }
    if(!req.body.thongSo){
		errors.push('Thong so is required');
    }
	if(errors.length){
		res.render('add_products.ejs', {
			errors : errors,
			values: req.body
		});
		return;
	}
	next();
}
