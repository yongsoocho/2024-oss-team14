const { Router } = require("express");
const { CustomError, getSolutionFromGPT } = require("../pipe/error");
const Repository = require("../database/repository");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

function Controller() {
  const router = Router();
  const repository = new Repository();
  const pythonTicket = false;
  const javascriptTicket = false;

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
      const pythonFile = path.join(__dirname, "test.py");

      // while (pythonTicket) {
      //   continue;
      // }

      fs.readFile(pythonFile, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          throw new CustomError("panic python parse error", 500, err.stack);
          return;
        }

        const result = data.replace("{{code}}", code);

        fs.writeFile(pythonFile, result, "utf8", (err) => {
          if (err) {
            console.error(err);
            throw new CustomError(
              "panic python generate error",
              500,
              err.stack
            );
            return;
          }
        });
      });

      /** pass */
      exec(`python ${pythonFile}`, (error, stdout, stderr) => {
        /** to be */
        if (error) {
          return res.status(500).json({
            statusCode: 500,
            data: stderr,
          });
        }

        if (stderr) {
          return res.status(500).json({
            statusCode: 500,
            data: stderr,
          });
        }

        return res.status(202).json({
          statusCode: 202,
          data: stdout,
        });
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/js", async (req, res, next) => {
    try {
      const { message, statusCode, stack } = req.body;
      const newError = new CustomError(message, +statusCode, stack);
      const solution = await getSolutionFromGPT(
        "node.js",
        newError.message + " " + newError.stack
      );
      const unsolvedError = repository.save(
        newError.message,
        newError.statusCode,
        newError.stack,
        solution
      );
      return res.status(202).json({
        statusCode: 202,
        data: unsolvedError,
      });
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
