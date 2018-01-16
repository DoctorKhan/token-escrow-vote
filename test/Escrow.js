var events = require('./../app/javascripts/events');
// var util = require('./../app/javascripts/util');

var EscrowFactory = artifacts.require('MockEscrowFactory.sol');
var Escrow = artifacts.require('MockEscrow.sol');
var MainToken = artifacts.require('MockMainToken.sol');
var MiniMeTokenFactory = artifacts.require('MockMiniMeTokenFactory.sol');

var chai = require('chai')
const assert = require("chai").use(require("chai-as-promised")).assert;
const BigNumber = web3.BigNumber;

//************************************************
// Tests
contract('Escrow', function (accounts) {

  const account1 = accounts[0];
  const account2 = accounts[1];
  const account3 = accounts[2];
  const walletAddress = accounts[3];
  const oracleCBAddress = accounts[4];

  var escrow;
  var escrowFactory;

  describe('works with minime token', async () => {
    var minimetoken;

    beforeEach(async () => {
      escrowfactory = await EscrowFactory.new({from: account1});
      const mmtf = await MiniMeTokenFactory.new({from: account1});

      var numRounds  = new BigNumber(3);
      var controller = account1;
      minimetoken = MainTokken.new(mmtf.address, {from: account1});

      //todo fix this
      escrow = await escrowFactory.createEscrow(numRounds, controller, minimetoken.address, {from: account1});

    });

    it('notifies us an escrow was created', async () => {
      escrow = await escrowFactory.createEscrow(numRounds, account2, minimetoken.address, {from: account1});
      var tx = undefined;
      const x = events.EscrowCreation(tx);

      const escrow = x[0];     // address
      assert.equal(escrow, '0x0');

      const controller = x[1]; // address
      assert.equal(controller, account2);

      const token = x[2];      // address
      assert.equal(token, minimetoken.address);
    });
  });
});
