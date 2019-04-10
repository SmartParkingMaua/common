let _registerMethod;
let _options;
let _parkingId;
let _action;
let _arrActionWeightPerHour;
let _isRobotConfigured = false;

// Returns an array with the range number specified
// E.g: range(5) returns [1, 2, 3, 4, 5]
// DON'T USE range(0), it will return an empty array
const range = (n) => [...Array(n + 1).keys()].filter(e => e);

const arrEntranceWeightPerHour = [
  range(1),   // 0h - 1h
  range(1),   // 1h - 2h
  range(1),   // 2h - 3h
  range(1),   // 3h - 4h
  range(1),   // 4h - 5h
  range(2),   // 5h - 6h
  range(6),   // 6h - 7h
  range(12),  // 7h - 8h
  range(3),   // 8h - 9h
  range(6),   // 9h - 10h
  range(6),   // 10h - 11h
  range(6),   // 11h - 12h
  range(6),   // 12h - 13h
  range(3),   // 13h - 14h
  range(3),   // 14h - 15h
  range(3),   // 15h - 16h
  range(3),   // 16h - 17h
  range(6),   // 17h - 18h
  range(6),   // 18h - 19h
  range(6),   // 19h - 20h
  range(2),   // 20h - 21h
  range(2),   // 21h - 22h
  range(3),   // 22h - 23h
  range(1)    // 23h - 24h
];

const arrExitWeightPerHour = [
  range(2),   // 0h - 1h
  range(1),   // 1h - 2h
  range(1),   // 2h - 3h
  range(1),   // 3h - 4h
  range(1),   // 4h - 5h
  range(1),   // 5h - 6h
  range(2),   // 6h - 7h
  range(4),   // 7h - 8h
  range(3),   // 8h - 9h
  range(3),   // 9h - 10h
  range(3),   // 10h - 11h
  range(4),   // 11h - 12h
  range(4),   // 12h - 13h
  range(10),  // 13h - 14h
  range(3),   // 14h - 15h
  range(6),   // 15h - 16h
  range(3),   // 16h - 17h
  range(6),   // 17h - 18h
  range(6),   // 18h - 19h
  range(4),   // 19h - 20h
  range(4),   // 20h - 21h
  range(4),   // 21h - 22h
  range(10),  // 22h - 23h
  range(4)    // 23h - 24h
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
      await week(0.6, timestampMs);
    } else if (i >= 26 && i <= 30) { // Vacations (July)
      await week(0.3, timestampMs);
    } else if (i >= 49 && i <= 51) { // After P4 and before PSub 2
      await week(0.7, timestampMs);
    } else if (i === 52) { // Christmas and New Year
      await week(0.01, timestampMs);
    } else { // Regular period of classes
      await week(1, timestampMs);
    }

    timestampMs += 604800000; // One week period timestamp
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

    timestampMs += 86400000; // One day period timestamp
  }

}

const day = async (dayWeight, timestampMs) => {

  let hourWeight;
  let pickedRange;

  for (let i = 0; i < 24; i++) {
    pickedRange = Math.floor(Math.random() * _arrActionWeightPerHour[i].length);
    hourWeight = dayWeight * _arrActionWeightPerHour[i][pickedRange];

    await hour(hourWeight, timestampMs);

    timestampMs += 3600000; // One hour period timestamp
  }

}

const hour = async (hourWeight, timestampMs) => {

  let carsPerMinute;

  for (let i = 0; i < 60; i++) {
    carsPerMinute = Math.round(hourWeight * Math.random());

    await minute(carsPerMinute, timestampMs);

    timestampMs += 60000; // One minute period timestamp
  }

}

const minute = async (carsPerMinute, timestampMs) => {

  for (let i = 0; i < carsPerMinute; i++) {
    try {
      const response = await _registerMethod(_options, _parkingId, timestampMs, _action);

      console.log(response);
      
      timestampMs += 60000 / carsPerMinute; // One car per n seconds period timestamp
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
