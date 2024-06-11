const { Router } = require("express");
const {
  CustomError,
  getSolutionFromGPT,
  isProgrammingQuestion,
} = require("../pipe/error");
const Repository = require("../database/repository");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const distance = require("jaro-winkler");
const axios = require("axios");
const config = require("../config/config.json");

function Controller() {
  const router = Router();
  const repository = new Repository();

  async function getSolution({ message, type, stack }) {
    const errorList = await repository.findMany();
    let existSolution = null;
    errorList.forEach((e) => {
      const d = distance(message, e.message, { caseSensitive: false });
      console.log(d);
      if (Number(d) > 0.925) {
        existSolution = e.solution;
        return { solution: existSolution, recycle: true };
      }
    });
    console.log(existSolution);

    if (existSolution) {
      return { solution: existSolution, recycle: true };
    }

    const newSolution = await getSolutionFromGPT(type, stack);
    return { solution: newSolution, recycle: false };
  }

  router.get("/", (req, res, next) => {
    res.status(200).json({
      statusCode: 200,
      message: "health check",
    });
  });

  router.get("/error-list", async (req, res, next) => {
    const result = await repository.findMany();

    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  });

  router.post("/errors/py", async (req, res, next) => {
    try {
      const { code } = req.body;
      const pythonFile = path.join(__dirname, "test.py");
      const bashFile = path.join(__dirname, "test.sh");

      fs.readFile(pythonFile, "utf8", (err, data) => {
        if (err) {
          throw new CustomError("panic python parse error", 500, err.stack);
        }

        const result = data.replace("{{code}}", code);

        fs.writeFile(pythonFile, result, "utf8", (err) => {
          if (err) {
            throw new CustomError(
              "panic python generate error",
              500,
              err.stack
            );
          }
        });
      });

      /** pass */
      exec(`${bashFile}`, async (error, stdout, stderr) => {
        fs.writeFile(pythonFile, "{{code}}", "utf8", (err) => {
          if (err) {
            throw new CustomError(
              "panic python generate error",
              500,
              err.stack
            );
          }
        });

        /** to be */
        if (error) {
          const { solution, recycle } = await getSolution({
            message: error.message,
            type: "python",
            stack: stderr,
          });
          await repository.save(
            error.message,
            500,
            stderr,
            solution,
            "python",
            recycle
          );
          return res.status(500).json({
            statusCode: 500,
            data: stderr,
          });
        }

        if (stderr) {
          const { solution, recycle } = await getSolution({
            message: stderr,
            type: "python",
            stack: stderr,
          });
          await repository.save(
            stderr,
            500,
            stderr,
            solution,
            "python",
            recycle
          );
          return res.status(500).json({
            statusCode: 500,
            data: stderr,
          });
        }

        return res.status(200).json({
          statusCode: 200,
          data: stdout,
        });
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/resolve", async (req, res, next) => {
    try {
      const { id } = req.body;

      const resolvedError = await repository.resolve(id);

      return res.status(200).json({
        statusCode: 200,
        data: resolvedError,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/errors/re-solution", async (req, res, next) => {
    const { id, feedback, stack } = req.body;
    const doc = await repository.findOneById(id);
    const isRelated = await isProgrammingQuestion(feedback, doc);
    if (isRelated != "yes")
      return res.status(400).json({
        statusCode: 400,
        data: isRelated,
      });
    /** to be */

    const reSolution = await getSolutionFromGPT(
      "python",
      stack +
        "과 같은 오류가 있을 때 너가 알려 준" +
        solution +
        "은 잘못됐어 다른 해결책을 줄래?" +
        feedback +
        "이 반영되도록 알려줘"
    );
    await repository.updateSolution(id, reSolution);

    return res.status(200).json({
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

  router.post("/test/moder", async (req, res, __) => {
    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/moderations",
        {
          input: req.body.question,
        },
        {
          headers: {
            Authorization: `Bearer ${config["OPENAI_API_KEY"]}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  });

  return router;
}

module.exports = { Controller };
