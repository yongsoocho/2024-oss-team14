const express = require("express");
const listEndpoints = require("express-list-endpoints");
const { CustomError } = require("./pipe/error.js");
const { Controller } = require("./routes/index.js");
const cors = require("cors");

const app = express();
const PORT = 8000;

/** Middlewares */
const allowedOrigins = [
  "http://localhost:3000",
  "https://2024-oss-team14.pages.dev",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // 비허용된 요청은 차단
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Path: ${req.path}`);
  console.log("Body:", req.body);
  next();
});

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
