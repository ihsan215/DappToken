pragma solidity ^0.4.2;

import "./DappToken.sol";

contract DappTokenSale{

    address public admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    uint256 public deneme;

    event Sell(address _buyer, uint256 _amount);

    constructor(DappToken _tokenContract,uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;

    }  

    function mulitply(uint256 x, uint256 y) internal pure returns(uint256 z){
        require(y == 0 || (z=x*y) / y == x);
    }

    // Buy Tokens
    function buyTokens(uint256 _numberOfTokens) public payable {    

        require(msg.value == mulitply(_numberOfTokens , tokenPrice));
        require(tokenContract.balanceOf(address(this)) >=_numberOfTokens );
        require(tokenContract.transfer(msg.sender,_numberOfTokens));
        
        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);

    }


    // Ending token sale
    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        selfdestruct(address(this));
    }




}