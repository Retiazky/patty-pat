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
  votes: {
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
  };
  creator: string;
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
  tokenSymbol: string;
  date: string;
  transaction: string;
};

export type Token = {
  id: string;
  symbol: string;
  amount: number;
  meta: {
    image: string;
  };
};
