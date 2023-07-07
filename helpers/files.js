const fs = require("fs");

const getJsonFromFile = (filePath) => {
  return fs.promises.readFile(filePath).then((file) => {
    console.log(JSON.parse(file));
    return JSON.parse(file);
  });
};

module.exports = {
  getJsonFromFile,
};
