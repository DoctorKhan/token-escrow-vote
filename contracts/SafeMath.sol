pragma solidity ^0.4.8;

contract Utils {
  function assert(bool condition) internal {
    if (!condition) throw;
  }

  function throwIf(bool condition) internal {
    if (condition) throw;
  }

}

// Got safemath from here: https://github.com/etheropt/etheropt.github.io/blob/master/smart_contract/etheropt.sol
// Made modification
// Saw no license
contract SafeMath is Utils {
  //internals

  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function safeDiv(uint a, uint b) internal returns (uint) {
    uint c = a / b;
    assert(safeMul(c,b) == a);
    return c;
  }

  function safeMuli(int a, int b) internal returns (int) {
    int c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSubi(int a, int b) internal returns (int) {
    int negB = safeNegi(b);
    int c = a + negB;
    if (b<0 && c<=a) throw;
    if (a>0 && b<0 && c<=0) throw;
    if (a<0 && b>0 && c>=0) throw;
    return c;
  }

  function safeAddi(int a, int b) internal returns (int) {
    int c = a + b;
    if (a>0 && b>0 && c<=0) throw;
    if (a<0 && b<0 && c>=0) throw;
    return c;
  }

  function safeNegi(int a) internal returns (int) {
    int c = -a;
    if (a<0 && -a<=0) throw;
    return c;
  }

  function safeIntToUint(int a) internal returns(uint) {
    uint c = uint(a);
    assert(a>=0);
    return c;
  }

  function safeUintToInt(uint a) internal returns(int) {
    int c = int(a);
    assert(c>=0);
    return c;
  }

  function safeMax(uint a, uint b) returns (uint) {
    if (a > b) return a;
    else       return b;
  }

  function safeMin(uint a, uint b) returns (uint) {
    if (a < b) return a;
    else       return b;
  }
}
