const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema.js");
const bcrypt = require("bcryptjs");
const { request } = require("express");

console.log(User);

// @route POST api/user/login
// @desc Login user and return JWT token
router.post("/login", (request, response) => {
  let getUser;
  // Find the user in the database
  User.findOne({
    email: request.body.email,
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
  User.findOne({ username: request.body.email }, function (err, user) {
    // If user DOES NOT exist
    if (user === null) {
      bcrypt.hash(request.body.password, 10).then((hash) => {
        // Make new user object
        const user = new User({
          email: request.body.email,
          password: hash,
          todos: [],
        });

        // Save user to DB
        user.save().then((result) => {
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
          success: true,
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
});

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
});

// @route POST api/user/todos
// @desc Retrieve user todos
router.post("/todos", async (request, response) => {
  if (request.session.user) {
    User.findOne({
      email: request.session.user.email,
    })
      .then((user) => {
        getUser = user;

        // No user found
        if (!user) {
          return response.status(400).json({
            message: "User does not exist.",
          });
        }

        return response.status(200).json({ success: true, todos: user.todos });
      })
      .catch((err) => {
        return response.status(401).json({
          message: "Error retrieving user todos.",
          err: err,
        });
      });
  } else {
    response
      .status(401)
      .json({ success: false, err: "No valid login session" });
  }
});

// @route POST api/user/new/todo
// @desc Add a new todo
router.post("/new/todo", async (request, response) => {
  if (request.session.user) {
    User.findOne(
      { email: request.session.user.email },
      function (err, doc) {
        // Doc is the user docuement in mongodb
        if (!err && doc !== null) {
          // Add the new todo
          doc.todos = [...doc.todos, {todo: request.body.todo}];
          doc.save();
          request.session.user.todos = doc.todos;
          response.status(200).json({
            success: true,
            todos: doc.todos
          });
        } else {
          response.status(401).json({
            success: false,
            error: err,
          })
        }
      }
    )
      .catch((err) =>
        response.status(401).json({
          success: false,
          error: err,
        })
      );
  } else {
    response.status(202).json({
      success: false,
      err: "Invalid login session.",
    });
  }
});

// @route POST api/user/remove/todo
// @desc Remove a todo
router.post("/remove/todo", async (request, response) => {
  if (request.session.user) {
    User.findOne(
      { email: request.session.user.email },
      function (error, doc) {
        if (error) {
          response.status(500).json({
            success: false,
            err: error,
          });
        } else if (doc) {
            // get index of item
          doc.todos.pull({ _id: request.body.id });
          // save the doc
          doc.save(function (error) {
            if (error) {
              console.log(error);
              response.status(500).json({
                success: false,
                err: error,
              });
            } else {
              response.status(200).json({
                success: true,
                todos: doc.todos
              });            }
          });
        }
      }
    );
  }
})

module.exports = router;
