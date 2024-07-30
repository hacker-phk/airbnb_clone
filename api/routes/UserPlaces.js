const express=require('express');
const Router=express.Router();
const jwt = require("jsonwebtoken");
const Place=require('../models/Place.js');
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
Router.get('/user-places',(req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const {id}=userData;
      res.json(await Place.find({owner:id}));
    });
  });
module.exports=Router;