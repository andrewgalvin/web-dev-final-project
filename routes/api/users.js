const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema.js");
const bcrypt = require("bcryptjs");
const { request } = require("express");

// @route POST api/users/login
// @desc Login user and return JWT token
router.post("/login", (req, res) => {
  let getUser;
  // Find the user in the database
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      getUser = user;

      // No user found
      if (!user) {
        return res.status(400).json({
          message: "User does not exist.",
        });
      }

      // Compare the given password with the stored password
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(async (res) => {
      // Invalid password
      if (res === false) {
        return res.status(401).json({
          message: "Invalid password.",
        });
      } else if (res === true) {
        // Password is correct, login user
        if (req.body.remember) {
          var expire = 2147483647000;
        } else {
          var expire = 3600000 * 6;
        }

        // Set session cookies
        req.session.user = getUser;
        req.session.cookie.expires = new Date(Date.now() + expire);
        req.session.cookie.maxAge = expire;

        res.status(200).json({ success: "true" });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
        err: err,
      });
    });
});

// @route POST api/users/register
// @desc Register user
router.post("/register", async (req, res) => {
  // Find requested user in DB
  User.findOne({ username: req.body.email }, function (err, doc) {
    // If user DOES NOT exist
    if (doc === null) {
      bcrypt.hash(request.body.password, 10).then((hash) => {
        // Make new user object
        const user = new User({
          email: request.body.email,
          password: hash,
        });

        // Save user to DB
        user.save().then((res) => {
          res.status(200).json({
            success: true,
          });
        });
      });
    } else {
      res
        .status(401)
        .json({ success: false, err: "Email already registered." });
    }
  });
});

module.exports = router;
