const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();
const secret = process.env.JWT_SECRET;

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret,  (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.redirect('/login');
        // return res.status(403).json({ error: 'Invalid or expired token' });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.redirect('/login');
    // return res.status(401).json({ error: 'No token provided' });
  }
};