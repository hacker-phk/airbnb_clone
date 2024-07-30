const express=require('express');
const Route=express.Router();
Route.post("/logout", (req, res) => {
    res.cookie("token", "").json(true);
  });
module.exports=Route;