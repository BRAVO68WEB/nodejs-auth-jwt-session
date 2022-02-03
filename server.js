const express = require("express");
const http = require("http");
const app = express();

require("dotenv").config();

app.use(express.json());

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username === "admin" && password === "admin") {
    res.send({
      token: "123456789",
      user: {
        username,
        password,
      },
    });
  } else {
    res.status(401).send({
      error: "Invalid credentials",
    });
  }
});

app.use("/", require("./routers"));

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`🤖 API listening on port ${process.env.PORT || 5000}!`);
});
