const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as needed

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
    console.log(userDoc);
  } catch (err) {
    console.error(err);
    res.status(422).json({ error: 'Unable to register user', details: err.message });
  }
});

module.exports = router;
