var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var passModel= require('../modules/add_password');
var passCatModel= require('../modules/password-category');
var getPassCat = passCatModel.find({},{"password_category":1,_id:1});
var checkAuth= require('./middelware/auth');
const categoryController= require('./controller/category');
  
router.get("/getCategory/:user_id",checkAuth,categoryController.getCategory);

router.post("/add-category",checkAuth,categoryController.add_category)

router.put("/add-update-category/:id",checkAuth,categoryController.add_new_category)

router.patch("/update-category/:id",checkAuth,categoryController.update_category)

router.delete("/delete-category/:id",categoryController.delete_category)



router.post("/add-new-password",function(req,res,next){
    var cat1 = req.body.pass_cat;
    var info1= req.body.pass_details;
    var project1=req.body.project_name;
    var information1=new passModel({
      _id:mongoose.Types.ObjectId(),
      password_category:cat1,
      password_detail:info1,
      project_name:project1
    })
    information1.save()
    .then((data)=>{
        res.status(201).json({
            msg:"data inserted successfully.",
            result:data
        })
    }).catch((err)=>{
        res.json(err);
    })
})

router.get("/getAllPasswords",function(req,res,next){
    passModel.find().select("password_category password_detail project_name").populate("password_category","password_category").exec()
        .then((data)=>{
            res.status(200).json({
                msg:"data found successfully.",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
        })
})


router.get("/FindById/:id",function(req,res,next){
    var id=req.params.id;
    passModel.findById(id).select("password_category password_detail project_name").populate("password_category","password_category").exec()
        .then((data)=>{
            res.status(200).json({
                msg:"Okay....",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
        })
})


router.delete("/delete-password/:id",function(req,res,next){
    let d_id=req.params.id;
    let del_rec=passModel.findByIdAndDelete(d_id);
    del_rec.exec()
        .then((data)=>{
            res.status(201).json({
                msg:"data deleted successfully.",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
    })
})

module.exports = router;