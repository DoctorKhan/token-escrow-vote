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
  var controller = account1;
  var escrowFactory;

  describe('works with minime token', async () => {
    var minimetoken;

    beforeEach(async () => {
      escrowFactory = await EscrowFactory.new({from: account1});
      const mmtf = await MiniMeTokenFactory.new({from: account1});

      var numRounds  = new BigNumber(3);
      minimetoken = await MainToken.new(mmtf.address, {from: account1});

      //todo fix this
      var tx = await escrowFactory.createEscrow(numRounds, controller, minimetoken.address, {from: account1});
    });

    it('notifies us an escrow was created', async () => {
      var numRounds  = new BigNumber(3);
      const tx = await escrowFactory.createEscrow(numRounds, account2, minimetoken.address, {from: account1});
  
      // print obj

      var pAll = function(obj, _p) {
        if (obj != undefined && _p != undefined) 
          console.log('obj ' + obj + ' - prop ' + _p + ' -thing ' + obj[_p]);
        else           console.log('obj ' + obj);
        for (var p in obj) pAll(obj[p], p)
      }

      pAll(tx, undefined);

      //const event = events.EscrowCreation(tx);
/*
      console.log('info: ' + event);

      const e = event[0];     // address
      console.log('Addr: ' + e);
      assert.equal(escrow, '0x0');

      const controller = event[1]; // address
      assert.equal(controller, account2);

      const token = event[2];      // address
      assert.equal(token, minimetoken.address);
      */
    });
  });
});
