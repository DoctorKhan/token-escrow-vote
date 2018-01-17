var escrow = undefined;

// ==============
// User functions

// run this during token sale
var allocVotes = async() => {
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
      if (escrow == undefined) reject('Escrow undefined');
      if (simulated) resolve('3.0023427');
  
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
var singleVote = async(yes) => {
  if (escrow == undefined) throw('Escrow undefined');
  if (simulated) return;

  const tx = await escrow.singleVote(yes);
}


// =================
// Company functions
// =================

// todo what are param types? string? num? bigNum?
var setRoundWindow = async(roundNum, start, end) => {
  if (escrow == undefined) throw('Escrow undefined');
  if (simulated) return;

  cosnt tx = await escrow.setRoundWindow(roundNum, start, end).send({from: account1})
}

// ===
// API
// ===

// User
exports.getRefund = getRefund;
exports allocVotes = allocVotes;

// Company
exports.singleVote = singleVote;
exports.setRoundWindow = setRoundWindow;
