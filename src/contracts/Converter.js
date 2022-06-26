export const converterABI = [
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_resource",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_csc",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "conversionComplete",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20PresetMinterPauser",
        name: "_resource",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "convert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rates",
    outputs: [
      {
        internalType: "contract ERC20PresetMinterPauser",
        name: "resource",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "conversionRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20PresetMinterPauser",
        name: "_resource",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_conversionRate",
        type: "uint256",
      },
    ],
    name: "setResource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_address",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
