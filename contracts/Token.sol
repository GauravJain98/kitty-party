// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20, Ownable {
    constructor() ERC20("Gaurav Coin", "GJC") {
        _mint(msg.sender, 200000 ether);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    function tranfer(address add) external onlyOwner {
        this.mint(400 ether);
        this.transfer(add, 200 ether);
    }

    function tranferFrom(address add, uint256 amount) external onlyOwner {
        this.mint(400 ether);
        console.log(amount);
        this.transferFrom(add, address(this), amount);
    }
}
