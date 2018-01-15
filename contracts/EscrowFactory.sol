pragma solidity ^0.4.15;

import './Escrow.sol';

contract EscrowFactory {
  event EscrowCreation(address indexed escrow, address indexed controller, address indexed token);
  
  function EscrowFactory() { }

  function createEscrow(uint _numRounds, address _controller, address _token) {
    // need to fix this escrow creation params ^
    Escrow escrow = new Escrow(_numRounds, _controller, _token);
    EscrowCreation(address(escrow), _controller, _token);
  }
}
