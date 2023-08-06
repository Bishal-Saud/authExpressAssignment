const userModel = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const emailValidator = require("email-validator");
const express = require("express")


const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({
      success: false,
      message: "All fields required",
    });
    return;
  }

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address 📩",
    });
  }

  try {
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    const userInfo = new userModel(req.body);
    // userSchema "pre" middleware functions for "save" will hash the password using bcrypt
    // before saving the data into the database
    const result = await userInfo.save();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const signIn = async (req, res, next) => {
  const {username,password} = req.body;
  try {
      const getuserData =await userModel.findOne({username}).select("+password");
      
      if(getuserData && getuserData.username ){
          const result= await bcrypt.compare(password,getuserData.password)
          if(result){

              const token = await getuserData.jwtToken()
              const cookieOption = {
                  maxAge: 24 * 60 * 60 * 1000, //24hr
                  
                  httpOnly: true //  not able to modify  the cookie in client side
                };
            
                res.cookie("token", token, cookieOption);
                res.status(200).json({
                  success: true,
                  data: getuserData
                });

          }else{
              res.status(404).send({msg:"Password is Incorrect, Try Again!"})
          }
      }else{  
          res.status(404).send({msg:"No Account Found Associated with this username"})
      }

      
  } catch (error) {
      res.status(501).send({msg:error.message})
  }

};

const getUser = async (req,res,next)=>{
  const {id,username} = req.user;

  try{
      const userData = await userModel.findOne({username});
      res.status(200).send({
          msg:"Success",
          data:userData
      })

  }
  catch(err){
      res.status(501).send({msg:err.message})
  }


}
module.exports = {
  signUp,
  signIn,
  getUser,
};
