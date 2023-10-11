const { verifyToken } = require("../utils/jwtUtil");

// Authentication middleware
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  authenticate,
};
