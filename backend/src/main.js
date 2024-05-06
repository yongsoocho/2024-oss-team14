const express = require("express");
const listEndpoints = require("express-list-endpoints");
const { CustomError } = require("./pipe/error.js");
const { Controller } = require("./routes/index.js");

const app = express();
const PORT = 8000;

/** Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routes */
app.use("/", Controller());

/** Error Handle */
app.use((error, _, res, __) => {
  res.status(error.statusCode).json({ message: error.message });
});

// app._router.stack.forEach((middleware) => {
//   console.log(middleware);
// });
// console.log(listEndpoints(app));
app.listen(PORT, () => console.log(`Server on ${PORT}`));
