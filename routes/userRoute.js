const { Router } = require("express");
const {
  signup,
  login,
  refreshToken,
  verifyAccessToken,
  getUserInfo,
  updateUserInfo,
  passwordReset,
  getUserAddress,
} = require("../controllers/authController");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userInfo/:id", getUserInfo);
router.post("/userInfo", updateUserInfo);
router.get("/user-address/:id", getUserAddress);
router.post("/password-reset/:id", passwordReset);
router.get("/refreshToken", refreshToken);
router.get("/verifyAccessToken", verifyAccessToken);

module.exports = router;
