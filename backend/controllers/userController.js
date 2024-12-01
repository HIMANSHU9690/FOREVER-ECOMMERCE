 //first we will create Routes in
 // userCOntroller then we will create router us userRouter and after we will create endpoints in server.js

import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'




//  //arrow function for genrating the token
//  const createToken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)

//  }

const createToken = (id) => {
    return jwt.sign(
        { id }, // Payload
        process.env.JWT_SECRET, // Secret
        { expiresIn: '7d' } // Token expiration time (7 days, adjust as needed)
    );
};


//Route for user login
const loginUser=async(req,res)=>{

    try {
    
       const  {email,password}=req.body;
       const user=await userModel.findOne({email})
       
       if(!user){
           
        return res.json({success:false,message:"user does not exists"})
       }

       const isMatch =await bcrypt.compare(password,user.password);
       if(isMatch){
        const token=createToken(user._id)
        res.json({success:true,token})
       }else{
        res.json({success:false,message:"Invalid Credentials"})

       }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}



//Route for user register
const registerUser=async(req,res)=>{

    try {
        const{name,email,password}=req.body;
        //checking user already exist or not

        const exists=await userModel.findOne({email});

        if(exists){
            return res.json({success:false,message:"user already exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})

        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a valid email"})

        }
       
        //hashsing the user password using bycrypt package
        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })
           const user =await newUser.save()
            
         //creating token

         const token =createToken(user._id)
         res.json({success:true,token})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    

    
}



//route for admin login
const adminLogin=async(req,res)=>{
   try {
     
    const {email,password} =req.body

    if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid Credentials"})
    }

   } catch (error) {
       
    console.log(error);
    res.json({success:false,message:error.message})
   }
}


export{loginUser,registerUser,adminLogin}