const path = require("path");
const { CustomError } = require("../pipe/error");
const d = require("./data.json");
const fs = require("fs");
const { MongoClient } = require("mongodb");

class Repository {
  con = this.connect();

  connect() {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const db = client.db("oss");
    // const collection = db.collection("errors");
    const collection = db.collection("test");
    return collection;
  }

  async test() {
    const result = await this.con.find({});
    console.log(result);
  }

  // save(message, statusCode, stack, solution) {
  //   try {
  //     const newError = {
  //       id: d[d.length],
  //       project: "[OSS payment 팀] 결제",
  //       tags: ["python", "Next.js"],
  //       message: message ?? "internal server error",
  //       statusCode: statusCode ?? 500,
  //       stack: stack ?? "fail to reference",
  //       solution: solution ?? "-",
  //       isResolved: false,
  //     };

  //     const filePath = path.join(__dirname, "data.json");
  //     d = [...d, newError];

  //     fs.writeFileSync(filePath, d);

  //     return newError;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // resolve(id) {
  //   const result = {};
  //   const filePath = path.join(__dirname, "data.json");
  //   const d = d.map((item) => {
  //     if (item.id == id) {
  //       const result = {
  //         ...item,
  //         isResolved: true,
  //       };
  //       return result;
  //     } else {
  //       return item;
  //     }
  //   });

  //   fs.writeFileSync(filePath, d);

  //   return result;
  // }

  // findMany(page = 1) {
  //   try {
  //     // start = 10 * (page - 1);
  //     // end = 10 * page;
  //     // result = d.slice(start, end);
  //     // return result;
  //     return d;
  //   } catch (error) {
  //     CustomError(error.message, 500, error.stack);
  //   }
  // }

  // findOneById(id) {
  //   try {
  //     if (!id) throw new CustomError("data not found", 404);

  //     const user = this.data.find((element) => element.id == id);

  //     if (!user) throw new CustomError("bad request", 400);
  //     return user;
  //   } catch (error) {
  //     CustomError(error.message, 500, error.stack);
  //   }
  // }

  // findOneByQueryWhereStack(query) {
  //   try {
  //     const pattern = new RegExp(query, "i");
  //     const result = [];

  //     this.data.forEach((item) => {
  //       if (pattern.test(item.stack)) {
  //         result.push(item);
  //       }
  //     });

  //     return result;
  //   } catch (error) {
  //     CustomError(error.message, 500, error.stack);
  //   }
  // }

  // findOneByQueryWhereSolution(query) {
  //   try {
  //     const pattern = new RegExp(query, "i");
  //     const result = [];

  //     this.data.forEach((item) => {
  //       if (pattern.test(item.solution)) {
  //         result.push(item);
  //       }
  //     });

  //     return result;
  //   } catch (error) {
  //     CustomError(error.message, 500, error.stack);
  //   }
  // }
}

const r = new Repository();
r.test();

module.exports = Repository;
