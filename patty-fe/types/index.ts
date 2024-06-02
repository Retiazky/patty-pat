import type { Address } from "viem";

export interface GraphQLResponse<T> {
  data: T;
}

export type Proposal = {
  id: string;
  title: string;
  symbol: string;
  description: string;
  totalSupply: number;
  meta: string;
  executed: boolean;
  endingDateTime: number;
  targets: Address[];
  values: string[];
  calldatas: string[];
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
};

export type Funding = {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
  name: string;
  symbol: string;
};

export type Transfer = {
  id: string;
  fundingId: string;
  account: string;
  type: "buy" | "sell";
  eth: number;
  token: number;
  tokenSymbol: string;
  date: string;
  transaction: string;
};

export type Token = {
  id: string;
  symbol: string;
  amount: number;
  meta?: string;
};
