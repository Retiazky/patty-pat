import { createClient } from "@supabase/supabase-js";
import { decodeFunctionData, type Address } from "viem";
import proposalQuery, {
  queryByAddress,
  queryGovernanceTokenTotalSupply,
} from "~/server/queries/proposal";
import type { GraphQLResponse, Proposal } from "~/types";
import { patDAOContract } from "~/utils/contracts/PatDAOContract";

const RUNTIME_CONFIG = useRuntimeConfig();

export function useProposalService() {
  const getProposals = async (address?: string) => {
    type RawProposal = {
      id: string;
      description: string;
      voteStart: string;
      voteEnd: string;
      for: number;
      against: number;
      abstain: number;
      canceled: boolean;
      executed: boolean;
      targets: string[];
      values: string[];
      calldatas: string[];
      proposer: string;
    };
    const resp = await $fetch<GraphQLResponse<{ proposals: RawProposal[] }>>(
      RUNTIME_CONFIG.graphqlUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: address ? queryByAddress : proposalQuery,
          variables: {
            address,
          },
        }),
      }
    );
    type RawTotalSupply = {
      totalSupply: string;
    };

    const resp2 = await $fetch<GraphQLResponse<{ tokens: RawTotalSupply[] }>>(
      RUNTIME_CONFIG.graphqlUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryGovernanceTokenTotalSupply,
        }),
      }
    );

    const totalSupply = Number(resp2.data.tokens[0].totalSupply) / 10 ** 18;

    const proposals: Proposal[] = [];
    resp.data.proposals.forEach((rawProposal) => {
      const data = decodeFunctionData({
        abi: patDAOContract.abi,
        data: rawProposal.calldatas[0] as `0x${string}`,
      });

      if (data.functionName === "createCampaign") {
        const [name, symbol, meta, _recipient, _supply] = data.args;
        const proposal: Proposal = {
          id: rawProposal.id,
          title: name,
          symbol,
          totalSupply,
          executed: rawProposal.executed,
          description: rawProposal.description,
          targets: rawProposal.targets as Address[],
          values: rawProposal.values,
          calldatas: rawProposal.calldatas,
          votes: {
            for: rawProposal.for / 10 ** 18,
            against: rawProposal.against / 10 ** 18,
            abstain: rawProposal.abstain / 10 ** 18,
          },
          endingDateTime: Number(rawProposal.voteEnd + "000"),
          meta,
        };
        proposals.push(proposal);
      }
    });
    return proposals;
  };

  const saveImage = async (
    blob: Blob,
    description: string
  ): Promise<string> => {
    const supabase = createClient(
      RUNTIME_CONFIG.supabaseUrl,
      RUNTIME_CONFIG.supabaseKey
    );
    const date = new Date();
    const uniqueId = date.getTime();
    await supabase.storage.from("images").upload(`${uniqueId}.png`, blob);

    const path = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/images/${uniqueId}.png`;

    const json = JSON.stringify({ image: path, description });
    await supabase.storage.from("json").upload(`${uniqueId}.json`, json);

    const jsonPath = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/json/${uniqueId}.json`;
    return jsonPath;
  };

  return { getProposals, saveImage };
}
