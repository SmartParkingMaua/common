const { post } = require( './postRegister' );
const { write } = require( './writeRegister' );
const { sql } = require( './sqlRegister' );

let _registerMethod;
let _options;
let _parkingId;
let _action;
let _arrActionWeightPerHour;
let _isRobotConfigured = false;


// It is necessary to add 1 to every array length below in order to include
// the last value of the specified range
 
// Entrance weight arrays per hour
let _entrance24to1  = [ ...Array( 1  + 1 ).keys() ];
let _entrance1to2   = [ ...Array( 1  + 1 ).keys() ];
let _entrance2to3   = [ ...Array( 1  + 1 ).keys() ];
let _entrance3to4   = [ ...Array( 1  + 1 ).keys() ];
let _entrance4to5   = [ ...Array( 1  + 1 ).keys() ];
let _entrance5to6   = [ ...Array( 2  + 1 ).keys() ];
let _entrance6to7   = [ ...Array( 6  + 1 ).keys() ];
let _entrance7to8   = [ ...Array( 12 + 1 ).keys() ];
let _entrance8to9   = [ ...Array( 3  + 1 ).keys() ];
let _entrance9to10  = [ ...Array( 6  + 1 ).keys() ];
let _entrance10to11 = [ ...Array( 6  + 1 ).keys() ];
let _entrance11to12 = [ ...Array( 6  + 1 ).keys() ];
let _entrance12to13 = [ ...Array( 6  + 1 ).keys() ];
let _entrance13to14 = [ ...Array( 3  + 1 ).keys() ];
let _entrance14to15 = [ ...Array( 3  + 1 ).keys() ];
let _entrance15to16 = [ ...Array( 3  + 1 ).keys() ];
let _entrance16to17 = [ ...Array( 3  + 1 ).keys() ];
let _entrance17to18 = [ ...Array( 6  + 1 ).keys() ];
let _entrance18to19 = [ ...Array( 6  + 1 ).keys() ];
let _entrance19to20 = [ ...Array( 6  + 1 ).keys() ];
let _entrance20to21 = [ ...Array( 2  + 1 ).keys() ];
let _entrance21to22 = [ ...Array( 2  + 1 ).keys() ];
let _entrance22to23 = [ ...Array( 3  + 1 ).keys() ];
let _entrance23to24 = [ ...Array( 1  + 1 ).keys() ];

// Exit weight arrays per hour
let _exit24to1  = [ ...Array( 2  + 1 ).keys() ];
let _exit1to2   = [ ...Array( 1  + 1 ).keys() ];
let _exit2to3   = [ ...Array( 1  + 1 ).keys() ];
let _exit3to4   = [ ...Array( 1  + 1 ).keys() ];
let _exit4to5   = [ ...Array( 1  + 1 ).keys() ];
let _exit5to6   = [ ...Array( 1  + 1 ).keys() ];
let _exit6to7   = [ ...Array( 2  + 1 ).keys() ];
let _exit7to8   = [ ...Array( 4  + 1 ).keys() ];
let _exit8to9   = [ ...Array( 3  + 1 ).keys() ];
let _exit9to10  = [ ...Array( 3  + 1 ).keys() ];
let _exit10to11 = [ ...Array( 3  + 1 ).keys() ];
let _exit11to12 = [ ...Array( 4  + 1 ).keys() ];
let _exit12to13 = [ ...Array( 4  + 1 ).keys() ];
let _exit13to14 = [ ...Array( 10 + 1 ).keys() ];
let _exit14to15 = [ ...Array( 3  + 1 ).keys() ];
let _exit15to16 = [ ...Array( 6  + 1 ).keys() ];
let _exit16to17 = [ ...Array( 3  + 1 ).keys() ];
let _exit17to18 = [ ...Array( 6  + 1 ).keys() ];
let _exit18to19 = [ ...Array( 6  + 1 ).keys() ];
let _exit19to20 = [ ...Array( 4  + 1 ).keys() ];
let _exit20to21 = [ ...Array( 4  + 1 ).keys() ];
let _exit21to22 = [ ...Array( 4  + 1 ).keys() ];
let _exit22to23 = [ ...Array( 10 + 1 ).keys() ];
let _exit23to24 = [ ...Array( 4  + 1 ).keys() ];


