const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Generate JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret,{expiresIn:"2d"});
  return token;
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
