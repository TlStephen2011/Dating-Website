var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require('./routes/user');

var cors = require('cors');
const serviceMiddleware = require("./config/service.middleware");
var app = express();
const mysql = require('mysql');

//setting up cors for frontend access with credentials
app.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));

//middleware to load services
app.use(serviceMiddleware(mysql.createPool({
  connectionLimit: 25,
  host: "localhost",
  user: "matcha",
  password: "matcha",
  database: "matcha"
})));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);


// routes
app.use("/", indexRouter);
app.use('/user', userRouter);
// app.use("/profile", profileRouter);
// app.use("/dashboard", dashboardRouter);
// app.use("/ultraSecretRoute", populateDbRoute);

module.exports = app;
