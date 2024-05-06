const { CustomError } = require("../pipe/error");
const d = require("./data.json");

class Repository {
  data = d;

  findOneById(id) {
    if (!id) throw new CustomError("data not found", 404);

    const user = this.data.find((element) => element.id == id);

    if (!user) throw new CustomError("bad request", 400);

    return user;
  }

  findOneByQuery(query) {
    const pattern = new RegExp(query, "i");

    // 여기에 word to vec이 들어가면 좋을 것 같다.
    this.data.forEach((item) => {
      if (pattern.test(item.stack)) {
        return item;
      }
    });

    return null;
  }
}

module.exports = Repository;
