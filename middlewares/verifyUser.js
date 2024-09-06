const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Access denied,must Login first"));

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "Invalid token"));
    }
    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
