const robot = require('./robot');
const { postPromise } = require('./register_methods/postPromise');

(async () => {

  const initialTimestampMs =
    new Date('2018-01-01 00:00:00.000').getTime();

  const startDatetime = new Date().toLocaleString('pt-BR');

  // -----ENTRANCE----- //
  robot.config(postPromise, {
    url: 'http://localhost:8080/v1/action'
  }, 1, 'entrance');

  await robot.start(initialTimestampMs);

  // -----EXIT----- //
  robot.config(postPromise, {
    url: 'http://localhost:8080/v1/action'
  }, 1, 'exit');

  await robot.start(initialTimestampMs);

  const endDatetime = new Date().toLocaleString('pt-BR');

  console.log(`\nElapsed time: ${startDatetime} - ${endDatetime}`);

})();



// -----TESTS----- //
// const { writePromise } = require('./register_methods/writePromise');

// robot.config( writePromise, {
//   filepath: 'entranceStatements.sql',
//   table: 'gates'
// }, 1, 'entrance' );


// const { sqlPromise } = require('./register_methods/sqlPromise');

// robot.config( sqlPromise, {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'smartparking',
//   table: 'gates'
// }, 1, 'entrance' );


// postPromise({
//   url: 'http://localhost:8080/v1/action'
// }, 1, initialTimestampMs, 'entrance' );

// writePromise({
//   filepath: 'statementsEntrada.sql'
// }, 1, initialTimestampMs, 'entrance' );

// sqlPromise({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'smartparking',
//   table: 'gates'
// }, 1, initialTimestampMs, 'entrance' );


// robot.runMinute( 5, initialTimestampMs );
// robot.runHour( 1, [ ...Array( 5 + 1 ).keys() ], initialTimestampMs );
// robot.runDay( 1, initialTimestampMs );
// robot.runWeek( 1, initialTimestampMs );
