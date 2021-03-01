const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData")

let userSchema = new mongoose.Schema({
  email:String,
  pass:String,
  name:String,
  role:{
    type:String,default:"regular"
  },
  date_created:{
    type:Date, default:Date.now
  }
})

exports.UserModel = mongoose.model("users",userSchema);

exports.genToken = (_id) => {
  let token = jwt.sign({_id},config.jwtSecret,{expiresIn:"60mins"});
  return token;
}

exports.validUser = (_bodyUser) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(100).email().required(),
    pass:Joi.string().min(2).max(100).required(),
    name:Joi.string().min(2).max(100).required()
  })
  return joiSchema.validate(_bodyUser);
}


exports.validLogin = (_bodyUser) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(100).email().required(),
    pass:Joi.string().min(2).max(100).required()
  })
  return joiSchema.validate(_bodyUser);
}