const arrEntranceWeightPerHour = [ _entrance24to1, _entrance1to2, _entrance2to3, _entrance3to4,
    _entrance4to5, _entrance5to6, _entrance6to7, _entrance7to8, _entrance8to9,
    _entrance9to10, _entrance10to11, _entrance11to12, _entrance12to13, _entrance13to14,
    _entrance14to15, _entrance15to16, _entrance16to17, _entrance17to18, _entrance18to19,
    _entrance19to20, _entrance20to21, _entrance21to22, _entrance22to23, _entrance23to24
];

const arrExitWeightPerHour = [ _exit24to1, _exit1to2, _exit2to3, _exit3to4, _exit4to5, _exit5to6,
        _exit6to7, _exit7to8, _exit8to9, _exit9to10, _exit10to11, _exit11to12, _exit12to13,
        _exit13to14, _exit14to15, _exit15to16, _exit16to17, _exit17to18, _exit18to19,
        _exit19to20, _exit20to21, _exit21to22, _exit22to23, _exit23to24
];


async function year( timestampInSeconds ) {

    if ( _isRobotConfigured  === false ) {
        console.error( 'The robot is not configured. Please use module.exports.config() method'
                + ' to configure the robot before starting it.' );
        return;
    }

    for ( let i = 0; i < 52; i++ ) {
        if ( i <= 6 ) { // Vacations
            await week( 0.05, timestampInSeconds );
        }
        else if ( i === 7 ) { // Start of classes for the first year
            await week( 0.4, timestampInSeconds );
        }
        else if ( i >= 26 && i <= 30 ) { // Vacations
            await week( 0.2, timestampInSeconds );
        }
        else if ( i >= 49 && i <= 51 ) { // After P4 and before PSub 2
            await week( 0.6, timestampInSeconds );
        }
        else if ( i === 52 ) { // Christmas and New Year
            await week( 0.01, timestampInSeconds );
        }
        else { // Regular period of classes
            await week( 1, timestampInSeconds );
        }

        timestampInSeconds += 604800; // One week period timestamp
    }

}

async function week( weekWeight, timestampInSeconds ) {

    for ( let i = 0; i < 7; i++ ) {
        if ( i === 0 ) { // Sunday
            await day( weekWeight * 0.05, timestampInSeconds );
        }
        else if ( i === 6 ) { // Saturday
            await day( weekWeight * 0.5, timestampInSeconds );
        }
        else { // Week days
            await day( weekWeight * 1, timestampInSeconds );
        }

        timestampInSeconds += 86400; // One day period timestamp
    }

}

async function day( dayWeight, timestampInSeconds ) {

    let hourWeight;

    for ( let i = 0; i < 24; i++ ) {
        hourWeight = dayWeight * _arrActionWeightPerHour[i][
                Math.floor( Math.random() * _arrActionWeightPerHour[i].length ) ];

        await hour( hourWeight, timestampInSeconds );

        timestampInSeconds += 3600; // One hour period timestamp
    }

}

async function hour( hourWeight, timestampInSeconds ) {

    let carsPerMinute;

    for ( let i = 0; i < 60; i++ ) {
        carsPerMinute = Math.round( hourWeight * Math.random() );

        await minute( carsPerMinute, timestampInSeconds );

        timestampInSeconds += 60; // One minute period timestamp
    }

}

async function minute( carsPerMinute, timestampInSeconds ) {
    
    for ( let i = 0; i < carsPerMinute; i++ ) {
        await _registerMethod( _options, _parkingId, timestampInSeconds, _action )
                .then( ( response ) => console.log( response ) )
                .catch( ( error ) => console.log( error ) );

        timestampInSeconds += 60 / carsPerMinute; // One car per X seconds period timestamp
    }
    
}

function config( registerMethod, options, parkingId, action ) {

    // Validate register method
    if ( registerMethod === 'post' ) {
        _registerMethod = post;
    }
    else if ( registerMethod === 'write' ) {
        _registerMethod = write;        
    }
    else if ( registerMethod === 'sql' ) {
        _registerMethod = sql;        
    }
    else {
        console.error( 'Register method not defined' );
        return;
    }

    // Validate parking id
    if ( parkingId >= 0 ) {
        _parkingId = parkingId;
    }
    else {
        console.error( 'Parking id not defined' );
        return;
    }

    // Validate action
    if ( action === 'entrada' ) {
        _action = 'entrada';
        _arrActionWeightPerHour = arrEntranceWeightPerHour;
    }
    else if ( action === 'saida' ) {
        _action = 'saida';
        _arrActionWeightPerHour = arrExitWeightPerHour;
    }
    else {
        console.error( 'Action not defined' );
        return;
    }

    _options = options;

    _isRobotConfigured = true;

}

module.exports = {
    config: config,
    start: year
}