// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

struct Campaign {
    string name;
    string symbol;
    string uri;
    uint256 supply;
}

event CampaingCreated(
    string name,
    string symbol,
    string uri,
    uint256 supply
);

event BuybackCreated(
    address token,
    uint256 amountIn,
    uint256 amountOut
);

interface IPatDAO {
    function createCampaign(
        string memory name,
        string memory symbol,
        string memory uri,
        uint256 supply
    ) external;

    function createBuyback(
        address token,
        uint256 amountIn,
        uint256 amountOut
    ) external;
}

