const express = require("express");

const app = express();

console.log("Hello World");

app.get("/", (req, res) => {
  res.send("Hello Express");
});

const server = app.listen(process.env.PORT || 3000);

// -- DO NOT EDIT BELOW THIS LINE

module.exports = server;
