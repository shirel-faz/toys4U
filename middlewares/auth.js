const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData")


exports.authToken = (req,res,next) => {
  let token = req.header("auth-token");
  if(!token){
    return res.status(400).json({msg:"you must send token in this url to get data"});
  }
  try{
    let verifiedToken = jwt.verify(token,config.jwtSecret);
    req.userData = verifiedToken;
    next();
  }
  catch (err) {
    console.log(err);
    res.status(400).json({msg:"token invalid or expired"});
  }
}