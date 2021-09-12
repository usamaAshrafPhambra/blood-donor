const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const auth = require("../../middleware/auth");
const verifyGoogleToken = require("../../middleware/verifyToken");
const { check, validationResult } = require("express-validator");

Router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error in auth!");
  }
});

Router.post(
  "/",
  [
    check("email", "email required!").isEmail(),
    check("password", "password has 6 digits").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "invalid sign in!" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "invalid password" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
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
        token,
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
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + "error 500" });
  }
});

Router.post("/facebook", async (req, res) => {
  try {
    const { token } = req.body;

    console.log("token", token);

    const data = await verifyGoogleToken(token);

    const { email, firstName, lastName, picture } = data;

    const user = await User.findOne({ email });

    if (user) {
      const token = user.generateJWT();

      if (!token) {
        return res.status(400).json({
          message: "error in generating Code",
        });
      }

      return res.status(200).json({
        token,
      });
    } else {
      const data = {
        body: {
          name: firstName + lastName,
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
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = Router;
