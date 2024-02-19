/*
 * main file in application. Responsible for:
 * 1. Interaction with the application environment,
 * 1. Setting up Express and core middleware functions,
 * 2. Establishing necessary routers,
 * 3. Beginning to listen on the specified port.
 */

// Prepare environment
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Key modules
const express = require("express");
const app = express();
const cors = require("cors");

// Prepare for sessions and for passport.
const session = require("express-session");
const passport = require("passport");
const SQLiteStore = require("connect-sqlite3")(session);

const bodyParser = require("body-parser");

// //app.use(cors({ origin: true, credentials: true }));
// // prettier-ignore
const corsOptions = {
  origin: ["http://localhost:3000", "https://bookings-client.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
// // Add middleware to support application/json
// // date from POST commands etc.
app.use(bodyParser.json());

// Add middleware to support
// application/x-www-form-urlencoded
// data from POST commands etc.
app.use(bodyParser.urlencoded({ extended: true }));

const sessionConfig = {
  // Set up session with key from environment
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  cookie: { sameSite: "none" },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));

const startPassport = require("./passport/passport");
startPassport(passport);

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Persist variables across  session
const { adminRouter } = require("./routes/auth");
const { physiosRouter } = require("./routes/physios");
const { treatmentsRouter } = require("./routes/treatments");
const { appointmentsRouter } = require("./routes/appointments");

app.use("/auth", adminRouter);
app.use("/physios", physiosRouter);
app.use("/treatments", treatmentsRouter);
app.use("/appointments", appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
