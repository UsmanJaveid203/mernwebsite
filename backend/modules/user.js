const mongoose = require('mongoose');
//const dotenv = require('dotenv');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    username: {type:String, 
        required: true, 
        // index: {
        //     unique: true,         
        // }
    }, 
 
	emails: {
        type:String, 
        required: true,
        // index: {
        //     unique: true, 
        // },
        match:/^([\w]*[\w\.]*(?!\.)@gmail.com)/
    },
    password: {
        type:String, 
        required: true
    },
    user_img :{
        type : String
    },
    date:{
        type: Date, 
        default: Date.now }
});

var userModel = mongoose.model('users', userSchema);
module.exports=userModel;