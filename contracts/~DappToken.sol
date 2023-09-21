// SPDX-License-Identifier: MIT
pragma solidity ^0.4.2;


contract DappToken{

    // Variables
    string public name = "Dapp Token";
    string public symbol = "DAPTKN";
    string public standard = "Dapp Token v0.1";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Constructor
    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = totalSupply;
    }

    // Functions
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender,_to,_value);

        return true;
    }

    
    
    function approve(address _spender, uint256 _value) public returns(bool succes) {
        
        allowance[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender,_spender,_value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
         
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender]-= _value;



        emit Transfer(_from, _to,_value);

        return true;

    }


}