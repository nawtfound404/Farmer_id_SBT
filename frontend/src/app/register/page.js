"use client";

import { useState } from "react";
import { getContract } from "@/app/utils/contract";
import { parseUnits, ethers } from "ethers"; 
import { useRouter } from "next/navigation"; 

export default function Register() {
  const [form, setForm] = useState({
    subsidyType: "",
    subsidyAmount: "",
    issueDate: "",
    validityPeriod: "",
    governmentApprovalId: "",
    usageStatus: "",
    farmerSignature: "",
    governmentSignature: "",
    location: ""
  });

  const [mintedId, setMintedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to mint the NFT.");
        return;
      }
  
      const contract = await getContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
  
      console.log("Minting NFT for:", userAddress);
  
      const tx = await contract.mintFarmerNFT(
        userAddress,
        form.subsidyType,
        parseUnits(form.subsidyAmount || "0", 0),
        parseInt(form.issueDate),
        parseInt(form.validityPeriod),
        form.governmentApprovalId,
        form.usageStatus,
        form.farmerSignature,
        form.governmentSignature,
        form.location
      );
  
      console.log("Transaction sent:", tx.hash);
      setTransactionHash(tx.hash);
  
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      // ✅ Restore Minted Farmer ID Display
      const eventSignature = ethers.id("FarmerNFTMinted(uint256,address,string)");
      const farmerMintedEvent = receipt.logs.find(log => log.topics.includes(eventSignature));

      if (farmerMintedEvent) {
        const parsedEvent = contract.interface.decodeEventLog("FarmerNFTMinted", farmerMintedEvent.data, farmerMintedEvent.topics);
        const farmerId = parsedEvent.farmerId.toString();
        setMintedId(farmerId);
        console.log("Minted Farmer NFT ID:", farmerId);
      } else {
        console.warn("FarmerNFTMinted event not found!");
        setMintedId("Minting successful, but event not detected.");
      }
  
      setForm({ 
        subsidyType: "",
        subsidyAmount: "",
        issueDate: "",
        validityPeriod: "",
        governmentApprovalId: "",
        usageStatus: "",
        farmerSignature: "",
        governmentSignature: "",
        location: ""
      });

    } catch (error) {
      console.error("Error minting SBT:", error);
      alert("Failed to mint Farmer SBT. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Farmer Registration</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        ))}
        <button 
          type="submit" 
          className={`px-6 py-3 rounded-lg ${loading ? "bg-gray-500" : "bg-blue-600 text-white hover:bg-blue-700"}`} 
          disabled={loading}
        >
          {loading ? "Minting..." : "Mint Farmer SBT"}
        </button>
      </form>

      {/* ✅ Display transaction details after minting */}
      {mintedId && (
        <p className="mt-4 text-green-600 text-lg font-semibold">
          ✅ SBT Minted! Your Farmer ID: <span className="text-yellow-500">{mintedId}</span>
        </p>
      )}
      {transactionHash && (
        <p className="mt-2 text-gray-500">
          🔗 View transaction: <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" className="text-blue-600 underline">Etherscan</a>
        </p>
      )}

      {/* ✅ Button to navigate to Get Farmer Details page */}
      <button 
        onClick={() => router.push("/get-details")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg"
      >
        View Farmer Details
      </button>
    </main>
  );
}
