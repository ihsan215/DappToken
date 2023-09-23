const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale");
const TokenPrice = 1000000000000000;

module.exports = async function (deployer) {
  await deployer.deploy(DappToken, 1000000);
  const DappTokenInstance = await DappToken.deployed();
  const DapptokenAdr = await DappTokenInstance.address;

  await deployer.deploy(DappTokenSale, DapptokenAdr, TokenPrice);

  const saleIntance = await DappTokenSale.deployed();
  const adr = await saleIntance.address;
};
