pragma solidity ^0.4

contract Escrow {

  function Escrow() {
     
  }

  function vote(bool votedYes) public {
    if (votedYes) numYes++;
    else numNo++;
    numTotal++;
      }

  function refund() public {
    
  }
  
}
