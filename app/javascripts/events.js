// NOTE: This is used by both test/ and build/ folders

// Events

// ./Blah.sol
// Returns: [address]
/*
var Blah = function (result) {
  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];
    if (log.event == 'Blah') 
      return log['args']['Blah'];
  }
  return;
} 
*/

// ./Blah.sol
/*
exports.Blah = Blah;
*/
