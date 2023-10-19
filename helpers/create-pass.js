const path = require("node:path");

const createPath = (page) =>
  path.resolve(__dirname, "../ejs-views", `${page}.ejs`);

module.exports = createPath;
