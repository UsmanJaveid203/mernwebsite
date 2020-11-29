var express = require('express');
var router = express.Router();
var userModel= require('../modules/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer  = require('multer');

router.post('/login',function(req,res,next){
    var email = req.body.emails;
    userModel.find({emails:email}).exec()
    .then((data)=>{
        if(data.length<1){  
            res.json({
                msg:"username and password are invalid"
            })
        }else{
            bcrypt.compare(req.body.password , data[0].password , function(err,result){
                if(err){
                    res.json({
                        msg:"username and password are invalid"
                    })
                }else if(result){
                    var token = jwt.sign({ username:data[0].username , id:data[0]._id },
                    'secret'
                    );
                    res.status(201).json({
                        msg:"user found",
                        token:token
                    })
                }else{
                    res.json({
                        msg:"username and password are invalid"
                    })
                }
            })
            
        }  
    })
    .catch((err)=>{
        res.json({
            msg:"error",
            result:err
        })
    })
})



router.post('/signup',function(req,res,next){
    var username = req.body.username;
    var email= req.body.email;
    var password=req.body.password;
    var conpassword=req.body.conpassword;
    if(password===conpassword){
        password= bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.json({
                    msg:"something went wrong.",
                    result:err
                })
            }else{
                var user_detail=new userModel({
                //_id:mongoose.Schema.Types.ObjectId,
                username:username,
                emails:email,
                password:hash
                })
                user_detail.save()
                .then((data)=>{
                    res.status(201).json({
                        msg:"User registrated successfully.",
                        result:data
                    })
                }).catch((err)=>{
                    res.json(err);
                })
            }
        });
    }else{
        res.json({
            msg:"password not matched."
        })
    }
})





router.get('/getData/:user_id',function(req,res,next){
    var user_id= req.params.user_id;
    var getPassCat = userModel.findById(user_id);
    getPassCat.exec()
        .then((data)=>{
            res.status(200).json({
                msg:"data found successfully.",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
        })
})



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });

 
    router.patch("/update-profile/:user_id",upload.single('profileImage'),function(req,res,next){

        var id=req.params.user_id;
         var profilePic= req.file.path;
         userModel.findById(id,function(err,data){
     
          data.profileImage=profilePic?profilePic:data.profileImage;
         
            data.save()
              .then(doc=>{
                 res.status(201).json({
                     message:"Profile Image Updated Successfully",
                     results:doc
                 });
              })
              .catch(err=>{
                  res.json(err);
              })
             
         });
     
     });
module.exports = router;