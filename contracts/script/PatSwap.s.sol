// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {IPoolManager} from "@v4-core/interfaces/IPoolManager.sol";
import {PoolSwapTest} from "@v4-core/test/PoolSwapTest.sol";

// import { PatPool } from "src/PatPool.sol";

contract PatSwapScript is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        console.log("Deployer address: %s", deployerAddress);
        vm.startBroadcast(deployerPrivateKey);
        IPoolManager manager = IPoolManager(address(0x43E62b5c46884f439d4d2b7c3f47fBAff06D0551));
        PoolSwapTest swapper = new PoolSwapTest(manager);
        console.log("swapper deployed to %s", address(swapper));

        vm.stopBroadcast();
    }
}
