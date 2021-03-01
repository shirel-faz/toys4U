const express = require("express");

const router = express.Router();

router.get("/", (req,res) => {
  res.json({msg:"index work! 11:38=9999"});
})

module.exports = router;