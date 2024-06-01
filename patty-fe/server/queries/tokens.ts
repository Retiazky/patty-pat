export default `query GetTokens {
  tokens(where: {name_not: "N/A", symbol_not: "N/A"}) {
    id
    name
    symbol
    totalSupply
    uri
  }
}`;
