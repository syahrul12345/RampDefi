# Ramp DEFI Assignment

## Only works in kovan. Please get some kovan ETH.

## Building full stack application

Make sure to have `docker` and `docker-compose` installed on your machine.Simply run:

`make serve`

This command will build the frontend for you.

## Building only contracts

Before we can migrate our contracts, first open the `truffle/secrets.sample.js` file.
Add all required environment variables such as your node API, and deployer private key. Ensure that your deployer private key has been loaded as well. The etherscan API key is optional.

```
const privateKey = "YOUR_PRIVATE_KEY";
const mainnetRPC = "https://mainnet.infura.io/v3/PROJECT_ID";
const kovanRPC = "https://kovan.infura.io/v3/PROJECT_ID";
const etherscanAPI = "ETHERSCAN_API";

module.exports = {
  privateKey,
  mainnetRPC,
  kovanRPC,
  etherscanAPI,
};
```

Rename this file to `secrets.js`

```
mv secrets.sample.js secrets.js
```

To deploy the contracts, we will first have to install all required dependencies such as open zeppelin peripheral contracts.

```
yarn
truffle migrate --network kovan
```

## Testing

All tests live in the `test` folder. There are only unit tests to check the logic of the `SurveyController` contract. To run the test run:

`make test`

## Contract Logic

We use openzeppelin's proxy pattern. The contract addresses are hardcoded:

```
proxyAddress: "0x4FAf5bF0B5Ec89e2f08B35664693852BBC9A2AD0",
implementationAddress": "0xa76aeb216E9Dea9B8ceb8B2d601959ae671dB3A2"
```

If you would like to deploy the contracts only please go to the `building only contracts` section.

Contracts exist in the contracts folder. We use openzepplin's upgradable proxy pattern.
Contract logic lives in `SurveyController.sol`. This is the smart contract logic which stores the survey information.
