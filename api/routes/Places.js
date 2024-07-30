const express = require('express');
const jwt = require('jsonwebtoken');
const Place = require('../models/Place'); // Adjust the path as needed
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret"; // Adjust the path as needed

const router = express.Router();

router.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
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
      return res.status(401).send('Unauthorized'); // Ensure a single response
    }

    try {
      const placeDoc = await Place.create({
        owner: userData.id,
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
      return res.json(placeDoc); // Use return to ensure no further processing
    } catch (createErr) {
      console.log(createErr.message);
      return res.status(500).send('Error creating place');
    }
  });
});

module.exports = router;
