import simulated from 'sim.js';
var escrowFactory = undefined;

// ./EscrowFactory.sol
// Returns: escrow contract
// options: simulated, testrpc, testnet, mainnet
// allocateVotes returns bool
// singleVote returns boolg


var createFactory = async () =>
    {
      if (simulated) {
        
      }
      this.escrowFactory = EscrowFactory.at(escrowFactoryAddress);
      return EscrowFactory;
    }



var createEscrow = async (params) => {

  if (simulated)
    return EscrowInterface('0x0');

  if (escrowFactory == undefined)
    throw('Escrow Factory not defined.');

  const 
  const tx = await escrowFactoryAddress.createEscrow(numRounds, controller, token, w3);



  var tx = await escrowFactory.createEscrow(numRounds, controller, minimetoken.address, {from: account1});
  
  const i = await EscrowFactory

  return 

  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];
    if (log.event == 'releasedFunds') 
      return log['args']['releasedFunds'];
  }
  return;

} 

// ./EscrowFactory.sol
exports.VotingResult = VotingResult;


