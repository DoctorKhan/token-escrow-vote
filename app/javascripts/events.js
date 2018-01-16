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

// ./EscrowFactory.sol
// event EscrowCreation(address indexed escrow, address indexed controller, address indexed token);
var EscrowCreation = function (result) {
  ls = ['0x', '0x', '0x']
  
  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];
    if (log.event == 'escrow') 
      ls[0] = log['args']['escrow'];
    if (log.event == 'controller') 
      ls[1] = log['args']['controller'];
    if (log.event == 'token') 
      ls[2] = log['args']['token'];
  }
  return ls;
} 

// ./Escrow.sol
exports.VotingResult = VotingResult;

// ./EscrowFactory.sol
exports.EscrowCreation = EscrowCreation;
