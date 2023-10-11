const fs = require("fs");

// Create a function to unlink (delete) a file synchronously
const unlinkSyncc = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
  }
};

module.exports = { unlinkSyncc };
