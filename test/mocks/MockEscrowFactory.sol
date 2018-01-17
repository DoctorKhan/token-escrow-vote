pragma solidity ^0.4.15;

import './MockEscrow.sol';
import '../../contracts/EscrowFactory.sol';

contract MockEscrowFactory is EscrowFactory {
  function createEscrow(uint _numRounds, address _controller, address _token) {
    MockEscrow escrow = new MockEscrow(_numRounds, _controller, _token);
    EscrowCreation(_controller, address(escrow));
  }
}
