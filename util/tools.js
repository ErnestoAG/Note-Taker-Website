const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

const readAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writingFile(file, parsedData);
    }
  });
};

const writingFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

module.exports = { readFilePromise, writingFile, readAppend };