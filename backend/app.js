var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require('./routes/user');

var cors = require('cors')
var app = express();

//setting up cors for frontend access with credentials
app.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));

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

app.use("/", indexRouter);
app.use('/user', userRouter);
// app.use("/profile", profileRouter);
// app.use("/dashboard", dashboardRouter);
// app.use("/ultraSecretRoute", populateDbRoute);

module.exports = app;
