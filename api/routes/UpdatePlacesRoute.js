const express = require("express");
const jwt = require("jsonwebtoken");
const Place = require("../models/Place"); // Adjust the path as needed
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret"; // Adjust the path as needed
const router = express.Router();
router.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).send("Unauthorized"); // Ensure a single response
    }
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});
module.exports=router;
