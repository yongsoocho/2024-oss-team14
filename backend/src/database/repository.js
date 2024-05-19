const { CustomError } = require("../pipe/error");
const d = require("./data.json");

class Repository {
  data = d;

  findMany(page = 1) {
    try {
      start = 10 * (page - 1);
      end = 10 * page;

      result = d.slice(start, end);

      return result;
    } catch (error) {
      CustomError(error.message, 500, error.stack);
    }
  }

  findOneById(id) {
    try {
      if (!id) throw new CustomError("data not found", 404);

      const user = this.data.find((element) => element.id == id);

      if (!user) throw new CustomError("bad request", 400);
      return user;
    } catch (error) {
      CustomError(error.message, 500, error.stack);
    }
  }

  findOneByQueryWhereStack(query) {
    try {
      const pattern = new RegExp(query, "i");
      const result = [];

      this.data.forEach((item) => {
        if (pattern.test(item.stack)) {
          result.push(item);
        }
      });

      return result;
    } catch (error) {
      CustomError(error.message, 500, error.stack);
    }
  }

  findOneByQueryWhereSolution(query) {
    try {
      const pattern = new RegExp(query, "i");
      const result = [];

      this.data.forEach((item) => {
        if (pattern.test(item.solution)) {
          result.push(item);
        }
      });

      return result;
    } catch (error) {
      CustomError(error.message, 500, error.stack);
    }
  }
}

module.exports = Repository;
