require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const users = require("./routes/api/users"); // USER HANDLERS
const app = express();

console.log("----- [SERVER] -----");
if (process.env.NODE_ENV === "development") {
  console.log("[SERVER] This server is in DEVELOPMENT mode!");
}

// Check if application is in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // If no backend routes are hit, send React client app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

// Bodyparser middleware for routes to accept JSON
// Also limits the file size allowed per request
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "1000mb" }));

// Setup cors
app.use(cors());


// Setup express-sesssion management 
// to allow user's to have their own session
app.use(
    session({
      secret: process.env.SECRET_KEY || "SOMERANDOMSECRETKEY",
      name: "session",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.DB_URL, // REPLACE THIS WITH ACTUAL DBURL
        ttl: 14 * 24 * 60 * 60,
        autoRemove: "native",
        crypto: {
          secret: process.env.SECRET_CRYPTO_KEY || "SOMERANDOMSECRETKEY",
        },
      }),
    })
  );
  

// Routes Configuration
app.use("/api/users", users);

// Connect to MongoDB and then start listening
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Listening on port ${process.env.PORT || 5000}!`)
    )
  )
  .catch((error) => console.log("Error connecting to DB: ", error));

// To get rid of annoying Mongoose deprecation warnings
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);