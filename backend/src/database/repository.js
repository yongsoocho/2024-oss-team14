const path = require("path");
const { CustomError } = require("../pipe/error");
const d = require("./data.json");
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
// const objectid = require("objectid");

class Repository {
  con = this.connect();

  connect() {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("oss");
    const collection = db.collection("test");
    // const collection = db.collection("dev");
    // const collection = db.collection("prd");
    return collection;
  }

  async test() {
    const result = await this.con.find({}).toArray();
    console.log(result);
  }

  async save(message, statusCode, stack, solution) {
    const newError = {
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
      { _id: new ObjectId(id) },
      { $set: { isResolved: true } }
    );
    return result;
  }

  async findMany(page = 1) {
    const result = await this.con.find({}).toArray();
    return result;
  }

  async findOneById(id) {
    const result = await this.con.findOne({ _id: new ObjectId(id) });
    return result;
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

const r = new Repository();
console.log("save ", r.save("t", "e", "s", "t"));
console.log("resolve ", r.resolve("665c02d4a82372cb03952070"));
console.log("findMany ", r.findMany());
console.log("findOneById ", r.findOneById("665c02d4a82372cb03952070"));
console.log("findOneByQueryWhereStack ", r.findOneByQueryWhereStack("hi"));
console.log(
  "findOneByQueryWhereSolution ",
  r.findOneByQueryWhereSolution("hi")
);

module.exports = Repository;
