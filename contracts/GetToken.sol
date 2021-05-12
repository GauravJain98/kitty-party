//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "hardhat/console.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {GLDToken} from "./Token.sol";

contract Airdrop is Ownable {
    address public token;
    uint256 private expiry;
    uint256 private current;
    uint256 private amount;

    constructor(address add) {
        token = add;
        amount = 0;
        // current = 0;
        expiry = block.number + 2;
    }

    function gamble(address add, uint256 a) external {
        if (expiry <= current) {
            GLDToken(token).transfer(
                add,
                GLDToken(token).balanceOf(address(this))
            );
            current = 0;
        } else {
            GLDToken(token).transferFrom(add, address(this), a);
        }
        current++;
    }

    function balance(address to, address user) external view returns (uint256) {
        return IERC20(to).balanceOf(user);
    }
}
