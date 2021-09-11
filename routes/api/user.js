const express = require("express");
const Router = express.Router();
const User = require("../../models/User");
// const generateJWT = require('../../models/User');
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const verifyGoogleToken = require("../../middleware/verifyToken");
const { check, validationResult } = require("express-validator");

Router.post(
  "/",

  [
    check("name", "name requried!").not().isEmpty(),

    check("email", "email required!").isEmail(),
    check("password", "password has 6 digits").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists!" }] });
      }

      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error in auth!");
    }
  }
);

Router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const data = await verifyGoogleToken(token);

    const { email, name, picture } = data;

    const user = await User.findOne({ email });

    if (user) {
      const payload = {
        id: {
          id: user.id,
        },
      };
      const token = user.generateJWT();

      if (!token) {
        return res.status(400).json({
          message: "error in generating Code",
        });
      }
      return res.status(200).json({
        message: "successfully logged in",
        data: {
          user,
          token,
        },
      });
    } else {
      const data = {
        body: {
          name: name,
          avatar: picture,
          email,
          // password: email + randomString.generate(),
          password: email + "123",
        },
      };

      const newUser = new User(data.body);

      await newUser.save();

      const token = newUser.generateJWT();

      if (!token) {
        return res.status(400).json({
          message: "error in generating Code",
        });
      }
      return res.status(200).json({
        message: "successfully logged in",
        data: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + "error 500" });
  }
});

module.exports = Router;
