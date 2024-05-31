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

    function testVoteNewInstructor() public {
        address instructor = vm.addr(1);

        vm.startPrank(instructor);
        console.log("Instructor: %s", instructor);

        uint256 tokenBalance = token.balanceOf(instructor);
        console.log("Token balance: %d", tokenBalance);

        token.delegate(instructor);
        uint256 votes = token.getVotes(instructor);
        console.log("Votes: %d", votes);

        skip(10);

        address[] memory addrs = new address[](1);
        addrs[0] = address(dao);

        uint256[] memory values = new uint256[](1);
        values[0] = 0;

        string memory name = "Alice";
        bytes memory callData = abi.encodeWithSignature("addInstructor(address,string)", instructor, name);
        bytes[] memory callDatas = new bytes[](1);
        callDatas[0] = callData;
        governor.propose(addrs, values, callDatas, "Add Alice as an instructor");

        uint256 proposalId = governor.hashProposal(addrs, values, callDatas, keccak256("Add Alice as an instructor"));
        console.log("Proposal ID: %s", proposalId);
        uint256 proposalDeadline = governor.proposalDeadline(proposalId);
        console.log("Proposal deadline: %s", proposalDeadline);

        skip(1);

        vm.startPrank(instructor);
        governor.castVote(proposalId, 1);

        skip(1);
        vm.warp(1000);

        IGovernor.ProposalState state = governor.state(proposalId);
        console.log("Proposal state: %s", uint256(state));
        // governor.castVote(proposalId, 1);

        governor.execute(addrs, values, callDatas, keccak256("Add Alice as an instructor"));

        PatDAO.Instructor memory instructorData;
        (instructorData.instructor, instructorData.status, instructorData.name) = dao.instructors(instructor);

        assertEq(instructorData.name, "Alice");
    }
}

// DAO
