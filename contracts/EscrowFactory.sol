pragma solidity ^0.4.15;

import './Escrow.sol';

contract EscrowFactory {
  event EscrowCreation(address indexed controller, address escrow);
  
  function EscrowFactory() { }

  // if change createEscrow, be sure to change in /mocks/MockEscrowFactory.sol too
  function createEscrow(uint _numRounds, address _controller, address _token) {
    // need to fix this escrow creation params ^
    Escrow escrow = new Escrow(_numRounds, _controller, _token);
    EscrowCreation(_controller, address(escrow));
  }
}
