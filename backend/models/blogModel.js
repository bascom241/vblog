const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        reqired:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    text:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:String,
        required:true        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
 


})

module.exports = mongoose.model('Blog',blogSchema)