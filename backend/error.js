import { OpenAI } from "openai";
const config = require("./config.json");
const openai = new OpenAI(config["OPENAI_API_KEY"]);

/**
 * @function chatgpt에서 솔루션을 가져옵니다.
 */
export async function hook() {
  try {
    const completion = await openai.complete({
      engine: "davinci-codex",
      prompt: "Q: What is the capital of France?\nA:",
      maxTokens: 150,
      temperature: 0.7,
      stop: "\n",
    });
    console.log(completion.data.choices[0].text.trim());
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.stack);
  }
}

/**
 * @class 애플리케이션 에러
 */
export class CustomError extends Error {
  /**
   * @type {string}
   * @description error stack.
   */
  stack = null;

  /**
   * @constructor
   * @param {string} message - The message of the error.
   * @param {number} statusCode - The statusCode of the error.
   */
  constructor(message, statusCode, stack) {
    super(message);
    this.statusCode = statusCode || 500;
    this.stack = stack || "internal error";
    Error.captureStackTrace(this, this.constructor);
  }
}
