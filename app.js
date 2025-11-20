const express = require("express");
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server is running. Listening on port ${PORT}`);
});
