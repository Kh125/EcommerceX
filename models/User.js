const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const createStringField = (options = {}) => ({
  type: String,
  trim: true,
  ...options,
});

const createNumberField = (options = {}) => ({
  type: Number,
  ...options,
});

const createDateField = (options = {}) => ({
  type: Date,
  default: Date.now,
  ...options,
});

const UserSchema = new mongoose.Schema({
  roles: {
    type: String,
    default: 0,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    lowercase: true,
    minLength: [3, "Minimum length is 3 character!"],
    maxLength: [20, "Maximum length is 20 character!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Minimum length is 6 character"],
  },
  address: {
    street: createStringField(),
    city: createStringField(),
    state: createStringField(),
    postalCode: createStringField(),
    country: createStringField(),
  },
  phone: createStringField(),
  createdAt: createDateField(),
  updatedAt: createDateField({ default: Date.now }),
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      date: createDateField(),
      totalAmount: createNumberField(),
      status: createStringField({
        enum: ["Pending", "Shipped", "Delivered"],
      }),
    },
  ],
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("00");
  }
  throw Error("01");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
