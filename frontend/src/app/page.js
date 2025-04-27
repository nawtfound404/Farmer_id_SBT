"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      router.push('/dashboard'); // After connect, move to dashboard
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Connect to MetaMask</h1>
      <button 
        onClick={connectWallet} 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Connect Wallet
      </button>
    </main>
  );
}
