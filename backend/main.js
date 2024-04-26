const express = require("express");
const RandomError = require("./error");

const app = express();
const PORT = 8000;

/** Middlewares */

/** Routes */
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "health check",
  });
});

app.get("/error", (req, res, next) => {
  try {
    throw new RandomError("test~", 500);
  } catch (error) {
    next(error);
  }
});

/** Handle */
app.use((error, _, res, __) => {
  res.status(error.statusCode).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));
