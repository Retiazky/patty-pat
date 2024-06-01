export default `query GetProposals {
  proposals {
    abstain
    against
    calldatas
    canceled
    executed
    description
    for
    id
    proposer
    targets
    values
    voteEnd
    voteStart
  }
}`;
export const queryByAddress = `query GetProposals($address: String!) {
  proposals(where: {proposer: $address}) {
    abstain
    against
    calldatas
    canceled
    executed
    description
    for
    id
    proposer
    targets
    values
    voteEnd
    voteStart
  }
}`;
