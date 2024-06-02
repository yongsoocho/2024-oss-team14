const { OpenAI } = require("openai");
const config = require("../config/config.json");
const openai = new OpenAI({ apiKey: config["OPENAI_API_KEY"] });

/**
 * @param {string} [message="python"|"node.js"] - 프롬프트 타입
 * @param {string} message - 에러메세지 전달
 */
function generatePrompt(type, message) {
  /**
   * @prompt
   * role {system} - 모델의 초기 동작 설정 및 지침 제공
   * 모델이 친절하고 도움이 되는 어조를 유지하거나 특정 방식으로 질문에 답변하도록 지시
   * "content": "You are a helpful assistant."
   *
   * role {user} - 사용자가 모델에게 질문하거나 요청을 전달
   * 사용자가 모델에게 특정 정보를 요청하거나 대화를 시작
   * "content": "What is the capital of France?"
   *
   * role {assistant} - 모델이 사용자에게 제공하는 응답
   * 모델이 사용자의 질문에 답변하거나 요청된 정보를 제공
   * "content": "The capital of France is Paris."
   */
  if (type == "python") {
    return [
      {
        role: "system",
        content:
          "Your role is to help developers solve programming errors or issue.",
      },
      {
        role: "user",
        content:
          "개발자는 Python에서 나는 개발을 하고 있어 " +
          "FastAPI Application 에서 나는 다음과 같은 에러 메세지를 겪었을 때 원인과 해결책을 함께 알려줘 ",
      },
      { role: "user", content: message },
    ];
  } else if (type == "node.js") {
    return [
      {
        role: "system",
        content:
          "Your role is to help developers solve programming errors or issue.",
      },
      {
        role: "user",
        content:
          "개발자는 Node.js에서 나는 개발을 하고 있어 " +
          "Next.js에서 Application 에서 나는 다음과 같은 에러 메세지를 겪었을 때 원인과 해결책을 함께 알려줘 ",
      },
      { role: "user", content: message },
    ];
  } else {
    throw new CustomError("prompt generate fail", 400, null);
  }
}

/**
 * @function chatgpt에서 솔루션을 가져옵니다.
 * @param {string} [message="python"|"node.js"] - 프롬프트 타입
 * @param {string} message - 에러메세지 전달
 */
export async function getSolutionFromGPT(type = "python", message) {
  const prompt = generatePrompt(type, message);

  try {
    const response = await openai.chat.completions.create({
      messages: prompt,
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      // stream: true,
    });
    // for await (const chunk of stream) {
    //   process.stdout.write(chunk.choices[0]?.delta?.content || "");
    // }

    /**
     * @example console.log(response);
     * {
     *    id: 'chatcmpl-9QW1XxHpCwUlBM2Fyqat8uXUv80T9',
     *    object: 'chat.completion',
     *    created: 1716106655,
     *    model: 'gpt-3.5-turbo-0125',
     *    choices: [],
     *    usage: { prompt_tokens: 43, completion_tokens: 100, total_tokens: 143 },
     *    system_fingerprint: null
     * }
     */
    /**
     * @example console.log(response.choices);
     * [
     *  {
     *    index: 0,
     *    message: [Object],
     *    logprobs: null,
     *    finish_reason: 'length'
     *  }
     * ]
     */
    /**
     * @example console.log(response.choices[0].message);
     * {
     *  role: 'assistant',
     *  content: String,
     *  logprobs: null,
     *  finish_reason: 'length'
     * }
     */
    const message = response.choices[0].message.content;

    return message;
  } catch (error) {
    console.error(
      "system panic gpt api error: ",
      error.response ? error.response.data : error.message
    );
  }
}

/**
 * @class 애플리케이션 에러
 */
class CustomError extends Error {
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

module.exports = {
  getSolutionFromGPT,
  CustomError,
};
