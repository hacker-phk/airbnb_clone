const express=require('express');
const Route=express.Router();
const User=require('../models/user.js');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
Route.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          console.error(err);
          return res.status(403).json({ error: "Unauthorized" });
        }
        try {
          const { name, email, _id } = await User.findById(userData.id);
          res.json({ name, email, _id });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        }
      });
    } else {
      res.json(null); // Only one response should be sent here
    }
  });
  module.exports = Route;