const fs = require('fs');

const getJsonFromFile = (filePath) =>
  fs.promises.readFile(filePath).then((file) => {
    console.log(JSON.parse(file));
    return JSON.parse(file);
  });

module.exports = {
  getJsonFromFile,
};
