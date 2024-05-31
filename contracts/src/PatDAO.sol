// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPatDAO, Campaign, CampaingCreated, BuybackCreated} from "./interfaces/IPatDAO.sol";

contract PatDAO is IPatDAO {
    address public governanceSC;
    mapping(address => Campaign) public campaigns;

    error CampaignAlreadyCreated(address who, address token);

    constructor(address GovernanceSC) {
        governanceSC = GovernanceSC;
    }

    modifier onlyGovernance() {
        require(msg.sender == governanceSC, "PatDAO: Only Governance can call this function");
        _;
    }

    // modifier onlyTokenCreator() {
    //     require(campaigns[msg.sender].status == true, "PatDAO: Only Instructors can call this function");
    //     _;
    // }

    function createCampaign(
        string memory name,
        string memory symbol,
        string memory uri,
        uint256 supply
    ) public onlyGovernance {
        // TODO: Implement
        address token = address(0);
        emit CampaingCreated(name, symbol, uri, supply, token);
    }

    function createBuyback(address token, uint256 amountIn, uint256 amountOut) public onlyGovernance {
        // TODO: Implement
        emit BuybackCreated(token, amountIn, amountOut);
    }
}
