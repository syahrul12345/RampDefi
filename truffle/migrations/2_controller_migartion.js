const SurveyController = artifacts.require("SurveyController");
const { deployProxy } = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
  await deployProxy(SurveyController, [], {
    deployer,
    initializer: "initialize",
  });
};
