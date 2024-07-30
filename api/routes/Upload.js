const express=require('express');
const Route=express.Router();
const User=require('../models/user.js');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
const multer = require("multer");
const photosMiddleware = multer({ dest: "uploads/" });
Route.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
    const uploadedFiles = [];
  
    try {
      for (let i = 0; i < req.files.length; i++) {
        const { path: tempPath, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = `${tempPath}.${ext}`;
        console.log(newPath);
        console.log(tempPath);
        fs.renameSync(tempPath, newPath);
        uploadedFiles.push(newPath.replace("uploads\\", ""));
      }
      console.log(uploadedFiles);
      res.json(uploadedFiles);
    } catch (err) {
      console.error("Error uploading files:", err);
      res.status(500).json({ error: "Failed to upload files" });
    }
  });