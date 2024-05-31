// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {PoolManager} from "@v4-core/PoolManager.sol";

contract PoolManagerScript is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        PoolManager manager = new PoolManager(500000);
        console.log("PoolManager deployed to %s", PoolManager(manager));

        vm.stopBroadcast();
    }
}
