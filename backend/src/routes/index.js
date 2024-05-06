const { Router } = require("express");
const { CustomError } = require("../pipe/error");

function Controller() {
  const router = Router();

  router.get("/", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "health check",
    });
  });

  router.get("/error-list", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "모든 에러를 내려준다.",
    });
  });

  router.post("/errors", (req, res, next) => {
    try {
      throw new CustomError("test error", 500);
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/resolve", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "에러 resolve 하고 아카이브 하는 api",
    });
  });

  router.post("/errors/re-solution", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "solution을 다시 받는 api",
    });
  });

  return router;
}

module.exports = { Controller };
