const express=require('express');
const Route=express.Router();
const User=require('../models/user.js');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
Route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, name: userDoc.name },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.status(404).json("not found");
    }
  });
  module.exports =Route;