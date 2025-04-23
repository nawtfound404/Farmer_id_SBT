// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/SoulBoundFarmerNFT.sol";

contract SoulBoundFarmerNFTTest is Test {
    SoulBoundFarmerNFT sbNFT;
    address farmer = address(0xBEEF);
    address attacker = address(0xBAD);

    function setUp() public {
        sbNFT = new SoulBoundFarmerNFT();
    }

    function testMintFarmerNFT() public {
        uint256 farmerId = sbNFT.mintFarmerNFT(
            farmer,
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

        assertEq(farmerId, 0);
        assertEq(sbNFT.ownerOf(farmerId), farmer);

        SoulBoundFarmerNFT.Farmer memory farmerData = sbNFT.getFarmerNFT(farmerId);
        assertEq(farmerData.subsidyAmount, 5000);
        assertEq(farmerData.location, "Kanpur");
    }

    function testSoulBoundTransferFails() public {
        uint256 farmerId = sbNFT.mintFarmerNFT(
            farmer,
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

        vm.expectRevert("This token is soul-bound and cannot be transferred.");
        sbNFT.customTransfer(farmer, attacker, farmerId);
    }

    function testDownloadFarmerNFTData() public {
        uint256 farmerId = sbNFT.mintFarmerNFT(
            farmer,
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

        string memory data = sbNFT.downloadFarmerNFTData(farmerId);
        assertTrue(bytes(data).length > 0);
    }
}
