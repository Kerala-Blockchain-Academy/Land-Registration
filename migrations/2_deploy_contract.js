var landRegistration = artifacts.require("./landRegistration.sol");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
deployer.deploy(landRegistration);

};
