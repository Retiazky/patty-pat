// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {MemeToken} from "src/MemeToken.sol";

contract MemeTokenTest is Test {
    MemeToken public token;

    function setUp() public {
        address initialOwner = vm.addr(1);
        console.log("Initial owner: %s", initialOwner);
        token = new MemeToken(initialOwner, "CatWithCoco", "CWC", "/");
    }

    function testSupply() public {
        assertEq(
            token.totalSupply(),
            1e18 * 10 ** token.decimals()
        );
    }
}

// DAO
