require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes.js");
app.use("/api", indexRoutes);

requires("./error-handling")(app);

module.exports = app;