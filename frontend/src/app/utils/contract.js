import { ethers } from "ethers";
import contractAbi from "@/app/utils/abi.json";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    "0x6380A99551AD84F6d91E2d4C71CfdE50cc065B8f", // Update this with your actual contract address
    contractAbi,
    signer
  );

  return contract;
};
