pragma solidity ^0.4

import './Escrow.sol'


contract EscrowFactory {
  event EscrowCreation(address indexed escrow, address indexed controller, address indexed token);
  
  function EscrowFactory() { ; }

  function createEscrow(uint _numRounds, address _controller, address _token) {
    // need to fix this escrow creation params ^
    Escrow escrow = new Escrow(_numRounds);
    EscrowCreation(address(escrow), _controller, _token);
  }
}
