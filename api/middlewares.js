// middlewares.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const middleware = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/uploads", express.static(__dirname + "/uploads"));
};
module.exports = middleware;
