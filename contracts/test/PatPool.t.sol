// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PatPool} from "src/PatPool.sol";
import {PoolKey} from "@v4-core/types/PoolKey.sol";
import {Currency} from "@v4-core/types/Currency.sol";
import {IPoolManager} from "@v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "@v4-core/interfaces/IHooks.sol";
import {PoolModifyLiquidityTest} from "@v4-core/test/PoolModifyLiquidityTest.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {StateLibrary} from "@v4-core/libraries/StateLibrary.sol";
import {MemeToken} from "src/MemeToken.sol";
import {PoolManager} from "@v4-core/PoolManager.sol";
import {PoolId, PoolIdLibrary} from "@v4-core/types/PoolId.sol";

contract PatTest is Test {
    PatPool public pool;
    PoolModifyLiquidityTest public lpRouter;
    IPoolManager public manager;
    PoolKey public poolKey;
    PoolId public poolId;

    using PoolIdLibrary for PoolKey;
    using StateLibrary for IPoolManager;

    function setUp() public {
        address initialOwner = vm.addr(1);
        console.log("Initial owner: %s", initialOwner);
        pool = new PatPool(500000);
        PoolManager deployedManager = new PoolManager(500000);
        manager = IPoolManager(address(deployedManager));

        lpRouter = new PoolModifyLiquidityTest(manager);
        MemeToken token = new MemeToken(initialOwner, "CatWithCoco", "CWC");
        address token0 = address(0);
        address token1 = address(token);
        uint24 swapFee = 500; // 0.05% fee tier
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 79228162514264337593543950336000;

        // hookless pool doesnt expect any initialization data
        bytes memory hookData = new bytes(0);

        poolKey = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(0x0)) // !!! Hookless pool is address(0x0)
        });
        manager.initialize(poolKey, startingPrice, hookData);
        poolId = poolKey.toId();

        IERC20(token0).approve(address(lpRouter), type(uint256).max);
        IERC20(token1).approve(address(lpRouter), type(uint256).max);
    }

    function testLiquidity() public {
        // Provide 10e18 worth of liquidity on the range of [-600, 600]
        int24 tickLower = -600;
        int24 tickUpper = 600;
        int256 liquidityDelta = 10e18;

        lpRouter.modifyLiquidity(
            poolKey,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidityDelta,
                salt: 0
            }),
            new bytes(0)
        );

        // Convert PoolKey to PoolId using StateLibrary
        uint128 liquidityAmount = manager.getPosition(
            poolId,
            address(this),
            tickLower,
            tickUpper,
            0 // Assuming salt is 0
        ).liquidity;

        assert(liquidityAmount > 0);
    }
}
