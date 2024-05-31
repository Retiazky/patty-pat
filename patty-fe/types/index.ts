export interface GraphQLResponse<T> {
  data: T;
}

export type Proposal = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  endingDateTime: string;
  minAmount: number;
  votes: number;
};

export type Funding = {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
  tokenName: string;
  tokenSymbol: string;
};

export type Transfer = {
  id: string;
  fundingId: string;
  account: string;
  type: 'buy' | 'sell';
  eth: number;
  token: number;
  date: string;
  transaction: string;
};
