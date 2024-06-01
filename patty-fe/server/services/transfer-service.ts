import type { GraphQLResponse, Token, Transfer } from "~/types";
import { queryBalanceByAddress } from "../queries/tokens";

const RUNTIME_CONFIG = useRuntimeConfig();

export function useTransferService() {
  const transfers: Transfer[] = [
    {
      id: "1",
      fundingId: "1",
      account: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
      type: "buy",
      eth: 0.00002,
      token: 0.1,
      tokenSymbol: "CAT",
      date: "5 seconds ago",
      transaction: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
    },
    {
      id: "2",
      fundingId: "1",
      account: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
      type: "buy",
      eth: 0.00005,
      token: 1.345,
      tokenSymbol: "CAT",
      date: "15 seconds ago",
      transaction: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
    },
    {
      id: "3",
      fundingId: "1",
      account: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
      type: "sell",
      eth: 0.00001,
      token: 15.2,
      tokenSymbol: "CAT",
      date: "30 seconds ago",
      transaction: "0xf0A49418375CfD4A33CA316C2522e65F46e3f909",
    },
  ];

  const getTransfersById = (id: string) => {
    return transfers.filter((transfer) => transfer.fundingId === id);
  };

  const getTransfersByAddress = (address: string) => {
    return transfers.filter((transfer) => transfer.account === address);
  };

  const getTokensByAddress = async (address: string) => {
    type RawBalances = {
      account: string;
      amount: number;
      id: string;
      token: {
        symbol: string;
        decimals: number;
        id: string;
        name: string;
        totalSupply: string;
        uri: string;
      };
    };

    const resp = await $fetch<
      GraphQLResponse<{ tokenBalances: RawBalances[] }>
    >(RUNTIME_CONFIG.graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryBalanceByAddress,
        variables: {
          address,
        },
      }),
    });

    const tokens: Token[] = [];

    resp.data.tokenBalances.forEach((rawToken) => {
      tokens.push({
        id: rawToken.token.id,
        symbol: rawToken.token.symbol,
        amount: rawToken.amount / 10 ** rawToken.token.decimals,
        meta: rawToken.token.uri,
      });
    });
    return tokens;
  };

  return { getTransfersById, getTransfersByAddress, getTokensByAddress };
}
