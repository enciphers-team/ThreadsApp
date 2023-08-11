const express = require('express');
const db = require('../config/mongoose');
const router = express.Router();
const User = require('../models/user');

module.exports.search = async (req, res) => {
  try {
    let searchText = req.body.search_text;

    let finalResult = [];

    let temp;

    try {
      temp = JSON.parse(searchText);
    } catch (err) {
      temp = searchText;
    }
    let result = await User.collection.find({ name: temp }).forEach((data) => {
      finalResult.push(data);
    });
    res.status(200).json(finalResult);
  } catch (error) {
    res.status(400).json({ message: 'Something went worong! Try again later' });
  }
};
