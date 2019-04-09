const request = require('request');

const post = ({ url }, parkingId, timestamp, action) =>
  new Promise((resolve, reject) => {

    request.post(url, {
        json: {
          idParking: parkingId,
          action: action,
          timestamp: timestamp
        }
      },
      (error, response, body) => {
        if (!error && response.statusCode == 201) {
          resolve(`Post status code: ${response.statusCode}. Post response body: ${body}`);
        }

        if (error) {
          reject(error);
        }
      }
    );

  });


module.exports.postPromise = post;
