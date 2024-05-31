export interface GraphQLResponse<T> {
  data: T;
}

export type Proposal = {
  title: string;
  description: string;
  imageSrc: string;
  endingDateTime: string;
  minAmount: number;
  votes: number;
};

export type Funding = {
  title: string;
  imageSrc: string;
  description: string;
};
