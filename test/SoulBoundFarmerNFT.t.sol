// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/SoulBoundFarmerNFT.sol";

contract SoulBoundFarmerNFTTest is Test {
    SoulBoundFarmerNFT public sbNFT;

    function setUp() public {
        sbNFT = new SoulBoundFarmerNFT();
    }

    function testMint() public {
        address farmer = address(0xBEEF);
        uint256 id = sbNFT.mintFarmerNFT(
            "Ayush",
            "Mr. Verma",
            "1234-5678-9012",
            "01-01-2000",
            "Nandgaon",
            "XYZ Tehsil",
            "Ghaziabad",
            "Uttar Pradesh",
            "201001",
            "LR-789456",
            "9876543210",
            "ipfs://QmExampleImageHash",
            address(this)
        );


        assertEq(id, 0);
        assertEq(sbNFT.ownerOf(id), farmer);
    }
}
