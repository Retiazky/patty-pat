export default `query GetTokens {
  tokens(where: {name_not: "N/A", symbol_not: "N/A"}) {
    id
    name
    symbol
    totalSupply
    uri
  }
}`;

export const queryBalanceByAddress = `query GetBalances($address: Bytes!) {
  tokenBalances(where: {account: $address}) {
    account
    amount
    id
    token {
      symbol
      decimals
      id
      name
      totalSupply
      uri
    }
  }
}`;
