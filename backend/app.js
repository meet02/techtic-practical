const express = require("express");
const app = express();
var cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");
const API_PREFIX = process.env.API_PREFIX;
const PORT = process.env.PORT;

// Import Route

const apiChartRoute = require("./routes/chart");

// Use this Route
app.use(cors());
app.use(morgan());
app.use(`${API_PREFIX}/chart`, apiChartRoute);

app.listen(PORT, () => {
  console.log("Server started on port number=>", PORT);
});
