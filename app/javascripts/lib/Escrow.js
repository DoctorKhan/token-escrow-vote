var EscrowFactory = undefined;
var Escrow = undefined;

var escrow = undefined;
var escrowFactory = undefined;

var EscrowFactory = undefined;
var Escrow = undefined;

// =============
// Init function
// =============


simulated = true;
failPercentage = 0.1;
function getDeployedEscrow() {
  return testrpc ? MockEscrow.Deployed()
                 : Escrow.Deployed();
}

// 
// return escrow id, 24 bytes
function createEscrow(numRounds, token, arbitor, company, payoutAddr, minVotes) {
  if (simulated) {
    if (Math.random() < failPercentage) throw('Escrow not created!');
    if (Math.random() < failPercentage) throw('Tx failed!');
    return '0xae67984724872020842709842faee8a89a99Ae5d';

  }
  console.log('Created escrow: ' 
              + numRounds + ' ' + token + ' ' + arbitor + ' ' + company + ' ' + payoutAddr);    
  escrow = await getDeployedEscrow();
  escrow.createEscrow(numRounds, token, arbitor, company, payoutAddr);
}

//user
function allocVotes(id) {
  if (simulated && Math.random() < failPercentage) throw('Tx failed!');
  // consider explaining failure. e.g. bad id, user has no tokens, etc
}
function userRefund(id) {
    if (simulated && Math.random() < failPercentage) throw('Tx failed!');
}
function singleVote(voteYesTrue) {
    if (simulated && Math.random() < failPercentage) throw('Tx failed!');
}


// maybe add
function getEscrowInfo();
/*

var constructor = async (numRounds, controller, token) => {
  
    let promise = new Promise(async (resolve, reject) => {
      if (simulated) resolve();
      
      // use mock if testrpc
      // check code safety here. dont want user to accidently deploy factory
      if (testrpc) {
        EscrowFactory = artifacts.require('MockEscrowFactory.sol');
        Escrow = artifacts.require('MockEscrow.sol');
        escrowFactory = EscrowFactory.new({from: account1});
      } else {
        EscrowFactory = artifacts.require('EscrowFactory.sol');
        Escrow = artifacts.require('Escrow.sol');
        escrowFactory = EscrowFactory.deployed();
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
    });
    
    return promise;
    */
  }
/*
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
  });
    
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
  var setRound = async(begin, end) => {
  // begin timestamp
}
  const tx = await escrow.setRoundWindow(roundNum, start, end).send({from: account1})
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


// */

//module.export.EscrowCon;
