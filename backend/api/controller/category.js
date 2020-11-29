var passModel= require('../../modules/add_password');
var passCatModel= require('../../modules/password-category');
module.exports={ 
    getCategory:function(req,res,next){
        /*getPassCat.exec((err,data)=>{
            if(err) throw err;
            res.status(200).json({
                msg:"data get successfully",
                result:data
            })
            // res.send(data); 
        })*/ 
        var id= req.params.user_id;
        var getPassCat = passCatModel.find({user_id:id},{"password_category":1,_id:1});
        getPassCat.exec()
            .then((data)=>{
                res.status(200).json({
                    msg:"data found successfully.",
                    result:data
                })
            }).catch((err)=>{
                res.json(err);
            })
    },

    add_category:function(req,res,next){
        var passcat =req.body.pass;
        var user_id =req.body.user_id;
        var addcat =new passCatModel({
            password_category:passcat,
            user_id:user_id
        })
        /*addcat.save((err,data)=>{
            if(err) throw err;
            res.status(201).json({
                msg:"data inserted successfully.",
                result:data
            })
            //res.send("Success .restfull post api working");
        });*/
        addcat.save()
        .then((data)=>{
            res.status(201).json({
                msg:"data inserted successfully.",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
        })
    },

    add_new_category:function(req,res,next){
        var id=req.params.id;
            var passCategory=req.body.pass;
            passCatModel.findById(id,function(err,data){
                data.password_category=passCategory?passCategory:data.password_category;
                /*data.save(function(err,doc){
                    if(err){
                        throw err;
                    }else{
                        res.status(201).json({
                            msg:"data updated successfully.",
                            result:doc
                        })
                        //res.send("Data updated successfully.");
                    }
                })*/
        
                data.save()
                .then((data)=>{
                    res.status(201).json({
                        msg:"data Updated successfully.",
                        result:data
                    })
                }).catch((err)=>{
                    res.json(err);
                })
            })
    },


    update_category:function(req,res,next){
        var id=req.params.id;
        var passCategory=req.body.pass;
        passCatModel.findById(id,function(err,data){
            data.password_category=passCategory?passCategory:data.password_category;
            /*data.save(function(err,doc){
                if(err){
                    throw err;
                }else{
                    res.status(201).json({
                        msg:"data updated successfully.",
                        result:doc
                    })
                    //res.send("Data updated successfully.");
                }
            })*/
    
            data.save()
            .then((data)=>{
                res.status(201).json({
                    msg:"data Updated successfully.",
                    result:data
                })
            }).catch((err)=>{
                res.json(err);
            })
        })
    },


    delete_category:function(req,res,next){
        let d_id=req.params.id;
        let del_rec=passCatModel.findByIdAndDelete(d_id);
        /*del_rec.exec((err)=>{
            if(err){throw err}
            else{
                res.send("sucessfully deleted api working");
            }
        })*/
    
        del_rec.exec()
            .then((data)=>{
                res.status(201).json({
                    msg:"data deleted successfully.",
                    result:data
                })
            }).catch((err)=>{
                res.json(err);
        })
    }
}