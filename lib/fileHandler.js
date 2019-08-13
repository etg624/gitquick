const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectory: () => {
    return process.cwd();
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
