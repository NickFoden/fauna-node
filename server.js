require("dotenv").config();
const cors = require("cors");
const express = require("express");
const indexRouter = require("./routes/indexRoute");

const { PORT } = require("./config");

const app = express();
app.use(cors());

app.use("/", indexRouter);

app.listen(PORT);

module.exports = app;
