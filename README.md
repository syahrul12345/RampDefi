# Ramp DEFI Assignment

## Building

Make sure to have `docker` and `docker-compose` installed on your machine.Simply run: 

```make serve```

This command will compile the contracts, and build the frontend for you.

## Testing
All tests live in the `test` folder. There are only unit tests to check the logic of the `SurveyController` contract. To run the test run:

```make test```



## Contract Logic

Contracts exist in the contracts folder. We use openzepplin's upgradable proxy pattern.
Contract logic lives in `SurveyController.sol`. This is the smart contract logic which stores the survey information.