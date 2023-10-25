const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); 

const secretKey = 'y*8#kwR42@LzF9vGq!oPcH'; 


function generateResetToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}


function isTokenExpired(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const expirationTime = new Date(decoded.exp * 1000); 
    const currentTime = new Date();
    return currentTime > expirationTime;
  } catch (error) {
    return true;
  }
}

module.exports = { generateResetToken, isTokenExpired };
