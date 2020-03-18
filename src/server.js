// load config
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  // method path - ip
  // eg. GET /json - ::ffff:127.0.0.1
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

const server = app.listen(process.env.PORT || 3000);

// -- DO NOT EDIT BELOW THIS LINE

module.exports = server;
