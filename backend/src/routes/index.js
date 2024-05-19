const { Router } = require("express");
const { CustomError, getSolutionFromGPT } = require("../pipe/error");
const Repository = require("../database/repository");

function Controller() {
  const router = Router();
  const repository = new Repository();

  router.get("/", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "health check",
    });
  });

  router.get("/error-list", (req, res, next) => {
    const result = repository.findMany();

    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  });

  router.post("/errors/py", (req, res, next) => {
    try {
      const { code } = req.body;

      /** pass */
      const newError = repository.save();

      return code;
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/js", (req, res, next) => {
    try {
      const { message, statusCode, stack } = req.body;

      const newError = repository.save(message, +statusCode, stack);

      return newError;
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/resolve", (req, res, next) => {
    try {
      const { id } = req.body;

      const resolvedError = repository.resolve(+id);

      return resolvedError;
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/re-solution", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "solution을 다시 받는 api",
    });
  });

  router.get("/test/gpt", async (_, res, __) => {
    const result = await getSolutionFromGPT("python", "out of index");
    return res.status(200).json(result);
  });

  return router;
}

module.exports = { Controller };
