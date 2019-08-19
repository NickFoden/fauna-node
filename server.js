require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRoute");

const { PORT } = require("./config");

const app = express();

app.use("/", indexRouter);

app.listen(PORT);

module.exports = app;
