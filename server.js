const express = require("express");
const http = require("http");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use("/", require("./routers"));

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`🤖 API listening on port ${process.env.PORT || 5000}!`);
});
