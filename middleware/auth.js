// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token =
    req.header('x-auth-token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // attach user ID to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
