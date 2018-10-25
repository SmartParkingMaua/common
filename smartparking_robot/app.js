const robot = require( './robot' );

( async () => {

    let initialTimestampInSeconds = new Date( "2017-01-01T00:00:00.000" ).getTime() / 1000;

    let startDatetime = new Date().toLocaleString( 'pt-BR' );

    // -----ENTRANCE----- //
    // robot.config( 'write', { filepath: 'entranceStatements.sql'}, 1, 'entrada' );
    // robot.config( 'post', { url: 'http://localhost:8080/v1/cars' }, 1, 'entrada' );
    robot.config( 'sql', { host: 'localhost', user: 'root', password: '', database: 'mydb',
            table: 'tbl_portaria' }, 1, 'entrada' );

    await robot.start( initialTimestampInSeconds );

    // -----EXIT----- //
    // robot.config( 'write', { filepath: 'exitStatements.sql'}, 1, 'saida' );
    // robot.config( 'post', { url: 'http://localhost:8080/v1/cars' }, 1, 'saida' );
    robot.config( 'sql', { host: 'localhost', user: 'root', password: '', database: 'mydb',
            table: 'tbl_portaria' }, 1, 'saida' );

    await robot.start( initialTimestampInSeconds );

    let endDatetime = new Date().toLocaleString( 'pt-BR' );

    console.log( '\nElapsed time: ' + startDatetime + ' - ' + endDatetime );

})();



// -----TESTS----- //
// const { post } = require( './postRegister' );
// post( { url: 'http://localhost:8080/v1/cars' }, 1, initialTimestampInSeconds, 'entrada' );

// const { write } = require( './writeRegister' );
// write( { filepath: 'statementsEntrada.sql' }, 1, initialTimestampInSeconds, 'entrada' );

// const { sql } = require( './sqlRegister' );
// sql ( {}, 1, initialTimestampInSeconds, 'entrada' );

// robot.runMinute( 5, initialTimestampInSeconds );
// robot.runHour( 1, [ ...Array( 5 + 1 ).keys() ], initialTimestampInSeconds );
// robot.runDay( 1, initialTimestampInSeconds );
// robot.runWeek( 1, initialTimestampInSeconds );
