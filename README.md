

# Warming up the project
```shell
npm init -y
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat
```

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```



# Known Bugs
Solution for Bug Error HH1: You are not inside a Hardhat project. This is due to Bash on windows not booting the hardhat project creation. The initial setup must be on windos terminal CMD.
```shell
npm init -y
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat
```


Solution for Bug error:03000086: Node17 digital envelope routines::unsupported
```shell
export NODE_OPTIONS=--openssl-legacy-provider
```


Solution for Bug HH108: Cannot connect to the network localhost.
```shell
npx hardhat node --hostname 127.0.0.1
```