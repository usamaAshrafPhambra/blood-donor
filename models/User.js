const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const mySecret = config.get("jwtSecret");

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  let payload = {
    id: this._id,
    email: this.email,
    user: this.role,
  };
  return jwt.sign(payload, mySecret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

module.exports = user = mongoose.model("user", UserSchema);
