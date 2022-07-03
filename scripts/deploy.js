
const hre = require("hardhat");

async function main() {


  const AA = await hre.ethers.getContractFactory("AdvertisementAuction");
  const aa= await AA.deploy("https://cms.finnair.com/resource/blob/2573874/a14e037941fbe6646a68cd56a8fea9d0/mumbai-main-data.jpg", "Advertisement Auction");

  await aa.deployed();

  console.log("Advertisement Auction contract deployed to:", aa.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
