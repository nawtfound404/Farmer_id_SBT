// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;  // Update to the latest stable version

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBoundFarmerNFT is ERC721 {
    uint256 private farmerIdCounter;
    address private _owner;

    mapping(uint256 => bool) private _soulBoundTokens;
    mapping(uint256 => bool) private _farmerExists;

    struct Farmer {
        uint256 farmerId;
        string subsidyType;
        uint256 subsidyAmount;
        uint256 issueDate;
        uint256 validityPeriod;
        string governmentApprovalId;
        string usageStatus;
        string farmerSignature;
        string governmentSignature;
        string location;
        address owner;
        string aadhaarHash;
        string cropType;
        string documentHash;
        bool isRevoked;
        uint256 updatedAt;
        address mintedBy;
        uint256 metadataVersion;
    }

    Farmer[] public allFarmers;
    mapping(address => Farmer[]) public farmerRecords;

    event FarmerNFTMinted(uint256 indexed farmerId, address indexed owner, string subsidyType);

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    constructor() ERC721("SoulBoundFarmerNFT", "SBFNFT") {
        _owner = msg.sender;
    }

    function mintFarmerNFT(
        address recipient,
        string memory subsidyType,
        uint256 subsidyAmount,
        uint256 issueDate,
        uint256 validityPeriod,
        string memory governmentApprovalId,
        string memory usageStatus,
        string memory farmerSignature,
        string memory governmentSignature,
        string memory location,
        string memory aadhaarHash,
        string memory cropType,
        string memory documentHash
    ) public onlyOwner returns (uint256) {
        uint256 newFarmerId = farmerIdCounter++;
        _mint(recipient, newFarmerId);
        _farmerExists[newFarmerId] = true;

        Farmer memory newFarmer = Farmer({
            farmerId: newFarmerId,
            subsidyType: subsidyType,
            subsidyAmount: subsidyAmount,
            issueDate: issueDate,
            validityPeriod: validityPeriod,
            governmentApprovalId: governmentApprovalId,
            usageStatus: usageStatus,
            farmerSignature: farmerSignature,
            governmentSignature: governmentSignature,
            location: location,
            owner: recipient,
            aadhaarHash: aadhaarHash,
            cropType: cropType,
            documentHash: documentHash,
            isRevoked: false,
            updatedAt: block.timestamp,
            mintedBy: msg.sender,
            metadataVersion: 1
        });

        allFarmers.push(newFarmer);
        farmerRecords[recipient].push(newFarmer);
        _soulBoundTokens[newFarmerId] = true;

        emit FarmerNFTMinted(newFarmerId, recipient, subsidyType);

        return newFarmerId;
    }

    function getFarmerNFT(uint256 farmerId) public view returns (Farmer memory) {
        require(_farmerExists[farmerId], "Farmer does not exist");
        return allFarmers[farmerId];
    }

    function downloadFarmerNFTData(uint256 farmerId) public view returns (string memory) {
        Farmer memory farmer = allFarmers[farmerId];

        // Create an array of fields to store each individual piece of information.
        string ;
        fields[0] = "Farmer ID: ";
        fields[1] = uint2str(farmer.farmerId);
        fields[2] = ", Subsidy Type: ";
        fields[3] = farmer.subsidyType;
        fields[4] = ", Subsidy Amount: ";
        fields[5] = uint2str(farmer.subsidyAmount);
        fields[6] = ", Issue Date: ";
        fields[7] = uint2str(farmer.issueDate);
        fields[8] = ", Validity Period: ";
        fields[9] = uint2str(farmer.validityPeriod);
        fields[10] = ", Government Approval ID: ";
        fields[11] = farmer.governmentApprovalId;
        fields[12] = ", Usage Status: ";
        fields[13] = farmer.usageStatus;
        fields[14] = ", Location: ";
        fields[15] = farmer.location;

        return getFieldsString(fields);
    }

    function getFieldsString(string[] memory _fields) internal pure returns (string memory str) {
        string memory result = "";
        for (uint i = 0; i < _fields.length; i++) {
            result = string(abi.encodePacked(result, _fields[i]));
        }
        return result;
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            bstr[k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
