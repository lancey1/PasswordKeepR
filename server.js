// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const pool = require('./lib/db');


// PG database pool/connection setup
// pool.connect();


// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
//* set up view-engine and parser.
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//* Set up SASS.
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
//* Serve files on public folder in .ejs.
app.use(express.static("public"));
//* Set up cookie-session.
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


const usersRoutes = require("./routes/users");
const NEDRoutes = require('./routes/new_edit_delete');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
/* app.use((req, res, next) => {
  if (req.session['user_id'] !== '' || !req.session['user_id']) {
    //todo  - Check if user exist, Query from database.
    for (let key in users) {
      if (key === req.session['user_id']) {
        res.locals.useremail = users[key]['email'];
        res.locals.isAuth = true;
      };
    }
  }
  next();
}); */
app.get("/", (req, res) => {
  res.render("main");
});
app.use(usersRoutes);
app.use(NEDRoutes);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
