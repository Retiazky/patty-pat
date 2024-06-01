// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPatDAO, Campaign, CampaingCreated, BuybackCreated} from "./interfaces/IPatDAO.sol";
import {PoolKey} from "@v4-core/types/PoolKey.sol";
import {Currency,CurrencyLibrary} from "@v4-core/types/Currency.sol";
import {IPoolManager} from "@v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "@v4-core/interfaces/IHooks.sol";
import {PoolModifyLiquidityTest} from "@v4-core/test/PoolModifyLiquidityTest.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {StateLibrary} from "@v4-core/libraries/StateLibrary.sol";
import {MemeToken} from "src/MemeToken.sol";
import {PoolManager} from "@v4-core/PoolManager.sol";
import {PoolId, PoolIdLibrary} from "@v4-core/types/PoolId.sol";
import {PoolSwapTest} from "@v4-core/test/PoolSwapTest.sol";
import {TickMath} from "@v4-core/libraries/TickMath.sol";
import {BalanceDelta} from "@v4-core/types/BalanceDelta.sol";

contract PatDAO is IPatDAO {
    PoolModifyLiquidityTest public lpRouter;
    IPoolManager public manager;
    PoolKey public poolKey;
    PoolId public poolId;

    using PoolIdLibrary for PoolKey;
    using StateLibrary for IPoolManager;

    address public managerAddress;

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
        address feeRecipient,
        uint256 supply
    ) public onlyGovernance {
        // TODO: Implement

//        manager = IPoolManager(address(0x43E62b5c46884f439d4d2b7c3f47fBAff06D0551));
        manager = IPoolManager(managerAddress);
        //TODO: fix
        lpRouter = new PoolModifyLiquidityTest(manager);

        MemeToken token = new MemeToken(governanceSC, name, symbol, "/");

        address token0 = address(0);
        address token1 = address(token);
        uint24 swapFee = 0; // 0.05% fee tier
        int24 tickSpacing = 1;
        uint160 startingPrice = 7922816251426433759354395033600;

        campaigns[token1] = Campaign(name, symbol, uri, supply, feeRecipient);

        bytes memory hookData = new bytes(0);
        poolKey = PoolKey({
            currency0: CurrencyLibrary.NATIVE,
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: 1,
            hooks: IHooks(address(0x0)) // !!! Hookless pool is address(0x0)
        });

        //provideLiquidity(address (token1),uint160 (startingPrice),bytes (hookData) );
//        manager.initialize(poolKey, startingPrice, hookData);
//        poolId = poolKey.toId();
//        IERC20(token1).approve(address(lpRouter), type(uint256).max);
//
//        int24 tickLower = -400;
//        int24 tickUpper = 0;
//        int256 liquidityDelta = 10e18;
//
//
//        BalanceDelta result = lpRouter.modifyLiquidity{value: 10 ether}(
//            poolKey,
//            IPoolManager.ModifyLiquidityParams({
//                tickLower: tickLower,
//                tickUpper: tickUpper,
//                liquidityDelta: liquidityDelta,
//                salt: 0
//            }),
//            new bytes(0)
//        );

        emit CampaingCreated(name, symbol, uri, supply, token1, address(0));
    }

    function provideLiquidity(address _token,uint160 _startingPrice,bytes memory _hookData) public onlyGovernance {
        address token = _token;
        uint160 startingPrice = _startingPrice;
        bytes memory hookData = _hookData;

        manager.initialize(poolKey, startingPrice, hookData);
        poolId = poolKey.toId();
        IERC20(token).approve(address(lpRouter), type(uint256).max);

        int24 tickLower = -400;
        int24 tickUpper = 0;
        int256 liquidityDelta = 10e18;


        BalanceDelta result = lpRouter.modifyLiquidity{value: msg.value}(
            poolKey,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidityDelta,
                salt: 0
            }),
            new bytes(0)
        );

    }

    function removeCampaign(address token) public onlyGovernance {
        require(campaigns[token].supply > 0, "PatDAO: Campaign does not exist");
        delete campaigns[token];
    }

    function createBuyback(address token, uint256 amountIn, uint256 amountOut) public onlyGovernance {
        // TODO: Implement
        emit BuybackCreated(token, amountIn, amountOut);
    }

    function setManager(address _manager) public onlyGovernance {
        managerAddress = _manager;
    }

}
