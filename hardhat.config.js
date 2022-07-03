require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.12",
  networks: {
    matic: {
      url: "https://rpc-mumbai.maticvigil.com/v1/",
      accounts: ["WALLET_PRIVATE_KEY"]
    }
  }
  
};
