const EscrowFactory;
const Escrow;

var escrow = undefined;

class EscrowFac {

}

class EscrowCon {

  constructor(address) {
    this.address = address;
  }
  
// ==============
// User functions
// run this during token sale
var allocVotes = async() => {
  if (escrow == undefined)
    throw('Escrow undefined');
  const tx = await escrow.allocVotes(); 

  txFailed = true; // TODO: check if transaction failed
  if(txFailed) 
    throw('Escrow undefined');
}

// notes
// * string vs bignumber return
// * what if oracle fails b/c gas too small? no refund?
// * set account. default to account1? does metamask provide a hook to change it?
var getRefund = async() => {
    let promise = await new Promise((resolve, reject) => {
      if (simulated) {
        resolve('3.0023427');
        return;
      }
  
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
      
    })
        .catch(err => {throw err});
  
  return promise;
}

// vote yes or no
exports.singleVote = async(yes) => {
  if (simulated) return;

  const tx = await escrow.singleVote(yes);
}


// =================
// Company functions

var setRound = async(begin, end) => {
  // begin timestamp
}

}

// exports.VotingResult = VotingResult;


/*

var vote = async() => {
  const votesPassed = new BigNumber(5);

  if (simulated) return votesPassed;

  votesPassed = EscrowContract.votes();
  return votesPassed;
}
*/
