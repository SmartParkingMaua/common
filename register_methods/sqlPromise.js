const mysql = require('mysql');

const sql = ({
    host,
    user,
    password,
    database,
    table
  }, parkingId, timestamp, action) =>
  new Promise((resolve, reject) => {

    const connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database
    });

    let query = `INSERT INTO ${table} (idParking, action, createdAt) VALUES (?, ?, FROM_UNIXTIME(?))`;

    connection.query(query, [parkingId, timestamp, action],
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results, fields);
        }
      });

    connection.end((error) => {
      if (error) {
        reject(error);
      }
    });

  });


module.exports.sqlPromise = sql;
