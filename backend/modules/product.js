const mongoose = require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var productSchema =new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    product_name: {type:String, 
        required: true,
        },

    price: {type:Number, 
        required: true,
        },

    quentity: {type:Number, 
        required: true,
    },
    imagename: {type:String},
    date:{
        type: Date, 
        default: Date.now }
});
productSchema.plugin(mongoosePaginate);
var proModel = mongoose.model('products', productSchema);
module.exports=proModel;