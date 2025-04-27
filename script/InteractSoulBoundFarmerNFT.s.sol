// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Script.sol";
import "../src/SoulBoundFarmerNFT.sol";

contract InteractSoulBoundFarmerNFT is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS"); // Set this in `.env`
        vm.startBroadcast(deployerPrivateKey);

        // Load the deployed contract
        SoulBoundFarmerNFT sbNFT = SoulBoundFarmerNFT(contractAddress);

        console.log("Interacting with SoulBoundFarmerNFT at:", contractAddress);

        // Mint a new NFT
        uint256 farmerId = sbNFT.mintFarmerNFT(
            msg.sender,
            "Organic Subsidy",
            5000,
            block.timestamp,
            365,
            "GovApproval123",
            "Active",
            "FarmerSig123",
            "GovSig123",
            "Kanpur"
        );

        console.log("Minted Farmer NFT with ID:", farmerId);

        // Fetch Farmer NFT details
        SoulBoundFarmerNFT.Farmer memory farmer = sbNFT.getFarmerNFT(farmerId);
        console.log("Farmer NFT Location:", farmer.location);

        // Test SoulBound Restriction - Expect revert
        vm.expectRevert("This token is soul-bound and cannot be transferred.");
        sbNFT.customTransfer(msg.sender, address(0xBAD), farmerId);

        vm.stopBroadcast();
    }
}
