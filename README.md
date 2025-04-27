```md
# 🌾 Farmer ID SBT - SoulBound Tokens for Farmers

A blockchain-based **SoulBound Token (SBT) system** that allows farmers to register and **securely store subsidy-related data** using immutable NFTs.

## 🚀 Features
- **Farmer Registration via Smart Contract**
- **SoulBound Token Minting (Non-Transferable)**
- **Frontend Integration with Ethers.js**
- **Fetch & Download Farmer Details as PDF**
- **MetaMask Wallet Connection for Transactions**
- **Sepolia Testnet Deployment**

## 🛠️ Technologies Used
- **Solidity** (Smart Contracts)
- **Foundry** (Testing & Deployment)
- **Ethers.js** (Frontend Blockchain Interaction)
- **Next.js** (Frontend Framework)
- **jsPDF** (PDF Export Functionality)
- **MetaMask** (Wallet Integration)

## 📦 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/nawtfound404/Farmer_id_SBT.git
cd Farmer_id_SBT
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Frontend
```sh
npm run dev
```
Visit `http://localhost:3000` to use the dApp.

### 4️⃣ Deploy Smart Contract (Foundry)
```sh
forge script script/DeploySoulBoundFarmerNFT.s.sol --broadcast --rpc-url <RPC_URL>
```
Replace `<RPC_URL>` with Sepolia or another testnet RPC.

## 🖥️ Usage Guide

### ✅ Register a Farmer
1. Fill out the form on `/register`.
2. Click **"Mint Farmer SBT"**.
3. Transaction will process via **MetaMask**.
4. Farmer ID will be displayed upon successful minting.

### ✅ Fetch Farmer Details
1. Navigate to `/get-details`.
2. Enter **Farmer ID** and click **Fetch Details**.
3. View details or **download as a PDF**.

### ✅ View Transactions
Check minted SBTs on **Sepolia Testnet**:
[Sepolia Explorer](https://sepolia.etherscan.io)

## 🤝 Contributing
Want to enhance this project? Feel free to:
- **Fork the repository**
- **Create a new branch** (`git checkout -b feature-name`)
- **Submit a pull request**

## 🔗 Links
- **GitHub Repository**: [Farmer ID SBT](https://github.com/nawtfound404/Farmer_id_SBT)
- **Sepolia Explorer**: [Track Transactions](https://sepolia.etherscan.io)
- **MetaMask Setup**: [MetaMask](https://metamask.io/)

## 📜 License
This project is **open-source** under the **MIT License**.
```