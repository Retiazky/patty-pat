// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {IPatDAO, Campaign, CampaingCreated, BuybackCreated} from "src/interfaces/IPatDAO.sol";
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
import {PatDAO} from "src/PatDAOMock.sol";

contract PatDAOTest is Test {
    PatDAO public dao;

    function setUp() public {
        address initialOwner = vm.addr(1);
        console.log("Initial owner: %s", initialOwner);
        dao = new PatDAO(initialOwner);
    }

    function testCreateCampaign() public {
        PoolManager deployedManager = new PoolManager(500000);
        IPoolManager manager = IPoolManager(address(deployedManager));
        address manager1 = address(manager);
        vm.prank(vm.addr(1));
        dao.setManager(manager1);
        vm.prank(vm.addr(1));
        dao.createCampaign("CatWithCoco", "CWC","/",vm.addr(2),1000 ether);

//        assertEq(
//            token.totalSupply(),
//            10000000000000000 * 10 ** token.decimals()
//        );
    }
}