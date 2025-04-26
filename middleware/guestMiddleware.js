const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();
const secret = process.env.JWT_SECRET;

module.exports.guestAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret,  (err, decodedToken) => {
      if (err) {
        next();
      } else {
        return res.redirect('/student_list');
      }
    });
  } else {
    next();
  }
};