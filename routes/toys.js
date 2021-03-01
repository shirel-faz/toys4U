const express = require("express");
const { authToken } = require("../middlewares/auth");
const {ToyModel, validToy} = require('../models/toyModel')
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await ToyModel.find({});
    res.json(data);
  }
catch(err){
  console.log(err);
  res.status(400).json(err);
}
})

//search
router.get("/search", async(req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
  let page = req.query.page;
  let qString = req.query.s;
  let qReg = new RegExp(qString, "i")
  try{
      let data = await ToyModel.find({$or:[{name:qReg},{info:qReg}]})
      .limit(perPage)
      .skip(page * perPage)
      res.json(data); 
  }
  catch(err){
      console.log(err)
      res.status(400).json(err)
  }
})

router.get('/cat/:catName', async(req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
  let page = req.query.page;
  let catName = req.params.catName;
  let pReg = new RegExp(catName, "i")
  // let ifReverse = (req.query.reverse == "yes") ? -1 : 1 ;
  try {
    // sort -> לפי איזה מאפיין נרצה למיין את התוצאות
    // 1-> מהקטן לגדול ASCENDING
    // -1 -> מהגדול לקטן DESCINGING
    let data = await ToyModel.find({category:pReg})
    // .sort({[pReg]:ifReverse})
    .limit(perPage)
    .skip(page * perPage)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//price range
router.get("/prices", async(req, res) =>{
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
  let page = req.query.page;
  let min = Number(req.query.min);
  let max = Number(req.query.max);
  try{
      let Data = await ToyModel.find({})
      .limit(perPage)
      .skip(page * perPage)
      let toyFilter = await Data.filter(item =>{
          return item.price >= min && item.price <= max;
      })
      res.json(toyFilter);
  }
  catch (err) {
      console.log(err);
      res.status(400).json(err);
  }
})

//add
router.post('/', authToken , async(req,res) => {
  let validBody = validToy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let toy = new ToyModel(req.body);
    toy.user_id = req.userData._id;
    await toy.save();
    res.status(201).json(toy);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

//edit
router.put('/:EditId', authToken , async(req,res) => {
  let EditId = req.params.EditId;
  let validBody = validToy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let toy = await ToyModel.updateOne({_id:EditId,user_id:req.userData._id},req.body);
    res.json(toy);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

//delete
router.delete('/:IdDel', authToken , async(req,res) => {
  let IdDel = req.params.IdDel;
  try{
    let toy = await ToydModel.deleteOne({_id:IdDel,user_id:req.userData._id});
    res.json(toy);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

module.exports = router;