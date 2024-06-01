import { createClient } from "@supabase/supabase-js";
import { decodeFunctionData } from "viem";
import { useLogger } from "~/composables/logger";
import proposalQuery from "~/server/queries/proposal";
import type { GraphQLResponse, Proposal } from "~/types";
import { patDAOContract } from "~/utils/contracts/PatDAOContract";

const RUNTIME_CONFIG = useRuntimeConfig();

export function useProposalService() {
  const { logger } = useLogger("proposal-service");
  // const proposals: Proposal[] = [
  //   {
  //     id: "1",
  //     title: "Proposal 1",
  //     description: "Description 1",
  //     minAmount: 100,
  //     imageSrc: "img/prop_cat.png",
  //     votes: 0,
  //     endingDateTime: "2024-08-31 12:00",
  //   },
  //   {
  //     id: "2",
  //     title: "Proposal 2",
  //     description: "Description 2",
  //     minAmount: 200,
  //     imageSrc: "img/prop_dino.png",
  //     votes: 0,
  //     endingDateTime: "2024-08-31 13:00",
  //   },
  // ];

  const getProposals = async () => {
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
          query: proposalQuery,
        }),
      }
    );
    logger.info("getProposals", resp.data);
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
          description: rawProposal.description,
          votes: {
            for: rawProposal.for,
            against: rawProposal.against,
            abstain: rawProposal.abstain,
          },
          endingDateTime: Number(rawProposal.voteEnd + "000"),
          meta,
        };
        proposals.push(proposal);
      }
    });

    return proposals;
  };
  const saveImage = async (blob: Blob): Promise<string> => {
    const supabase = createClient(
      RUNTIME_CONFIG.supabaseUrl,
      RUNTIME_CONFIG.supabaseKey
    );
    const date = new Date();
    const uniqueId = date.getTime();
    await supabase.storage.from("images").upload(`${uniqueId}.png`, blob);

    const path = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/images/${uniqueId}.png`;

    const json = JSON.stringify({ image: path });
    await supabase.storage.from("json").upload(`${uniqueId}.json`, json);

    const jsonPath = `${RUNTIME_CONFIG.supabaseUrl}/storage/v1/object/public/json/${uniqueId}.json`;
    return jsonPath;
  };

  return { getProposals, saveImage };
}
