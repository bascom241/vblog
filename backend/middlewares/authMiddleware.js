const User = require('../models/userModel');
const {promisify} = require('util');
const jwt = require('jsonwebtoken')


exports.protect = async (req,res,next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(404).json({message:'Unauthorized User'});
    }
    try{

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(decoded);

        const freshUser = await User.findById(decoded.id);

        if(!freshUser){
            return res.status(404).json({message:'User not found'})
        }

    req.user= decoded
    console.log(req.user)
    next()
    } catch(err){
        res.status(500).json({message:err.message})
    }

}