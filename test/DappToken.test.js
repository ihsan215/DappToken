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

    it("check balance control in transfer function", async () => {
      try {
        await DappTokenContract.transfer(accounts[1], 99999999999, {
          from: accounts[0],
        });
      } catch (e) {
        assert(
          e.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      }
    });

    it("check token transfer and event", async () => {
      const result = await DappTokenContract.transfer(accounts[1], 100, {
        from: accounts[0],
      });

      // Check balance
      const accountBalance = await DappTokenContract.balanceOf(accounts[1]);
      assert.equal(accountBalance.toNumber(), 100, "check transfered balance");

      //Check event is emited
      assert.equal(
        result.logs[0].args._from,
        accounts[0],
        "check sender in event"
      );
      assert.equal(
        result.logs[0].args._to,
        accounts[1],
        "check receiver in event"
      );

      assert.equal(
        result.logs[0].args._value.toNumber(),
        100,
        "check value in event"
      );
    });
  });
});
