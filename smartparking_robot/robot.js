let _registerMethod;
let _options;
let _parkingId;
let _action;
let _arrActionWeightPerHour;
let _isRobotConfigured = false;


// It is necessary to add 1 to every array length below in order to include
// the last value of the specified range

// Entrance weight arrays per hour
const arrEntranceWeightPerHour = [
  [...Array(1 + 1).keys()],   // 24h to 1h
  [...Array(1 + 1).keys()],   // 1h to 2h
  [...Array(1 + 1).keys()],   // 2h to 3h
  [...Array(1 + 1).keys()],   // 3h to 4h
  [...Array(1 + 1).keys()],   // 4h to 5h
  [...Array(2 + 1).keys()],   // 5h to 6h
  [...Array(6 + 1).keys()],   // 6h to 7h
  [...Array(12 + 1).keys()],  // 7h to 8h
  [...Array(3 + 1).keys()],   // 8h to 9h
  [...Array(6 + 1).keys()],   // 9h to 10h
  [...Array(6 + 1).keys()],   // 10h to 11h
  [...Array(6 + 1).keys()],   // 11h to 12h
  [...Array(6 + 1).keys()],   // 12h to 13h
  [...Array(3 + 1).keys()],   // 13h to 14h
  [...Array(3 + 1).keys()],   // 14h to 15h
  [...Array(3 + 1).keys()],   // 15h to 16h
  [...Array(3 + 1).keys()],   // 16h to 17h
  [...Array(6 + 1).keys()],   // 17h to 18h
  [...Array(6 + 1).keys()],   // 18h to 19h
  [...Array(6 + 1).keys()],   // 19h to 20h
  [...Array(2 + 1).keys()],   // 20h to 21h
  [...Array(2 + 1).keys()],   // 21h to 22h
  [...Array(3 + 1).keys()],   // 22h to 23h
  [...Array(1 + 1).keys()]    // 23h to 24h
];

// Exit weight arrays per hour
const arrExitWeightPerHour = [
  [...Array(2 + 1).keys()],   // 24h to 1h
  [...Array(1 + 1).keys()],   // 1h to 2h
  [...Array(1 + 1).keys()],   // 2h to 3h
  [...Array(1 + 1).keys()],   // 3h to 4h
  [...Array(1 + 1).keys()],   // 4h to 5h
  [...Array(1 + 1).keys()],   // 5h to 6h
  [...Array(2 + 1).keys()],   // 6h to 7h
  [...Array(4 + 1).keys()],   // 7h to 8h
  [...Array(3 + 1).keys()],   // 8h to 9h
  [...Array(3 + 1).keys()],   // 9h to 10h
  [...Array(3 + 1).keys()],   // 10h to 11h
  [...Array(4 + 1).keys()],   // 11h to 12h
  [...Array(4 + 1).keys()],   // 12h to 13h
  [...Array(10 + 1).keys()],  // 13h to 14h
  [...Array(3 + 1).keys()],   // 14h to 15h
  [...Array(6 + 1).keys()],   // 15h to 16h
  [...Array(3 + 1).keys()],   // 16h to 17h
  [...Array(6 + 1).keys()],   // 17h to 18h
  [...Array(6 + 1).keys()],   // 18h to 19h
  [...Array(4 + 1).keys()],   // 19h to 20h
  [...Array(4 + 1).keys()],   // 20h to 21h
  [...Array(4 + 1).keys()],   // 21h to 22h
  [...Array(10 + 1).keys()],  // 22h to 23h
  [...Array(4 + 1).keys()]    // 23h to 24h
];


const config = ( registerMethodPromise, options, parkingId, action) => {

  _registerMethod = registerMethodPromise;

  _options = options;

  // Validate parking id
  if (parkingId <= 0) {
    console.error('Invalid parkingId');
    return;
  }

  _parkingId = parkingId;

  // Validate action
  if (action === 'entrance') {
    _action = action;
    _arrActionWeightPerHour = arrEntranceWeightPerHour;
  } else if (action === 'exit') {
    _action = action;
    _arrActionWeightPerHour = arrExitWeightPerHour;
  } else {
    console.error('Invalid action');
    return;
  }

  _isRobotConfigured = true;

}

const year = async (timestampMs) => {

  if (_isRobotConfigured === false) {
    console.error('The robot is not configured. Please import the config() method to configure the robot before starting it.');
    return;
  }

  for (let i = 0; i < 52; i++) {
    if (i <= 6) { // Vacations (January/February)
      await week(0.07, timestampMs);
    } else if (i === 7) { // Start of classes for the first year
      await week(0.5, timestampMs);
    } else if (i >= 26 && i <= 30) { // Vacations (July)
      await week(0.25, timestampMs);
    } else if (i >= 49 && i <= 51) { // After P4 and before PSub 2
      await week(0.7, timestampMs);
    } else if (i === 52) { // Christmas and New Year
      await week(0.01, timestampMs);
    } else { // Regular period of classes
      await week(1, timestampMs);
    }

    timestampMs += 604800 * 1000; // One week period timestamp
  }

}

const week = async (weekWeight, timestampMs) => {

  for (let i = 0; i < 7; i++) {
    if (i === 0) { // Sunday
      await day(weekWeight * 0.07, timestampMs);
    } else if (i === 6) { // Saturday
      await day(weekWeight * 0.7, timestampMs);
    } else { // Week days
      await day(weekWeight * 1, timestampMs);
    }

    timestampMs += 86400 * 1000; // One day period timestamp
  }

}

const day = async (dayWeight, timestampMs) => {

  let hourWeight;

  for (let i = 0; i < 24; i++) {
    hourWeight = dayWeight * _arrActionWeightPerHour[i][
      Math.floor(Math.random() * _arrActionWeightPerHour[i].length)
    ];

    await hour(hourWeight, timestampMs);

    timestampMs += 3600 * 1000; // One hour period timestamp
  }

}

const hour = async (hourWeight, timestampMs) => {

  let carsPerMinute;

  for (let i = 0; i < 60; i++) {
    carsPerMinute = Math.round(hourWeight * Math.random());

    await minute(carsPerMinute, timestampMs);

    timestampMs += 60 * 1000; // One minute period timestamp
  }

}

const minute = async (carsPerMinute, timestampMs) => {

  for (let i = 0; i < carsPerMinute; i++) {
    try {
      const response = await _registerMethod(_options, _parkingId, timestampMs, _action);

      console.log(response);
      
      timestampMs += 60 * 1000 / carsPerMinute; // One car per n seconds period timestamp
    } catch (error) {
      console.error(error);
    }
  }

}


module.exports = {
  config: config,
  start: year,
  // runWeek: week,
  // runDay: day,
  // runHour: hour,
  // runMinute: minute
}
