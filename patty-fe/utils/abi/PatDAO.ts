export const abi = [
  {
    type: "constructor",
    inputs: [
      { name: "GovernanceSC", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "campaigns",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "uri", type: "string", internalType: "string" },
      { name: "supply", type: "uint256", internalType: "uint256" },
      { name: "feeRecipient", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createBuyback",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOut", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createCampaign",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "uri", type: "string", internalType: "string" },
      { name: "feeRecipient", type: "address", internalType: "address" },
      { name: "supply", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "exchangeRateGovernanceToken",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "governanceSC",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lpRouter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract PoolModifyLiquidityTest",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "manager",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IPoolManager" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "managerAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "poolId",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "PoolId" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "poolKey",
    inputs: [],
    outputs: [
      { name: "currency0", type: "address", internalType: "Currency" },
      { name: "currency1", type: "address", internalType: "Currency" },
      { name: "fee", type: "uint24", internalType: "uint24" },
      { name: "tickSpacing", type: "int24", internalType: "int24" },
      { name: "hooks", type: "address", internalType: "contract IHooks" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "provideLiquidity",
    inputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_startingPrice", type: "uint160", internalType: "uint160" },
      { name: "_hookData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "removeCampaign",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setExchangeRateGovernanceToken",
    inputs: [
      {
        name: "_exchangeRateGovernanceToken",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLPRouter",
    inputs: [{ name: "_lpRouter", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setManager",
    inputs: [{ name: "_manager", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapForGovernanceToken",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "amountIn", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BuybackCreated",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amountIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CampaingCreated",
    inputs: [
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      { name: "uri", type: "string", indexed: false, internalType: "string" },
      {
        name: "supply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "feeRecipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "CampaignAlreadyCreated",
    inputs: [
      { name: "who", type: "address", internalType: "address" },
      { name: "token", type: "address", internalType: "address" },
    ],
  },
] as const;
