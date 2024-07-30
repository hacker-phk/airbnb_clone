// const Place=require("./PlaceById.js");
const express = require("express");
const Place=require("../models/Place.js");
const Router=express.Router();
const mongoose = require("mongoose");
Router.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id);
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const place = await Place.findById(id);
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
      res.json(place);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  module.exports =Router;