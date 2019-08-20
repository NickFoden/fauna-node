require("dotenv").config();
const cors = require("cors");
const express = require("express");
const indexRouter = require("./routes/indexRoute");

const { PORT } = require("./config");

const app = express();

//allowing open access for others to test this in production
//would normally specify a single client and set via env variables
app.use(cors());

app.use("/", indexRouter);

app.listen(PORT);

module.exports = app;
