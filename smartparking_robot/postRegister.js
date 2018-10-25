const request = require( 'request' );

const post = ( { url }, parkingId, timestamp, action ) =>
    new Promise( ( resolve, reject ) => {

        request.post( url, { 
                json: {
                    "idEstacionamento": parkingId,
                    "timestamp": timestamp,
                    "estado": action
                }
            },
            ( error, response, body ) => {
                if ( !error && response.statusCode == 200 ) {
                    resolve( 'Post status code: ' + response.statusCode
                            + '. Post response body: ' + body );
                }

                if ( error ) {
                    reject( error );
                }
            }
        );

});

module.exports.post = post;