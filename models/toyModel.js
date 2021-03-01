const mongoose = require('mongoose');
const Joi = require('joi');


const toySchema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
  img:String,
  price:Number,
  user_id:String,
  date_created:{
    type:Date, defualt:Date.now
  }
})

exports.ToyModel = mongoose.model("toys",toySchema)

exports.validToy = (_bodyToys) =>{
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    info:Joi.string().min(2).max(1000),
    category:Joi.string().min(2).max(100).required(),
    img:Joi.string().min(2).max(900),
    price:Joi.string().min(1).max(2000).required()
  })

  return joiSchema.validate(_bodyToys);
}