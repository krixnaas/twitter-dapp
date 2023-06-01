const TwitterDapp = artifacts.require("TwitterDapp");

module.exports = function (deployer) {
  deployer.deploy(TwitterDapp);
};
