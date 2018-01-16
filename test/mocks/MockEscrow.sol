pragma solidity ^0.4.15;

import '../../contracts/Escrow.sol';

contract MockEscrow is Escrow {
  uint256 public blockNumber__;
  uint256 public blockTime__;

  
  function MockEscrow (uint _numRounds, address _controller, address _token)
    Escrow(_numRounds, _controller, _token)
  {}


  function getBlockNumber() internal constant returns (uint256) {
    return blockNumber__;
  }

  function setBlockNumber(uint256 _blockNumber) public {
    blockNumber__ = _blockNumber;
  }

  function getBlockTime() internal constant returns (uint256) {
    return blockTime__;
  }

  function setBlockTime(uint256 _blockTime) public {
    blockTime__ = _blockTime;
  }
  
}
