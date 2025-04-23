// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Script.sol";
import "../src/SoulBoundFarmerNFT.sol";

contract DeploySoulBoundFarmerNFT is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");  // Set private key in `.env`
        vm.startBroadcast(deployerPrivateKey);

        SoulBoundFarmerNFT sbNFT = new SoulBoundFarmerNFT();  // Deploy contract

        console.log("SoulBoundFarmerNFT deployed at:", address(sbNFT));

        vm.stopBroadcast();
    }
}
