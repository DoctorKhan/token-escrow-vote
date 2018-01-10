require('babel-register');
require('babel-polyfill');

var keys = require('./keys');

var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = keys.infura_apikey;
var mnemonic = keys.mnemonic;

var ropstenProvider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey);
var rinkebyProvider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey);
var kovanProvider   = new HDWalletProvider(mnemonic, "https://kovan.infura.io/" + infura_apikey);
var liveProvider    = new HDWalletProvider(mnemonic, "https://mainnet.infura.io/" + infura_apikey);

const gasPrice = 40 * 1000000000; // gigawei
const gas = 1000000;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      gasPrice: gasPrice, 
      gas: gas,
      provider: liveProvider,
      network_id: 1,
      from: liveProvider.getAddress() 
    },
    ropsten: {
      gasPrice: gasPrice, 
      gas: gas,
      provider: ropstenProvider,
      network_id: 3,
      from: ropstenProvider.getAddress() 
    },
    rinkeby: { 
      gasPrice: gasPrice, 
      gas: gas,
      network_id: 4, 
      provider: rinkebyProvider,
      from: rinkebyProvider.getAddress() 
    },
    kovan: {
      gasPrice: gasPrice, 
      gas: gas,
      provider: kovanProvider,
      network_id: 42,
      from: kovanProvider.getAddress() 
    } 
  }
};
