// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PatToken} from "src/PatToken.sol";
import {PatGovernor} from "src/PatGovernor.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";
import {PatDAO} from "src/PatDAOMock.sol";

contract PatmockTest is Test {
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

    function testCreateProposal() public {
        address deployer = vm.addr(1);
        vm.startPrank(deployer);
        console.log("Deployer: %s", deployer);

        token.delegate(deployer);

        skip(10);

        address[] memory addrs = new address[](1);
        addrs[0] = address(dao);

        uint256[] memory values = new uint256[](1);
        values[0] = 0;

        bytes memory callData = abi.encodeWithSignature(
            "createCampaign(string,string,string,address,uint256)",
            "Peso",
            "PES",
            "/",
            deployer,
            10000000000000000
        );

        console.logBytes(callData);
        bytes[] memory callDatas = new bytes[](1);
        callDatas[0] = callData;

        governor.propose(addrs, values, callDatas, "Create Peso Token");

        uint256 proposalId = governor.hashProposal(
            addrs,
            values,
            callDatas,
            keccak256("Add Alice as an instructor")
        );
        console.log("Proposal ID: %s", proposalId);
    }


}
