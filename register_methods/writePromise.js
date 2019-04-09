const fs = require('fs');

const write = ({ filepath, table }, parkingId, timestamp, action) =>
  new Promise((resolve, reject) => {

    const data = `INSERT INTO ${table} (idParking, action, createdAt) VALUES (${parkingId}, '${action}', FROM_UNIXTIME(${timestamp}));\n`;

    fs.appendFile(filepath, data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(`Appended statement to ${filepath} file`);
      }
    });

  });


module.exports.writePromise = write;
