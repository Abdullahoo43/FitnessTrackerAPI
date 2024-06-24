const User = require('../models/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    let isExist;

    try {
      // Check if the username is already taken
      isExist = await User.findOne({ username: username });
    }
    catch (error) {
      res.status(500).send(error.message);
    }

    if (isExist) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({ username: username, password: hashed })

    await newUser.save();

    res.status(201).json(newUser);
  }
  catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller function to login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide username and password' });
    }

    let user;
    try {
      // Check if the user exists
      user = await User.findOne({ "username": username });
    }
    catch (error) {
      console.log("user not found")
      res.status(500).send(error.message);
    }

    bcrypt.compare(password, user.password, async function (error, result) {
      if (error) {
        return res.status(500).json(error.message);
      }
      if (result) 
      {
        console.log('Login successful');

        let token;
        try {
          //Creating jwt token
          token = jwt.sign(
            {
              username: user.username,
            },
            "its_a_secret_804"
          );
        }
        catch (error) 
        {
          console.log(error.message);
          return res.status(500).json(error.message);
        }

        res.status(200).json(
          {
            success: true,
            data:
            {
              username: user.username,
              token: token
            }
          });
      }
      else 
      {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });

  }
  catch (error) {
    res.status(500).send(error.message);
  }
};