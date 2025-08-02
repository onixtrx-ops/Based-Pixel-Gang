import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { parseEther } from "viem";

const CONTRACT_ADDRESS = "0xbdb923eff2b8c798690f2ee504d5a2ee7571d46c";
const ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "minter", "type": "address" },
      { "internalType": "uint256", "name": "quantity", "type": "uint256" }
    ],
    "name": "mintSeaDrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "minter", "type": "address" }
    ],
    "name": "getMintStats",
    "outputs": [
      { "internalType": "uint256", "name": "minterNumMinted", "type": "uint256" },
      { "internalType": "uint256", "name": "currentTotalSupply", "type": "uint256" },
      { "internalType": "uint256", "name": "maxSupply", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function MintPage() {
  const { address, isConnected } = useAccount();
  const [quantity, setQuantity] = useState(1);

  const { data: stats } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getMintStats",
    args: [address || "0x0000000000000000000000000000000000000000"]
  });

  const { write: mint, isLoading, isSuccess } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "mintSeaDrop",
    args: [address, quantity],
    value: parseEther("0.000033").toString()
  });

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold">Based Pixel Gang</h1>
      <img src="/based.png" alt="logo" className="w-40" />

      <div className="text-lg">
        Supply: {stats ? `${stats[1]} / ${stats[2]}` : "Loading..."}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          -
        </button>
        <div className="text-xl">{quantity}</div>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          +
        </button>
      </div>

      <ConnectButton />

      {isConnected && (
        <button
          onClick={() => mint()}
          disabled={isLoading}
          className="bg-blue-600 px-6 py-3 rounded text-white mt-4"
        >
          {isLoading ? "Minting..." : "Mint"}
        </button>
      )}

      {isSuccess && <div className="text-green-400">✅ Mint Success!</div>}

      <div className="flex gap-4 mt-10 text-sm text-gray-400">
        <a href="https://opensea.io/collection/based-pixel-gang" target="_blank">OpenSea</a>
        <a href="https://x.com/DepixelatorX" target="_blank">Twitter</a>
      </div>
    </main>
  );
}
