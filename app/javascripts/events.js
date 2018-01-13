// Events

// note, need to assure there are no other releasedFunds events.. i.e. make sure it is from correct escrow

// ./Escrow.sol
// Returns: bool
var VotingResult = function (result) {
  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];
    if (log.event == 'releasedFunds') 
      return log['args']['releasedFunds'];
  }
  return;
} 


// ./Escrow.sol
exports.VotingResult = VotingResult;
