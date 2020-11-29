var productModel= require('../../modules/product');
module.exports={
    // get methos controller
    getAllProduct:(req,res,next)=>{
        productModel.find().select("product_name price quentity imagename").exec()
        .then((data)=>{
            res.status(200).json({
                msg:"Okay....",
                result:data
            })
        }).catch((err)=>{
            res.json(err);
        })
    },



    // post method controller
    add_data:(req,res,next)=>{
        console.log(req.userData);
        var namee = req.body.name;
        var rss= req.body.rs;
        var quantityy=req.body.quantity;
        var photo=req.file.path;
        var pro_detail=new productModel({
          //_id:mongoose.Schema.Types.ObjectId,
          product_name:namee,
          price:rss,
          quentity:quantityy,
          imagename:photo
        })
        pro_detail.save()
        .then((data)=>{
            res.status(201).json({
                msg:"data inserted successfully.",
                result:data
            })
        }).catch((err)=>{
            res.json({msg:err});
        })
    }
}