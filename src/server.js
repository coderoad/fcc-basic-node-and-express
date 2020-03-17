const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

const server = app.listen(process.env.PORT || 3000);

// -- DO NOT EDIT BELOW THIS LINE

module.exports = server;
