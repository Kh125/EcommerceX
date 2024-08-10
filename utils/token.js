require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_VALIDITY,
    }
  );
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_SECRET);

    // console.log("Dec for refresh token", decodedToken);

    if (!decodedToken) return { valid: false, error: "Token Not valid" };

    return { valid: true, decodedToken };
  } catch (error) {
    return { valid: false, error };
  }
};

const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    console.log("Dec", decodedToken);

    if (!decodedToken) return { valid: false, error: "Access Token Not valid" };

    return { valid: true, decodedToken };
  } catch (error) {
    return { valid: false, error };
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyAccessToken,
};
