const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale");
const TokenPrice = 1000000000000000;

contract("DappTokenSale", async function (accounts) {
  describe("DappTokenSale Contract Test", () => {
    let TokenInstance;
    let ContractInstance;
    const admin = accounts[0];
    const tokensAvailable = 7500;

    before(async function () {
      TokenInstance = await DappToken.deployed();
      ContractInstance = await DappTokenSale.deployed();

      await TokenInstance.transfer(ContractInstance.address, tokensAvailable, {
        from: admin,
      });
    });

    it("Check contract deployed", async () => {
      const address = await ContractInstance.address;
      const tokenAdr = await ContractInstance.tokenContract();

      const tokenPrice = await ContractInstance.tokenPrice();

      assert.notEqual(address, "0x00", "contract has a address");
      assert.notEqual(tokenAdr, "0x00", "contract has a address");
      assert.equal(tokenPrice.toNumber(), TokenPrice, "correct token price");
    });

    it("facilitates token buying", async () => {
      const numberOfTokens = 10;
      const value = numberOfTokens * TokenPrice;
      const buyer = accounts[1];

      const result = await ContractInstance.buyTokens(numberOfTokens, {
        from: buyer,
        value: value,
      });

      const tokenSold = await ContractInstance.tokenSold();
      assert.equal(
        tokenSold.toNumber(),
        numberOfTokens,
        "correct solded token "
      );

      //Check event is emited
      assert.equal(result.logs[0].args._buyer, buyer, "check sender in event");
      assert.equal(
        result.logs[0].args._amount,
        numberOfTokens,
        "check receiver in event"
      );

      try {
        const resultFail = await ContractInstance.buyTokens(numberOfTokens, {
          from: buyer,
          value: 1,
        });
      } catch (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "msg.value must equal number of tokens in wei"
        );
      }
    });

    it("Check provision 75% of all tokens to the token sale", async () => {
      try {
        const resultFail = await ContractInstance.buyTokens(7600, {
          from: accounts[1],
          value: 7600 * TokenPrice,
        });
      } catch (error) {
        assert(error.message.indexOf("revert") >= 0, "too much token sale");
      }
    });

    it("check transfer the token", async () => {
      await ContractInstance.buyTokens(100, {
        from: accounts[2],
        value: 100 * TokenPrice,
      });
      const balance = await TokenInstance.balanceOf(accounts[2]);
      assert.equal(balance.toNumber(), 100, "Check token sale");
    });

    it("check endsaling", async () => {
      // check only admin call
      try {
        await ContractInstance.endSale({
          from: accounts[2],
        });
      } catch (e) {
        assert(e.message.indexOf("revert") >= 0, "only admin call the func");
      }

      await ContractInstance.endSale({
        from: admin,
      });

      const balance = await TokenInstance.balanceOf(admin);
      assert.equal(
        balance.toNumber(),
        999890,
        "rest of balance must equal to admin's token"
      );
    });
  });
});
