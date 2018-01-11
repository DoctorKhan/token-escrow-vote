pragma solidity ^0.4
/* 1. should release funds to company when yes vote complete
   2. should retain funds when no vote
   3. should refund if 
      a. tokens passed and b. no vote and c. company agrees.
 */

contract Escrow {
  uint public numVotes; //this can be a functions.. yesVotes+noVotes
  uint public yesVotes;
  uint public noVotes;
  uint public roundNum;
  uint public numRounds;

  // threshold approval
  uint public threshNum;
  uint public threshDen;
  uint public minVotes;
    
  mapping (uint => bool) public roundOpen;
  
  function Escrow(uint _numRounds) {
    numRounds = _numRounds;
  }

  function singleVote(bool votedYes) public {
    if (votedYes) yesVotes++;
    else noVotes++;
    numVotes++;
   }
  
  // open voting round
  function openVote(uint round) public {
  }

  // close voting round
  function closeVote() public {
    if (thresholdReached()) releaseFunds();
    else failRound(roundNum);
  }

  function thresholdReached() public returns (bool) {
    if (numVotes > minVotes && yesVotes*threshDen > threshNum) return true;
    else return false;
  }

  function failRound() public {
    
  }
  
  // releases funds to company
  function releaseFunds() internal {
    // company.send(funds2be..)
    if (!msg.send(company, funds2beReleased[roundNum])) throw;
    // require so it doesn't eat gas
  }

  function refund() public {
    
  }
  
}
