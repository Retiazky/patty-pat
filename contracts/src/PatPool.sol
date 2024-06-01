// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPoolManager} from "@v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "@v4-core/interfaces/IHooks.sol";
import {PoolKey} from "@v4-core/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "@v4-core/types/Currency.sol";
import {StateLibrary} from "@v4-core/libraries/StateLibrary.sol";
import {PoolManager} from "@v4-core/PoolManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PatPool is PoolManager {
    constructor(uint256 _gas) PoolManager(_gas) {}
    // using CurrencyLibrary for Currency;
    // using StateLibrary for IPoolManager;

    // set the initialize router
    // IPoolManager manager = IPoolManager(address(0));

    // function init(
    //     address token0,
    //     address token1,
    //     uint24 swapFee,
    //     int24 tickSpacing,
    //     address hook,
    //     uint160 sqrtPriceX96,
    //     bytes calldata hookData
    // ) external {
    //     // sort your tokens! v4 requires token0 < token1
    //     if (token0 > token1) {
    //         (token0, token1) = (token1, token0);
    //     }

    //     PoolKey memory pool = PoolKey({
    //         currency0: Currency.wrap(token0),
    //         currency1: Currency.wrap(token1),
    //         fee: swapFee,
    //         tickSpacing: tickSpacing,
    //         hooks: IHooks(hook)
    //     });
    //     manager.initialize(pool, sqrtPriceX96, hookData);
    // }

    // function setManager(address _manager) external {
    //     manager = IPoolManager(_manager);
    // }
}
