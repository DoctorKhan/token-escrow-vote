import React from 'react';

// Import libraries we need.
var axios = require('axios');
var sha3 = require('solidity-sha3');
var Web3 = require('web3');
var contract = require('truffle-contract');

// Import our contract artifacts and turn them into usable abstractions.
var events = require('./../events.js');  // This is our code

import escrowFactory_artifacts from './../../../build/contracts/EscrowFactory.json';
var EscrowFactory = contract(escrowFactory_artifacts);
import escrow_artifacts from './../../../build/contracts/Escrow.json';
var Escrow = contract(escrow_artifacts);

export default class Layout extends React.Component {

  //==============
  // Boiler Plate:
  //==============

  constructor () {
    super();

    this.state = { account1: '0x0'
                 , txResult: 'n/a'
                 , status: 'Starting..'
                 };

    this.escrowFactory = undefined;
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
    await EscrowFactory.setProvider(web3.currentProvider);
    await Escrow.setProvider(web3.currentProvider);
    this.escrowFactory = await EscrowFactory.deployed();

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

// make this async?
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

  
  //==============
  // Company code:
  //==============
  createEscrow = (e) => {
    e.preventDefault();
    this.updateStatus('Creating escrow...');

    const numRounds = new BigNumber(3);

    this.escrowFactory.createEscrow(numRounds, '0x123', '0x456').then(async tx => {
      this.updateStatus('Made new escrow, see console for details');
      const escrowInfo = events.EscrowCreation(result);
      const s = 'escrow: ' + escrowInfo[0] + ' controller: ' + escrowInfo[1] + ' token: ' + escrowInfo[2];
      console.log(s);
      this.showTxResult(tx);
    }).catch(e => {
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
  </table>
  
  <br/><br/>
  <button className='CreateEscrow' 
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  
          onClick = {this.createEscrow} >Create Escrow</button>
</div>
    );
  }
}                                                                     
