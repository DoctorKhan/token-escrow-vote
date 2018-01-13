var SafeMath = artifacts.require('SafeMath.sol');
var SimpleStorage = artifacts.require('EscrowFactory.sol');

module.exports = function(deployer, network, accounts) {
  return deployer.deploy(SafeMath).then(async () => {

    await deployer.deploy(EscrowFactory);

  });
}
