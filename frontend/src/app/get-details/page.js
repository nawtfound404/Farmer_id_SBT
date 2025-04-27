"use client";

import { useState } from "react";
import { getContract } from "@/app/utils/contract";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

export default function GetDetails() {
  const [farmerId, setFarmerId] = useState("");
  const [farmer, setFarmer] = useState(null);
  const router = useRouter();

  const fetchFarmer = async () => {
    try {
      const contract = await getContract();
      const data = await contract.getFarmerNFT(farmerId);
      setFarmer(data);
    } catch (error) {
      console.error("Error fetching farmer details:", error);
      alert("Failed to fetch farmer details. Please check the Farmer ID.");
    }
  };

  const downloadPDF = () => {
    if (!farmer) return;

    const pdf = new jsPDF();
    pdf.setFontSize(14);
    pdf.text("Farmer Details", 10, 10);

    pdf.setFontSize(12);
    const fields = [
      `Farmer ID: ${farmer.farmerId}`,
      `Subsidy Type: ${farmer.subsidyType}`,
      `Subsidy Amount: ${farmer.subsidyAmount.toString()}`,
      `Issue Date: ${farmer.issueDate.toString()}`,
      `Validity Period: ${farmer.validityPeriod.toString()}`,
      `Government Approval ID: ${farmer.governmentApprovalId}`,
      `Usage Status: ${farmer.usageStatus}`,
      `Farmer Signature: ${farmer.farmerSignature}`,
      `Government Signature: ${farmer.governmentSignature}`,
      `Location: ${farmer.location}`,
      `Owner Address: ${farmer.owner}`
    ];

    fields.forEach((text, index) => {
      pdf.text(text, 10, 20 + index * 10);
    });

    pdf.save(`Farmer_${farmer.farmerId}.pdf`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">Get Farmer Details</h1>

      <input
        type="text"
        placeholder="Enter Farmer ID"
        value={farmerId}
        onChange={(e) => setFarmerId(e.target.value)}
        className="p-2 border border-gray-500 rounded mb-4 bg-gray-800 text-white placeholder-gray-400"
      />

      <button
        onClick={fetchFarmer}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-8 shadow-lg"
      >
        Fetch Details
      </button>

      {/* ✅ Show details first, THEN allow download */}
      {farmer && (
        <div className="flex flex-col gap-2 items-start bg-gray-700 text-white p-6 rounded-lg shadow-lg w-96 border border-yellow-400">
          <h2 className="text-xl font-bold text-yellow-300">Farmer Information</h2>
          <hr className="mb-2 w-full border-yellow-400" />
          <p><b className="text-yellow-300">Farmer ID:</b> {farmer.farmerId.toString()}</p>
          <p><b className="text-yellow-300">Subsidy Type:</b> {farmer.subsidyType}</p>
          <p><b className="text-yellow-300">Subsidy Amount:</b> {farmer.subsidyAmount.toString()}</p>
          <p><b className="text-yellow-300">Issue Date:</b> {farmer.issueDate.toString()}</p>
          <p><b className="text-yellow-300">Validity Period:</b> {farmer.validityPeriod.toString()}</p>
          <p><b className="text-yellow-300">Government Approval ID:</b> {farmer.governmentApprovalId}</p>
          <p><b className="text-yellow-300">Usage Status:</b> {farmer.usageStatus}</p>
          <p><b className="text-yellow-300">Farmer Signature:</b> {farmer.farmerSignature}</p>
          <p><b className="text-yellow-300">Government Signature:</b> {farmer.governmentSignature}</p>
          <p><b className="text-yellow-300">Location:</b> {farmer.location}</p>
          <p><b className="text-yellow-300">Owner Address:</b> {farmer.owner}</p>

          {/* ✅ Download PDF Button only AFTER details appear */}
          <button
            onClick={downloadPDF}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* ✅ Button to Navigate to New Farmer Registration */}
      <button
        onClick={() => router.push("/register")}
        className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-lg"
      >
        Register New Farmer
      </button>
    </main>
  );
}
