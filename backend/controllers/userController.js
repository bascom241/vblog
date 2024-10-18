const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')


const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
exports.createUser = async  (req,res) => {
    const { name, email, password } = req.body;

    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(404).json({message:'User alread exists'})
        }
        if(!validator.isEmail(email)){
            res.ststus(404).json({message:'Email is not a valid '})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name:name,
            email:email,
            password:hashpassword
        })

        await newUser.save();
        const token = createToken(newUser._id)
        res.status(200).json({message:'User Created successfully', token})
    } catch (err){
        console.log(err.message)
        res.status(404).json({message:'Error creating user', error:err.message})
    }
    

    
}
exports.LoginUser =async  (req,res) =>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message:'Email not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message:'Incorrect Pssword'})
        }
        const token = createToken(user._id);
        res.status(200).json({success:true, token})
    } catch (err){
        console.log(err.message)
        res.status(500).json({message:'Can not login User', error:err.message})
    }
}