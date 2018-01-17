var escrow = undefined;
var escrowFactory = undefined;

// =============
// Init function
// =============

var init = async(numRounds, controller, token) => {
  let promise = await new Promise((resolve, reject) => {
    if (simulated) resolve();
    
    // use mock if testrpc
    if (testrpc) {
      var EscrowFactory = artifacts.require('MockEscrowFactory.sol');
      var Escrow = artifacts.require('MockEscrow.sol');
    } else {
      var EscrowFactory = artifacts.require('EscrowFactory.sol');
      var Escrow = artifacts.require('Escrow.sol');
    }

    if (escrowFactory == undefined) {
      escrowFactory = await MetaCoin.deployed();
      // check code safety here. dont want user to accidently deploy factory
      if (ef.address == undefined)
        escrowFactory = await EscrowFactory.new({from: account1});
    }

    var event = escrowFactory.events.EscrowCreation({filter: {controller: account1}});
      
    var listener = async(result) => {
      escrow = await Escrow.at(result.escrow);
      resolve();
    }
      
    event.once('data', listener);
    event.once('error', e => reject(e));
      
    const tx = await escrowFactory.createEscrow(numRounds, controller, token)
            .send({from: account1})
            .catch(e => reject(e));

  return promise;
}

// ==============
// User functions
// ==============

// run this during token sale
var allocVotes = async() => {
  if (simulated) return;
  if (escrow == undefined) throw('Escrow undefined');

  const tx = await escrow.allocVotes(); 

  txFailed = false; // todo check if transaction failed
  if(txFailed) 
    throw('Escrow undefined');
}

// notes
// * string vs bignumber return
// * what if oracle fails b/c gas too small? no refund?
// * set account. default to account1? does metamask provide a hook to change it?
var getRefund = async() => {
  let promise = await new Promise((resolve, reject) => {
    if (simulated) resolve('3.0023427');
    if (escrow == undefined) reject('Escrow undefined');
    
    var event = escrow.events.RefundAmount({filter: {user: account1}});
    
    var refundAmount;
    var listener = function(result) {
      resolve(result.returnValues.refundAmount.toNumber(10));
    }
    
    event.once('data', listener);
    event.once('error', e => reject(e));
    
    const tx = await escrow.refund()
          .send({from: account1})
          .catch(e => reject(e));
    
  return promise;
}

// vote yes or no
var singleVote = async(yes) => {
  if (simulated) return;
  if (escrow == undefined) throw('Escrow undefined');

  const tx = await escrow.singleVote(yes);
}


// =================
// Company functions
// =================

// todo what are param types? string? num? bigNum?
var setRoundWindow = async(roundNum, start, end) => {
  if (simulated) return;
  if (escrow == undefined) throw('Escrow undefined');

  cosnt tx = await escrow.setRoundWindow(roundNum, start, end).send({from: account1})
}

// =================
//       API
// =================

// init
exports.init = init;

// User
exports.getRefund = getRefund;
exports allocVotes = allocVotes;

// Company
exports.singleVote = singleVote;
exports.setRoundWindow = setRoundWindow;
