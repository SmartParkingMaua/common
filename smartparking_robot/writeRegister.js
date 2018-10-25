const fs = require( 'fs' );

const write = ( { filepath }, parkingId, timestamp, action ) =>
    new Promise( ( resolve, reject ) => {

    let data = "INSERT INTO tbl_portaria (idportaria, timestamp, acao) VALUES ("
            + parkingId + ", FROM_UNIXTIME(" + timestamp + "), '" + action + "');\n";

    fs.appendFile( filepath, data, ( error ) => {
        if ( error ) {
            reject( error );
        }

        resolve( 'Appended statement to ' + filepath + ' file' );
    });

});

module.exports.write = write;