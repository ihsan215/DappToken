const DappToken = artifacts.require("DappToken");
const TOKEN_STANDART = "Dapp Token v0.1";

contract("DappToken", async function (accounts) {
  describe("DappToken Test", function () {
    let DappTokenContract;
    before(async function () {
      DappTokenContract = await DappToken.deployed();
    });

    it("check token standart", async () => {
      const tokenStandard = await DappTokenContract.standard();
      assert.equal(tokenStandard, TOKEN_STANDART, "correct standart");
    });

    it("sets the total supply upon deployment", async function () {
      const totalSupply = await DappTokenContract.totalSupply();
      assert.equal(
        totalSupply.toNumber(),
        1000000,
        "sets the total supply to 1,000,000"
      );
    });

    it("check admin balance", async () => {
      const adminBalance = await DappTokenContract.balanceOf(accounts[0]);
      assert.equal(adminBalance.toNumber(), 1000000, "check admin balance");
    });

    it("check name and symbol", async () => {
      const name = await DappTokenContract.name();
      const symbol = await DappTokenContract.symbol();
      assert.equal(name, "Dapp Token", "correct name");
      assert.equal(symbol, "DAPTKN", "correct symbol");
    });
  });
});
