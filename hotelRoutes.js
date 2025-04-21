const express = require('express');
const Hotel = require('../models/Hotel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

module.exports = router;