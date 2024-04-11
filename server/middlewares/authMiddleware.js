const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.jwt_secret);

    // Check if token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decryptedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    req.userId = decryptedToken.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired", success: false });
    } else {
      res.status(401).json({ message: error.message, success: false });
    }
  }
};
