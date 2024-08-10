const { verifyAccessToken } = require("../utils/token");

const verifyAuth = (req, res, next) => {
  const authorization = req.headers?.authorization;
  const token = authorization ? authorization.split(" ")[1] : null;

  // console.log("AUth", authorization);
  // console.log("token", token);

  if (!token) res.status(403).json({ errors: "Token Not found or expired." });

  try {
    const result = verifyAccessToken(token);

    if (result.valid) {
      console.log("Is Valid");
      next();
    } else {
      console.log("Is not valid");
      res.status(403).json({ errors: "Token Not Valid" });
    }
  } catch (error) {
    console.log("Error verify", error);
    res.status(403).json({ errors: error });
  }
};

module.exports = verifyAuth;
