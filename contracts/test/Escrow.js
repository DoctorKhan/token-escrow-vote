// var events = require('./../app/javascripts/events');
// var util = require('./../app/javascripts/util');

var Escrow = artifacts.require('MockEscrow.sol');

var chai = require('chai')
const assert = require("chai").use(require("chai-as-promised")).assert;
const BigNumber = web3.BigNumber;

//************************************************
// Tests
contract('GOODController', function (accounts) {

  const account1 = accounts[0];
  const account2 = accounts[1];
  const account3 = accounts[2];
  const walletAddress = accounts[3];

  var escrow;

  describe('test 1', async () => {
    beforeEach(async () => {
      escrow = await Escrow.new({from: account1});
    });

    it('refunds', async () => {
      await escrow.refund();
    });
  });
});
