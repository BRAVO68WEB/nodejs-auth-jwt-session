const express = require("express");
const http = require("http");
const { urlencoded, json } = require("body-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const db = require("./config/mongodb");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);

app.use("/", require("./routers"));

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`🤖 API listening on port ${process.env.PORT || 5000}!`);
});
