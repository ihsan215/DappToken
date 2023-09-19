const DappToken = artifacts.require("DappToken");

contract("DappToken", function (accounts) {
  it("sets the total supply upon deployment", async function () {
    const DappTokenContract = await DappToken.deployed();
    const totalSupply = await DappTokenContract.totalSupply();
    assert.equal(
      totalSupply.toNumber(),
      1000000,
      "sets the total supply to 1,000,000"
    );
  });
});
