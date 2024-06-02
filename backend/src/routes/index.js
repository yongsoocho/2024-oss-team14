const { Router } = require("express");
const { CustomError, getSolutionFromGPT } = require("../pipe/error");
const Repository = require("../database/repository");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

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
      const pythonFile = path.join(__dirname, "test.py");

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
        fs.writeFile(pythonFile, "{{code}}", "utf8", (err) => {
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
      const { code } = req.body;
      const javascriptFile = path.join(__dirname, "test.js");

      fs.readFile(javascriptFile, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          throw new CustomError("panic javascript parse error", 500, err.stack);
          return;
        }

        const result = data.replace("{{code}}", code);

        fs.writeFile(javascriptFile, result, "utf8", (err) => {
          if (err) {
            console.error(err);
            throw new CustomError(
              "panic javascript generate error",
              500,
              err.stack
            );
            return;
          }
        });
      });

      /** pass */
      exec(`node ${javascriptFile}`, (error, stdout, stderr) => {
        fs.writeFile(javascriptFile, "{{code}}", "utf8", (err) => {
          if (err) {
            console.error(err);
            throw new CustomError(
              "panic javascript generate error",
              500,
              err.stack
            );
            return;
          }
        });

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

  router.post("/errors/resolve", (req, res, next) => {
    try {
      const { id } = req.body;

      const resolvedError = repository.resolve(+id);

      return resolvedError;
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/re-solution", async (req, res, next) => {
    // const { type, solution, feedback } = req.body;
    const { id, feedback } = req.body;
    const doc = await repository.findOneById(id);
    const type = doc.type;
    const solution = doc.solution;
    const reSolution = getSolutionFromGPT(
      type,
      stack +
        "과 같은 오류가 있을 때 너가 알려 준" +
        solution +
        "은 잘못됐어 다른 해결책을 줄래?" +
        feedback +
        "이 반영되도록 알려줘"
    );

    res.status(200).json({
      statusCode: 200,
      data: {
        solution: reSolution,
      },
    });
  });

  router.get("/test/gpt", async (_, res, __) => {
    const result = await getSolutionFromGPT("python", "out of index");
    return res.status(200).json(result);
  });

  return router;
}

module.exports = { Controller };
