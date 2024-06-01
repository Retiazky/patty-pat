// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

struct Campaign {
    string name;
    string symbol;
    string uri;
    uint256 supply;
    address feeRecipient;
}

event CampaingCreated(string name, string symbol, string uri, uint256 supply, address token, address feeRecipient);

event CampaignRemoved(address token);

event BuybackCreated(address token, uint256 amountIn, uint256 amountOut);

interface IPatDAO {
    function createCampaign(
        string memory name,
        string memory symbol,
        string memory uri,
        address feeRecipient,
        uint256 supply
    ) external;

    function createBuyback(address token, uint256 amountIn, uint256 amountOut) external;
}
