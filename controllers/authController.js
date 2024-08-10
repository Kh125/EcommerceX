require("dotenv").config();
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyAccessToken,
} = require("../utils/token");
const bcrypt = require("bcrypt");
const REFRESH_TOKEN_VALIDITY = 24 * 60 * 60;
const ACCESS_TOKEN_VALIDITY = 2 * 60;

const handleErrors = (err) => {
  const error = { username: "", email: "", password: "" };

  if (err.message == "01") {
    error.username = "Username is not found!";
  }

  if (err.message == "00") {
    error.password = "Incorrect Password!";
  }

  if (err.code == 11000) {
    if (err.errmsg.includes("email_1")) {
      error.email = "This email is already used!";
    } else {
      error.username = "This username is already used!";
    }
  }

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", refreshToken, {
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.status(200).json({ accessToken, user: user._id });
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_VALIDITY * 1000,
    });

    res.status(201).json({ accessToken, user: user._id });
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    user.password = "";
    user.orders = [];

    res
      .status(200)
      .json({ message: "User Information Successfully fetched!", user });
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.updateUserInfo = async (req, res) => {
  try {
    const { user } = req.body;
    // console.log("Post user info", user);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        address: {
          street: user?.address?.street,
          city: user?.address?.city,
          state: user?.address?.state,
          postalCode: user?.address?.postalCode,
          country: user?.address?.country,
        },
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
        updatedAt: new Date(),
      }
    );

    if (!updatedUser)
      return res.status(400).json({ errors: handleErrors(error) });

    res.status(200).json({
      message: "User Information Successfully Updated!",
      user: user._id,
    });
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.getUserAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ errors: "User not found!" });

    console.log(user.address);

    res.status(200).json({
      message: "User address successfully fetched.",
      address: user.address,
    });
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.passwordReset = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: "User not found." });

    const auth = await bcrypt.compare(currentPassword, user.password);

    if (!auth) {
      return res.status(400).json({ message: "Password is wrong!" });
    } else {
      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    return res.status(400).json({ errors: handleErrors(error) });
  }
};

module.exports.refreshToken = (req, res) => {
  const token = req.cookies.token;

  try {
    var result = verifyToken(token);

    if (result.valid) {
      // console.log("Decoded Token for refresh", result.decodedToken);
      const userId = result.decodedToken?.id;
      const accessToken = generateAccessToken({
        id: userId,
        username: result.decodedToken?.username,
      });
      res.status(200).json({ accessToken, user: userId });
    } else {
      res.status(400).json({
        errors: "User is not authenticated. Login with authenticated account!",
      });
    }
  } catch (e) {
    res.status(400).json({ errors: `Unexpected Error occur: ${e}` });
  }
};

module.exports.verifyAccessToken = (req, res) => {
  const accessToken = req.query.accessToken;
  // console.log(accessToken);
  try {
    var result = verifyAccessToken(accessToken);

    if (result.valid) {
      res.status(200).json({ valid: true });
    } else {
      res.status(400).json({
        valid: false,
        errors: "User is not authenticated. Login with authenticated account!",
      });
    }
  } catch (e) {
    console.log("ERR", e);
    res.status(400).json({ errors: `Unexpected Error occur: ${e}` });
  }
};
