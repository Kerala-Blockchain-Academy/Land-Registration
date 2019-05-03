# LAND REGISTRY

Land Registry is a simple Dapp based on the ethereum blockchain. It can be used as an alternative to the existing approach. Here the land owner registers the land details along with the land value by providing necessary proofs. Only a registrar or government authority who is registered as the superadmin can do the registration process. Lands coming under a particular area (eg., a village) can register to the system only through the superadmin assigned to that area. The smartcontract has been written in such a way that the owner has to transfer
his full asset to the buyer and no partial transaction of the asset is allowed. Even though the registration process requires a government authority, the entire process is transparent and the transaction happens between the the two clients without any intermediaries.

## Installation Guidlines

1. The first dependency we need is Node Package Manager, or NPM, which comes with Node.js. You can see if you have node already installed by going to your terminal and typing:
```
node -v
```

2. Secondly we need to install Angular 7 by typing the below:
```
npm install @angular/cli
```

3. Next we need to install the node modules:
```
npm install
```
4. The next dependency is the Truffle Framework, which allows us to build decentralized applications on the Ethereum blockchain. It provides a suite of tools that allow us to write smart contacts with the Solidity programming language. It also enables us to test our smart contracts and deploy them to the blockchain. It also gives us a place to develop our client-side application.
You can install True with NPM in your command line like this:
```
npm install -g truffle
```

5. The next dependency is Ganache. You can install it by typing the below in your terminal:
```
npm install -g ganache-cli
```
It will give us 10 external accounts with addresses on our local Ethereum blockchain. Each account is preloaded with 100 test ether.

6. The next dependency is the Metamask extension for browser. In order to use the blockchain, we must connect to it. We'll have to install a special browser extension in order to use the Ethereum block chain. That's where metamask comes in. We'll be able to connect to our local Ethereum blockchain with our personal account, and interact with our smart contract.

7. Now that we have our dependencies installed, let's start running our dApp!

8. First, run the ganache by typing \ganache-cli" in your terminal.

9. Now let's compile and run our migrations from the command line like this:
```
truffle compile
truffle migrate
```

10. Copy the contract address to "web3.service.ts".

11. Open the terminal the Dapp folder and run it by typing "ng serve". Open the browser and the dapp will be running in http://localhost:4200 by default.

