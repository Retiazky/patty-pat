// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {IPoolManager} from "@v4-core/interfaces/IPoolManager.sol";
import {PoolModifyLiquidityTest} from "@v4-core/test/PoolModifyLiquidityTest.sol";
import {PoolKey} from "@v4-core/types/PoolKey.sol";
import {BalanceDelta} from "@v4-core/types/BalanceDelta.sol";
import {Currency,CurrencyLibrary} from "@v4-core/types/Currency.sol";
import {IHooks} from "@v4-core/interfaces/IHooks.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {PoolId, PoolIdLibrary} from "@v4-core/types/PoolId.sol";

// import { PatPool } from "src/PatPool.sol";

contract SteadyPatScript is Script {
    PoolModifyLiquidityTest public lpRouter;
    PoolKey public poolKey;

    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        console.log("Deployer address: %s", deployerAddress);
        vm.startBroadcast(deployerPrivateKey);
        IPoolManager manager = IPoolManager(address(0x43E62b5c46884f439d4d2b7c3f47fBAff06D0551));
        PoolModifyLiquidityTest lp = PoolModifyLiquidityTest(0x61371311B35e3D7011dCDCc019935787FAeD4Eb5);
        address token1 = 0x8BD40d6b2800F221e7fd48Fe9Eea9ffB734b4463;
        

        poolKey = PoolKey({
            currency0: CurrencyLibrary.NATIVE,
            currency1: Currency.wrap(token1),
            fee: 0,
            tickSpacing: 1,
            hooks: IHooks(address(0x0)) // !!! Hookless pool is address(0x0)
        });

        uint160 startingPrice = 7922816251426433759354395033600;
        bytes memory hookData = new bytes(0);

        manager.initialize(poolKey, startingPrice, hookData);

        IERC20(token1).approve(address(lp), type(uint256).max);

        console.log("PoolModifyLiquidityTest deployed to %s", address(lp));

        int24 tickLower = -400; // TickMath.minUsableTick(10);
        int24 tickUpper = 0;
        int256 liquidityDelta = 10e18;

        BalanceDelta result = lpRouter.modifyLiquidity{value: 0.00001 ether}(
            poolKey,
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: liquidityDelta,
                salt: 0
            }),
            new bytes(0)
        );

        vm.stopBroadcast();
    }
}
