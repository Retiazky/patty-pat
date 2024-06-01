import tokensQuery from "~/server/queries/tokens";
import type { Funding, GraphQLResponse } from "~/types";

const RUNTIME_CONFIG = useRuntimeConfig();

export function useFundingService() {
  const fundings: Funding[] = [
    {
      id: "1",
      title: "Funding 1",
      description: "Description 1",
      imageSrc: "img/prop_cat.png",
      tokenName: "Cattie",
      tokenSymbol: "CAT",
    },
    {
      id: "2",
      title: "Funding 2",
      description: "Description 2",
      imageSrc: "img/prop_dino.png",
      tokenName: "Dino",
      tokenSymbol: "DINO",
    },
  ];

  const getFundings = async () => {
    type RawFunding = {
      id: string;
      name: string;
      symbol: string;
      totalSupply: string;
      uri: string;
    };

    const resp = await $fetch<GraphQLResponse<{ tokens: RawFunding[] }>>(
      RUNTIME_CONFIG.graphqlUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: tokensQuery,
        }),
      }
    );

    const tokens: Funding[] = [];
    resp.data.tokens.forEach((rawToken) => {
      tokens.push({
        id: rawToken.id,
        title: rawToken.name,
        description: rawToken.symbol,
        imageSrc: rawToken.uri,
        tokenName: rawToken.name,
        tokenSymbol: rawToken.symbol,
      });
    });

    return tokens;
  };

  const getFundingById = (id: string) => {
    return fundings.find((funding) => funding.id === id);
  };

  return { getFundings, getFundingById };
}
