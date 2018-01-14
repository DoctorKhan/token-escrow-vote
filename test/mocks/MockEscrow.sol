pragma solidity ^0.4

contract Escrow {
  uint256 public blockNumber__;
  uint256 public blockTime__;

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
