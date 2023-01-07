require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GANACHE_RPC_URL = "HTTP://127.0.0.1:7545";
const GANACHE_PRIVATE_KEY = "113b3aa5a520a4fb8dfa819c0aa04d728a2ecf51d29440534677f54df7879271";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: GANACHE_RPC_URL,
      accounts: [
        GANACHE_PRIVATE_KEY
      ],
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
  },
};