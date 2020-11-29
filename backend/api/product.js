var express = require('express');
var router = express.Router();
var productModel= require('../modules/product');
var multer  = require('multer');
var checkAuth= require('./middelware/auth');
const productController= require('./controller/products');

var storage = multer.diskStorage({ 
    destination:"./public/uploads",
    filename:(req, file, cb) =>{
      cb(null, Date.now()+file.originalname);
    } 
  })
  const filefilter = (req,file,cb)=>{
      if(file.mimetype == 'image/jpg'|| file.mimetype == 'image/jpeg'|| file.mimetype == 'image/png'){
          cb(null,true);
      }else{
          cb(null,false);
      }
  }
  var upload = multer({ storage: storage, 
limits:{
    fileSize: 1024*1024*5
},
    fileFilter:filefilter });
  /* GET home page. */
  router.get('/', function(req, res, next) {
    employee.exec((err,data)=>{
      if(err){throw err}
      else{res.render('index', { title: 'Employee Records' , records:data, success:'' });}
    })
  });


router.get('/getAllProduct',checkAuth,productController.getAllProduct)

router.post('/add_data',upload.single('productImage'),checkAuth,productController.add_data)



module.exports = router;