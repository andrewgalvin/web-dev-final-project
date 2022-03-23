const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema.js");
const bcrypt = require("bcryptjs");
const { request } = require("express");

// @route POST api/user/login
// @desc Login user and return JWT token
router.post("/login", (request, response) => {
  let getUser;
  // Find the user in the database
  User.findOne({
    username: request.body.email,
  })
    .then((user) => {
      getUser = user;

      // No user found
      if (!user) {
        return response.status(400).json({
          message: "User does not exist.",
        });
      }

      // Compare the given password with the stored password
      return bcrypt.compare(request.body.password, user.password);
    })
    .then(async (result) => {
      // Invalid password
      if (result === false) {
        return response.status(401).json({
          message: "Invalid password.",
        });
      } else if (result === true) {
        // Password is correct, login user
        if (request.body.remember) {
          var expire = 2147483647000;
        } else {
          var expire = 3600000 * 6;
        }

        // Set session cookies
        request.session.user = getUser;
        request.session.cookie.expires = new Date(Date.now() + expire);
        request.session.cookie.maxAge = expire;

        response.status(200).json({ success: "true" });
      }
    })
    .catch((err) => {
      return response.status(401).json({
        message: "Authentication failed",
        err: err,
      });
    });
});

// @route POST api/user/register
// @desc Register user
router.post("/register", async (request, response) => {
  // Find requested user in DB
  User.findOne({ username: request.body.email }, function (err, doc) {
    // If user DOES NOT exist
    if (doc === null) {
      bcrypt.hash(request.body.password, 10).then((hash) => {
        // Make new user object
        const user = new User({
          email: request.body.email,
          password: hash,
        });

        // Save user to DB
        user.save().then((response) => {
          response.status(200).json({
            success: true,
          });
        });
      });
    } else {
      response
        .status(401)
        .json({ success: false, err: "Email already registered." });
    }
  });
});

// @route POST api/user/session
// @desc Check user session 
router.post("/session", async (request, response) => {
  if (request.session.user) {
    User.findOne({ email: request.session.user.email })
      .then(async (user) => {
        request.session.user = user;
        response.status(200).json({
          success: true
        });
      })
      .catch((err) => {
        response
          .status(202)
          .json({ success: false, err: "Error checking session." });
      });
  } else {
    response
      .status(201)
      .json({ success: false, err: "Invalid login session." });
  }
})

// @route POST api/user/session/remove
// @desc Remove user session
router.post("/session/remove", async (request, response) => {
  if (request.session.user) {
    request.session.destroy(function (err) {
      if (err) {
        response
          .status(401)
          .json({ success: false, err: "Error destroying session." });
      } else {
        response.status(200).json({
          success: true,
        });
      }
    });
  } else {
    response
      .status(401)
      .json({ success: false, err: "No valid login session." });
  }
})

module.exports = router;
