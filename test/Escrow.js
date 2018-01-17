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
/*
    it('notifies us an escrow was created', async (done) => {
      const numRounds  = new BigNumber(3);
      const controller = account3;

      // -----------------------------------------
      console.log('----------------------------');
      console.log(escrowFactory['events']);
      console.log('----------------------------');
      var event = escrowFactory.events.EscrowCreation({ filter: {controller: controller}});

      var listener = function(result) {
        assert.equal(result.returnValues.first, expectedValue);
        done();
      }

      event.once('data', listener);
      event.once('error', (err) => done(err));

      const tx = await escrowFactory.createEscrow(numRounds, controller, minimetoken.address)
            .send({from: account1})
            .catch(e => { cleanup(e); });
      // -----------------------------------------
    });
*/
    it('', async () => {
      
    });

  });
});






/*
      // print obj

      var pAll = function(obj, _p) {
        if (obj != undefined && _p != undefined) 
          console.log('obj ' + obj + ' - prop ' + _p + ' -thing ' + obj[_p]);
        else           console.log('obj ' + obj);
        for (var p in obj) pAll(obj[p], p)
      }

      pAll(tx, undefined);

      //const event = events.EscrowCreation(tx);

      console.log('info: ' + event);

      const e = event[0];     // address
      console.log('Addr: ' + e);
      assert.equal(escrow, '0x0');

      const controller = event[1]; // address
      assert.equal(controller, account2);

      const token = event[2];      // address
      assert.equal(token, minimetoken.address);
      */

/*
myContract.once('MyEvent', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event){ console.log(event); });


// event output example
> {
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
*/
