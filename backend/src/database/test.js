const Repository = require("./repository");

const repo = new Repository()

repo.findMany().then(res => console.log(res))
