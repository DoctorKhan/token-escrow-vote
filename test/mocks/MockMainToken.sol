pragma solidity ^0.4.15;


import "../../../MiniPre/contracts/MiniMeToken.sol";

contract MockMainToken is MiniMeToken {
 function MockMainToken(address _tokenFactory)
    MiniMeToken(
      _tokenFactory,
      0x0,                      // no parent token
      0,                        // no snapshot block number from parent
      "doGood",                 // Token name
      18,                       // Decimals
      "GOOD",                   // Symbol
      true                      // Enable transfers
    ) {}

    function() payable {
      require(false);
    }
}
