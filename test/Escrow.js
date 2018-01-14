// var events = require('./../app/javascripts/events');
// var util = require('./../app/javascripts/util');

var EscrowFactory = artifacts.require('EscrowFactory.sol');
var Escrow = artifacts.require('Escrow.sol');

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
    beforeEach(async () => {
      escrowfactory = await EscrowFactory.new({from: account1});
      
      var numRounds  = new BigNumber(3);
      var controller = account1;
      var token = ;
      escrow = await escrowFactory.createEscrow(numRounds, controller, token, {from: account1});
    });

    it('fails on fallback', async () => {
      
    });
  });
});
