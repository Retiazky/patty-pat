// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
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
        console.log("lpRouter: %s", address(lpRouter));
        MemeToken token = new MemeToken(initialOwner, "CatWithCoco", "CWC", "/");
        console.log("memeToken: %s", address(token));
        address token0 = address(0);
        address token1 = address(token);
        uint24 swapFee = 0; // 0.05% fee tier
        int24 tickSpacing = 1;

        // floor(sqrt(1) * 2^96)
//        uint160 startingPrice = 792281625142643375935439503360;
        uint160 startingPrice = 7922816251426433759354395033600;
//        uint160 startingPrice = 112045541949572279837463876454;

        // hookless pool doesnt expect any initialization data
        bytes memory hookData = new bytes(0);

        poolKey = PoolKey({
            currency0: CurrencyLibrary.NATIVE,
            currency1: Currency.wrap(token1),
            fee: swapFee,
            tickSpacing: 1,
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
        //vm.prank(initialOwner);
        //IERC20(token1).approve(address(swapRouter), type(uint256).max);
    }

    function testLiquidity() public {
        // Provide 10e18 worth of liquidity on the range of [-600, 600]
        int24 tickLower = -400; // TickMath.minUsableTick(10);
        int24 tickUpper = 0;
        int256 liquidityDelta = 10e18;

        uint160 MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
        uint160 MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

        PoolSwapTest swapRouter = new PoolSwapTest(manager);

        vm.prank(vm.addr(1));
        BalanceDelta result = lpRouter.modifyLiquidity{value: 10 ether}(
            poolKey,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidityDelta,
                salt: 0
            }),
            new bytes(0)
        );

        console.logInt(result.amount0());
        console.logInt(result.amount1());

        // Convert PoolKey to PoolId using StateLibrary
        //        uint128 liquidityAmount = manager.getPosition(
        //            poolId,
        //            vm.addr(1),
        //            tickLower,
        //            tickUpper,
        //            0 // Assuming salt is 0
        //        ).liquidity;
        skip(1);
        vm.warp(1000);

        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: -0.0001 ether,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT// unlimited impact
        });
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings(false, false);



        bytes memory hookData = new bytes(0);
        //        vm.prank(vm.addr(1));
        //        vm.deal(address(swapRouter), 1 ether);
        //        vm.prank(vm.addr(1));
        //        IERC20(zeroForOne ? Currency.unwrap(poolKey.currency1) : Currency.unwrap(poolKey.currency0)).approve(address(swapRouter), type(uint256).max);
        vm.deal(address(manager), 1000 ether);
        vm.prank(vm.addr(1));
        swapRouter.swap{value: 0.0001 ether}(poolKey, params, testSettings, hookData);

        //        console.log("swapRouter: %s", );

        // assert(liquidityAmount > 0);
    }
}
