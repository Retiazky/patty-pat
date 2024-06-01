// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {MemeToken} from "src/MemeToken.sol";

contract MemeTokenScript is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);
        string memory name = "Cat Needs Mouse";
        string memory symbol = "CNM";
        MemeToken token = new MemeToken(deployerAddress, name, symbol);
        console.log("token deployed to %s", address(manager));

        vm.stopBroadcast();
    }
}
