// SPDX-License-Identifier: MIT
pragma solidity ^0.4.2;


contract DappToken{

    string public name = "Dapp Token";
    string public symbol = "DAPTKN";
    string public standard = "Dapp Token v0.1";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = totalSupply;
    }

    



}