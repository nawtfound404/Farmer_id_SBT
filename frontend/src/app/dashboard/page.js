"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Choose an Action</h1>
      <div className="flex gap-8">
        <button 
          onClick={() => router.push('/register')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          New Farmer Registration
        </button>
        <button 
          onClick={() => router.push('/get-details')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Get Existing Farmer Details
        </button>
      </div>
    </main>
  );
}
