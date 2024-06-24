const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

exports.checkToken = function(req, res, next)
{
  const token = req.headers.authorization.split(' ')[1];

  // Check if not token
  if (!token) 
  {
    next();
  }
  else
  {
    return res.status(401).json({ msg: 'Logout first' });
  }
};

exports.auth = function(req, res, next) 
{
  // Get token from header
  const token = req.headers.authorization.split(' ')[1];

  // Check if not token
  if (!token) 
  {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try 
  {
    const decoded = jwt.verify(token, "its_a_secret_804");
    req.user = decoded.username;
    next();
  } 
  catch (err) 
  {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
