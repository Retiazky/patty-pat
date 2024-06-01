// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PatToken} from "src/PatToken.sol";
import {PatGovernor} from "src/PatGovernor.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";
import {PatDAO} from "src/PatDAO.sol";

contract PatTest is Test {
    PatToken public token;
    PatGovernor public governor;
    PatDAO public dao;

    function setUp() public {
        address initialOwner = vm.addr(1);
        console.log("Initial owner: %s", initialOwner);
        token = new PatToken(initialOwner);
        governor = new PatGovernor(token);
        dao = new PatDAO(address(governor));
    }
}

// DAO
