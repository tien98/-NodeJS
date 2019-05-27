var express = require('express');
var controller = require('../../contorller/admin/products.controller');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-"+ file.originalname )
    }
  })
   

function checkFile (req, file, cb) {
  if(!file.originalname.match(/\.(jpg| png|gif|jpeg|JPG|PNG|GIF|JPEG)$/)){
    cb(new Error('Bạn chỉ được upload file ảnh!'))
  }else{
    cb(null, true)
  }
}

var upload = multer({ storage: storage , fileFilter: checkFile})

var router = express.Router();



router.get('/' ,controller.products);
router.get('/them' ,controller.products_them);
router.post('/them',upload.single('urlSP') ,controller.products_them_post);
router.get('/xoa/:idcanxoa' ,controller.xoa);
router.get('/sua/:idcansua' ,controller.products_sua);
router.post('/sua/:idcansua' ,upload.single('urlSP') ,controller.products_sua_post);
router.post('/timkiem' ,controller.products_timkiem_post);
module.exports = router;