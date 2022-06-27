export const CSCMinterABI = [
  {
    inputs: [
      {
        internalType: "contract ERC20PresetMinterPauser",
        name: "_cosmicCash",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "cosmicCash",
    outputs: [
      {
        internalType: "contract ERC20PresetMinterPauser",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCSC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
