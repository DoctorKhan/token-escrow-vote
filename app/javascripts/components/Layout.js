import React from 'react';

// Import libraries we need.
var axios = require('axios');
var sha3 = require('solidity-sha3');
var Web3 = require('web3');
var contract = require('truffle-contract');

// Import our contract artifacts and turn them into usable abstractions.
var events = require('./../events.js');  // This is our code

import simpleStorage_artifacts from './../../../build/contracts/SimpleStorage.json';
var SimpleStorage = contract(simpleStorage_artifacts);
// var SimpleStorage = contract('contracts/SimpleStorage.sol');

export default class Layout extends React.Component {

  //==============
  // Boiler Plate:
  //==============

  constructor () {
    super();

    this.state = { account1: '0x0'
                 , storedData: 'n/a'
                 , txResult: 'n/a'
                 , status: 'Starting..'
                 };

    this.simpleStorage = undefined;
    this.updateStatus = this.updateStatus.bind(this);
  }

  async componentDidMount() {
    // Web3 stuff
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source.");
      // Use Mist/MetaMask's provider
      web3 = await new Web3(web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      web3 = await new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // Bootstrap the Contract abstractions for Use.
    await SimpleStorage.setProvider(web3.currentProvider);
    await SimpleStorage.deployed().then((instance) => { this.simpleStorage = instance; }).catch(e => {this.updateStatus('Error! See console'); console.log(e);});

    // Load accounts
    await web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        this.updateStatus("There was an error fetching your accounts. See logs for details.");
        console.log(err);
      }
      else if (accs.length == 0) 
        this.updateStatus("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      else {
        this.setState({
          account1: accs[0]
        });
      }
    });
  }

  updateStatus = (s) => {
    this.setState({
      status: s
    });    
  }

  updateStoredData = (v) => {
    this.setState({
      storedData: v
    });    
  }


  showTxResult = (tx) => {
    var costUsd, ethUsd, s, gasUsed, gasPrice, url, this___;
    this___ = this;
    
    url = 'https://coinmarketcap-nexuist.rhcloud.com/api/eth';
    
    axios.get(url).then((result) => {
      gasUsed = tx['receipt']['gasUsed'];
      ethUsd = Web3.prototype.toBigNumber(result['data']['price']['usd']);

      // Get gas price
      web3.eth.getGasPrice(function(e, gasPrice) {
        costUsd = gasPrice * gasUsed * ethUsd / Web3.prototype.toBigNumber('1000000000000000000');
        costUsd = costUsd.toString(10);
      
        s = 'Gas used- ' + gasUsed + '; '
          + 'Transaction ID- ' + tx['tx'] + '; '
          + 'Price USD- $' + costUsd;

        console.log(s);
        this___.setState({
          txResult: s
        });    
      });
    });
  }

  
  //================
  // User functions:
  //================

  getStoredData = (e) => {
    e.preventDefault();

    this.updateStatus('Getting stored data...');
    this.simpleStorage.get().then(val => {
      this.updateStoredData(val.toString(10));
      this.updateStatus('Completed retrieved data.');
    }).catch((e) => {
      this.updateStatus('Error! See console for details!');
      console.log(e);      
    });
  }


  setStoredData = (e) => {
    e.preventDefault();

    this.updateStatus('Setting stored data...');
    const val = Web3.prototype.toBigNumber(this.storedDataInput.value);
    this.simpleStorage.set(val, {from: this.state.account1}).then(tx => {
      this.updateStatus('Completed setting stored data. Click to update.');
      this.showTxResult(tx);
    }).catch((e) => {
      this.updateStatus('Error! See console for details!');
      console.log(e);      
    });
  }

  //===========
  // Page code:
  //===========

  render() {

    return (
<div>
  <p>
    App
  </p>

  <table>
    <tr>Account 1: {this.state.account1}</tr>
    <tr>Status: {this.state.status}</tr>
    <tr>Transaction Result: {this.state.txResult}</tr>
    <tr>Store Value: {this.state.storedData}</tr>
  </table>
  
  <br/><br/>
  <button className='GetStoredData' 
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  
          onClick = {this.getStoredData} >Get Stored Data</button>
  
  
  <br/><br/>
  <label>Value To Store</label><br/>
  <input id='storedData' className='StoredData' type='text' ref={(i) => { if(i) { this.storedDataInput = i; }}} />
    <br/>
    <button className='SetStoredData' 
            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  
            onClick = {this.setStoredData} >Set Stored Data</button>

</div>
    );
  }
}                                                                     
