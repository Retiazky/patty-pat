// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {PatToken} from "src/PatToken.sol";
import {PatGovernor} from "src/PatGovernor.sol";
import {PatDAO} from "src/PatDAOMock.sol";

contract PatScript is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        PatToken token = new PatToken(deployerAddress);
        console.log("PatToken deployed to %s", address(token));

        PatGovernor governor = new PatGovernor(token);
        console.log("PatGovernor deployed to %s", address(governor));

        PatDAO dao = new PatDAO(address(governor));
        console.log("PatDAO deployed to %s", address(dao));

        vm.stopBroadcast();
    }
}
