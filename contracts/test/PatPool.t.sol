// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
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
import {PoolSwapTest} from "@v4-core/test/PoolSwapTest.sol";
import {TickMath} from "@v4-core/libraries/TickMath.sol";
import {BalanceDelta} from "@v4-core/types/BalanceDelta.sol";

contract PatTest is Test {
    PoolModifyLiquidityTest public lpRouter;
    IPoolManager public manager;
    PoolKey public poolKey;
    PoolId public poolId;

    using PoolIdLibrary for PoolKey;
    using StateLibrary for IPoolManager;

    function setUp() public {
        address initialOwner = vm.addr(1);
        console.log("Initial owner: %s", initialOwner);
        PoolManager deployedManager = new PoolManager(500000);
        manager = IPoolManager(address(deployedManager));

        lpRouter = new PoolModifyLiquidityTest(manager);
        console.log("lpRouter: %s", address (lpRouter));
        MemeToken token = new MemeToken(initialOwner, "CatWithCoco", "CWC");
        console.log("memeToken: %s", address (token));
        address token0 = address(0);
        address token1 = address(token);
        uint24 swapFee = 500; // 0.05% fee tier
        int24 tickSpacing = 10;

        // floor(sqrt(1) * 2^96)
        uint160 startingPrice = 792281625142643375935439503360;
        // uint160 startingPrice = 79228162514264337593543950336000;

        // hookless pool doesnt expect any initialization data
        bytes memory hookData = new bytes(0);

        poolKey = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(0x0)) // !!! Hookless pool is address(0x0)
        });
        vm.prank(vm.addr(1));
        manager.initialize(poolKey, startingPrice, hookData);
        poolId = poolKey.toId();
        vm.deal(initialOwner, 10 ether);
//        vm.prank(initialOwner);
//        IERC20(token0).approve(address(lpRouter), type(uint256).max);
        vm.prank(initialOwner);
        IERC20(token1).approve(address(lpRouter), type(uint256).max);
    }

    function testLiquidity() public {
        // Provide 10e18 worth of liquidity on the range of [-600, 600]
        int24 tickLower = -600; // TickMath.minUsableTick(10);
        int24 tickUpper = 600;
        int256 liquidityDelta = 10e18;

        uint160 MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
        uint160 MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

        PoolSwapTest swapRouter = PoolSwapTest(vm.addr(1));

        vm.prank(vm.addr(1));
        BalanceDelta result = lpRouter.modifyLiquidity(
            poolKey,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidityDelta,
                salt: 0
            }),
            new bytes(0)
        );


        // console.log("Initial owner: %s", vm.addr(1));
        // console.log(result.amount0());
        // console.log(result.amount1());


        // console.log("amount0: %s", result.amount0());
        // console.log("amount1: %s", result.amount1());

        // Convert PoolKey to PoolId using StateLibrary
//        uint128 liquidityAmount = manager.getPosition(
//            poolId,
//            vm.addr(1),
//            tickLower,
//            tickUpper,
//            0 // Assuming salt is 0
//        ).liquidity;

        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: -0.00001e18,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0);
        vm.prank(vm.addr(1));
        swapRouter.swap{value: 1 ether}(poolKey, params, testSettings, hookData);

//        console.log("swapRouter: %s", );

       // assert(liquidityAmount > 0);
    }
}
