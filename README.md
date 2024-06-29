# Counter Smart Contract and React Frontend

This repository contains a Solidity smart contract that maintains a counter and a React frontend that interacts with it. The contract provides functionality to increase, decrease, reset the counter, and retrieve the contract's balance. The frontend allows users to connect their MetaMask wallet and perform these actions seamlessly.

## Table of Contents

- [Introduction](#introduction)
- [Contract Details](#contract-details)
  - [Public Variables](#public-variables)
  - [Functions](#functions)
- [React Frontend Details](#react-frontend-details)
  - [State Variables](#state-variables)
  - [Functions in Frontend](#functions-in-frontend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Deployment](#deployment)
  - [Running the Frontend](#running-the-frontend)
- [License](#license)

## Introduction

The `Counter` project includes a Solidity smart contract that allows you to increase, decrease, reset a counter, and retrieve the contract's balance. The React frontend enables interaction with this smart contract, providing a user-friendly interface to connect to MetaMask, view the counter, and execute the functions to modify its value.

## Contract Details

### Functions

- `function increaseCount() public`
  - Increases the counter value by 1.
  - **Events**: Emits the `increased` event with the new count value.
  
- `function decreaseCount() public`
  - Decreases the counter value by 1, but only if it is greater than 0.
  - **Error Handling**:
    - Uses `require` to ensure the count is greater than 0 before decrementing.
  - **Events**: Emits the `decreased` event with the new count value.

- `function resetCount() public`
  - Resets the counter to 0.
  - **Events**: Emits the `reset` event with the new count value.

- `function getBalance() public view returns (uint)`
  - Returns the current balance of the contract in Wei.
  - **Returns**: The contract's balance.

## React Frontend Details

### Functions in Frontend

- `const handleAccount = (accounts) => {...}`
  - Sets the connected Ethereum account or logs an error if no account is found.
  - **Parameters**:
    - `accounts`: An array of Ethereum addresses connected to the wallet.

- `const connectAccount = async () => {...}`
  - Connects to MetaMask and retrieves the user's Ethereum account.
  - **Error Handling**: Alerts the user if MetaMask is not installed.

- `const getCountContract = () => {...}`
  - Initializes and sets the `Counter` contract instance using ethers.js.
  - **Uses**: The contract's ABI and deployed address to create an instance.

- `const getCount = async () => {...}`
  - Fetches the current count value from the smart contract and updates the state.
  - **Error Handling**: Ensures that the contract is available before calling.

- `const increaseCount = async () => {...}`
  - Calls the `increaseCount` function on the smart contract.
  - Waits for the transaction to be mined and then updates the count.

- `const decreaseCount = async () => {...}`
  - Calls the `decreaseCount` function on the smart contract.
  - Handles errors if the count cannot be decreased below 0.
  - Waits for the transaction to be mined and then updates the count.

- `const resetCount = async () => {...}`
  - Calls the `resetCount` function on the smart contract.
  - Waits for the transaction to be mined and then updates the count.

- `const getBalance = async () => {...}`
  - Fetches the contract's balance and displays it to the user.
  - **Conversion**: Converts the balance from Wei to ETH for readability.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) - To run the frontend development server.
- [MetaMask](https://metamask.io/) - To interact with the Ethereum blockchain.
- [Solidity ^0.8.0](https://soliditylang.org/) - To compile the smart contract.
- [Hardhat](https://hardhat.org/) - To manage the Ethereum development environment.

### Deployment

1. **Clone the Repository**:
   - `git clone <repository-url>`
   - Navigate to the project directory: `cd <project-directory>`

2. **Install Dependencies**:
   - For the contract: `npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers`
   - For the frontend: `npm install`

3. **Compile the Contract**:
   - Run the Hardhat compilation task: `npx hardhat compile`

4. **Deploy the Contract**:
   - Deploy the contract to your preferred network (e.g., local Hardhat network or a testnet):
     - Use: `npx hardhat run scripts/deploy.js --network <network-name>`
   - Note the contract address for use in the frontend.

### Running the Frontend

1. **Update Contract Address**:
   - Replace the placeholder contract address in `index.js` with the deployed contract address.

2. **Start the React Application**:
   - Navigate to the frontend directory and run: `npm start`
   - The application will be available at `http://localhost:3000`.

3. **Interact with the Application**:
   - Connect your MetaMask wallet.
   - Use the interface to increase, decrease, reset the counter, and view the contract balance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
Divyansh Sandhu