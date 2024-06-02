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
    const collection = db.collection("errors");
    // const collection = db.collection("prd");
    return collection;
  }

  async test() {
    const result = await this.con.find({}).toArray();
    console.log(result);
  }

  async save(message, statusCode, stack, solution) {
    const newError = {
      id: d[d.length],
      project: "[OSS payment 팀] 결제",
      tags: ["python", "Next.js"],
      message: message ?? "internal server error",
      statusCode: statusCode ?? 500,
      stack: stack ?? "fail to reference",
      solution: solution ?? "-",
      isResolved: false,
    };

    const result = await this.con.insertOne(newError);
    return result;
  }

  async resolve(id) {
    const result = await this.con.updateOne(
      { _id: id },
      { $set: { isResolved: true } }
    );
    return result;
  }

  async findMany(page = 1) {
    const result = await this.con.find({}).toArray();
    return result;
  }

  async findOneById(id) {
    const result = await this.con.find({ _id: id }).toArray();
    if (result.length > 0) return result[0];
    else return {};
  }

  async findOneByQueryWhereStack(query) {
    const result = await this.con
      .find({ stack: { $regex: /query/i } })
      .toArray();
    return result;
  }

  async findOneByQueryWhereSolution(query) {
    const result = await this.con
      .find({ solution: { $regex: /query/i } })
      .toArray();
    return result;
  }
}

// const r = new Repository();
// r.test();

module.exports = Repository;
