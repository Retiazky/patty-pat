# Sample Foundry Project

This project demonstrates a basic Foundry use case. It comes with a contract generated by [OpenZeppelin Wizard](https://wizard.openzeppelin.com/), a test for that contract, and a script that deploys that contract.

## Installing Foundry

See [Foundry installation guide](https://book.getfoundry.sh/getting-started/installation).

## Initializing the project

```
bash setup.sh
```

## Testing the contract

```
forge test --evm-version cancun
```

## Deploying the contract

```
forge build --evm-version cancun
```

You can simulate a deployment by running the script:

```
forge script script/Pat.s.sol
```

See [Solidity scripting guide](https://book.getfoundry.sh/tutorials/solidity-scripting) for more information.
