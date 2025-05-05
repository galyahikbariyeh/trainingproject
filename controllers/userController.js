
const User = require ('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY

exports.getAllUsers= async(req,res)=>{
    try{
        const users = await User.find();  
        res.status(200).json(users) 
      
    } 
    catch(error){
        res.status(500).json({message:error.message}) 
    }
}

// create user
exports.createUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
       
        user ={name,email,password}
        savedUser = new User(user)
        savedUser.save()
        res.status(200).json({message:'User register in successfully',savedUser})
         
       
    }
    
    catch (error){
        res.status(500).json({message:error.message})
    }

 }
//login
 exports.login = async (req, res) => {
    const {email, password}= req.body
    try {
        const user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({message:'Invalid password'})
        }
       const token = jwt.sign({userId:user._id,role:user.role},SECRET_KEY,{expiresIn:'24h'})
        return res.status(200).json({message:'User logged in successfully',/*user:user,*/token:token})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
    
}

 //auth

 exports.auth = async (req,res,next)=>{
    //add token from header
    const token = req.header('Auth')

    if(!token){
        return res.status(400).json({message:'Token not found'})
    }
    try {
        const verified = jwt.verify(token,SECRET_KEY)
       req.user= verified
       //return res.status(200).json({message:'User is authenticated',user:req.user})
       next()
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
  }

  //adminauth
  exports.adminAuth = async (req, res, next) => {
    // Get token from header
    const token = req.header('Auth');

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;

       
       
        if (verified.role !== 'admin') {
            return res.status(400).json({ message: 'you are not admin' });

    }
    next();
} 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};