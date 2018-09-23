var Auction = artifacts.require("./Auction.sol");

module.exports = function(deployer) {
  deployer.deploy(Auction,4,19,100000);
};
